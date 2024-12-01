import { IOrderData } from "../../types";
import { Form } from "./Form";

interface IOrder {

};

export class Order extends Form<IOrderData> implements IOrder {

};