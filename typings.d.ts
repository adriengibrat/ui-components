import { FormControl } from './src/components/form-control/form-control';
import { UiAvatar } from './src/components/ui-avatar/ui-avatar';
import { UiAvatarGroup } from './src/components/ui-avatar-group/ui-avatar-group';
import { UiBadge } from './src/components/ui-badge/ui-badge';
import { UiButtonGroup } from './src/components/ui-button-group/ui-button-group';
import { UiButton } from './src/components/ui-button/ui-button';
import { UiIcon } from './src/components/ui-icon/ui-icon';
import { UiRipple } from './src/components/ui-ripple/ui-ripple';

declare let FormDataEvent: {
  prototype: FormDataEvent;
  new (type: string, eventInitDict?: FormDataEventInit): FormDataEvent;
};

declare global {
  export interface FormDataEvent extends Event {
    formData: FormData;
  }
  interface FormDataEventInit extends EventInit {
    formData: FormData;
  }
  export type FormValue = File | string | FormData | null;
  // until https://github.com/microsoft/TSJS-lib-generator/pull/818 is not resolved...
  export interface ElementInternals {
    readonly form: HTMLFormElement | null;
    readonly labels: NodeListOf<HTMLLabelElement>;
    readonly validationMessage: string;
    readonly validity: ValidityState;
    readonly willValidate: boolean;
    checkValidity(): boolean;
    reportValidity(): boolean;
    setFormValue(value: FormValue, state?: FormValue): void;
    setValidity(flags: ValidityState, message?: string, anchor?: HTMLElement): void;
  }
  interface HTMLElementTagNameMap {
    'form-control': FormControl;
    'ui-avatar-group': UiAvatarGroup;
    'ui-avatar': UiAvatar;
    'ui-badge': UiBadge;
    'ui-button': UiButton;
    'ui-button-group': UiButtonGroup;
    'ui-icon': UiIcon;
    'ui-ripple': UiRipple;
  }
}

// declare module "*.json" {
//   declare var value: any;
//   export default value;
// }
