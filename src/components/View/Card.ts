import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ICard extends IProduct {};

type TCategory = 'софт-скил' 
| 'другое' 
| 'дополнительное' 
| 'кнопка' 
| 'хард-скил';

const CategoryClassName: Record<TCategory, string> = {
  'софт-скил': 'soft',
  'другое': 'other',
  'дополнительное': 'additional',
  'кнопка': 'button',
  'хард-скил': 'hard',
};

export class Card extends Component<ICard> {

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