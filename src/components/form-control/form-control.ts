import { LitElement, UpdatingElement, property } from 'lit-element';
import { attachInternals } from '../../utils/attachInternals';
import { overrideForm } from '../../utils/overrideForm';
import { dispatch } from '../../utils/dispatch';
import { noop } from '../../utils/noop';
import { on } from '../../utils/on';
import { callAll } from '../../utils/callAll';

/**
 * Wrap &lt;ui-button&gt; or any component that emit `formcontrol` event to behave like [native &lt;button&gt;](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button).
 */
export class FormControl extends LitElement {
  // force to observe form attribute
  static get observedAttributes(): string[] {
    const observedAttributes = Object.getOwnPropertyDescriptor(
      UpdatingElement,
      'observedAttributes',
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return ['form', ...observedAttributes!.get!.call(this)];
  }

  private internals: ElementInternals = attachInternals(this);

  private removeListeners: () => void = noop;

  /**
   * Defines the form data name when the associated form is submitted.
   */
  @property({ reflect: true })
  name?: string;

  /**
   * Defines the form data value when the associated form is submitted.
   */
  @property({ reflect: false })
  public get value(): FormValue {
    return this._value;
  }

  public set value(value: FormValue) {
    this._value = value;
    this.setValue(value);
  }

  private _value: FormValue = null;

  /**
   * Defines the default behavior for the associated form:
   * `submit` sent associated form data to server, *default behavior when no attibute*,
   * `reset` restore all associated form controls to their initial values.
   */
  @property({ reflect: true })
  type?: string = 'submit';

  /**
   * Associated form anywhere in the document by specifying it's *id*, it can override an ancestor form element.
   * @type {HTMLFormElement | null}
   * @readonly
   * @property
   */
  @property({ reflect: false, attribute: false })
  get form(): HTMLFormElement | null {
    return this.internals.form;
  }

  /**
   * Specifies URL where to send the form data when associated form is submitted. Only for type="submit".
   */
  @property({ reflect: true, attribute: 'formaction' })
  formAction?: string;

  /**
   * Specifies how form data should be encoded when associated form is submitted. Only for type="submit".
   * Possible values are `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.
   */
  @property({ reflect: true, attribute: 'formenctype' })
  formEnctype?: string;

  /**
   * Specifies which HTTP method to use to send the form data. Only for type="submit".
   * Possible values are `get` or `post`.
   */
  @property({ reflect: true, attribute: 'formmethod' })
  formMethod?: string;

  /**
   * Specifies that the form data should not be validated before submission. Only for type="submit".
   */
  @property({ reflect: true, type: Boolean, attribute: 'formnovalidate' })
  formNoValidate?: boolean = false;

  /**
   * Specifies where to display the response after submitting the form. Only for type="submit".
   * Possible values are `_blank`, `_self`, `_parent`, `_top` or a  *framename*.
   */
  @property({ reflect: true, attribute: 'formtarget' })
  formTarget?: string;

  /**
   * Get list of attached `label` elements.
   */
  get labels(): NodeListOf<HTMLLabelElement> {
    return this.internals.labels;
  }

  /**
   * Set attached form value.
   */
  private setValue = (value: FormValue = null): void => {
    this.internals.setFormValue(value);
  };

  /**
   * Set attached form data value and return reset value function.
   */
  private updateFormValue = (value: FormValue): (() => void) => {
    this.setValue(value);
    return (): void => this.setValue(this.value);
  };

  /**
   * No shadow DOM: behaviour component only.
   */
  protected createRenderRoot(): HTMLElement {
    return this;
  }

  /**
   * Emulate attached form & labels behaviour.
   */
  connectedCallback(): void {
    super.connectedCallback();
    this.setValue(this.value);
    const formcontrol = ((event: CustomEvent<FormValue>): void => {
      if (this.type === 'reset') {
        this.reset();
      } else {
        this.submit(event.detail);
      }
    }) as EventListener;
    const labels = Array.from(this.internals.labels);
    this.removeListeners = callAll(
      on('click', formcontrol, ...labels),
      on('formcontrol', formcontrol, this),
    );
  }

  /* support `onformcontrol` attribute & property ? */
  // try {
  //   const control =
  //     this.onformcontrol ||
  //     // eslint-disable-next-line no-new-func
  //     new Function(
  //       'event',
  //       `
  //       with(document) {
  //         with(this) {
  //           const listener = ${this.getAttribute('onformcontrol')};
  //           if(typeof listener === 'function') {
  //             return listener(event);
  //           }
  //           return eval("${this.getAttribute('onformcontrol')}");
  //         }
  //       }
  //       `,
  //     );
  //   if (event.cancelable && (control.call(this, event) === false || event.defaultPrevented)) {
  //     return;
  //   }
  // } catch(e) {}

  /**
   * Clean up form data & event listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.setValue();
    this.removeListeners();
  }

  /**
   * Update props and associated form data on attribute change.
   */
  attributeChangedCallback(name: string, oldval: string, newval: string): void {
    super.attributeChangedCallback(name, oldval, newval);
    if (name === 'form') {
      this.setValue(this.value);
    }
  }

  /**
   * Reset attached form.
   */
  reset(): void {
    this.internals.form?.reset();
  }

  /**
   * Submit attached form.
   */
  submit(value?: FormValue): void {
    const { form } = this.internals;
    if (form) {
      const restoreValue = value != null ? this.updateFormValue(value) : noop;
      const restoreForm = overrideForm(form, {
        action: this.formAction,
        enctype: this.formEnctype,
        method: this.formMethod,
        novalidate: this.formNoValidate,
        target: this.formTarget,
      });
      if (dispatch(form, 'submit')) {
        form.submit();
      }
      // restore form to previous state
      restoreValue();
      restoreForm();
    }
  }
}
