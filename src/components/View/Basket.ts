import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export interface IBasket {
  items: HTMLElement[];
  price: number;
  selected: string[];
};

export class Basket extends Component<IBasket> implements IBasket {

  protected containerElement: HTMLUListElement;
  protected buttonElement: HTMLButtonElement;
  protected priceElement: HTMLElement;

  constructor(protected container: HTMLElement, protected event: IEvents) {
    super(container);

    this.containerElement = ensureElement<HTMLUListElement>('.basket__list', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.priceElement = ensureElement('.basket__price', this.container);

    this.buttonElement.addEventListener('click', () => {
      event.emit('order:open');
    });

    this.items = [];
  };

  set items(items: HTMLElement[]) {
    if (items.length) {
      this.containerElement.replaceChildren(...items);
    } else {
      this.containerElement.replaceChildren(createElement<HTMLParagraphElement>('p', {
         textContent: 'Корзина пуста'
      }));
    };
  };

  set selected(items: string[]) {
    this.setDisabled(this.buttonElement, items.length === 0);
  };

  set price(value: number) {
    this.setText(this.priceElement, `${value} синапсов`);
  };
};