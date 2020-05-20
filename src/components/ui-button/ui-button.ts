import { CSSResult, LitElement, TemplateResult, html, property } from 'lit-element';
import { styles } from './ui-button.styles';
import { getLabels } from '../../utils/getLabels';
import { noop } from '../../utils/noop';
import { on } from '../../utils/on';
import { callAll } from '../../utils/callAll';

/**
 * Buttons with a modern UI isolated from global style in a web component.
 *
 * @fires formcontrol - Custom event triggered on click to interact with parent &lt;form-control&gt; component.
 * `formcontrol` event is not dispatched when &lt;ui-button&gt; is `disabled`, `busy` nor when `click` event is canceled.
 * @csspart button - Reflects host state with customized style and aria attributes.
 * @slot default - Renders content inside shadow button.
 * @cssproperty [--ui-button-text-color=inherit] - Button text color.
 * @cssproperty [--ui-button-background-color=transparent] - Button background color.
 * @cssproperty [--ui-button-border-color=currentColor] - Button border color.
 * @cssproperty [--ui-button-focus-color=hsla(210, 5%, 55%, 50%)] - Button focus outline color.
 * @cssproperty [--ui-button-border-radius=0.25rem] - Button border radius.
 * @cssproperty [--ui-button-padding=0.75em] - Button padding.
 */
export class UiButton extends LitElement {
  static get styles(): CSSResult {
    return styles(customElements.get('ui-button-group')?.buttonStyles);
  }

  /**
   * Node list of attached labels.
   */
  get labels(): NodeListOf<HTMLLabelElement> {
    return getLabels(this);
  }

  /**
   * Displays (emulated) `:active` state.
   */
  @property({ reflect: true, type: Boolean })
  active = false;

  /**
   * Prevents interaction: the button cannot be pressed or focused, but displays an animated UI.
   */
  @property({ reflect: true, type: Boolean })
  busy = false;

  /**
   * Prevents interaction : the button cannot be pressed or focused, and displays a dimmed UI.
   */
  @property({ reflect: true, type: Boolean })
  disabled = false;

  /**
   * Hides the button.
   */
  @property({ reflect: true, type: Boolean })
  hidden = false;

  /**
   * Use predefined UI styles, that can be combined like classes:
   *
   * - `action`, `danger` or `valid` are (blue, red & green) colored button;
   * - `outline` have border only, until hovered and `ghost` are fully transparent button;
   * - `round` are rounded button;
   * - `small` have reduced padding;
   * - `push` are 3d push button;
   * - `dropdown` adds a dropdown arrow on button's end.
   */
  @property({ reflect: true })
  theme?: string;

  private removeListeners = noop;

  /**
   * Emulate the native autofocus attribute & attached labels behaviour.
   */
  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (this.hasAttribute('autofocus')) {
      this.focus();
    }
    let removeLabelListeners = noop;
    if (this.labels.length) {
      const labels = Array.from(this.labels);
      const activate = (): void => {
        this.active = true;
      };
      const deactivate = (): void => {
        this.active = false;
      };
      removeLabelListeners = callAll(
        on('mousedown', activate, ...labels),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        on('mouseup', deactivate, this.ownerDocument!),
        on('click', () => this.click(), ...labels),
      );
    }
    this.removeListeners = callAll(removeLabelListeners, on('click', this.handleClick, this));
  }

  /**
   * Clean up attached labels listeners.
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeListeners();
  }

  /**
   * Patch native click to dispatch formcontrol custom event.
   */
  click(): void {
    super.click();
    this.handleClick();
  }

  /**
   * Render shadowDom content.
   */
  render(): TemplateResult {
    return html`
      <button
        ?disabled="${this.busy || this.disabled}"
        aria-disabled="${this.disabled}"
        aria-busy="${this.busy}"
        aria-label="${this.textContent?.trim() || 'button'}"
      >
        <slot></slot>
      </button>
    `;
  }

  /**
   * Emulate the native focus behaviour.
   */
  protected createRenderRoot(): ShadowRoot {
    // eslint-disable-next-line wc/attach-shadow-constructor
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  /**
   * Dispatch formcontrol custom event on click.
   */
  private handleClick(event?: Event): void {
    if (!event?.defaultPrevented && !this.busy && !this.disabled) {
      this.dispatchEvent(
        new CustomEvent('formcontrol', {
          bubbles: true,
          composed: true,
          cancelable: true,
        }),
      );
    }
  }
}
