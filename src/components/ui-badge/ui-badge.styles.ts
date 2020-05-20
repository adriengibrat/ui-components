import { CSSResult, css } from 'lit-element';
import { textFont, colors, hidden } from '../../theming/common';

export const styles = (): CSSResult => css`
  :host {
    display: inline-block;
    ${textFont};
    padding: 0.1em 0.4em;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
    color: var(--ui-badge-text-color, black);
    background-color: var(--ui-badge-background-color, lightgrey);
    box-shadow: inset 0 0 0 1px var(--ui-badge-border-color, transparent);
  }
  ${hidden} :host([theme~='action']) {
    --ui-badge-text-color: white;
    --ui-badge-background-color: hsl(
      ${colors.action.hue},
      ${colors.action.saturation}%,
      ${colors.action.light}%
    );
  }

  :host([theme~='valid']) {
    --ui-badge-text-color: white;
    --ui-badge-background-color: hsl(
      ${colors.valid.hue},
      ${colors.valid.saturation}%,
      ${colors.valid.light}%
    );
  }

  :host([theme~='danger']) {
    --ui-badge-text-color: white;
    --ui-badge-background-color: hsl(
      ${colors.danger.hue},
      ${colors.danger.saturation}%,
      ${colors.danger.light}%
    );
  }

  :host([theme~='outline']) {
    --ui-badge-border-color: var(--ui-badge-background-color, currentColor);
    --ui-badge-text-color: var(--ui-badge-border-color);
    background-color: transparent !important;
  }
`;
