export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
};

export interface IResponseProducts {
  total: number;
  items: IProduct[];
};

export interface IResponseOrder {
  id: string;
  total: number;
};

export interface IOrderContacts {
  email: string;
  phone: string;
};

export interface IOrderData {
  payment: string;
  address: string;
};

export interface IOrder extends IOrderContacts, IOrderData {
  total: number;
  items: string[];
};

export interface IActions {
  onClick: () => void;
};