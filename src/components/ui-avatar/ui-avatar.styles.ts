import { CSSResult, css } from 'lit-element';
import { textFont, hidden } from '../../theming/common';

export const styles = (): CSSResult => css`
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  ${hidden}

  .avatar {
    ${textFont};
    height: 2.625em;
    width: 2.625em;
    border-radius: 50%;
    overflow: hidden;
    _border: solid 1px var(--ui-avatar-border-color, var(--ui-avatar-outline-color, transparent)); /* TODO ugly rounded artifacts  */
    box-sizing: border-box;
    box-shadow: var(--ui-avatar-outline-color, transparent) 0 0 0 0.2rem;
    transform: translateY(-0.15rem); /* WTF align with button */
  }

  :host([textonly]) .avatar {
    --ui-avatar-image-visibility: hidden;
    --ui-avatar-text-display: block;
  }

  .avatar::before {
    display: var(--ui-avatar-text-display, none);
    content: var(--ui-avatar-initials);
    line-height: 2.625em;
    text-align: center;
    letter-spacing: -0.1em;
    font-weight: 700;
    cursor: default;
    color: var(--ui-avatar-text-color, white);
    background-color: var(--ui-avatar-background-color, transparent);
  }

  ::slotted(img),
  ::slotted(svg) {
    height: 2.625rem;
    width: 2.625rem;
    visibility: var(--ui-avatar-image-visibility, visible);
  }
`;
