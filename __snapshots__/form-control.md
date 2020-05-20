# `form-control`

#### `can be instanciated`

```html
<form-control>
</form-control>

```

#### `can be created`

```html
<form-control type="submit">
</form-control>

```

#### `is attached to parent form`

```html
<form>
  <form-control type="submit">
  </form-control>
</form>

```

#### `can be attached to form by id`

```html
<div>
  <form id="my-form">
  </form>
  <form-control
    form="my-form"
    type="submit"
  >
  </form-control>
</div>

```

#### `is attached to form by id over parent`

```html
<div>
  <form id="my-form">
  </form>
  <form id="parent">
    <form-control
      form="my-form"
      type="submit"
    >
    </form-control>
  </form>
</div>

```

#### `has submit type`

```html
<form onsubmit="return false;">
  <form-control type="submit">
  </form-control>
</form>

```

#### `has submit type by default`

```html
<form onsubmit="return false;">
  <form-control>
  </form-control>
</form>

```

#### `has submit method`

```html
<form onsubmit="return false;">
  <form-control type="submit">
  </form-control>
</form>

```

#### `has reset type`

```html
<form>
  <form-control type="reset">
  </form-control>
</form>

```

#### `has reset method`

```html
<form>
  <form-control type="submit">
  </form-control>
</form>

```

#### `has name and value attributes`

```html
<form action="javascript:void 0">
  <form-control
    name="name"
    type="submit"
    value="value"
  >
  </form-control>
</form>

```

#### `accepts File value property`

```html
<form action="javascript:void 0">
  <form-control
    name="file"
    type="submit"
  >
  </form-control>
</form>

```

#### `accepts FormData value property`

```html
<form action="javascript:void 0">
  <form-control type="submit">
  </form-control>
</form>

```

#### `has formaction attribute to override attached form action`

```html
<form>
  <form-control
    formaction="javascript: void 0;"
    type="submit"
  >
  </form-control>
</form>

```

#### `has formenctype attribute to override attached form encoding`

```html
<form onsubmit="return false;">
  <form-control
    formenctype="multipart/form-data"
    type="submit"
  >
  </form-control>
</form>

```

#### `has formmethod attribute to override attached form method`

```html
<form onsubmit="return false;">
  <form-control
    formmethod="post"
    type="submit"
  >
  </form-control>
</form>

```

#### `has formnovalidate attribute to override attached form novalidate`

```html
<form onsubmit="return false;">
  <form-control
    formnovalidate=""
    type="submit"
  >
  </form-control>
</form>

```

#### `has formtarget attribute to override attached form target`

```html
<form onsubmit="return false;">
  <form-control
    formtarget="_blank"
    type="submit"
  >
  </form-control>
</form>

```

#### `is attached to parent label`

```html
<form onsubmit="return false;">
  <label>
    label
    <form-control type="submit">
    </form-control>
  </label>
</form>

```

#### `can be attached to identified label`

```html
<form onsubmit="return false;">
  <label for="control">
    label
  </label>
  <form-control
    id="control"
    type="submit"
  >
  </form-control>
</form>

```

#### `can be attached to multiple labels`

```html
<form onsubmit="return false;">
  <label>
    parent
    <form-control
      id="control"
      type="submit"
    >
    </form-control>
  </label>
  <label for="control">
    label
  </label>
</form>

```

