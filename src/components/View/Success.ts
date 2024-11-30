import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface ISuccess {
  description: number;
};

export class Success extends Component<ISuccess> {

  protected desciptionElement: HTMLElement;
  protected successButton: HTMLButtonElement;

  constructor(protected container: HTMLElement) {
    super(container);

    this.desciptionElement = ensureElement('.order-success__description', this.container);
    this.successButton = ensureElement<HTMLButtonElement>('.button order-success__close', this.container);
  };

  set description(value: string) {
    this.setText(this.desciptionElement, `Списано ${value} синапсов`);
  };
};