# `ui-button`

#### `can be instanciated`

```html
<ui-button role="button">
</ui-button>
```

#### `can be created`

```html
<ui-button role="button">
</ui-button>
```

#### `has a default slot`

```html
<button>
  <slot>
  </slot>
</button>
```

#### `can host text content`

```html
<ui-button role="button">
  text
</ui-button>
```

#### `can host dom content`

```html
<ui-button role="button">
  <span>
    content
  </span>
</ui-button>
```

#### ``defaults to `button` role``

```html
<ui-button role="button">
</ui-button>
```

#### `preserves defined role`

```html
<ui-button role="switch">
</ui-button>
```

#### `is autofocusable`

```html
<ui-button
  autofocus=""
  role="button"
>
  autofocus
</ui-button>

```

#### `has default state`

```html
<ui-button role="button">
  no state
</ui-button>
```

```html
<button
  aria-busy="false"
  aria-disabled="false"
>
</button>
```

#### `has active state`

```html
<ui-button
  active=""
  role="button"
>
  active
</ui-button>
```

```html
<ui-button role="button">
  active
</ui-button>
```

```html
<ui-button
  active=""
  role="button"
>
  active
</ui-button>
```

#### `has busy state`

```html
<ui-button
  busy=""
  role="button"
>
  busy
</ui-button>
```

```html
<button
  aria-busy="true"
  disabled=""
>
</button>
```

```html
<ui-button role="button">
  busy
</ui-button>
```

```html
<button aria-busy="false">
</button>
```

```html
<ui-button
  busy=""
  role="button"
>
  busy
</ui-button>
```

```html
<button
  aria-busy="true"
  disabled=""
>
</button>
```

#### `has disabled state`

```html
<ui-button
  disabled=""
  role="button"
>
  disabled
</ui-button>
```

```html
<button
  aria-disabled="true"
  disabled=""
>
</button>
```

```html
<ui-button role="button">
  disabled
</ui-button>
```

```html
<button aria-disabled="false">
</button>
```

```html
<ui-button
  disabled=""
  role="button"
>
  disabled
</ui-button>
```

```html
<button
  aria-disabled="true"
  disabled=""
>
</button>
```

#### `has hidden state`

```html
<ui-button
  hidden=""
  role="button"
>
  hidden
</ui-button>
```

```html
<ui-button role="button">
  hidden
</ui-button>
```

```html
<ui-button
  hidden=""
  role="button"
>
  hidden
</ui-button>
```

#### `contains default aria attributes`

```html
<ui-button role="button">
  aria
</ui-button>
```

```html
<button
  aria-busy="false"
  aria-disabled="false"
  aria-label="aria"
>
</button>
```

#### `contains aria label attribute`

```html
<ui-button role="button">
  <span>
    aria
  </span>
  label
</ui-button>
```

```html
<button aria-label="aria label">
</button>
```

#### ``defaults to `button` aria label attribute``

```html
<ui-button role="button">
</ui-button>
```

```html
<button aria-label="button">
</button>
```

#### `has accessible action theme`

```html
<ui-button
  role="button"
  theme="action"
>
  action
</ui-button>
```

```html
<ui-button
  role="button"
  theme="action outline"
>
  action outline
</ui-button>
```

#### `has accessible danger theme`

```html
<ui-button
  role="button"
  theme="danger"
>
  danger
</ui-button>
```

```html
<ui-button
  role="button"
  theme="danger outline"
>
  danger outline
</ui-button>
```

#### `has accessible valid theme`

```html
<ui-button
  role="button"
  theme="valid"
>
  valid
</ui-button>
```

```html
<ui-button
  role="button"
  theme="valid outline"
>
  valid outline
</ui-button>
```

#### `is attached to parent label`

```html
<label>
  label
  <ui-button role="button">
    labelled
  </ui-button>
</label>
```

#### `can be attached to identified label`

```html
<div>
  <label for="button">
    label
  </label>
  <ui-button
    id="button"
    role="button"
  >
    labelled
  </ui-button>
</div>
```

#### `can be attached to multiple labels`

```html
<label>
  <label for="button">
    label
  </label>
  <ui-button
    id="button"
    role="button"
  >
    labelled
  </ui-button>
</label>
```

#### `is activated on label mousedown event`

```html
<label>
  label
  <ui-button
    active=""
    role="button"
  >
    labelled
  </ui-button>
</label>
```

#### `is deactivated on mouseup event`

```html
<label>
  label
  <ui-button
    active=""
    role="button"
  >
    labelled
  </ui-button>
</label>
```

```html
<label>
  label
  <ui-button role="button">
    labelled
  </ui-button>
</label>
```

