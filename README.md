# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды:
1. Выполнить команду для установки зависимостей:
```
npm install
```
или
```
yarn
```
2. Запустить проект командой:
```
npm run start
```
или
```
yarn start
```
## Сборка проекта
```
npm run build
```
или
```
yarn build
```

## Интерфейсы описывающие основные данные в приложении
+ Интерфейс **IProduct** описывает данные карточки товаров:

<details>
<summary>Интерфейс IProduct</summary>

```ts
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
};
```

</details>

***

+ Интерфейс **IResponseProducts** описывает ответ на GET запрос к API:

<details>
<summary>Интерфейс IProduct</summary>

```ts
interface IResponseProducts {
  total: number;
  items: IProduct[];
};
```

</details>

***

+ Интерфейс **IResponseOrder** описывает ответ на POST запрос к API:

<details>
<summary>Интерфейс IResponseOrder</summary>

```ts
interface IResponseOrder {
  id: string;
  total: number;
};
```

</details>

***

+ Интерфейс **IOrderContacts** описывает контактные данные пользователя для формирования заказа

<details>
<summary>Интерфейс IOrderContacts</summary>

```ts
interface IOrderContacts {
  email: string;
  phone: string;
};
```

</details>

***

+ Интерфейс **IOrderData** описывает данные пользователя для формирования заказа

<details>
<summary>Интерфейс IOrderData</summary>

```ts
interface IOrderData {
  payment: string;
  address: string;
};
```

</details>

***

+ Интерфейс **IOrder** описывает все данные, которые необходимо отправить на сервер для оформления заказа, он раширяется интерфейсами **IOrderContacts** и **IOrderData**

<details>
<summary> Интерфейс IOrder</summary>

```ts
interface IOrder extends IOrderContacts, IOrderData {
  total: number;
  items: string[];
};
```

</details>

***

## Архитектура приложения

Приложение разработанно согласно шаблону программирования **MVC (Model-View-Controller)**. Данный шаблон разделяет архитектуру приложения на три модуля: 

1. **Модель (Model)** - содержит основную логику приложения, отвечает за данные, методы работы с ними и структуру программы.

2. **Представление (View)** - отвечает за визуализацию информации, которую получает от модели. View отображает данные на уровне пользовательского интерфейса.

3. **Контроллер (Controller)** - обеспечивает взаимодействие с системой: обрабатывает действия пользователя, проверяет полученную информацию и передаёт её модели. Контроллер определяет, как приложение будет реагировать на действия пользователя. В нашем случает **Контроллером** является корневой файл index.ts.

## Интерфейсы и классы которые отвечают за **Модель данных приложения (MODEL)**

**IWebLarekApi** и **WebLarekApi** отвечают за работу с API приложения. Класс **WebLarekApi** раширяется базовым классом API. Имеет три метода: 

+ **getCatalog()** - выполняет GET запрос на сервер, в ответ возвращает промисс, который должен соответствовать интерфесу **IResponseProducts**, который содержит в себе массив карточек товара и их количество.

+ **getProduct(id: string)** - выполняет GET запрос на сервер, принимает в качестве аргумента ID карточки и возвращает промисс с карточкой конкретного товара, которая соответствует ID.

+ **setOrder(data: IOrder)** - выполняет POST запрос на сервер, принимает в качестве аргумента данные о заказе, которые должны соответствовать интрерфейсу IOrder. В ответ принимает промисс **IResponseOrder**, в котором есть ID заказа и сумма заказа.

<details>
<summary>Интерфейс IWebLarekApi</summary>

```ts
interface IWebLarekApi {
  getCatalog(): Promise<IResponseProducts>;
  getProduct(id: string): Promise<IProduct>;
  setOrder(data: IOrder): Promise<IResponseOrder>;
};
```

</details>

<details>

<summary>Класс WebLarekApi</summary>

```ts
class WebLarekApi extends Api implements IWebLarekApi {

  readonly baseUrl: string;
  protected options: RequestInit;

  constructor(baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
  };

  getCatalog(): Promise<IResponseProducts> {
    return this.get<IResponseProducts>('/product');
  };

  getProduct(id: string): Promise<IProduct> {
    return this.get<IProduct>(`/product/${id}`);
  };

  setOrder(data: IOrder): Promise<IResponseOrder> {
    return this.post<IResponseOrder>('/order', data, "POST");
  };
};
```
</details>

