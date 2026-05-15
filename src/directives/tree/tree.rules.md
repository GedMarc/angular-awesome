# Tree Component Rules

Trees allow you to display a hierarchical list of selectable tree items. Items with children can be expanded and collapsed as desired by the user.

📌 Follows the general [Web Awesome Angular Rules](../../../RULES.md).

## Component: Tree

**Tag:** `<wa-tree>`

### Inputs

| Input name  | Type       | Description |
| ----------- | ---------- | ----------- |
| `selection` | `'single' | 'multiple' | 'leaf'` | Controls selection mode: single, multiple, or only leaf nodes selectable. |
| `name`      | `string` | Sets the tree's name attribute; can be used for querySelector (e.g., document.querySelector(`wa-tree[name="myTree"]`)). |
| `ngModel`   | any | Two-way binding of selected leaf data objects. In `single` mode it's a single object or null; in `multiple` mode it's an array of objects. |

### Outputs / Events

| Name                | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `selectionChange`   | Angular output re-emitting the native `wa-selection-change`. |
| `wa-selection-change` (native) | Emitted when a tree item is selected or deselected. |

### Styling (CSS Custom Properties)

Set the following CSS custom properties via Angular `[style.--property]` bindings:

* `--indent-size`
* `--indent-guide-color`
* `--indent-guide-offset`
* `--indent-guide-style`
* `--indent-guide-width`

## Component: Tree Item

**Tag:** `<wa-tree-item>`

### Inputs

| Input name | Type      | Description                             |
| ---------- | --------- | --------------------------------------- |
| `expanded` | `boolean` | Whether the item is initially expanded. |
| `selected` | `boolean` | Whether the item is initially selected. |
| `disabled` | `boolean` | Disables interaction with the item.     |
| `lazy`     | `boolean` | Enables lazy loading.                   |
| `data`     | `any`     | Arbitrary data object/value bound to the item; used for ngModel mapping. |
| `value`    | `any`     | Optional primitive identifier mirrored as attribute; used for ngModel mapping. |

### Outputs / Events

| Output name     | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `expand`        | Fires when the item starts expanding.                            |
| `afterExpand`   | Fires after item has finished expanding.                         |
| `collapse`      | Fires when the item starts collapsing.                           |
| `afterCollapse` | Fires after item has finished collapsing.                        |
| `lazyChange`    | Fires when the `lazy` state changes.                             |
| `lazyLoad`      | Fires when a lazy item is triggered to expand and needs loading. |

### Styling (CSS Custom Properties)

CSS custom properties applied via Angular bindings:

* `--selection-background-color`
* `--selection-indicator-color`
* `--expand-button-color`
* `--show-duration`
* `--hide-duration`

#### Special Features

* Supports recursive `<wa-tree-item>` nesting.
* Supports slot customization for `expand-icon` and `collapse-icon`.
* Icon support via `<wa-icon>` in content.
* Emits `lazyLoad` event for async loading scenarios.

### Slots

| Name            | Description                        |
| --------------- | ---------------------------------- |
| `(default)`     | Item label and nested children     |
| `expand-icon`   | Custom icon when item is expanded  |
| `collapse-icon` | Custom icon when item is collapsed |

#### Parts Exposed

`wa-tree-item` and `wa-tree` expose rich parts like:

* `expand-button`
* `spinner`
* `label`
* `children`
* `checkbox__*` parts (when `multiple` selection is enabled)

### Notes for Wrapper Implementation

* Use `ngModel` binding only where form integration is needed (e.g., capturing selected node IDs).
* `wa-tree-item[lazy]` should use an event emitter to notify parent component to fetch and append data.
* Recursive structures must be wrapped carefully in Angular to maintain change detection and projected content.
* Angular wrapper should mirror DOM slot structure where relevant (especially for icon slots).

---
