import { IActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface ISuccess {
  total: number;
};

export class Success extends Component<ISuccess> implements ISuccess {

  protected desciptionElement: HTMLElement;
  protected successButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected actions?: IActions) {
    super(container);

    this.desciptionElement = ensureElement('.order-success__description', this.container);
    this.successButton = ensureElement<HTMLButtonElement>('.button order-success__close', this.container);

    if (actions?.onClick) {
      this.successButton.addEventListener('click', actions.onClick);
    };
  };

  set total(value: number) {
    this.setText(this.desciptionElement, `Списано ${value} синапсов`);
  };
};