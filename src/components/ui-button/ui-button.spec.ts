import { aTimeout, expect, fixture, nextFrame, oneEvent, elementUpdated } from '@open-wc/testing';
import { shadow, style, trigger, mockEventListeners } from '../../utils/spec.helpers';
import { UiButton } from './ui-button';

/* eslint-disable babel/no-unused-expressions, @typescript-eslint/no-non-null-assertion */

describe('ui-button', () => {
  it('can be instanciated', async () => {
    const button = new UiButton();
    expect(button).instanceOf(HTMLElement);
    expect(button).instanceOf(UiButton);
    document.body.append(button);
    expect(document.querySelector('ui-button')).dom.equalSnapshot();
  });

  it('can be created', async () => {
    const button = document.createElement('ui-button');
    expect(button).instanceOf(HTMLElement);
    expect(button).instanceOf(UiButton);
    document.body.append(button);
    expect(document.querySelector('ui-button')).dom.equalSnapshot();
  });

  it('has localName', async () => {
    const button = await fixture(`<ui-button></ui-button>`);
    expect(button).property('localName', 'ui-button');
  });

  it('has a default slot', async () => {
    const button = await fixture(`<ui-button></ui-button>`);
    expect(button).shadowDom.equalSnapshot({
      ignoreAttributes: ['aria-busy', 'aria-disabled', 'aria-label'],
    });
  });

  it('can host text content', async () => {
    const button = await fixture(`<ui-button>text</ui-button>`);
    expect(button).property('textContent', 'text');
    expect(button).dom.equalSnapshot();
  });

  it('can host dom content', async () => {
    const button = await fixture(`<ui-button><span>content</span></ui-button>`);
    expect(button).property('textContent', 'content');
    expect(button).lightDom.equals('<span>content</span>');
    expect(button).dom.equalSnapshot();
  });

  it('defaults to `button` role', async () => {
    const button = await fixture(`<ui-button></ui-button>`);
    expect(button).attribute('role', 'button');
    expect(button).dom.equalSnapshot();
  });

  it('preserves defined role', async () => {
    const button = await fixture(`<ui-button role="switch"></ui-button>`);
    expect(button).attribute('role', 'switch');
    expect(button).dom.equalSnapshot();
  });

  it('is autofocusable', async () => {
    const button = await fixture(`<ui-button autofocus>autofocus</ui-button>`);
    await nextFrame(); // `await elementUpdated` is too soon
    const focusedButton = shadow(button, 'button:focus')!;
    expect(focusedButton).not.equals(null);
    await nextFrame(); // need to wait again?
    expect(style(focusedButton).boxShadow).not.equals('none');
    expect(button).dom.equalSnapshot();
  });

  it('has default state', async () => {
    const button = await fixture(`<ui-button>no state</ui-button>`);
    expect(button).include({
      active: false,
      busy: false,
      disabled: false,
      hidden: false,
    });
    expect(button).dom.equalSnapshot();
    expect(button).shadowDom.equalSnapshot({
      ignoreAttributes: ['aria-label'],
      ignoreTags: ['slot'],
    });
  });

  it('has active state', async () => {
    const button = await fixture<UiButton>(`<ui-button active>active</ui-button>`);
    expect(button).property('active', true);
    expect(style(shadow(button, 'button')!).boxShadow).not.equals('none');
    expect(shadow(button, 'button:focus')).equals(null); // activated but not focused
    expect(button).dom.equalSnapshot();

    button.active = false;
    await elementUpdated(button);
    expect(button).dom.equalSnapshot();

    button.active = true;
    await elementUpdated(button);
    expect(button).dom.equalSnapshot();
  });

  it('has busy state', async () => {
    const button = await fixture<UiButton>(`<ui-button busy>busy</ui-button>`);
    expect(button).property('busy', true);
    const innerButton = shadow(button, 'button')!;
    expect(style(innerButton).cursor).equals('progress');
    expect(style(innerButton, '::before').animation).contain('spin');
    expect(button).dom.equalSnapshot();
    const ignore = { ignoreAttributes: ['aria-disabled', 'aria-label'], ignoreTags: ['slot'] };
    expect(button).shadowDom.equalSnapshot(ignore);

    button.busy = false;
    await elementUpdated(button);
    expect(button).dom.equalSnapshot();
    expect(button).shadowDom.equalSnapshot(ignore);

    button.busy = true;
    await elementUpdated(button);
    expect(button).dom.equalSnapshot();
    expect(button).shadowDom.equalSnapshot(ignore);
  });

  it('has disabled state', async () => {
    const button = await fixture<UiButton>(`<ui-button disabled>disabled</ui-button>`);
    expect(button).property('disabled', true);
    expect(style(shadow(button, 'button')!).cursor).equals('default');
    expect(button).dom.equalSnapshot();
    const ignore = { ignoreAttributes: ['aria-busy', 'aria-label'], ignoreTags: ['slot'] };
    expect(button).shadowDom.equalSnapshot(ignore);

    button.disabled = false;
    await elementUpdated(button);
    expect(button).dom.equalSnapshot();
    expect(button).shadowDom.equalSnapshot(ignore);

    button.disabled = true;
    await elementUpdated(button);
    expect(button).dom.equalSnapshot();
    expect(button).shadowDom.equalSnapshot(ignore);
  });

  it('has hidden state', async () => {
    const button = await fixture<UiButton>(`<ui-button hidden>hidden</ui-button>`);
    expect(button).dom.not.displayed;
    expect(button).dom.equalSnapshot();

    button.hidden = false;
    await elementUpdated(button);
    expect(button).dom.displayed;
    expect(button).dom.equalSnapshot();

    button.hidden = true;
    await elementUpdated(button);
    expect(button).dom.equalSnapshot();
  });

  it('contains default aria attributes', async () => {
    const button = await fixture(`<ui-button>aria</ui-button>`);
    expect(button).dom.equalSnapshot();
    expect(button).shadowDom.equalSnapshot({ ignoreTags: ['slot'] });
  });

  it('contains aria label attribute', async () => {
    const button = await fixture(`<ui-button><span>aria</span> label</ui-button>`);
    expect(button).dom.equalSnapshot();
    expect(button).shadowDom.equalSnapshot({
      ignoreAttributes: ['aria-disabled', 'aria-busy'],
      ignoreTags: ['slot'],
    });
  });

  it('defaults to `button` aria label attribute', async () => {
    const button = await fixture(`<ui-button></ui-button>`);
    expect(button).dom.equalSnapshot();
    expect(button).shadowDom.equalSnapshot({
      ignoreAttributes: ['aria-disabled', 'aria-busy'],
      ignoreTags: ['slot'],
    });
  });

  it('has accessible default style', async () => {
    const button = await fixture(`<ui-button>accessible</ui-button>`);
    await expect(button).accessible();
  });

  it('has accessible action theme', async () => {
    const button = await fixture(`<ui-button theme="action">action</ui-button>`);
    await expect(button).accessible();
    expect(button).dom.equalSnapshot();

    const outlined = await fixture(`<ui-button theme="action outline">action outline</ui-button>`);
    await expect(outlined).accessible();
    expect(outlined).dom.equalSnapshot();
  });

  it('has accessible danger theme', async () => {
    const button = await fixture(`<ui-button theme="danger">danger</ui-button>`);
    await expect(button).accessible();
    expect(button).dom.equalSnapshot();

    const outlined = await fixture(`<ui-button theme="danger outline">danger outline</ui-button>`);
    await expect(outlined).accessible();
    expect(outlined).dom.equalSnapshot();
  });

  it('has accessible valid theme', async () => {
    const button = await fixture(`<ui-button theme="valid">valid</ui-button>`);
    await expect(button).accessible();
    expect(button).dom.equalSnapshot();

    const outlined = await fixture(`<ui-button theme="valid outline">valid outline</ui-button>`);
    await expect(outlined).accessible();
    expect(outlined).dom.equalSnapshot();
  });

  // TODO other themes

  it('fires formcontrol event on click', async () => {
    const button = await fixture<UiButton>(`<ui-button>formcontrol</ui-button>`);
    setTimeout(() => button.click());
    expect(await oneEvent(button, 'formcontrol')).include({
      detail: null,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    setTimeout(() => (shadow(button, 'button') as HTMLButtonElement).click());
    expect(await oneEvent(button, 'formcontrol')).include({
      detail: null,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
  });

  it('does not fire formcontrol event on defaultPrevented click event', async () => {
    const button = await fixture<UiButton>(
      `<ui-button onclick="return false">prevented formcontrol</ui-button>`,
    );
    setTimeout(() => (shadow(button, 'button') as HTMLButtonElement).click());
    return Promise.race([
      aTimeout(10),
      oneEvent(button, 'formcontrol').then(() => {
        throw new Error('formcontrol event fired');
      }),
    ]);
  });

  it('fires formcontrol event from click method even if event is prevented', async () => {
    const button = await fixture<UiButton>(
      `<ui-button onclick="return false">prevented click</ui-button>`,
    );
    setTimeout(() => button.click());
    expect(await oneEvent(button, 'formcontrol'));
  });

  it('does not fire formcontrol event when disabled', async () => {
    const button = await fixture<UiButton>(`<ui-button disabled>disabled formcontrol</ui-button>`);
    setTimeout(() => button.click());
    setTimeout(() => (shadow(button, 'button') as HTMLButtonElement).click());
    return Promise.race([
      aTimeout(10),
      oneEvent(button, 'formcontrol').then(() => {
        throw new Error('formcontrol event fired');
      }),
    ]);
  });

  it('does not fire formcontrol event when busy', async () => {
    const button = await fixture<UiButton>(`<ui-button busy>busy formcontrol</ui-button>`);
    setTimeout(() => button.click());
    setTimeout(() => (shadow(button, 'button') as HTMLButtonElement).click());
    return Promise.race([
      aTimeout(10),
      oneEvent(button, 'formcontrol').then(() => {
        throw new Error('formcontrol event fired');
      }),
    ]);
  });

  it('is attached to parent label', async () => {
    const label = await fixture<HTMLLabelElement>(
      `<label>label <ui-button>labelled</ui-button></label>`,
    );
    const button = label.querySelector('ui-button')!;
    expect(button).property('labels').contains(label).lengthOf(1);
    setTimeout(() => label.click());
    expect(await oneEvent(button, 'formcontrol'));
    expect(label).dom.equalSnapshot();
  });

  it('can be attached to identified label', async () => {
    const container = await fixture<HTMLLabelElement>(
      `<div><label for="button">label</label> <ui-button id="button">labelled</ui-button></div>`,
    );
    const label = container.querySelector('label')!;
    const button = container.querySelector('ui-button')!;
    expect(button).property('labels').contains(label).lengthOf(1);
    setTimeout(() => label.click());
    expect(await oneEvent(button, 'formcontrol'));
    expect(container).dom.equalSnapshot();
  });

  it('can be attached to multiple labels', async () => {
    const parent = await fixture<HTMLLabelElement>(
      `<label><label for="button">label</label> <ui-button id="button">labelled</ui-button></label>`,
    );
    const label = parent.querySelector('label')!;
    const button = parent.querySelector('ui-button')!;
    expect(button).property('labels').contains(label).contains(parent).lengthOf(2);
    setTimeout(() => label.click());
    expect(await oneEvent(button, 'formcontrol'));
    setTimeout(() => parent.click());
    expect(await oneEvent(button, 'formcontrol'));
    expect(parent).dom.equalSnapshot();
  });

  it('is activated on label mousedown event', async () => {
    const label = await fixture<HTMLLabelElement>(
      `<label>label <ui-button>labelled</ui-button></label>`,
    );
    const button = label.querySelector('ui-button')!;
    trigger(label, 'mousedown');
    expect(button).property('active').true;
    await elementUpdated(button);
    expect(label).dom.equalSnapshot();
  });

  it('is deactivated on mouseup event', async () => {
    const label = await fixture<HTMLLabelElement>(
      `<label>label <ui-button>labelled</ui-button></label>`,
    );
    const button = label.querySelector('ui-button')!;
    trigger(label, 'mousedown');
    expect(button).property('active').true;
    await elementUpdated(button);
    expect(label).dom.equalSnapshot();
    trigger(label, 'mousemove');
    trigger(label.ownerDocument!, 'mousemove'); // mouse move outside label
    trigger(label.ownerDocument!, 'mouseup');
    expect(button).property('active').false;
    await elementUpdated(button);
    expect(label).dom.equalSnapshot();
  });

  it('cleans up event listeners when disconnected', async () => {
    const [eventListeners, cleanup] = mockEventListeners();
    const label = await fixture(`<label>label <ui-button>labelled</ui-button></label>`);
    setTimeout(cleanup); // clean, even if fails
    expect(eventListeners).property('length', 4);
    label.querySelector('ui-button')!.remove();
    expect(eventListeners).property('length', 0);
  });
});
