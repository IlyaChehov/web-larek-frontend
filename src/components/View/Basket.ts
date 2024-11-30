import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface IBasket {
  items: HTMLElement[];
  price: number;
  selected: string[];
};

export class Basket extends Component<IBasket> implements IBasket {

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
    } else {
      this.containerElement.replaceChildren(createElement<HTMLParagraphElement>('p', {
         textContent: 'Корзина пуста'
      }));
    };
  };

  set price(value: number) {
    this.setText(this.priceElement, value);
  };
  
  set selected(items: string[]) {
    if (items.length) {
      this.setDisabled(this.buttonElement, false);
    } else {
      this.setDisabled(this.buttonElement, true);
    };
  };
};