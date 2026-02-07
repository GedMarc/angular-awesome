# Popover Examples

## Basic Usage

```html
<button id="popover-trigger">Click me</button>
<wa-popover anchor="popover-trigger">
  <div class="popover-content">
    This is a basic popover anchored to a button.
  </div>
</wa-popover>
```

## Activating

Popovers are inactive and hidden until the `active` attribute is applied. Removing the attribute will tear down all positioning logic and listeners, meaning you can have many idle popovers on the page without affecting performance.

```html
<button id="popover-active-trigger" onclick="document.getElementById('active-popover').toggleAttribute('active')">
  Toggle Popover
</button>
<wa-popover id="active-popover" anchor="popover-active-trigger">
  <div class="popover-content">
    This popover is toggled by clicking the button.
  </div>
</wa-popover>
```

## External Anchors

By default, anchors are slotted into the popover using the `anchor` slot. If your anchor needs to live outside of the popover, you can pass the anchor's id to the `anchor` attribute.

```html
<!-- Using anchor attribute -->
<button id="external-anchor">External Anchor</button>
<wa-popover anchor="external-anchor" active>
  <div class="popover-content">
    This popover is anchored to an external element.
  </div>
</wa-popover>

<!-- Using anchor slot -->
<wa-popover active>
  <button slot="anchor">Slotted Anchor</button>
  <div class="popover-content">
    This popover uses a slotted anchor.
  </div>
</wa-popover>
```

## Placement

Use the `placement` attribute to tell the popover the preferred placement of the popover. Note that the actual position will vary to ensure the panel remains in the viewport if you're using positioning features such as flip and shift.

```html
<div class="placement-examples">
  <!-- Top placement (default) -->
  <div class="example">
    <button id="top-anchor">Top</button>
    <wa-popover anchor="top-anchor" placement="top" active>
      <div class="popover-content">Top placement</div>
    </wa-popover>
  </div>

  <!-- Right placement -->
  <div class="example">
    <button id="right-anchor">Right</button>
    <wa-popover anchor="right-anchor" placement="right" active>
      <div class="popover-content">Right placement</div>
    </wa-popover>
  </div>

  <!-- Bottom placement -->
  <div class="example">
    <button id="bottom-anchor">Bottom</button>
    <wa-popover anchor="bottom-anchor" placement="bottom" active>
      <div class="popover-content">Bottom placement</div>
    </wa-popover>
  </div>

  <!-- Left placement -->
  <div class="example">
    <button id="left-anchor">Left</button>
    <wa-popover anchor="left-anchor" placement="left" active>
      <div class="popover-content">Left placement</div>
    </wa-popover>
  </div>

  <!-- Top-start placement -->
  <div class="example">
    <button id="top-start-anchor">Top-Start</button>
    <wa-popover anchor="top-start-anchor" placement="top-start" active>
      <div class="popover-content">Top-start placement</div>
    </wa-popover>
  </div>

  <!-- Bottom-end placement -->
  <div class="example">
    <button id="bottom-end-anchor">Bottom-End</button>
    <wa-popover anchor="bottom-end-anchor" placement="bottom-end" active>
      <div class="popover-content">Bottom-end placement</div>
    </wa-popover>
  </div>
</div>
```

## Distance

Use the `distance` attribute to change the distance between the popover and its anchor. A positive value will move the popover further away and a negative value will move it closer.

```html
<div class="distance-examples">
  <!-- Default distance (0px) -->
  <div class="example">
    <button id="default-distance-anchor">Default</button>
    <wa-popover anchor="default-distance-anchor" active>
      <div class="popover-content">Default distance (0px)</div>
    </wa-popover>
  </div>

  <!-- 10px distance -->
  <div class="example">
    <button id="small-distance-anchor">Small</button>
    <wa-popover anchor="small-distance-anchor" distance="10" active>
      <div class="popover-content">10px distance</div>
    </wa-popover>
  </div>

  <!-- 20px distance -->
  <div class="example">
    <button id="medium-distance-anchor">Medium</button>
    <wa-popover anchor="medium-distance-anchor" distance="20" active>
      <div class="popover-content">20px distance</div>
    </wa-popover>
  </div>

  <!-- Negative distance (-5px) -->
  <div class="example">
    <button id="negative-distance-anchor">Negative</button>
    <wa-popover anchor="negative-distance-anchor" distance="-5" active>
      <div class="popover-content">-5px distance (closer)</div>
    </wa-popover>
  </div>
</div>
```

## Skidding

The `skidding` attribute is similar to distance, but instead allows you to offset the popover along the anchor's axis. Both positive and negative values are allowed.

