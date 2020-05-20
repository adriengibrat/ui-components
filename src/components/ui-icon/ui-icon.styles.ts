import { CSSResult, css } from 'lit-element';
import { iconFont, hidden } from '../../theming/common';

export const styles = (): CSSResult => css`
  :host {
    ${iconFont}
  }

  ${hidden} ::slotted(svg) {
    height: 1em;
    width: 1em;
    vertical-align: baseline;
    stroke: var(--ui-icon-stroke-color, currentColor);
    fill: var(--ui-icon-fill-color, currentColor);
  }
`;
