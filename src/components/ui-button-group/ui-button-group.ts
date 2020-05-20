import { CSSResult, LitElement, TemplateResult, html, property } from 'lit-element';
import { styles, buttonStyles } from './ui-button-group.styles';
import { UiButton } from '../ui-button/ui-button';

/**
 * Displays buttons grouped together.
 *
 * @slot default - Renders grouped buttons.
 */
export class UiButtonGroup extends LitElement {
  static buttonStyles: CSSResult = buttonStyles;

  static styles: CSSResult = styles;

  /**
   * Node list of children ui-buttons.
   */
  get buttons(): NodeListOf<UiButton> {
    return this.querySelectorAll('ui-button');
  }

  /**
   * Prevents interaction: the buttons cannot be pressed or focused, but displays an animated UI.
   */
  @property({ reflect: true, type: Boolean })
  busy = false;

  /**
   * Prevents interaction : the buttons cannot be pressed or focused, and displays a dimmed UI.
   */
  @property({ reflect: true, type: Boolean })
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: boolean) {
    const oldValue = this.disabled;
    this._disabled = disabled;
    this.buttons.forEach(button => {
      // eslint-disable-next-line no-param-reassign
      button.disabled = disabled;
    });
    this.requestUpdate('disabled', oldValue);
  }

  private _disabled = false;

  /**
   * Use predefined UI styles, that can be combined like classes:
   *
   * - `action`, `danger` or `valid` are (blue, red & green) colored button;
   * - `outline` have border only, until hovered and `ghost` are fully transparent button;
   * - `round` are rounded button;
   * - `small` have reduced padding;
   */
  @property({ reflect: true })
  theme?: string;

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
