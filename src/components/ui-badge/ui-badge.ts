import { CSSResult, LitElement, TemplateResult, html, property } from 'lit-element';
import { styles } from './ui-badge.styles';

/**
 * Badge displays small text tags that can be used anywhere, including inside &lt;ui-button&gt;.
 *
 * @slot default - Renders badge content.
 * @cssproperty [--ui-badge-background-color=lightgrey] Badge background color.
 * @cssproperty [--ui-badge-border-color=transparent] Badge border color.
 * @cssproperty [--ui-badge-text-color=black] Badge text color.
 */
export class UiBadge extends LitElement {
  static get styles(): CSSResult {
    return styles();
  }

  /**
   * Use predefined UI styles, that can be combined like classes:
   *
   * - `action`, `danger` or `valid` are (blue, red & green) colored button;
   * - `outline` have border only, until hovered;
   */
  @property({ reflect: true })
  theme?: string;

  /**
   * Hides the badge.
   */
  @property({ reflect: true, type: Boolean })
  hidden = false;

  /**
   * Render shadowDom content.
   */
  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
