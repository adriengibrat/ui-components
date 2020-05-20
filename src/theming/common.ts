import { CSSResult, css, unsafeCSS } from 'lit-element';
import { HSLColor } from './hsl-color';

/* choose colors wisely https://aremycoloursaccessible.com */
export const colors = {
  action: new HSLColor(210, 80, 45),
  danger: new HSLColor(0, 50, 50),
  valid: new HSLColor(120, 50, 35),
  // grey: new HSLColor(210, 5, 55).transparent(50),
};

export const textFont: CSSResult = css`
  font-family: 'Segoe UI', 'Segoe UI Symbol', 'Droid Sans', 'Roboto', 'Ubuntu', 'Helvetica Neue',
    sans-serif;
`;

export const iconFont: CSSResult = css`
  font-family: 'Segoe UI', 'Droid Sans', 'Roboto', 'Ubuntu', 'Helvetica Neue', 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif;
`;

export const hidden: CSSResult = css`
  :host([hidden]) {
    display: none;
  }
`;

export const disabled = (selector?: string): CSSResult => {
  const targetSelector = selector ? unsafeCSS(` ${selector}`) : unsafeCSS('');
  return css`
    :host([disabled])${targetSelector} {
      opacity: 0.5;
      cursor: default;
      user-select: none;
    }
  `;
};
export const busy = (selector?: string): CSSResult => {
  const targetSelector = selector ? unsafeCSS(` ${selector}`) : unsafeCSS('');
  return css`
    :host([busy])${targetSelector} {
      cursor: progress;
      position: relative;
      display: inline-flex;
    }
    :host([busy])${targetSelector}::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 1em;
      height: 1em;
      border: 0.15rem solid currentColor;
      border-top-color: transparent;
      border-right-color: transparent;
      border-radius: 50%;
      opacity: 0.5;
      animation: 0.75s linear 0s infinite spin;
    }

    @keyframes spin {
      from {
        transform: translate(-50%, -50%);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      :host([busy])${targetSelector}::before {
        animation-duration: 1.5s;
        animation-iteration-count: 1;
      }
    }
  `;
};
