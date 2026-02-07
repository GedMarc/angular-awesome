# Combobox Examples

Comboboxes combine a text input with a listbox so users can search, filter, and select values.

## Basic
```html
<wa-combobox placeholder="Type to filter...">
  <wa-option value="apple">Apple</wa-option>
  <wa-option value="banana">Banana</wa-option>
  <wa-option value="cherry">Cherry</wa-option>
  <wa-option value="dragonfruit">Dragonfruit</wa-option>
</wa-combobox>
```

## Labels
```html
<wa-combobox label="Choose a fruit">
  <wa-option value="apple">Apple</wa-option>
  <wa-option value="banana">Banana</wa-option>
  <wa-option value="cherry">Cherry</wa-option>
</wa-combobox>
```

## Hint
```html
<wa-combobox label="Favorite Fruit" hint="Start typing to filter options.">
  <wa-option value="apple">Apple</wa-option>
  <wa-option value="banana">Banana</wa-option>
  <wa-option value="cherry">Cherry</wa-option>
</wa-combobox>
```

## Placeholders
```html
<wa-combobox placeholder="Type to search...">
  <wa-option value="apple">Apple</wa-option>
  <wa-option value="banana">Banana</wa-option>
  <wa-option value="cherry">Cherry</wa-option>
</wa-combobox>
```

## Clearable
```html
<wa-combobox with-clear label="Option">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
```

## Autocomplete Modes
```html
<wa-combobox label="List Autocomplete" autocomplete="list">
  <wa-option value="alaska">Alaska</wa-option>
  <wa-option value="alabama">Alabama</wa-option>
  <wa-option value="arkansas">Arkansas</wa-option>
</wa-combobox>

<wa-combobox label="No Autocomplete" autocomplete="none">
  <wa-option value="alaska">Alaska</wa-option>
  <wa-option value="alabama">Alabama</wa-option>
  <wa-option value="arkansas">Arkansas</wa-option>
</wa-combobox>
```

## Allow Custom Values
```html
<wa-combobox allow-custom-value label="Enter or select a color" placeholder="Type a color...">
  <wa-option value="red">Red</wa-option>
  <wa-option value="green">Green</wa-option>
  <wa-option value="blue">Blue</wa-option>
</wa-combobox>
```

## Custom Filter Function
```html
<wa-combobox class="custom-filter" label="Search (includes match)">
  <wa-option value="alpha">Alpha</wa-option>
  <wa-option value="beta">Beta</wa-option>
  <wa-option value="gamma">Gamma</wa-option>
</wa-combobox>
<script type="module">
  await customElements.whenDefined('wa-combobox');
  const combo = document.querySelector('.custom-filter');
  if (combo && 'updateComplete' in combo) {
    await combo.updateComplete;
  }
  combo.filter = (option, query) => {
    const label = option.label || (option.textContent || '').trim();
    return label.toLowerCase().includes(query.toLowerCase());
  };
</script>
```

## Appearance
```html
<wa-combobox appearance="filled" label="Filled">
  <wa-option value="1">Option 1</wa-option>
  <wa-option value="2">Option 2</wa-option>
</wa-combobox>

<wa-combobox appearance="filled-outlined" label="Filled Outlined">
  <wa-option value="1">Option 1</wa-option>
  <wa-option value="2">Option 2</wa-option>
</wa-combobox>

<wa-combobox appearance="outlined" label="Outlined">
  <wa-option value="1">Option 1</wa-option>
  <wa-option value="2">Option 2</wa-option>
</wa-combobox>
```

## Pill
```html
<wa-combobox pill placeholder="Search...">
  <wa-option value="paris">Paris</wa-option>
  <wa-option value="rome">Rome</wa-option>
  <wa-option value="tokyo">Tokyo</wa-option>
</wa-combobox>
```

## Disabled
```html
<wa-combobox placeholder="Disabled" disabled>
  <wa-option value="one">One</wa-option>
  <wa-option value="two">Two</wa-option>
</wa-combobox>
```

## Multiple
```html
<wa-combobox label="Select Multiple" multiple with-clear>
  <wa-option value="option-1" selected>Option 1</wa-option>
  <wa-option value="option-2" selected>Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
```

## Setting Initial Values
```html
<wa-combobox>
  <wa-option value="option-1" selected>Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
</wa-combobox>

<wa-combobox multiple with-clear>
  <wa-option value="option-1" selected>Option 1</wa-option>
  <wa-option value="option-2" selected>Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
```

## Grouping Options
```html
<wa-combobox label="Grouped Options">
  <small>Fruits</small>
  <wa-option value="apple">Apple</wa-option>
  <wa-option value="orange">Orange</wa-option>
  <wa-divider></wa-divider>
  <small>Veggies</small>
  <wa-option value="carrot">Carrot</wa-option>
  <wa-option value="broccoli">Broccoli</wa-option>
</wa-combobox>
```

## Sizes
```html
<wa-combobox placeholder="Small" size="small">
  <wa-option value="a">A</wa-option>
  <wa-option value="b">B</wa-option>
</wa-combobox>

<wa-combobox placeholder="Medium" size="medium">
  <wa-option value="a">A</wa-option>
  <wa-option value="b">B</wa-option>
</wa-combobox>

<wa-combobox placeholder="Large" size="large">
  <wa-option value="a">A</wa-option>
  <wa-option value="b">B</wa-option>
</wa-combobox>
```

## Placement
```html
<wa-combobox placement="top" placeholder="Opens above">
  <wa-option value="north">North</wa-option>
  <wa-option value="south">South</wa-option>
</wa-combobox>
```

## Start & End Decorations
```html
<wa-combobox placeholder="Search locations..." with-clear>
  <wa-icon slot="start" name="map"></wa-icon>
  <wa-icon slot="end" name="arrow-right"></wa-icon>
  <wa-option value="nyc">New York</wa-option>
  <wa-option value="sf">San Francisco</wa-option>
  <wa-option value="la">Los Angeles</wa-option>
</wa-combobox>
```

## Custom Tags
```html
<wa-combobox class="custom-tag-demo" multiple with-clear label="Select contacts...">
  <wa-option value="email" selected>Email</wa-option>
  <wa-option value="phone" selected>Phone</wa-option>
  <wa-option value="chat">Chat</wa-option>
</wa-combobox>
<script type="module">
  await customElements.whenDefined('wa-combobox');
  const combo = document.querySelector('.custom-tag-demo');
  if (combo && 'updateComplete' in combo) {
    await combo.updateComplete;
  }
  combo.getTag = (option, index) => {
    const label = option.label || (option.textContent || '').trim();
    return `<wa-tag with-remove data-value="${option.value}">${index + 1}. ${label}</wa-tag>`;
  };
</script>
```

## Multiple with SSR hint
```html
<wa-combobox multiple with-label with-hint>
  <span slot="label">Select Multiple</span>
  <span slot="hint">SSR-friendly label and hint slots.</span>
  <wa-option value="1">One</wa-option>
  <wa-option value="2">Two</wa-option>
</wa-combobox>
```

## Lazy loading notes
- Newly added `<wa-option>` elements participate in filtering automatically once connected.
- When `multiple`, the input value resets to blank after each selection so users can continue filtering.