```html
<div class="skidding-examples">
  <!-- Default skidding (0px) -->
  <div class="example">
    <button id="default-skidding-anchor">Default</button>
    <wa-popover anchor="default-skidding-anchor" placement="top" active>
      <div class="popover-content">Default skidding (0px)</div>
    </wa-popover>
  </div>

  <!-- 20px skidding -->
  <div class="example">
    <button id="positive-skidding-anchor">Positive</button>
    <wa-popover anchor="positive-skidding-anchor" placement="top" skidding="20" active>
      <div class="popover-content">20px skidding</div>
    </wa-popover>
  </div>

  <!-- -20px skidding -->
  <div class="example">
    <button id="negative-skidding-anchor">Negative</button>
    <wa-popover anchor="negative-skidding-anchor" placement="top" skidding="-20" active>
      <div class="popover-content">-20px skidding</div>
    </wa-popover>
  </div>
</div>
```

## Arrows

Add an arrow to your popover with the `arrow` attribute. It's usually a good idea to set a distance to make room for the arrow. To adjust the arrow's color and size, use the `--arrow-color` and `--arrow-size` custom properties, respectively. You can also target the arrow part to add additional styles such as shadows and borders.

```html
<div class="arrow-examples">
  <!-- Basic arrow -->
  <div class="example">
    <button id="basic-arrow-anchor">Basic Arrow</button>
    <wa-popover anchor="basic-arrow-anchor" arrow distance="8" active>
      <div class="popover-content">Popover with an arrow</div>
    </wa-popover>
  </div>

  <!-- Arrow with custom placement -->
  <div class="example">
    <button id="arrow-placement-anchor">Custom Placement</button>
    <wa-popover anchor="arrow-placement-anchor" arrow arrow-placement="start" distance="8" active>
      <div class="popover-content">Arrow aligned to start</div>
    </wa-popover>
  </div>

  <!-- Arrow with custom styling -->
  <div class="example">
    <button id="styled-arrow-anchor">Styled Arrow</button>
    <wa-popover 
      anchor="styled-arrow-anchor" 
      arrow 
      distance="8" 
      active
      style="--arrow-color: #ff5722; --arrow-size: 12px;"
    >
      <div class="popover-content">Custom arrow color and size</div>
    </wa-popover>
  </div>
</div>
```

## Flip

When the popover doesn't have enough room in its preferred placement, it can automatically flip to keep it in view and visually connected to its anchor. To enable this, use the `flip` attribute. By default, the popover will flip to the opposite placement, but you can configure preferred fallback placements using `flip-fallback-placement` and `flip-fallback-strategy`.

```html
<div class="flip-examples" style="overflow: auto; height: 300px; padding: 100px 20px;">
  <p>Scroll the container to see how the popover flips to prevent clipping.</p>
  
  <div class="example" style="margin-bottom: 200px;">
    <button id="flip-anchor">Flip Enabled</button>
    <wa-popover anchor="flip-anchor" placement="bottom" flip active>
      <div class="popover-content">
        This popover will flip to the top when there's not enough room at the bottom.
      </div>
    </wa-popover>
  </div>
  
  <div class="example">
    <button id="no-flip-anchor">No Flip</button>
    <wa-popover anchor="no-flip-anchor" placement="bottom" active>
      <div class="popover-content">
        This popover won't flip and might get clipped.
      </div>
    </wa-popover>
  </div>
</div>
```

## Flip Fallbacks

While using the `flip` attribute, you can customize the placement of the popover when the preferred placement doesn't have room. For this, use `flip-fallback-placements` and `flip-fallback-strategy`.

```html
<div class="flip-fallback-examples" style="overflow: auto; height: 300px; padding: 100px 20px;">
  <p>Scroll the container to see how the popover changes its fallback placement to prevent clipping.</p>
  
  <div class="example" style="margin-bottom: 200px;">
    <button id="fallback-anchor">With Fallbacks</button>
    <wa-popover 
      anchor="fallback-anchor" 
      placement="bottom" 
      flip 
      flip-fallback-placements="right left top-start" 
      flip-fallback-strategy="best-fit"
      active
    >
      <div class="popover-content">
        This popover will try different placements in this order: bottom, right, left, top-start.
      </div>
    </wa-popover>
  </div>
</div>
```

## Shift

When a popover is longer than its anchor, it risks overflowing. In this case, use the `shift` attribute to shift the popover along its axis and back into view. You can customize the shift behavior using `shift-boundary` and `shift-padding`.

```html
<div class="shift-examples" style="overflow: auto; width: 300px;">
  <p>Toggle the switch to see the difference.</p>
  
  <div class="example">
    <button id="shift-anchor" style="margin-left: 5px;">Shift Enabled</button>
    <wa-popover anchor="shift-anchor" placement="bottom" shift active>
      <div class="popover-content" style="width: 200px;">
        This popover will shift to stay in view even though it's wider than its anchor.
      </div>
    </wa-popover>
  </div>
  
  <div class="example">
    <button id="no-shift-anchor" style="margin-left: 5px;">No Shift</button>
    <wa-popover anchor="no-shift-anchor" placement="bottom" active>
      <div class="popover-content" style="width: 200px;">
        This popover might overflow the container because shift is disabled.
      </div>
    </wa-popover>
  </div>
</div>
```

