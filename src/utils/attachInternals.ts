import { formValueHandler } from './formValueHandler';
import { getLabels } from './getLabels';
import { noop } from './noop';
import { on } from './on';

const valueStore = new WeakMap();
const validityStore = new WeakMap();

export const attachInternals = (element: HTMLElement): ElementInternals => ({
  get form(): HTMLFormElement | null {
    const id = element.getAttribute('form');
    // TODO: Explicitly document that IE will need https://github.com/jonathantneal/closest polyfill
    return (id && element.ownerDocument?.querySelector(`#${id}`)) || element.closest?.('form');
  },
  get labels(): NodeListOf<HTMLLabelElement> {
    return getLabels(element);
  },
  get validationMessage(): string {
    return validityStore.get(element)?.message || '';
  },
  get validity(): ValidityState {
    return validityStore.get(element)?.validity || new ValidityState();
  },
  get willValidate(): boolean {
    return true; // TODO
  },
  checkValidity(): boolean {
    return true; // TODO
  },
  reportValidity(): boolean {
    return true; // TODO
  },
  setFormValue(value: FormValue, state?: FormValue): void {
    valueStore.get(element)?.cleanup();
    if (value != null) {
      valueStore.set(element, {
        cleanup: this.form
          ? on('formdata', formValueHandler(element, value) as EventListener, this.form)
          : noop,
        state, // TODO restore state on reset, see https://web.dev/more-capable-form-controls/#restoring-form-state
      });
    }
  },
  setValidity(validity: ValidityState, message?: string, anchor?: HTMLElement): void {
    validityStore.set(element, { validity, message, anchor });
  },
});
