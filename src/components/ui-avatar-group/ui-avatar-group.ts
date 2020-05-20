import { CSSResult, LitElement, TemplateResult, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';
import { backgroundColor } from '../../utils/backgroundColor';
import { styles } from './ui-avatar-group.styles';
import { UiAvatar } from '../ui-avatar/ui-avatar';

/**
 * Displays avatars grouped together.
 *
 * @slot default - Renders grouped avatars.
 */
export class UiAvatarGroup extends LitElement {
  static get styles(): CSSResult {
    return styles();
  }

  /**
   * List of group's avatars.
   * @readonly
   */
  @property({ reflect: false, type: Object })
  get avatars(): NodeListOf<UiAvatar> {
    return this.querySelectorAll<UiAvatar>('ui-avatar');
  }

  /**
   * Maximum avatars to display.
   */
  @property({ reflect: true, type: Number })
  show = 3;

  /**
   * Display avatar text initials only.
   */
  @property({ reflect: true, type: Boolean })
  textonly = false;

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
    const { avatars } = this;
    avatars.forEach((avatar: UiAvatar, index: number): void => {
      avatar.style.setProperty('z-index', `${avatars.length - index}`);
      if (index >= this.show) {
        avatar.setAttribute('hidden', '');
      } else {
        avatar.removeAttribute('hidden');
      }
    });
    return html`
      <span
        class="group"
        data-count=${ifDefined(
          avatars.length > this.show ? `+${avatars.length - this.show}` : undefined,
        )}
        style=${styleMap({ '--ui-avatar-outline-color': backgroundColor(this) })}
      >
        <slot></slot>
      </span>
    `;
  }
}
