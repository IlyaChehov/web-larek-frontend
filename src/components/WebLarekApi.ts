import { IOrder, IProduct, IResponseOrder, IResponseProducts } from "../types";
import { Api } from "./base/api";

export interface IWebLarekApi {
  getCatalog(): Promise<IResponseProducts>;
  getProduct(id: string): Promise<IProduct>;
  setOrder(data: IOrder): Promise<IResponseOrder>;
};

export class WebLarekApi extends Api implements IWebLarekApi {

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