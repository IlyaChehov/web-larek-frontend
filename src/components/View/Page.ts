import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IPage {
  catalog: HTMLElement[];
  counter: number;
};

export class Page extends Component<IPage> implements IPage {

  protected basketElement: HTMLButtonElement;
  protected basketCounter: HTMLElement;
  protected galleryElement: HTMLElement;


  constructor(protected container: HTMLElement) {
    super(container);

    this.basketElement = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this.basketCounter = ensureElement('.header__basket-counter', this.container);
    this.galleryElement = ensureElement('.gallery', this.container);
  };

  set catalog(items: HTMLElement[]) {
    this.galleryElement.replaceChildren(...items);
  };

  set counter(value: number) {
    this.setText(this.basketCounter, value);
  };
};