import { CSSResult, LitElement, TemplateResult, html, property } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { color } from '../../utils/color';
import { initials } from '../../utils/initials';
import { on } from '../../utils/on';
import { styles } from './ui-avatar.styles';

/**
 * Avatar displays user picture or initials.
 *
 * @slot default - Renders avatar.
 * @cssproperty [--ui-avatar-image-visibility=visible] Visibility of avatar image.
 * @cssproperty [--ui-avatar-text-color=white] Avatar text color.
 * @cssproperty [--ui-avatar-outline-color=transparent] Avatar outline color.
 */
export class UiAvatar extends LitElement {
  static get styles(): CSSResult {
    return styles();
  }

  /**
   * Avatar's user name, defaults to text content or child image `alt`.
   * @default ?
   */
  @property({ reflect: false })
  user: string =
    this.textContent?.trim() || this.querySelector('[alt]')?.getAttribute('alt') || '?';

  /**
   * Display text initials only.
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  textonly = !this.querySelector('img,svg');

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'presentation');
    }
    const img = this.querySelector('img');
    if (img) {
      on(
        'error',
        () => {
          this.textonly = true;
        },
        img,
      );
    }
  }

  /**
   * Render shadowDom content.
   */
  render(): TemplateResult {
    return html`
      <div
        class="avatar"
        title=${this.user}
        style=${styleMap({
          '--ui-avatar-background-color': color(this.user),
          '--ui-avatar-initials': `"${initials(this.user)}"`,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}
