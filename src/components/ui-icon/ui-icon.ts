import { CSSResult, LitElement, TemplateResult, html, property } from 'lit-element';
import { styles } from './ui-icon.styles';

/**
 * Icon allows to style / size SVG like text and use colored emoji font.
 *
 * @slot default - Renders icon.
 * @cssproperty [--ui-icon-stroke-color=currentColor] - Icon SVG stroke color.
 * @cssproperty [--ui-icon-fill-color=currentColor] - Icon SVG fill color.
 */
export class UiIcon extends LitElement {
  static get styles(): CSSResult {
    return styles();
  }

  /**
   * Hides the badge.
   */
  @property({ reflect: true, type: Boolean })
  hidden = false;

  /**
   * Set presentation default role.
   */
  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'presentation');
    }
  }

  /**
   * Render shadowDom content.
   */
  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
