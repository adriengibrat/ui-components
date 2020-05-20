const setFormData = (formData: FormData) => (value: string | File | null, key: string): void =>
  value != null ? formData.set(key, value) : formData.delete(key);

export const formValueHandler = (element: HTMLElement, value: FormValue) => (
  event: FormDataEvent,
): void => {
  const setData = setFormData(event.formData);
  if (value instanceof FormData) {
    value.forEach(setData);
  } else if (element.hasAttribute('name')) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setData(value, element.getAttribute('name')!);
  }
};
