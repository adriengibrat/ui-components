import { CSSResult, css, unsafeCSS } from 'lit-element';
import { textFont, busy, colors, disabled, hidden } from '../../theming/common';
import { HSLColor } from '../../theming/hsl-color';

const buttonTheme = (
  theme: string,
  selector: string,
  {
    background,
    border = background.darken().saturate(),
    focus = background.transparent(0.5),
  }: Record<string, HSLColor>,
): CSSResult => css`
  :host([theme~=${unsafeCSS(theme)}]) ${unsafeCSS(selector)} {
    --ui-button-text-color: white;
    --ui-button-border-color: hsl(${border.hue}, ${border.saturation}%, ${border.light}%);
    --ui-button-background-color: hsl(
      ${background.hue}, ${background.saturation}%, ${background.light}%);
    --ui-button-focus-color: hsla(
      ${focus.hue}, ${focus.saturation}%, ${focus.light}%, ${focus.alpha});
  }
`;

export const buttonThemes = (selector = 'button'): CSSResult => css`
  ${hidden}
  ${disabled(selector)}

  ${buttonTheme('action', selector, { background: colors.action })}
  ${buttonTheme('danger', selector, { background: colors.danger })}
  ${buttonTheme('valid', selector, { background: colors.valid })}

  :host([theme~=outline]) ${unsafeCSS(selector)} {
    --ui-button-text-color: var(--ui-button-border-color);
    --ui-button-background-color: transparent !important;
    --ui-badge-border-color: var(--ui-button-border-color);
    --ui-badge-background-color: transparent;
  }

  :host([theme~=round]) ${unsafeCSS(selector)} {
    --ui-button-border-radius: 100vh;
  }

  :host([theme~=small]) ${unsafeCSS(selector)} {
    --ui-button-padding: calc(0.75em * 0.75);
  }

  :host([theme~=ghost]) {
    --ui-button-text-color: var(--ui-button-border-color, currentColor);
  }

  :host([theme~=ghost]) ${unsafeCSS(selector)} {
    --ui-button-border-color: transparent !important;
    --ui-button-background-color: transparent !important;
  }
`;

export const styles = (injectedStyles: CSSResult): CSSResult => css`
  :host {
    display: inline-block;
  }

  button {
    ${textFont};
    font-size: inherit;
    line-height: 1em;
    width: 100%;
    cursor: pointer;
    color: var(--ui-button-text-color, inherit);
    background-color: var(--ui-button-background-color, transparent);
    box-sizing: border-box;
    padding: var(--ui-button-padding, 0.75em);
    --border-width: 1px;
    border: var(--border-width) solid var(--ui-button-border-color, currentColor);
    --radius: var(--ui-button-border-radius, 0.25rem);
    border-radius: var(--radius);

    /* ui-badge */

    --ui-badge-text-color: var(--ui-button-border-color);
    --ui-badge-background-color: var(--ui-button-text-color);
  }

  ${buttonThemes()}

  ${busy('button')}

  ${injectedStyles || css``}

  slot {
    border-radius: inherit; /* ripple radius */
  }

  @media (prefers-reduced-motion: no-preference) {
    button {
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    :host(:not([disabled])) button:hover:not(:active) {
      opacity: 0.9;
    }
  }

  ::slotted(span) {
    /* multi-lines span */
    display: inline-block;
    vertical-align: middle;
  }

  :host([theme~='push']) button {
    border-bottom-width: 4px;
  }
  :host([theme~='push'][active]) button:not([disabled]),
  :host([theme~='push']) button:not([disabled]):active {
    transform: translateY(3px);
    border-bottom-width: 1px;
    margin-bottom: 3px;
  }

  :host([theme~='dropdown']) button:after {
    content: ' ▾';
  }

  :host(:focus),
  button:focus {
    outline: transparent;
  }
  button::-moz-focus-inner {
    border: 0;
  }
  :host([active]) button,
  button:focus {
    box-shadow: 0 0 0 0.2rem var(--ui-button-focus-color, hsla(210, 5%, 55%, 50%));
  }
  :host(:focus) {
    z-index: 1;
  }
`;