***

**IWebLarekModel** и **WebLarekModel** отвечают за работу с данными приложения. Класс **WebLarekModel** имеет следующие методы:
+ **set products(data: IProduct[])** - позволяет записать массив обьектов, которые соответствуют интерфейсу **IProduct** в поле класса **_products**.

+ **get products()** - позволяет получить массив обьектов, которые соответствуют интерфейсу **IProduct** из поля класса **_products**.

+ **get basket()** - позволяет получить массив обьектов, которые соответствуют интерфейсу **IProduct** из поля класса **_basket**.

+ **getItem(id: string): IProduct** - позволяет получить обьект по ID который соответствуюет интерфейсу **IProduct** из поля класса **_products**.

+ **addToBasket(id: string): void** - позволяет добавить товар по ID в корзину **_basket,**.

+ **deleteFromBasket(id: string): void** - позволяет по ID удалить товар из корзины.

+ **addToItemOrder(): void** - позвляет добавить все ID товаров в коризне в поле класса **_order.items** для заказа.

+ **setTotalPrice(): number** - позволяет получить итоговую сумму товаров в корзине.

+ **setTotalPriceOder(): void** - позволяет записать в поле класса **_order.total** итоговую сумму товаров в корзине для формирования заказа.

+ **getTotalPriceOder(): number** - позволяет получить итоговую сумму товаров из поля класса **_order.total**.

+ **getSizeBasket(): number** - позволяет получить количество товаров в корзине.

+ **clearBasket(): void** - позволяет полностью очистить корзину после успешного заказа.

+ **clearOrder(): void** - позволяет полностью очистить поле класса **_order** после успешного заказа.

<details>

<summary>Интерфейс IWebLarekModel</summary>

```ts
interface IWebLarekModel {
  products: IProduct[];
  getItem(id: string): IProduct;
  addToBasket(id: string): void;
  deleteFromBasket(id: string): void;
  addToItemOrder(): void;
  getSizeBasket(): number;
  setTotalPrice(): number;
  setTotalPriceOder(): void;
  getTotalPriceOder(): number
  clearBasket(): void;
  clearOrder(): void;
};
```

</details>

<details>

<summary>Класс WebLarekModel</summary>

```ts
class WebLarekModel implements IWebLarekModel {

  protected _products: IProduct[] = [];
  protected _basket: IProduct[] = [];
  protected _order: IOrder = {
    payment: '',
    email: '',
    phone: '',
    address: '',
    total: 0,
    items: [],
  };

  set products(data: IProduct[]) {
    this._products = data;
  };

  get products() {
    return this._products;
  };

  get basket() {
    return this._basket;
  };

  getItem(id: string): IProduct {
    return this._products.find(item => item.id === id);
  };

  addToBasket(id: string): void {
    const item = this.getItem(id);
    this._basket.push(item);
  };

  deleteFromBasket(id: string): void {
    this._basket = this._basket.filter(item => item.id !== id);
  };

  addToItemOrder(): void {
    const productsIdList = this._basket.map(item => item.id);
    this._order.items = productsIdList;
  };

  setTotalPrice(): number {
    const priceList = this._basket.map(item => item.price);
    return priceList.reduce((sum, price) => sum + price, 0);
  };

  setTotalPriceOder(): void {
    this._order.total = this.setTotalPrice();
  };

  getTotalPriceOder(): number {
    return this._order.total;
  };

  getSizeBasket(): number {
    return this._basket.length;
  };

  clearBasket(): void {
    this._basket = [];
  };

  clearOrder(): void {
    this._order = {
      payment: '',
      email: '',
      phone: '',
      address: '',
      total: 0,
      items: [],
    };
  };
};
```

</details>

***

## Интерфейсы и классы которые отвечают за **Представление (VIEW)**

