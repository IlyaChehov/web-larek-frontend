import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "../base/Component";

export interface ISuccess {
  total: number;
};

export class Success extends Component<ISuccess> implements ISuccess {

  protected desciptionElement: HTMLElement;
  protected successButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected event: IEvents) {
    super(container);

    this.desciptionElement = ensureElement('.order-success__description', this.container);
    this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this.successButton.addEventListener('click', () => {
      event.emit('success:closed');
    });
  };

  set total(value: number) {
    this.setText(this.desciptionElement, `Списано ${value} синапсов`);
  };
};