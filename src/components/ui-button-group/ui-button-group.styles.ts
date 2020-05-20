import { CSSResult, css, unsafeCSS } from 'lit-element';
import { busy } from '../../theming/common';
import { buttonThemes } from '../ui-button/ui-button.styles';

const rtlRadius = (selector: string): CSSResult => css`
  ${unsafeCSS(selector)} {
    border-top-right-radius: var(--ui-button-border-start-radius, var(--radius));
    border-top-left-radius: var(--ui-button-border-end-radius, var(--radius));
    border-bottom-right-radius: var(--ui-button-border-start-radius, var(--radius));
    border-bottom-left-radius: var(--ui-button-border-end-radius, var(--radius));
  }
`;

const rtlBorder = (selector: string): CSSResult => css`
  ${unsafeCSS(selector)} {
    border-right-width: var(--ui-button-border-start-width, var(--border-width));
    border-left-width: var(--ui-button-border-end-width, var(--border-width));
  }
`;

export const buttonStyles: CSSResult = css`
  /* ui-button-group rtl direction compatible
  see https://developer.mozilla.org/en-US/docs/Web/CSS/border-start-start-radius
  and https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-width */
  button {
    border-start-start-radius: var(--ui-button-border-start-radius, var(--radius));
    border-start-end-radius: var(--ui-button-border-end-radius, var(--radius));
    border-end-start-radius: var(--ui-button-border-start-radius, var(--radius));
    border-end-end-radius: var(--ui-button-border-end-radius, var(--radius));
    border-inline-start-width: var(--ui-button-border-start-width, var(--border-width));
    border-inline-end-width: var(--ui-button-border-end-width, var(--border-width));
  }

  /* ui-button-group fallbacks */
  @supports not (border-inline-start-width: 1px) {
    ${rtlBorder('button:dir(rtl)')}
    ${rtlBorder(':host([dir=rtl]) button')}
    ${rtlBorder(':host-context([dir=rtl]) button')}
    button {
      border-left-width: var(--ui-button-border-start-width, var(--border-width));
      border-right-width: var(--ui-button-border-end-width, var(--border-width));
    }
  }
  @supports not (border-start-start-radius: 0.25rem) {
    ${rtlRadius('button:dir(rtl)')}
    ${rtlRadius(':host([dir=rtl]) button')}
    ${rtlRadius(':host-context([dir=rtl]) button')}
    button {
      border-top-left-radius: var(--ui-button-border-start-radius, var(--radius));
      border-top-right-radius: var(--ui-button-border-end-radius, var(--radius));
      border-bottom-left-radius: var(--ui-button-border-start-radius, var(--radius));
      border-bottom-right-radius: var(--ui-button-border-end-radius, var(--radius));
    }
  }
`;

export const styles: CSSResult = css`
  :host {
    display: inline-flex;
  }

  ::slotted(ui-button:first-of-type:not(:only-of-type)) {
    --ui-button-border-end-radius: 0;
    --ui-button-border-end-width: 0;
  }

  ::slotted(ui-button:last-of-type:not(:only-of-type)) {
    --ui-button-border-start-radius: 0;
    --ui-button-border-start-width: 0;
  }

  ::slotted(ui-button:not(:first-of-type):not(:last-of-type)) {
    --ui-button-border-radius: 0;
    --ui-button-border-end-width: 0;
    --ui-button-border-start-width: 0;
  }

  ${buttonThemes('::slotted(ui-button)')}
  ${busy('slot')}
  :host([busy]) ::slotted(ui-button) {
    cursor: progress;
    pointer-events: none;
  }
`;