Класс **Page** расширяется базовым классом **Component** и отвечает за отображение контента на главной странице: карточек товара, счетчика количества товаров в корзине и вешает слушатель клика на икноку корзины.    
Конструктор класса принимает: **container: HTMLElement** - контейнер в котором будет отображаться контент и принимает **event: IEvents** - брокер событий.     
Имеет следующие методы:
+ **set catalog(items: HTMLElement[])** - устанавливает в контейнер массив HTML-элементов, служит для вывода карточек на страницу.
+ **set counter(value: number)** - устанавливает счетчик количества товаров в корзине.

<details>

<summary>Интерфейс IPage</summary>

```ts
interface IPage {
  catalog: HTMLElement[];
  counter: number;
};
```

</details>

<details>

<summary>Класс Page</summary>

```ts
class Page extends Component<IPage> implements IPage {

  protected basketElement: HTMLButtonElement;
  protected basketCounter: HTMLElement;
  protected galleryElement: HTMLElement;


  constructor(protected container: HTMLElement, protected event: IEvents) {
    super(container);

    this.basketElement = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this.basketCounter = ensureElement('.header__basket-counter', this.container);
    this.galleryElement = ensureElement('.gallery', this.container);

    this.basketElement.addEventListener('click', () => {});
  };

  set catalog(items: HTMLElement[]) {
    this.galleryElement.replaceChildren(...items);
  };

  set counter(value: number) {
    this.setText(this.basketCounter, value);
  };
};
```

</details>

***

Класс **Card** расширяется базовым классом **Component** и отвечает за отображение элемента карточки товара. Конструктор класса принимает: **container: HTMLElement** - шаблон карточки, который полняется данными карточки, которая приходит с сервера.   
Имеет следующие методы:
+ **set id(value: string)** - записывает в поле класса **_id** ID карточки.
+ **get id()** - позволяет получить ID конкретной карточки товара.
+ **set category(value: TCategory)** - отвечает за отображение категории продукта каждой карточки товара на странице и меняет класс стилей в зависимости от содежимого. 
+ **set title(value: string)** - отвечает за отображение названия продукта каждой карточки товара на странице.
+ **set image(value: string)** - отвечет за отображение картинки продукта карточки товара.
+ **set price(value: number | null)** - отвечает за отображение цены товара в каждой карточке. Если цена равна null тогда отображает стоимость как 'Бесценно'.


<details>

<summary>Интерфейс ICard расширяет интерфейс IProduct</summary>

```ts
interface ICard extends IProduct {
  index?: number;
};
```

</details>

<details>

<summary>Класс Card</summary>

```ts
class Card extends Component<ICard> {

  protected categoryElement: HTMLElement;
  protected titleElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected priceElement: HTMLElement;
  protected _id: string;
  protected _title: string;

  constructor(protected container: HTMLElement, protected cdn: string) {
    super(container);

    this.categoryElement = ensureElement('.card__category', this.container);
    this.titleElement = ensureElement('.card__title', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.priceElement = ensureElement('.card__price', this.container);
  };

  set id(value: string) {
    this._id = value;
  };

  get id() {
    return this._id;
  };

  set category(value: TCategory) {
    this.setText(this.categoryElement, value);
    this.categoryElement.classList.add(`card__category_${CategoryClassName[value]}`)
  };

  set title(value: string) {
    this.setText(this.titleElement, value);
    this._title = value;
  };

  set image(value: string) {
    this.setImage(this.imageElement, this.cdn + value, `${this._title}`);
  };

  set price(value: number | null) {
    if (value === null) {
      this.setText(this.priceElement, 'Бесценно');
    } else {
      this.setText(this.priceElement, `${value} синапсов`);
    };
  };
};
```

</details>

***

Класс **Basket** расширяется базовым классом **Component** и отвечает за отображение корзины. Конструктор класса принимает: **container: HTMLElement** - шаблон корзины.    
Имеет следующие методы:
+ **set items(items: HTMLElement[])** - устанавливает в контейнер массив HTML-элементов, служит для вывода карточек в корзине, если в корзине количество товаров равно нулю, тогда создает элемент с выводом текста 'Корзина пуста' и блокирует кнопку оформления заказа.
+ **set price(value: number)** - устанавливает итоговую сумму всех товаров в корзине.

