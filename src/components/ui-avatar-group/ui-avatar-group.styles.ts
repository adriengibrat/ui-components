import { CSSResult, css } from 'lit-element';
import { textFont, hidden } from '../../theming/common';

export const styles = (): CSSResult => css`
  ${hidden} :host([textonly]) {
    --ui-avatar-image-visibility: hidden;
    --ui-avatar-text-display: block;
  }

  .group::after {
    ${textFont};
    content: attr(data-count);
    font-size: 1rem;
    white-space: nowrap;
  }

  ::slotted(ui-avatar:not(:first-of-type)) {
    margin-left: -1em;
  }

  ::slotted(ui-avatar) {
    position: relative;
  }
`;
