type FormAttributes = {
  action?: string;
  enctype?: string;
  method?: string;
  novalidate?: boolean;
  target?: string;
};

type RestoreFormAttributes = () => void;

const setFormAttributes = (form: HTMLFormElement, attributes: FormAttributes): void => {
  Object.entries(attributes).forEach(([key, value]) =>
    value ? form.setAttribute(key, value === true ? '' : value) : form.removeAttribute(key),
  );
};

const filter = (
  attributes: FormAttributes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  predicate = ([_key, value]: [string, string | boolean | undefined]): boolean => !!value,
): FormAttributes => Object.fromEntries(Object.entries(attributes).filter(predicate));

const getFormAttributes = (form: HTMLFormElement, keys: string[]): FormAttributes =>
  Object.fromEntries(
    keys.map((key: string) => [
      key,
      key === 'novalidate' ? form.hasAttribute(key) : form.getAttribute(key),
    ]),
  );

export const overrideForm = (
  form: HTMLFormElement,
  attributes: FormAttributes,
): RestoreFormAttributes => {
  const defined = filter(attributes);
  const initialValues = getFormAttributes(form, Object.keys(defined));
  setFormAttributes(form, defined);
  return (): void => setFormAttributes(form, initialValues);
};
