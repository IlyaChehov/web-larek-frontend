import { IBasket, IOrder, IOrderContacts, IOrderData, IProduct, TFormErrors } from "../../types";
import { Model } from "../base/Model";

interface IWebLarekModelData {
  _products: IProduct[];
  _basket: IBasket;
  _order: IOrder;
  formErrors: TFormErrors;
};

interface IWebLarekModel {
  products: IProduct[];
  getProduct(id: string): IProduct;
  addToBasket(item: IProduct): void;
  deleteFromBasket(item: IProduct): void;
  setOrder(): void;
  clearOrder(): void;
  getTotalBasket(): number;
  getTotalOrder(): number;
  inBasket(id: string): boolean;
  getSizeBasket(): number;
  setContactsField(field: keyof IOrderContacts, value: string): void;
  setOrderField(field: keyof IOrderData, value: string): void;
  validateOrderField(): boolean;
};

export class WebLarekModel extends Model<IWebLarekModelData> implements IWebLarekModel {

  protected _products: IProduct[] = [];
  protected _basket: IBasket = {
    items: [],
    total: 0,
  };
  protected _order: IOrder = {
    payment: '',
    email: '',
    phone: '',
    address: '',
    total: 0,
    items: [],
  };
  protected formErrors: TFormErrors = {};


  set products(data: IProduct[]) {
    this._products = data;
  };

  get products() {
    return this._products;
  };

  getProduct(id: string): IProduct {
    return this._products.find(item => item.id === id);
  };

  addToBasket(item: IProduct): void {
    const {id, price} = item;
    this._basket.items.push(id);
    this._basket.total += price;
  };

  deleteFromBasket(item: IProduct): void {
    this._basket.items.filter(id => id !== item.id);
    this._basket.total -= item.price;
  };

  setOrder(): void {
    this._order.total = this._basket.total;
    this._order.items = this._basket.items;
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
    this._basket = {
      items: [],
      total: 0,
    };
  };

  getTotalBasket(): number {
    return this._basket.total;
  };

  getTotalOrder(): number {
    return this._order.total;
  };

  inBasket(id: string): boolean {
    return this._basket.items.includes(id);
  };

  getSizeBasket(): number {
    return this._basket.items.length;
  };

  setContactsField(field: keyof IOrderContacts, value: string): void {
    this._order[field] = value;
  };

  setOrderField(field: keyof IOrderData, value: string): void {
    this._order[field] = value;

    if (this.validateOrderField()) {

    }
  };

  validateOrderField(): boolean {
    const errorMessage: typeof this.formErrors = {};
    if (!this._order.address) {
      errorMessage.address = 'Необходимо указать адрес';
    };
    if (!this._order.email) {
      errorMessage.email = 'Необходимо указать email';
    };
    if (!this._order.payment) {
      errorMessage.payment = 'Необходимо указать способ оплаты';
    };
    if (!this._order.phone) {
      errorMessage.phone = 'Необходимо указать телефон';
    };
    this.formErrors = errorMessage;
    return Object.keys(errorMessage).length === 0;
  };
};