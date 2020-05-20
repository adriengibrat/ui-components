const range = (value: number, [min, max] = [0, 100]): number => Math.min(Math.max(value, min), max);
const step = 10;
const max = 100;

export class HSLColor {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private _hue = 0,
    private _saturation = max,
    private _light = max,
    private _alpha = 1,
  ) {}

  get hue(): number {
    return range(this._hue, [0, 360]);
  }

  get saturation(): number {
    return range(this._saturation);
  }

  get light(): number {
    return range(this._light);
  }

  get alpha(): number {
    return range(this._alpha, [0, 1]);
  }

  lighten(light = step): HSLColor {
    return new HSLColor(this.hue, this.saturation, range(this.light + light), this.alpha);
  }

  darken(light = step): HSLColor {
    return this.lighten(light * -1);
  }

  saturate(saturation = step): HSLColor {
    return new HSLColor(this.hue, range(this.saturation + saturation), this.light, this.alpha);
  }

  desaturate(saturation = step): HSLColor {
    return this.saturate(saturation * -1);
  }

  transparent(alpha = step): HSLColor {
    return new HSLColor(this.hue, this.saturation, this.light, range(this.alpha - alpha, [0, 1]));
  }

  toString(): string {
    return this.alpha !== 1
      ? `hsla(${this.hue}, ${this.saturation}%, ${this.light}%, ${this.alpha})`
      : `hsl(${this.hue}, ${this.saturation}%, ${this.light}%)`;
  }
}
