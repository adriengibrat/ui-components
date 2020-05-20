import { expect, fixture, oneEvent, elementUpdated } from '@open-wc/testing';
import { trigger, mockEventListeners } from '../../utils/spec.helpers';
import { FormControl } from './form-control';

/* eslint-disable babel/no-unused-expressions, @typescript-eslint/no-non-null-assertion */

describe('form-control', () => {
  it('can be instanciated', async () => {
    const control = new FormControl();
    expect(control).instanceOf(HTMLElement);
    expect(control).instanceOf(FormControl);
    document.body.append(control);
    expect(document.querySelector('form-control')).dom.equalSnapshot();
  });

  it('can be created', async () => {
    const control = document.createElement('form-control');
    expect(control).instanceOf(HTMLElement);
    expect(control).instanceOf(FormControl);
    document.body.append(control);
    expect(document.querySelector('form-control')).dom.equalSnapshot();
  });

  it('has localName', async () => {
    const control = await fixture(`<form-control></form-control>`);
    expect(control).property('localName', 'form-control');
  });

  it('has no shadow DOM', async () => {
    const control = await fixture(`<form-control></form-control>`);
    expect(control).property('shadowRoot', null);
  });

  it('is attached to parent form', async () => {
    const noform = await fixture(`<form-control></form-control>`);
    expect(noform).property('form', null);

    const form = await fixture(`<form><form-control></form-control></form>`);
    const control = form.querySelector('form-control')!;
    expect(control).property('form', form);
    expect(form).dom.equalSnapshot();

    try {
      (control as { form: Element }).form = form;
    } catch (e) {
      expect(e).instanceOf(TypeError);
    }
  });

  it('can be attached to form by id', async () => {
    const noform = await fixture(`<form-control></form-control>`);
    expect(noform).property('form', null);

    const container = await fixture(
      `<div><form id="my-form"></form> <form-control form="my-form"></form-control></div>`,
    );
    const form = container.querySelector('form')!;
    const control = container.querySelector('form-control')!;
    expect(control).property('form', form);
    expect(container).dom.equalSnapshot();
  });

  it('is attached to form by id over parent', async () => {
    const container = await fixture(
      `<div><form id="my-form"></form> <form id="parent"><form-control form="my-form"></form-control></form></div>`,
    );
    const form = container.querySelector('form#my-form')!;
    const control = container.querySelector('form-control')!;
    expect(control).property('form', form);

    const parent = container.querySelector('form#parent')!;
    control.setAttribute('form', 'parent');
    expect(control).property('form', parent);
    control.removeAttribute('form');
    expect(control).property('form', parent);
    control.setAttribute('form', 'my-form');
    expect(control).property('form', form);

    expect(container).dom.equalSnapshot();
  });

  it('has submit type', async () => {
    const form = await fixture(
      `<form onsubmit="return false;"><form-control type="submit"></form-control></form>`,
    );
    const control = form.querySelector('form-control')!;
    expect(control).property('type', 'submit');
    setTimeout(() => trigger(control, 'formcontrol'));
    await oneEvent(form, 'submit');
    expect(form).dom.equalSnapshot();
  });

  it('has submit type by default', async () => {
    const form = await fixture(
      `<form onsubmit="return false;"><form-control></form-control></form>`,
    );
    const control = form.querySelector('form-control')!;
    expect(control).property('type', 'submit');
    control.removeAttribute('type');
    setTimeout(() => trigger(control, 'formcontrol'));
    await oneEvent(form, 'submit');
    expect(form).dom.equalSnapshot();
  });

  it('has submit method', async () => {
    const form = await fixture(
      `<form onsubmit="return false;"><form-control></form-control></form>`,
    );
    const control = form.querySelector('form-control')!;
    expect(control).property('submit').instanceOf(Function);
    setTimeout(() => control.submit());
    await oneEvent(form, 'submit');
    expect(form).dom.equalSnapshot();
  });

  it('can send data with submit method', async () => {
    const form = await fixture(
      `<form action="javascript:void 0"><form-control></form-control></form>`,
    );
    const control = form.querySelector('form-control')!;
    const data = new FormData();
    data.append('data', 'value');
    setTimeout(() => control.submit(data));
    const { formData } = ((await oneEvent(form, 'formdata')) as unknown) as FormDataEvent;
    expect(formData).instanceOf(FormData);
    expect(formData.get('data')).equals('value');
  });

  it('can send value with submit method', async () => {
    const form = await fixture(
      `<form action="javascript:void 0"><form-control name="name"></form-control></form>`,
    );
    const control = form.querySelector('form-control')!;
    setTimeout(() => control.submit('value'));
    const { formData } = ((await oneEvent(form, 'formdata')) as unknown) as FormDataEvent;
    expect(formData).instanceOf(FormData);
    expect(formData.get('name')).equals('value');
  });

  it('has reset type', async () => {
    const form = await fixture(`<form><form-control type="reset"></form-control></form>`);
    const control = form.querySelector('form-control')!;
    expect(control).property('type', 'reset');
    setTimeout(() => trigger(control, 'formcontrol'));
    await oneEvent(form, 'reset');
    expect(form).dom.equalSnapshot();
  });

  it('has reset method', async () => {
    const form = await fixture(`<form><form-control></form-control></form>`);
    const control = form.querySelector('form-control')!;
    expect(control).property('reset').instanceOf(Function);
    setTimeout(() => control.reset());
    await oneEvent(form, 'reset');
    expect(form).dom.equalSnapshot();
  });

  it('has name and value attributes', async () => {
    const form = await fixture(
      `<form action="javascript:void 0"><form-control name="name" value="value"></form-control></form>`,
    );
    const control = form.querySelector('form-control')!;
    expect(control).property('name', 'name');
    expect(control).property('value', 'value');
    setTimeout(() => control.submit());
    const { target, formData } = ((await oneEvent(form, 'formdata')) as unknown) as FormDataEvent;
    expect(target).equals(form);
    expect(formData).instanceOf(FormData);
    expect(formData.get('name')).equals('value');
    expect(form).dom.equalSnapshot();
  });

  it('accepts File value property', async () => {
    const form = await fixture(
      `<form action="javascript:void 0"><form-control name="file"></form-control></form>`,
    );
    const control = form.querySelector('form-control')!;
    control.value = new File([], 'empty.txt');
    await elementUpdated(control);
    expect(control.hasAttribute('value')).equals(false);
    setTimeout(() => control.submit());
    const { target, formData } = ((await oneEvent(form, 'formdata')) as unknown) as FormDataEvent;
    expect(target).equals(form);
    expect(formData).instanceOf(FormData);
    expect(formData.get('file')).instanceOf(File);
    expect(formData.get('file')).equals(control.value);
    expect(form).dom.equalSnapshot();
  });

  it('accepts FormData value property', async () => {
    const form = await fixture(
      `<form action="javascript:void 0"><form-control></form-control></form>`,
    );
    const control = form.querySelector('form-control')!;
    control.value = new FormData();
    control.value.append('name', 'value');
    await elementUpdated(control);
    expect(control.hasAttribute('value')).equals(false);
    setTimeout(() => control.submit());
    const { target, formData } = ((await oneEvent(form, 'formdata')) as unknown) as FormDataEvent;
    expect(target).equals(form);
    expect(formData).instanceOf(FormData);
    expect(formData.get('name')).equals('value');
    expect(form).dom.equalSnapshot();
  });

  it('has formaction attribute to override attached form action', async () => {
    // eslint-disable-next-line no-script-url
    const voidAction = 'javascript: void 0;';
    const form = await fixture<HTMLFormElement>(
      `<form><form-control formaction="${voidAction}"></form-control></form>`,
    );
    expect(form.hasAttribute('action')).equals(false);
    expect(form).property('action', document.location.toString());
    const control = form.querySelector('form-control')!;
    setTimeout(() => control.submit());
    const action: Record<string, string> = {};
    form.addEventListener('submit', () => {
      action.property = form.action;
      action.attribute = form.getAttribute('action')!;
    });
    await oneEvent(form, 'submit');
    expect(action.property).equals(voidAction);
    expect(action.attribute).equals(voidAction);
    expect(form.hasAttribute('action')).equals(false);
    expect(form).property('action', document.location.toString());
    expect(form).dom.equalSnapshot();
  });

  it('has formAction property', async () => {
    const control = await fixture<FormControl>(`<form-control></form-control>`);
    control.formAction = 'action';
    await elementUpdated(control);
    expect(control.getAttribute('formAction')).equals('action');
  });

  it('has formenctype attribute to override attached form encoding', async () => {
    const formenctype = 'multipart/form-data';
    const form = await fixture<HTMLFormElement>(
      `<form onsubmit="return false;"><form-control formenctype="${formenctype}"></form-control></form>`,
    );
    expect(form.hasAttribute('enctype')).equals(false);
    expect(form).property('enctype', 'application/x-www-form-urlencoded');
    const control = form.querySelector('form-control')!;
    setTimeout(() => control.submit());
    const encoding: Record<string, string> = {};
    form.addEventListener('submit', () => {
      encoding.property = form.enctype;
      encoding.attribute = form.getAttribute('enctype')!;
    });
    await oneEvent(form, 'submit');
    expect(encoding.property).equals(formenctype);
    expect(encoding.attribute).equals(formenctype);
    expect(form.hasAttribute('enctype')).equals(false);
    expect(form).property('enctype', 'application/x-www-form-urlencoded');
    expect(form).dom.equalSnapshot();
  });

  it('has formEnctype property', async () => {
    const control = await fixture<FormControl>(`<form-control></form-control>`);
    control.formEnctype = 'text/plain';
    await elementUpdated(control);
    expect(control.getAttribute('formenctype')).equals('text/plain');
  });

  it('has formmethod attribute to override attached form method', async () => {
    const formmethod = 'post';
    const form = await fixture<HTMLFormElement>(
      `<form onsubmit="return false;"><form-control formmethod="${formmethod}"></form-control></form>`,
    );
    expect(form.hasAttribute('method')).equals(false);
    expect(form).property('method', 'get');
    const control = form.querySelector('form-control')!;
    setTimeout(() => control.submit());
    const method: Record<string, string> = {};
    form.addEventListener('submit', () => {
      method.property = form.method;
      method.attribute = form.getAttribute('method')!;
    });
    await oneEvent(form, 'submit');
    expect(method.property).equals(formmethod);
    expect(method.attribute).equals(formmethod);
    expect(form.hasAttribute('method')).equals(false);
    expect(form).property('method', 'get');
    expect(form).dom.equalSnapshot();
  });

  it('has formEnctype property', async () => {
    const control = await fixture<FormControl>(`<form-control></form-control>`);
    control.formEnctype = 'post';
    await elementUpdated(control);
    expect(control.getAttribute('formenctype')).equals('post');
  });

  it('has formnovalidate attribute to override attached form novalidate', async () => {
    const form = await fixture<HTMLFormElement>(
      `<form onsubmit="return false;"><form-control formnovalidate></form-control></form>`,
    );
    expect(form.hasAttribute('novalidate')).equals(false);
    expect(form).property('noValidate', false);
    const control = form.querySelector('form-control')!;
    setTimeout(() => control.submit());
    const novalidate: Record<string, boolean> = {};
    form.addEventListener('submit', () => {
      novalidate.property = form.noValidate;
      novalidate.attribute = form.hasAttribute('novalidate')!;
    });
    await oneEvent(form, 'submit');
    expect(novalidate.property).equals(true);
    expect(novalidate.attribute).equals(true);
    expect(form.hasAttribute('novalidate')).equals(false);
    expect(form).property('noValidate', false);
    expect(form).dom.equalSnapshot();
  });

  it('has formNoValidate property', async () => {
    const control = await fixture<FormControl>(`<form-control></form-control>`);
    control.formNoValidate = true;
    await elementUpdated(control);
    expect(control.hasAttribute('formnovalidate')).equals(true);
  });

  it('has formtarget attribute to override attached form target', async () => {
    const formtarget = '_blank';
    const form = await fixture<HTMLFormElement>(
      `<form onsubmit="return false;"><form-control formtarget="${formtarget}"></form-control></form>`,
    );
    expect(form.hasAttribute('target')).equals(false);
    expect(form).property('target', '');
    const control = form.querySelector('form-control')!;
    setTimeout(() => control.submit());
    const target: Record<string, string> = {};
    form.addEventListener('submit', () => {
      target.property = form.target;
      target.attribute = form.getAttribute('target')!;
    });
    await oneEvent(form, 'submit');
    expect(target.property).equals(formtarget);
    expect(target.attribute).equals(formtarget);
    expect(form.hasAttribute('target')).equals(false);
    expect(form).property('target', '');
    expect(form).dom.equalSnapshot();
  });

  it('has formTarget property', async () => {
    const control = await fixture<FormControl>(`<form-control></form-control>`);
    control.formTarget = '_top';
    await elementUpdated(control);
    expect(control.getAttribute('formtarget')).equals('_top');
  });

  it('does not submit data when not attached anymore', async () => {
    const container = await fixture<HTMLFormElement>(
      `<div>
        <form action="javascript:void 0">
          <form-control name="name" value="value"></form-control>
        </form>
        <form id="other" action="javascript:void 0"></form>
      </div>`,
    );
    const control = container.querySelector('form-control')!;
    const form = container.querySelector('form')!;
    const other = container.querySelector('form#other')!;
    control.setAttribute('form', 'other');
    setTimeout(() => control.submit());
    const { formData: otherFormData } = ((await oneEvent(
      other,
      'formdata',
    )) as unknown) as FormDataEvent;
    expect(otherFormData.get('name')).equals('value');
    setTimeout(() => form.submit());
    const { formData } = ((await oneEvent(form, 'formdata')) as unknown) as FormDataEvent;
    expect(formData.get('name')).equals(null);
  });

  it('is attached to parent label', async () => {
    const form = await fixture<HTMLLabelElement>(
      `<form onsubmit="return false;"><label>label <form-control></form-control></label></form>`,
    );
    const control = form.querySelector('form-control')!;
    const label = form.querySelector('label')!;
    expect(control).property('labels').contains(label).lengthOf(1);
    setTimeout(() => label.click());
    await oneEvent(form, 'submit');
    expect(form).dom.equalSnapshot();
  });

  it('can be attached to identified label', async () => {
    const form = await fixture<HTMLLabelElement>(
      `<form onsubmit="return false;"><label for="control">label</label> <form-control id="control"></form-control></form>`,
    );
    const label = form.querySelector('label')!;
    const control = form.querySelector('form-control')!;
    expect(control).property('labels').contains(label).lengthOf(1);
    setTimeout(() => label.click());
    await oneEvent(form, 'submit');
    expect(form).dom.equalSnapshot();
  });

  it('can be attached to multiple labels', async () => {
    const form = await fixture<HTMLLabelElement>(
      `<form onsubmit="return false;"><label>parent <form-control id="control"></form-control></label> <label for="control">label</label></form>`,
    );
    const parent = form.querySelector('label')!;
    const label = form.querySelector<HTMLLabelElement>('label[for]')!;
    const control = form.querySelector('form-control')!;
    expect(control).property('labels').contains(label).contains(parent).lengthOf(2);
    setTimeout(() => label.click());
    await oneEvent(form, 'submit');
    setTimeout(() => parent.click());
    await oneEvent(form, 'submit');
    expect(form).dom.equalSnapshot();
  });

  it('cleans up event listeners when disconnected', async () => {
    const [eventListeners, cleanup] = mockEventListeners();
    const form = await fixture(
      `<form><label><form-control name="prop" value="val"></form-control></label></form>`,
    );
    setTimeout(cleanup); // clean, even if fails
    expect(eventListeners).property('length', 3);
    form.querySelector('form-control')!.remove();
    expect(eventListeners).property('length', 0);
  });
});
