import { expect, fixture, elementUpdated } from '@open-wc/testing';
import { shadow, style } from '../../utils/spec.helpers';
import { UiButtonGroup } from './ui-button-group';

/* eslint-disable babel/no-unused-expressions, @typescript-eslint/no-non-null-assertion */

describe('ui-button-group', () => {
  it('can be instanciated', async () => {
    const group = new UiButtonGroup();
    expect(group).to.be.instanceOf(HTMLElement);
    expect(group).to.be.instanceOf(UiButtonGroup);
    document.body.append(group);
    expect(document.querySelector('ui-button-group')).dom.to.equalSnapshot();
  });

  it('can be created', async () => {
    const group = document.createElement('ui-button-group');
    expect(group).to.be.instanceOf(HTMLElement);
    expect(group).to.be.instanceOf(UiButtonGroup);
    document.body.append(group);
    expect(document.querySelector('ui-button-group')).dom.to.equalSnapshot();
  });

  it('has localName', async () => {
    const group = await fixture(`<ui-button-group></ui-button-group>`);
    expect(group).property('localName', 'ui-button-group');
  });

  it('has a default slot', async () => {
    const group = await fixture(`<ui-button-group></ui-button-group>`);
    expect(shadow(group, 'slot'));
    expect(group).shadowDom.to.equalSnapshot();
  });

  it('can host ui-button', async () => {
    const group = await fixture(`<ui-button-group><ui-button>button</ui-button></ui-button-group>`);
    expect(group).dom.to.equalSnapshot();
  });

  it('has `buttons` property', async () => {
    const group = await fixture(
      `<ui-button-group><ui-button>a</ui-button><ui-button>b</ui-button></ui-button-group>`,
    );
    const [a, b] = Array.from(group.querySelectorAll('ui-button'));
    expect(group).property('buttons').to.include([a, b]).and.to.have.lengthOf(2);
    expect(group).dom.to.equalSnapshot();
  });

  it('has busy state', async () => {
    const group = await fixture<UiButtonGroup>(
      `<ui-button-group busy><ui-button>busy</ui-button></ui-button-group>`,
    );
    expect(group).property('busy', true);
    const slot = shadow(group, 'slot')!;
    expect(style(slot).cursor).to.equals('progress');
    expect(style(slot, '::before').animation).to.contain('spin');
    const button = group.querySelector('ui-button')!;
    expect(style(button).pointerEvents).to.equals('none');
    await elementUpdated(group);
    expect(group).dom.to.equalSnapshot();

    group.busy = false;
    await elementUpdated(group);
    expect(group).dom.to.equalSnapshot();

    group.busy = true;
    await elementUpdated(group);
    expect(group).dom.to.equalSnapshot();
  });

  it('has disabled state', async () => {
    const group = await fixture<UiButtonGroup>(
      `<ui-button-group disabled><ui-button>disabled</ui-button></ui-button-group>`,
    );
    expect(group).property('disabled', true);
    const button = group.querySelector('ui-button')!;
    expect(button).property('disabled', true);
    await elementUpdated(group);
    expect(group).dom.to.equalSnapshot();

    group.disabled = false;
    expect(button).property('disabled', false);
    await elementUpdated(group);
    expect(group).dom.to.equalSnapshot();

    group.disabled = true;

    expect(button).property('disabled', true);
    await elementUpdated(group);
    expect(group).dom.to.equalSnapshot();
  });

  it('has hidden state', async () => {
    const group = await fixture<UiButtonGroup>(
      `<ui-button-group hidden><ui-button>hidden</ui-button></ui-button-group>`,
    );
    expect(group).dom.to.not.be.displayed;
    expect(group).dom.to.equalSnapshot();

    group.hidden = false;
    await elementUpdated(group);
    expect(group).dom.to.be.displayed;
    expect(group).dom.to.equalSnapshot();

    group.hidden = true;
    await elementUpdated(group);
    expect(group).dom.to.equalSnapshot();
  });

  it('has action theme', async () => {
    const group = await fixture(
      `<ui-button-group theme="action"><ui-button>action</ui-button></ui-button-group>`,
    );
    expect(group).dom.to.equalSnapshot();
    const button = group.querySelector('ui-button')!;
    await expect(button).to.be.accessible();
    const buttonStyle = style(shadow(button, 'button')!);
    const actionStyle = style(
      shadow(await fixture(`<ui-button theme="action">action</ui-button>`), 'button')!,
    );
    expect(buttonStyle.backgroundColor).to.equals(actionStyle.backgroundColor);
    expect(buttonStyle.borderColor).to.equals(actionStyle.borderColor);
    expect(buttonStyle.color).to.equals(actionStyle.color);

    const outlined = await fixture(
      `<ui-button-group theme="action outline"><ui-button>action outline</ui-button></ui-button-group>`,
    );
    expect(outlined).dom.to.equalSnapshot();
    const outlinedButton = outlined.querySelector('ui-button')!;
    await expect(outlinedButton).to.be.accessible();
    const actionOutlineStyle = style(
      shadow(
        await fixture(`<ui-button theme="action outline">action outline</ui-button>`),
        'button',
      )!,
    );
    const outlinedButtonStyle = style(shadow(outlinedButton, 'button')!);
    expect(outlinedButtonStyle.backgroundColor).to.equals(actionOutlineStyle.backgroundColor);
    expect(outlinedButtonStyle.borderColor).to.equals(actionOutlineStyle.borderColor);
    expect(outlinedButtonStyle.color).to.equals(actionOutlineStyle.color);
  });

  it('has danger theme', async () => {
    const group = await fixture(
      `<ui-button-group theme="danger"><ui-button>danger</ui-button></ui-button-group>`,
    );
    expect(group).dom.to.equalSnapshot();
    const button = group.querySelector('ui-button')!;
    await expect(button).to.be.accessible();
    const buttonStyle = style(shadow(button, 'button')!);
    const dangerStyle = style(
      shadow(await fixture(`<ui-button theme="danger">danger</ui-button>`), 'button')!,
    );
    expect(buttonStyle.backgroundColor).to.equals(dangerStyle.backgroundColor);
    expect(buttonStyle.borderColor).to.equals(dangerStyle.borderColor);
    expect(buttonStyle.color).to.equals(dangerStyle.color);

    const outlined = await fixture(
      `<ui-button-group theme="danger outline"><ui-button>danger outline</ui-button></ui-button-group>`,
    );
    expect(outlined).dom.to.equalSnapshot();
    const outlinedButton = outlined.querySelector('ui-button')!;
    await expect(outlinedButton).to.be.accessible();
    const dangerOutlineStyle = style(
      shadow(
        await fixture(`<ui-button theme="danger outline">danger outline</ui-button>`),
        'button',
      )!,
    );
    const outlinedButtonStyle = style(shadow(outlinedButton, 'button')!);
    expect(outlinedButtonStyle.backgroundColor).to.equals(dangerOutlineStyle.backgroundColor);
    expect(outlinedButtonStyle.borderColor).to.equals(dangerOutlineStyle.borderColor);
    expect(outlinedButtonStyle.color).to.equals(dangerOutlineStyle.color);
  });

  it('has valid theme', async () => {
    const group = await fixture(
      `<ui-button-group theme="valid"><ui-button>valid</ui-button></ui-button-group>`,
    );
    expect(group).dom.to.equalSnapshot();
    const button = group.querySelector('ui-button')!;
    await expect(button).to.be.accessible();
    const buttonStyle = style(shadow(button, 'button')!);
    const validStyle = style(
      shadow(await fixture(`<ui-button theme="valid">valid</ui-button>`), 'button')!,
    );
    expect(buttonStyle.backgroundColor).to.equals(validStyle.backgroundColor);
    expect(buttonStyle.borderColor).to.equals(validStyle.borderColor);
    expect(buttonStyle.color).to.equals(validStyle.color);

    const outlined = await fixture(
      `<ui-button-group theme="valid outline"><ui-button>valid outline</ui-button></ui-button-group>`,
    );
    expect(outlined).dom.to.equalSnapshot();
    const outlinedButton = outlined.querySelector('ui-button')!;
    await expect(outlinedButton).to.be.accessible();
    const validOutlineStyle = style(
      shadow(
        await fixture(`<ui-button theme="valid outline">valid outline</ui-button>`),
        'button',
      )!,
    );
    const outlinedButtonStyle = style(shadow(outlinedButton, 'button')!);
    expect(outlinedButtonStyle.backgroundColor).to.equals(validOutlineStyle.backgroundColor);
    expect(outlinedButtonStyle.borderColor).to.equals(validOutlineStyle.borderColor);
    expect(outlinedButtonStyle.color).to.equals(validOutlineStyle.color);
  });

  // TODO other themes
});
