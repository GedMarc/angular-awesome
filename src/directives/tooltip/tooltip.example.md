# Tooltip Examples

## Basic Usage

```html
<wa-tooltip for="my-button">This is a tooltip</wa-tooltip> 
<wa-button id="my-button">Hover Me</wa-button>
```

## Placement

```html
<div class="tooltip-placement-example">
  <div class="tooltip-placement-example-row">
    <wa-button id="tooltip-top-start"></wa-button>
    <wa-button id="tooltip-top"></wa-button>
    <wa-button id="tooltip-top-end"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button id="tooltip-left-start"></wa-button>
    <wa-button id="tooltip-right-start"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button id="tooltip-left"></wa-button>
    <wa-button id="tooltip-right"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button id="tooltip-left-end"></wa-button>
    <wa-button id="tooltip-right-end"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button id="tooltip-bottom-start"></wa-button>
    <wa-button id="tooltip-bottom"></wa-button>
    <wa-button id="tooltip-bottom-end"></wa-button>
  </div>
</div>

<wa-tooltip for="tooltip-top-start" placement="top-start">top-start</wa-tooltip>
<wa-tooltip for="tooltip-top" placement="top">top</wa-tooltip>
<wa-tooltip for="tooltip-top-end" placement="top-end">top-end</wa-tooltip>
<wa-tooltip for="tooltip-left-start" placement="left-start">left-start</wa-tooltip>
<wa-tooltip for="tooltip-right-start" placement="right-start">right-start</wa-tooltip>
<wa-tooltip for="tooltip-left" placement="left">left</wa-tooltip>
<wa-tooltip for="tooltip-right" placement="right">right</wa-tooltip>
<wa-tooltip for="tooltip-left-end" placement="left-end">left-end</wa-tooltip>
<wa-tooltip for="tooltip-right-end" placement="right-end">right-end</wa-tooltip>
<wa-tooltip for="tooltip-bottom-start" placement="bottom-start">bottom-start</wa-tooltip>
<wa-tooltip for="tooltip-bottom" placement="bottom">bottom</wa-tooltip>
<wa-tooltip for="tooltip-bottom-end" placement="bottom-end">bottom-end</wa-tooltip>
```

## Click Trigger

```html
<wa-button id="toggle-button">Click to Toggle</wa-button>
<wa-tooltip for="toggle-button" trigger="click">Click again to dismiss</wa-tooltip>
```

## Manual Trigger

```html
<wa-button style="margin-right: 4rem;" (click)="toggleTooltip()">Toggle Manually</wa-button>

<wa-tooltip for="manual-trigger-tooltip" trigger="manual" #manualTooltip>This is an avatar!</wa-tooltip>
<wa-avatar id="manual-trigger-tooltip" label="User"></wa-avatar>
```

```typescript
@Component({
  // ...
})
export class TooltipManualExample {
  @ViewChild('manualTooltip') tooltip!: WaTooltipDirective;
  
  toggleTooltip() {
    if (this.tooltip.open) {
      this.tooltip.hide();
    } else {
      this.tooltip.show();
    }
  }
}
```

## Removing Arrows

```html
<wa-button id="no-arrow">No Arrow</wa-button>
<wa-tooltip for="no-arrow" [withoutArrow]="true">This is a tooltip with no arrow</wa-tooltip>
```

You can also remove arrows globally by setting the CSS custom property:

```css
:root {
  --wa-tooltip-arrow-size: 0;
}
```

## HTML in Tooltips

```html
<wa-button id="rich-tooltip">Hover me</wa-button>
<wa-tooltip for="rich-tooltip">
  <div>I'm not <strong>just</strong> a tooltip, I'm a <em>tooltip</em> with HTML!</div>
</wa-tooltip>
```

## Setting a Maximum Width

```html
<wa-tooltip for="wrapping-tooltip" [maxWidth]="'80px'">
  This tooltip will wrap after only 80 pixels.
</wa-tooltip>
<wa-button id="wrapping-tooltip">Hover me</wa-button>
```

## Custom Distance and Skidding

```html
<!-- Custom distance from target -->
<wa-button id="tooltip-distance">Distance</wa-button>
<wa-tooltip for="tooltip-distance" [distance]="16">16px away from target</wa-tooltip>

<!-- Custom skidding (offset along the target) -->
<wa-button id="tooltip-skidding">Skidding</wa-button>
<wa-tooltip for="tooltip-skidding" [skidding]="10">Offset 10px along the target</wa-tooltip>

<!-- Combined distance and skidding -->
<wa-button id="tooltip-combined">Combined</wa-button>
<wa-tooltip for="tooltip-combined" [distance]="20" [skidding]="-15">Custom positioning</wa-tooltip>
```

