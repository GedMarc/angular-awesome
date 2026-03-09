# Angular Awesome — Component Catalog

Quick reference for all exported directives/components, their selectors, and primary inputs.

## Form Controls
| Component | Selector | Key Inputs | CVA |
|-----------|----------|-----------|-----|
| Input | `wa-input` | type, placeholder, value, disabled, readonly, clearable, size, label | ✅ |
| Number Input | `wa-number-input` | min, max, step, value, disabled, size, label | ✅ |
| Textarea | `wa-textarea` | value, placeholder, rows, resize, disabled, size, label | ✅ |
| Select | `wa-select` | value, placeholder, disabled, clearable, multiple, size, label | ✅ |
| Combobox | `wa-combobox` | value, placeholder, disabled, clearable, multiple, size, label | ✅ |
| Checkbox | `wa-checkbox` | checked, indeterminate, disabled, size, value | ✅ |
| Switch | `wa-switch` | checked, disabled, size | ✅ |
| Radio | `wa-radio` | value, disabled, size | ✅ |
| Slider | `wa-slider` | min, max, step, value, disabled, label | ✅ |
| Color Picker | `wa-color-picker` | value, format, disabled, size, label | ✅ |
| File Input | `wa-file-input` | accept, multiple, disabled | ✅ |
| Option | `wa-option` | value, disabled | — |

## Feedback & Overlay
| Component | Selector | Key Inputs |
|-----------|----------|-----------|
| Button | `wa-button` | variant, appearance, size, disabled, loading, href, target, type |
| Button Group | `wa-button-group` | label |
| Callout | `wa-callout` | variant, appearance, size |
| Dialog | `wa-dialog` | open, label, noHeader |
| Drawer | `wa-drawer` | open, label, placement, contained |
| Dropdown | `wa-dropdown` | open, placement, distance, skidding |
| Dropdown Item | `wa-dropdown-item` | type, checked, disabled, loading, value |
| Popover | `wa-popover` | active, anchor, placement, distance, arrow, flip, shift |
| Popup | `wa-popup` | active, anchor, placement, distance, skidding |
| Tooltip | `wa-tooltip` | placement, disabled, distance, open, showDelay, hideDelay |
| Toast | `wa-toast` | placement |
| Toast Item | `wa-toast-item` | variant, size, duration |
| Toast Container | `wa-toast-container` | placement |
| Spinner | `wa-spinner` | size |
| Progress Bar | `wa-progress-bar` | value, max, label, indeterminate |
| Progress Ring | `wa-progress-ring` | value, max, label, size |

## Display & Data
| Component | Selector | Key Inputs |
|-----------|----------|-----------|
| Avatar | `wa-avatar` | image, label, initials, shape, size |
| Badge | `wa-badge` | variant, pill, pulse |
| Breadcrumbs | `wa-breadcrumbs` | label, separator |
| Breadcrumb Item | `wa-breadcrumb-item` | href, target |
| Card | `wa-card` | — (slot-based) |
| Carousel | `wa-carousel` | pagination, navigation, loop, autoplay |
| Carousel Item | `wa-carousel-item` | — |
| Copy Button | `wa-copy-button` | value, from, disabled, feedbackDuration |
| Details | `wa-details` | summary, open, disabled |
| Divider | `wa-divider` | vertical |
| Icon | `wa-icon` | name, src, label, size |
| Include | `wa-include` | src, mode, allowScripts |
| QR Code | `wa-qr-code` | value, size, fill, background, radius, errorCorrection |
| Rating | `wa-rating` | value, max, precision, disabled, readonly, size |
| Relative Time | `wa-relative-time` | date, format, numeric, sync |
| Skeleton | `wa-skeleton` | effect, size |
| Split Panel | `wa-split-panel` | position, vertical, disabled, snap |
| Tab Group | `wa-tab-group` | placement, activation, noScrollControls |
| Tab | `wa-tab` | panel, active, closable, disabled |
| Tab Panel | `wa-tab-panel` | name, active |
| Tag | `wa-tag` | variant, size, pill, removable |
| Tree | `wa-tree` | selection |
| Tree Item | `wa-tree-item` | expanded, selected, disabled, lazy |
| Text | `wa-text` | — (semantic text wrapper) |
| Variant | `wa-variant` | variant |
| Comparison | `wa-comparison` | position |
| Animated Image | `wa-animated-image` | src, alt, play |
| Animation | `wa-animation` | name, duration, delay, iterations, easing, play |
| Zoomable Frame | `wa-zoomable-frame` | src |

## Formatters
| Component | Selector | Key Inputs |
|-----------|----------|-----------|
| Format Bytes | `wa-format-bytes` | value, unit, display |
| Format Date | `wa-format-date` | date, weekday, era, year, month, day, hour, minute, second |
| Format Number | `wa-format-number` | value, type, currency, minimumFractionDigits, maximumFractionDigits |

## Observers
| Component | Selector | Key Inputs |
|-----------|----------|-----------|
| Intersection Observer | `wa-intersection-observer` | — |
| Mutation Observer | `wa-mutation-observer` | attr, childList, charData, disabled |
| Resize Observer | `wa-resize-observer` | disabled |

## Charts
| Component | Selector | Key Inputs |
|-----------|----------|-----------|
| Chart | `wa-chart` | config, plugins |
| Bar Chart | `wa-bar-chart` | label, description, xAxisLabel, yAxisLabel, legendPosition, stacked |
| Bubble Chart | `wa-bubble-chart` | label, description, xAxisLabel, yAxisLabel, legendPosition |
| Doughnut Chart | `wa-doughnut-chart` | label, description, legendPosition |
| Line Chart | `wa-line-chart` | label, description, xAxisLabel, yAxisLabel, legendPosition |
| Pie Chart | `wa-pie-chart` | label, description, legendPosition |
| Polar Area Chart | `wa-polar-area-chart` | label, description, legendPosition |
| Radar Chart | `wa-radar-chart` | label, description, legendPosition |
| Scatter Chart | `wa-scatter-chart` | label, description, xAxisLabel, yAxisLabel, legendPosition |
| Sparkline | `wa-sparkline` | — |

## Layout Utilities (Attribute Directives)
These are CSS-class-based attribute directives, not custom element tags. Apply them to any host element.

| Directive | Selector | Key Inputs | CSS Class Applied |
|-----------|----------|-----------|-------------------|
| Align Items | `[waAlignItems]` | alignment | `wa-align-items-{value}` |
| Cluster | `[waCluster]` | justify, align, gap, wrap | `wa-cluster` |
| Flank | `[waFlank]` | waFlankNowrap, --flank-size, --content-percentage | `wa-flank`, `wa-flank:start`, `wa-flank:end` |
| Frame | `[waFrame]` | aspect-ratio (CSS) | `wa-frame` |
| Gap | `[waGap]` | size | `wa-gap-{size}` |
| Grid | `[waGrid]` | --min-column-size (CSS) | `wa-grid` |
| Split | `[waSplit]` | row, column | `wa-split`, `wa-split:row`, `wa-split:column` |
| Stack | `[waStack]` | gap | `wa-stack` |


## Services
| Service | Import | Purpose |
|---------|--------|---------|
| WaToastService | `angular-awesome` | Programmatic toast notifications |
| provideWaToasts | `angular-awesome` | Bootstrap-time toast config provider |
| Scroller | `wa-scroller` directive | Scrollable container with shadow indicators |
| Page | `wa-page` component | Application shell with header/sidebar/footer slots |

