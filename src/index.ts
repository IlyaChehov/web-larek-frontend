import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { WebLarekApi } from './components/WebLarekApi';
import { WebLarekModel } from './components/Model/WebLarekModel';
import { Card } from './components/View/Card';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/View/Page';
import { IOrder, IOrderData, IProduct } from './types';
import { Modal } from './components/View/Modal';
import { Basket } from './components/View/Basket';
import { Order } from './components/View/Order';
import { Contacts } from './components/View/Contacts';
import { Success } from './components/View/Success';

const templates = {
  success: ensureElement<HTMLTemplateElement>('#success'),
  cardCatalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
  cardPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
  cardBasket: ensureElement<HTMLTemplateElement>('#card-basket'),
  basket: ensureElement<HTMLTemplateElement>('#basket'),
  order: ensureElement<HTMLTemplateElement>('#order'),
  contacts: ensureElement<HTMLTemplateElement>('#contacts'),
};
const body = ensureElement('.page');
const modalElement = ensureElement('#modal-container');

const events = new EventEmitter;
const api = new WebLarekApi(API_URL);
const modelData = new WebLarekModel({}, events);
const page = new Page(body, events);
const modal = new Modal(modalElement, events);
const basket = new Basket(cloneTemplate(templates.basket), events);
const orderFrom = new Order(cloneTemplate(templates.order), events);
const contactsForm = new Contacts(cloneTemplate(templates.contacts), events); 
const success = new Success(cloneTemplate(templates.success), events);


api.getCatalog()
  .then(res => {
    modelData.products = res.items; 
  }).catch(err => console.error(err));

events.on('items:change', () => {
  const cards = modelData.products.map(item => {
    const card = new Card(cloneTemplate(templates.cardCatalog), {onClick: () => {
      events.emit('card:select', item);
    }}, CDN_URL);
    return card.render(item);
  });
  page.catalog = cards;
});

events.on('card:select', (item: IProduct) => {

  const inBasket = modelData.inBasket(item.id);

  const card = new Card(cloneTemplate(templates.cardPreview), {onClick: () => {
    if (inBasket) {
      modelData.deleteFromBasket(item);
    } else {
      modelData.addToBasket(item);
    };
    events.emit('card:change');
  }}, CDN_URL);
  
  if (inBasket) {
    card.button = 'Удалить';
  };

  modal.render({
    content: card.render(item),
  });
});

events.on('card:change', () => {
  page.render({
    counter: modelData.getSizeBasket(),
  });
  modal.close();
});

events.on('basket:open', () => {
  const cards = modelData.basket.map((id, index) => {
    const item = modelData.getProduct(id);
    return new Card(cloneTemplate(templates.cardBasket), {onClick: () => {
      events.emit('basket:delete', item);
    }}).render({
      index,
      title: item.title,
      price: item.price,
    });
  });
  modal.render({
    content: basket.render({
      items: cards,
      price: modelData.getTotalBasket(),
      selected: modelData.basket
    })
  });
});

events.on('basket:delete', (item: IProduct) => {
  modelData.deleteFromBasket(item);
  events.emit('basket:open');
});

events.on('order:open', () => {
  modal.render({
    content: orderFrom.render({
      payment: '',
      address: '',
      valid: false,
      errors: [],
    })
  });
});

events.on('formErrors:change', (errors: Partial<IOrder>) => {
  const { email, phone, address, payment } = errors;
  orderFrom.valid = !address && !payment;
  contactsForm.valid = !email && !phone;
  orderFrom.errors = Object.values({address, payment}).filter(i => !!i).join('; ');
  contactsForm.errors = Object.values({email, phone}).filter(i => !!i).join('; ');
});

events.on(/^order\..*:change/, (data: { field: keyof IOrderData, value: string }) => {
  modelData.setOrderField(data.field, data.value);
});

events.on(/^contacts\..*:change/, (data: { field: keyof IOrderData, value: string }) => {
  modelData.setOrderField(data.field, data.value);
});

events.on('payment:change', (button: HTMLButtonElement) => {
  const payment = button.name;
  modelData.setOrderField('payment', payment);
});

events.on('order:submit', () => {
  modal.render({
    content: contactsForm.render({
      phone: '',
      email: '',
      errors: [],
      valid: false,
    })
  });
});

events.on('contacts:submit', () => {
  modelData.setOrder();
  const order = modelData.getOrder();
  api.setOrder(order)
    .then(res => {
      modal.render({
        content: success.render({
          total: res.total
        })
      })
    }).catch(err => console.error(err));
});

events.on('success:closed', () => {
  modelData.clearOrder();
  modal.close();
  page.counter = 0;
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
  page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
  page.locked = false;
});