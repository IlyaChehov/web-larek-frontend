import { IActions, IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ICard extends IProduct {
  index?: number;
};

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
  protected descriptionElement: HTMLElement;
  protected buttonElement?: HTMLButtonElement;
  protected indexElement?: HTMLElement;
  
  protected _title: string;

  constructor(protected container: HTMLElement, protected actions?: IActions, protected cdn?: string) {
    super(container);

    this.categoryElement = this.container.querySelector('.card__category');
    this.titleElement = this.container.querySelector('.card__title');
    this.imageElement = this.container.querySelector('.card__image');
    this.priceElement = ensureElement('.card__price', this.container);
    this.descriptionElement = this.container.querySelector('.card__text');
    this.buttonElement = this.container.querySelector('.card__button');
    this.indexElement = this.container.querySelector('.basket__item-index');
    
    if (actions?.onClick) {
      if (this.buttonElement) {
        this.buttonElement.addEventListener('click', () => actions.onClick())
      } else {
        this.container.addEventListener('click', () => actions.onClick())
      };
    };
  };

  set category(value: TCategory) {
    if (this.categoryElement) {
      this.setText(this.categoryElement, value);
      this.categoryElement.classList.add(`card__category_${CategoryClassName[value]}`)
    };
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
      if (this.buttonElement) {
        this.setDisabled(this.buttonElement, true);
        this.setText(this.buttonElement, 'Бесценно');
      };
    } else {
      this.setText(this.priceElement, `${value} синапсов`);
    };
  };

  set description(value: string) {
    this.setText(this.descriptionElement, value);
  };

  set index(value: number) {
    if (!this.indexElement) return;
    this.setText(this.indexElement, value + 1);
  };

  set button(value: string) {
    this.setText(this.buttonElement, value);
  };
};