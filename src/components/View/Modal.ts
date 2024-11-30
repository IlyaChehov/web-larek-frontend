import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface IModal {
  content: HTMLElement;
};

export class Modal extends Component<IModal> implements IModal {

  protected closeButtonElement: HTMLButtonElement;
  protected contentElement: HTMLElement;

  constructor(protected container: HTMLElement) {
    super(container);

    this.closeButtonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.contentElement = ensureElement('.modal__content', this.container);

    this.closeButtonElement.addEventListener('click', this.close);
    this.container.addEventListener('click', this.close);
    this.contentElement.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  };

  open = () => {
    this.container.classList.add('modal_active');
  };

  close = () => {
    this.container.classList.remove('modal_active');
  };

  set content(element: HTMLElement) {
    this.contentElement.replaceChildren(element);
  };

  render(data: IModal): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  };
};