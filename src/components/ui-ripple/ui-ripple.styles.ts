import { CSSResult, css } from 'lit-element';

export const styles = (): CSSResult => css`
  :host,
  div {
    border-radius: inherit;
  }

  div {
    display: block;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle at var(--ui-ripple-x, 50%) var(--ui-ripple-y, 50%),
      var(--ui-ripple-color, currentColor) 10%,
      transparent 10%
    );
    background-position: var(--ui-ripple-x, 50%) var(--ui-ripple-y, 50%);
    background-repeat: no-repeat;
    background-size: 1000% 1000%;
    opacity: 0;
    transition: background-size var(--ui-ripple-duration, 0.5s),
      opacity calc(var(--ui-ripple-duration, 0.5s) * 2);
  }

  @media (prefers-reduced-motion: no-preference) {
    :host(:active) div {
      background-size: 0 0;
      opacity: var(--ui-ripple-opacity, 0.25);
      transition: 0s;
    }
  }
`;
