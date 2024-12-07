import { IOrderData} from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "../base/Form";

export type TPaymentMethod = 'card' | 'cash';

export class Order extends Form<IOrderData> implements IOrderData {
  protected cardButtonElement: HTMLButtonElement;
  protected cashButtonElement: HTMLButtonElement;
  protected submitButtonElemnt: HTMLButtonElement;

  constructor(protected container: HTMLFormElement, protected event: IEvents) {
    super(container, event);

    this.cardButtonElement = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.cashButtonElement = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.submitButtonElemnt = ensureElement<HTMLButtonElement>('.order__button', this.container);
    
    this.cardButtonElement.addEventListener('click', () => {
      this.payment = 'card';
      event.emit('payment:change', this.cardButtonElement)
    });

    this.cashButtonElement.addEventListener('click', () => {
      this.payment = 'cash';
      event.emit('payment:change', this.cashButtonElement)
    });

    this.submitButtonElemnt.addEventListener
  };

  set payment(value: TPaymentMethod) {
    this.toggleClass(this.cardButtonElement, 'button_alt-active', value === 'card');
    this.toggleClass(this.cashButtonElement, 'button_alt-active', value === 'cash');
  };

  set address(value: string) {
    const adressInputElement = this.container.elements.namedItem('address') as HTMLInputElement;
    adressInputElement.value = value;
  };
};