<details>

<summary>Интерфейс IBasket</summary>

```ts
interface IBasket {
  items: HTMLElement[];
  price: number;
};
```

</details>

<details>

<summary>Класс Basket</summary>

```ts
class Basket extends Component<IBasket> implements IBasket {

  protected containerElement: HTMLUListElement;
  protected buttonElement: HTMLButtonElement;
  protected priceElement: HTMLElement;

  constructor(protected container: HTMLElement) {
    super(container);

    this.containerElement = ensureElement<HTMLUListElement>('.basket__list', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.priceElement = ensureElement('.basket__price', this.container);
  };

  set items(items: HTMLElement[]) {
    if (items.length) {
      this.containerElement.replaceChildren(...items);
      this.setDisabled(this.buttonElement, false);
    } else {
      this.setDisabled(this.buttonElement, true);
      this.containerElement.replaceChildren(createElement<HTMLParagraphElement>('p', {
         textContent: 'Корзина пуста'
      }));
    };
  };

  set price(value: number) {
    this.setText(this.priceElement, value);
  };
};
```

</details>

***

Класс **Modal** расширяется базовым классом **Component** и отвечает за отображение модального окна. Конструктор класса принимает: **container: HTMLElement** - шаблон модального окна.    
Имеет следующие методы:
+ **open()** - метод для открытия модального окна.
+ **close()** - метод для закрытия модального окна.
+ **set content** - устанавливает в контейнер HTML-элемент, служит для наполнения модального окна контентом, к примеру, корзиной.
+ **render(data: IModal)** - метод для рендера контента в модальном окне.

<details>

<summary>Интерфейс IModal</summary>

```ts
interface IModal {
  content: HTMLElement;
};
```

</details>

<details>

<summary>Класс Modal</summary>

```ts
class Modal extends Component<IModal> implements IModal {

  protected closeButtonElement: HTMLButtonElement;
  protected contentElement: HTMLElement;

  constructor(protected container: HTMLElement) {
    super(container);

    this.closeButtonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.contentElement = ensureElement('.modal__content', this.container);

    this.closeButtonElement.addEventListener('click', this.close);
    this.container.addEventListener('click', this.close);
    this.contentElement.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  };

  open = () => {
    this.container.classList.add('modal_active');
  };

  close = () => {
    this.container.classList.remove('modal_active');
  };

  set content(element: HTMLElement) {
    this.contentElement.replaceChildren(element);
  };

  render(data: IModal): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  };
};
```

</details>

***

Класс **Success** расширяется базовым классом **Component** и отвечает за отображение информации об успешном оформлении заказа. Конструктор класса принимает: **container: HTMLElement** - шаблон элемента.
Имеет метод:
+ **set description(value: string)** - метод для отображения итоговой списанной или к оплате при получении сумммы заказа.

<details>

<summary>Интерфейс ISuccess</summary>

```ts
interface ISuccess {
  description: number;
};
```

</details>

<details>

<summary>Класс Success</summary>

```ts
class Success extends Component<ISuccess> {

  protected desciptionElement: HTMLElement;
  protected successButton: HTMLButtonElement;

  constructor(protected container: HTMLElement) {
    super(container);

    this.desciptionElement = ensureElement('.order-success__description', this.container);
    this.successButton = ensureElement<HTMLButtonElement>('.button order-success__close', this.container);
  };

  set description(value: string) {
    this.setText(this.desciptionElement, `Списано ${value} синапсов`);
  };
};
```

</details>

***

Класс **Contacts** расширяется базовым классом **Form** и отвечает за отображение формы и инпутов с контактной информацией (телефона и электронной почты);

<details>

<summary>Интерфейс IOrderContacts</summary>

```ts
interface IOrderContacts {
  email: string;
  phone: string;
};
```

</details>

***

Класс **Order** расширяется базовым классом **Form** и отвечает за отображение формы и инпутов с данными о заказе (способ оплаты и адресс доставки);

<details>

<summary>Интерфейс IOrderData</summary>

```ts
interface IOrderData {
  payment: string;
  address: string;
};
```

</details>

***