## Auto-size

Use the `auto-size` attribute to tell the popover to resize when necessary to prevent it from overflowing. Possible values are `horizontal`, `vertical`, and `both`. You can use `auto-size-boundary` and `auto-size-padding` to customize the behavior of this option.

```html
<div class="auto-size-examples" style="overflow: auto; width: 300px; height: 300px;">
  <p>Scroll the container to see the popover resize as its available space changes.</p>
  
  <div class="example">
    <button id="auto-size-anchor" style="margin: 50px;">Auto-size</button>
    <wa-popover anchor="auto-size-anchor" placement="bottom" auto-size="both" active>
      <div class="popover-content" style="max-width: var(--auto-size-available-width); max-height: var(--auto-size-available-height);">
        This popover will automatically resize to fit within the available space. It contains a lot of content that would normally cause overflow, but the auto-size attribute prevents that from happening.
      </div>
    </wa-popover>
  </div>
</div>
```

## Hover Bridge

When a gap exists between the anchor and the popover element, this option will add a "hover bridge" that fills the gap using an invisible element. This makes listening for events such as mouseover and mouseout more sane because the pointer never technically leaves the element.

```html
<div class="hover-bridge-examples">
  <div class="example">
    <button id="hover-bridge-anchor">With Hover Bridge</button>
    <wa-popover 
      anchor="hover-bridge-anchor" 
      placement="bottom" 
      distance="15" 
      hover-bridge 
      active
    >
      <div class="popover-content">
        This popover has a hover bridge, making it easier to move the mouse between the anchor and the popover without the popover disappearing.
      </div>
    </wa-popover>
  </div>
  
  <div class="example">
    <button id="no-hover-bridge-anchor">Without Hover Bridge</button>
    <wa-popover 
      anchor="no-hover-bridge-anchor" 
      placement="bottom" 
      distance="15" 
      active
    >
      <div class="popover-content">
        This popover doesn't have a hover bridge, so moving the mouse between the anchor and popover might cause the popover to hide.
      </div>
    </wa-popover>
  </div>
</div>
```

## Virtual Elements

In most cases, popovers are anchored to an actual element. Sometimes, it can be useful to anchor them to a non-element. To do this, you can pass a VirtualElement to the anchor property. A virtual element must contain a function called getBoundingClientRect() that returns a DOMRect object.

```javascript
// Example of creating a virtual element that follows the mouse cursor
const virtualElement = {
  getBoundingClientRect() {
    return {
      width: 0,
      height: 0,
      x: mouseX,
      y: mouseY,
      top: mouseY,
      left: mouseX,
      right: mouseX,
      bottom: mouseY
    };
  }
};

// Then use it with the popover
const popover = document.querySelector('wa-popover');
popover.anchor = virtualElement;
```

## Event Handling

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WaPopoverDirective } from '@angular-awesome/directives/popover';

@Component({
  selector: 'app-popover-events-demo',
  template: `
    <button #eventAnchor>Click for Events</button>
    <wa-popover 
      #eventPopover
      [anchor]="eventAnchor"
      (waReposition)="onReposition($event)"
    >
      <div class="popover-content">
        This popover triggers events when repositioned.
      </div>
    </wa-popover>
    
    <div class="event-log">
      <p>Repositioned: {{ repositionCount }} times</p>
      <button (click)="togglePopover()">Toggle Popover</button>
    </div>
  `,
  standalone: true,
  imports: [WaPopoverDirective]
})
export class PopoverEventsDemoComponent implements AfterViewInit {
  @ViewChild('eventPopover') popover!: ElementRef;
  @ViewChild('eventAnchor') anchor!: ElementRef;
  
  repositionCount = 0;
  
  ngAfterViewInit() {
    // Initial setup
  }
  
  togglePopover() {
    const popoverEl = this.popover.nativeElement;
    popoverEl.active = !popoverEl.active;
  }
  
  onReposition(event: CustomEvent) {
    this.repositionCount++;
    console.log('Popover repositioned');
  }
}
```

## Combining Features

```html
<div class="combined-examples">
  <button id="combined-anchor">Advanced Popover</button>
  <wa-popover 
    anchor="combined-anchor"
    placement="bottom"
    arrow
    arrow-placement="center"
    distance="10"
    flip
    shift
    auto-size="both"
    hover-bridge
    active
    style="--arrow-color: #3f51b5;"
  >
    <div class="popover-content">
      <h3>Fully Featured Popover</h3>
      <p>This popover combines multiple features:</p>
      <ul>
        <li>Custom placement</li>
        <li>Arrow with custom color</li>
        <li>Distance from anchor</li>
        <li>Flip to stay in view</li>
        <li>Shift to prevent overflow</li>
        <li>Auto-size to fit available space</li>
        <li>Hover bridge for better mouse interaction</li>
      </ul>
    </div>
  </wa-popover>
</div>
```
