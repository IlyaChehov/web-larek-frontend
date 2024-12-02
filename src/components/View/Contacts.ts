import { IOrderContacts } from "../../types";
import { IEvents } from "../base/events";
import { Form } from "../base/Form";

export class Contacts extends Form<IOrderContacts> implements IOrderContacts {

  constructor(protected container: HTMLFormElement, protected event: IEvents) {
    super(container, event);
  };

  set email(value: string) {
    const inputEmailElement = this.container.elements.namedItem('email') as HTMLInputElement;
    inputEmailElement.value = value;
  };

  set phone(value: string) {
    const inputPhoneElement = this.container.elements.namedItem('phone') as HTMLInputElement;
    inputPhoneElement.value = value;
  };
};