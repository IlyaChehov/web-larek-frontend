import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IPage {
  catalog: HTMLElement[];
  counter: number;
};

export class Page extends Component<IPage> implements IPage {

  protected basketElement: HTMLButtonElement;
  protected basketCounter: HTMLElement;
  protected galleryElement: HTMLElement;
  protected wrapperElement: HTMLElement;

  constructor(protected container: HTMLElement, protected event: IEvents) {
    super(container);

    this.basketElement = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this.basketCounter = ensureElement('.header__basket-counter', this.container);
    this.galleryElement = ensureElement('.gallery', this.container);
    this.wrapperElement = ensureElement('.page__wrapper', this.container);

    this.basketElement.addEventListener('click', () => {
      this.event.emit('basket:open');
    });
  };

  set catalog(items: HTMLElement[]) {
    this.galleryElement.replaceChildren(...items);
  };

  set counter(value: number) {
    this.setText(this.basketCounter, value);
  };

  set locked(value: boolean) {
    this.toggleClass(this.wrapperElement, 'page__wrapper_locked', value);
  };
};