## Custom Delays

```html
<!-- Custom show delay -->
<wa-button id="tooltip-show-delay">Slow to appear</wa-button>
<wa-tooltip for="tooltip-show-delay" [showDelay]="500">Appears after 500ms</wa-tooltip>

<!-- Custom hide delay -->
<wa-button id="tooltip-hide-delay">Slow to disappear</wa-button>
<wa-tooltip for="tooltip-hide-delay" [hideDelay]="1000">Disappears after 1000ms</wa-tooltip>
```

## Custom Styling

```html
<!-- Custom background color -->
<wa-button id="tooltip-bg">Custom background</wa-button>
<wa-tooltip for="tooltip-bg" [backgroundColor]="'#3f51b5'">Blue background</wa-tooltip>

<!-- Custom border radius -->
<wa-button id="tooltip-radius">Custom radius</wa-button>
<wa-tooltip for="tooltip-radius" [borderRadius]="'0'">Square tooltip</wa-tooltip>

<!-- Custom max width -->
<wa-button id="tooltip-width">Custom width</wa-button>
<wa-tooltip for="tooltip-width" [maxWidth]="'300px'">This tooltip can be up to 300px wide, which is useful for longer content that would otherwise be truncated.</wa-tooltip>

<!-- Custom padding -->
<wa-button id="tooltip-padding">Custom padding</wa-button>
<wa-tooltip for="tooltip-padding" [padding]="'16px'">More spacious tooltip</wa-tooltip>

<!-- Custom arrow size -->
<wa-button id="tooltip-arrow">Custom arrow</wa-button>
<wa-tooltip for="tooltip-arrow" [arrowSize]="'12px'">Tooltip with larger arrow</wa-tooltip>

<!-- Combined custom styling -->
<wa-button id="tooltip-custom">Fully customized</wa-button>
<wa-tooltip 
  for="tooltip-custom" 
  [backgroundColor]="'#212121'" 
  [borderRadius]="'8px'" 
  [maxWidth]="'250px'" 
  [padding]="'12px'" 
  [arrowSize]="'8px'"
>
  A fully customized tooltip with dark background, rounded corners, custom width, padding, and arrow size.
</wa-tooltip>
```

## Event Handling

```typescript
import { Component } from '@angular/core';
import { WaTooltipDirective } from '@angular-awesome/directives/tooltip';

@Component({
  selector: 'app-tooltip-events-demo',
  template: `
    <wa-button id="tooltip-events">Hover for events</wa-button>
    <wa-tooltip 
      for="tooltip-events"
      (waShow)="onShow($event)"
      (waAfterShow)="onAfterShow($event)"
      (waHide)="onHide($event)"
      (waAfterHide)="onAfterHide($event)"
    >
      This tooltip triggers events
    </wa-tooltip>
    
    <div class="event-log">
      <p>Last event: {{ lastEvent }}</p>
    </div>
  `,
  standalone: true,
  imports: [WaTooltipDirective]
})
export class TooltipEventsDemoComponent {
  lastEvent = 'None';
  
  onShow(event: CustomEvent) {
    this.lastEvent = 'Show started';
    console.log('Tooltip show started');
  }
  
  onAfterShow(event: CustomEvent) {
    this.lastEvent = 'Show completed';
    console.log('Tooltip show completed');
  }
  
  onHide(event: CustomEvent) {
    this.lastEvent = 'Hide started';
    console.log('Tooltip hide started');
  }
  
  onAfterHide(event: CustomEvent) {
    this.lastEvent = 'Hide completed';
    console.log('Tooltip hide completed');
  }
}
```

## Dynamic Content

```typescript
import { Component } from '@angular/core';
import { WaTooltipDirective } from '@angular-awesome/directives/tooltip';

@Component({
  selector: 'app-dynamic-tooltip-demo',
  template: `
    <div class="user-list">
      <div 
        *ngFor="let user of users; let i = index" 
        class="user-item"
        [id]="'user-' + i"
      >
        {{ user.name }}
      </div>
      
      <wa-tooltip 
        *ngFor="let user of users; let i = index"
        [for]="'user-' + i"
      >
        <div class="user-tooltip">
          <h3>{{ user.name }}</h3>
          <p>Email: {{ user.email }}</p>
          <p>Role: {{ user.role }}</p>
        </div>
      </wa-tooltip>
    </div>
  `,
  standalone: true,
  imports: [WaTooltipDirective]
})
export class DynamicTooltipDemoComponent {
  users = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' }
  ];
}
```
