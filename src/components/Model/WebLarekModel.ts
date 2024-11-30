import { IOrder, IProduct } from "../../types";

export interface IWebLarekModel {
  products: IProduct[];
  addToBasket(item: IProduct): void;
  deleteFromBasket(id: string): void;
  addToItemOrder(): void;
  getTotalPrice(): number;
  getSizeBasket(): number;
  setTotalPrice(price: number): void;
};

export class WebLarekModel implements IWebLarekModel {

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

  addToBasket(item: IProduct): void {
    this._basket.push(item);
  };

  deleteFromBasket(id: string): void {
    this._basket = this._basket.filter(item => item.id !== id);
  };

  addToItemOrder(): void {
    const productsIdList = this._basket.map(item => item.id);
    this._order.items = productsIdList;
  };

  getTotalPrice(): number {
    const priceList = this._basket.map(item => item.price);
    return priceList.reduce((sum, price) => sum + price, 0);
  };

  setTotalPrice(price: number) {
    this._order.total = price;
  };

  getSizeBasket(): number {
    return this._basket.length;
  };
};