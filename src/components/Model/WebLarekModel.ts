import { IOrder, IProduct } from "../../types";
import { Model } from "../base/Model";

export interface IWebLarekModel {

};

export class WebLarekModel extends Model<IWebLarekModel> {

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
};