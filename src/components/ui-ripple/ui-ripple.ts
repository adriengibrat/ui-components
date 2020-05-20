import { CSSResult, LitElement, TemplateResult, html, property } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { on } from '../../utils/on';
import { styles } from './ui-ripple.styles';

/**
 * Ripple animation played on parent element click.
 *
 * @cssproperty [--ui-ripple-color=currentColor] - Ripple effect color.
 * @cssproperty [--ui-ripple-opacity=0.25] - Ripple effect opacity.
 * @cssproperty [--ui-ripple-duration=0.5s] - Ripple effect duration.
 */
export class UiRipple extends LitElement {
  static get styles(): CSSResult {
    return styles();
  }

  /**
   * Display ripple over offsetParent element, instead of direct parent.
   */
  @property({ type: Boolean })
  unbounded = false;

  /**
   * Ripple position & initial coordinates.
   */
  @property({ reflect: false, attribute: false, type: Object })
  private position = {
    x: 50,
    y: 50,
    height: 0,
    width: 0,
    left: 0,
    top: 0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (_event: MouseEvent): void => {
      /**/
    },
  };

  /**
   * Set presentation default role.
   */
  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'presentation');
    }
    setTimeout(() => this.init());
    on('click', ((event: MouseEvent) => this.position.update(event)) as EventListener, this);
  }

  private init(): void {
    const container = this.unbounded ? this.offsetParent : this.parentElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { x, y, height, width } = container!.getBoundingClientRect();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { x: offsetX, y: offsetY } = this.offsetParent!.getBoundingClientRect();
    const { marginTop, marginLeft } =
      this.offsetParent === this.ownerDocument?.body
        ? getComputedStyle(this.offsetParent)
        : { marginTop: '0', marginLeft: '0' };
    this.position = {
      ...this.position,
      height,
      width,
      left: x - offsetX + parseInt(marginLeft, 10),
      top: y - offsetY + parseInt(marginTop, 10),
      update: ({ clientX, clientY }: MouseEvent): void => {
        const _x = ((clientX + window.scrollX - x) / width) * 100;
        const _y = ((clientY + window.scrollY - y) / height) * 100;
        this.position = {
          ...this.position,
          x: _x >= 0 && _x <= 100 ? _x : 50,
          y: _y >= 0 && _y <= 100 ? _y : 50,
        };
      },
    };
  }

  /**
   * Render shadowDom content.
   */
  render(): TemplateResult {
    return html`
      <slot></slot>
      <div
        style=${styleMap({
          height: `${this.position.height}px`,
          width: `${this.position.width}px`,
          left: `${this.position.left}px`,
          top: `${this.position.top}px`,
          '--ui-ripple-x': `${this.position.x}%`,
          '--ui-ripple-y': `${this.position.y}%`,
        })}
      ></div>
    `;
  }
}
