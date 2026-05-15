# Slider Examples

## Basic Usage

```html
<wa-slider label="Basic Slider"></wa-slider>
```

## Min, Max, and Step Values

```html
<wa-slider 
  label="Custom Range" 
  [min]="0" 
  [max]="100" 
  [step]="5">
</wa-slider>

<wa-slider 
  label="Percentage" 
  [min]="0" 
  [max]="100" 
  [step]="1">
</wa-slider>

<wa-slider 
  label="Temperature" 
  [min]="-20" 
  [max]="40" 
  [step]="0.5">
</wa-slider>

<wa-slider 
  label="Fine Control" 
  [min]="0" 
  [max]="1" 
  [step]="0.01">
</wa-slider>
```

## Showing Tooltips

```html
<!-- With tooltip (shows value when focused or dragged) -->
<wa-slider 
  label="With Tooltip" 
  [withTooltip]="true">
</wa-slider>

<!-- Custom tooltip placement -->
<wa-slider 
  label="Tooltip on Bottom" 
  [withTooltip]="true"
  tooltipPlacement="bottom">
</wa-slider>

<!-- Custom tooltip distance -->
<wa-slider 
  label="Custom Tooltip Distance" 
  [withTooltip]="true"
  [tooltipDistance]="12">
</wa-slider>
```

## Showing Markers

```html
<!-- With markers at each step -->
<wa-slider 
  label="With Markers" 
  [min]="0" 
  [max]="8" 
  [step]="1" 
  [withMarkers]="true">
</wa-slider>
```

## With Hint

```html
<wa-slider 
  label="Volume" 
  hint="Adjust the volume level"
  [min]="0" 
  [max]="100">
</wa-slider>

<!-- Using HTML in hint -->
<wa-slider label="Brightness">
  <div slot="hint">
    Adjust the <strong>brightness</strong> level
  </div>
</wa-slider>
```

## Different Sizes

```html
<!-- Small size -->
<wa-slider 
  label="Small Slider" 
  size="small">
</wa-slider>

<!-- Medium size (default) -->
<wa-slider 
  label="Medium Slider" 
  size="medium">
</wa-slider>

<!-- Large size -->
<wa-slider 
  label="Large Slider" 
  size="large">
</wa-slider>
```

## Range Selection

```html
<!-- Range slider with dual thumbs -->
<wa-slider 
  label="Price Range" 
  [range]="true" 
  [min]="0" 
  [max]="100" 
  [minValue]="20" 
  [maxValue]="80">
</wa-slider>

<!-- Range slider with tooltip -->
<wa-slider 
  label="Temperature Range" 
  [range]="true" 
  [min]="0" 
  [max]="100" 
  [minValue]="30" 
  [maxValue]="70" 
  [withTooltip]="true">
</wa-slider>
```

## Vertical Orientation

```html
<!-- Vertical slider -->
<wa-slider 
  label="Volume" 
  orientation="vertical" 
  [value]="65" 
  style="height: 200px; width: 80px;">
</wa-slider>

<!-- Vertical range slider -->
<wa-slider 
  label="Temperature Range" 
  orientation="vertical" 
  [range]="true" 
  [min]="0" 
  [max]="100" 
  [minValue]="30" 
  [maxValue]="70" 
  [withTooltip]="true" 
  tooltipPlacement="right" 
  style="height: 300px; width: 80px;">
</wa-slider>
```

## Adding References

```html
<!-- With reference labels -->
<wa-slider 
  label="Speed" 
  [min]="1" 
  [max]="5" 
  [value]="3" 
  [withMarkers]="true" 
  hint="Controls the speed of the thing you're currently doing">
  <span slot="reference">Slow</span>
  <span slot="reference">Medium</span>
  <span slot="reference">Fast</span>
</wa-slider>
```

## Indicator Offset

```html
<!-- With indicator offset -->
<wa-slider 
  label="User Friendliness" 
  hint="Did you find our product easy to use?" 
  [min]="-5" 
  [max]="5" 
  [value]="0" 
  [indicatorOffset]="0" 
  [withMarkers]="true" 
  [withTooltip]="true">
  <span slot="reference">Easy</span>
  <span slot="reference">Moderate</span>
  <span slot="reference">Difficult</span>
</wa-slider>
```

## Disabled and Read-only States

```html
<!-- Disabled slider -->
<wa-slider 
  label="Disabled Slider" 
  [disabled]="true" 
  [value]="50">
</wa-slider>

<!-- Read-only slider -->
<wa-slider 
  label="Read-only Slider" 
  [readonly]="true" 
  [value]="50">
</wa-slider>
```

## Required Slider

```html
<form action="about:blank" target="_blank" method="get">
  <wa-slider 
    name="slide" 
    label="Required Slider" 
    [min]="0" 
    [max]="10" 
    [required]="true">
  </wa-slider>
  <br />
  <button type="submit">Submit</button>
</form>
```

## Custom Styling

```html
<!-- Custom track size -->
<wa-slider 
  label="Custom Track Size" 
  [trackSize]="'0.75em'">
</wa-slider>

<!-- Custom marker size -->
<wa-slider 
  label="Custom Markers" 
  [withMarkers]="true" 
  [markerWidth]="'0.25em'" 
  [markerHeight]="'0.25em'">
</wa-slider>

<!-- Custom thumb size -->
<wa-slider 
  label="Custom Thumb Size" 
  [thumbWidth]="'1.5em'" 
  [thumbHeight]="'1.5em'">
</wa-slider>
```

## Value Formatting

```html
<!-- Percentage formatter -->
<wa-slider 
  id="slider__percent" 
  label="Percentage" 
  [min]="0" 
  [max]="1" 
  [step]="0.01" 
  [value]="0.5" 
  [withTooltip]="true">
</wa-slider>

<script>
  const percentSlider = document.getElementById('slider__percent');
  const formatter = new Intl.NumberFormat('en-US', { style: 'percent' });

  customElements.whenDefined('wa-slider').then(() => {
    percentSlider.valueFormatter = value => formatter.format(value);
  });
</script>

<!-- Duration formatter -->
<wa-slider 
  id="slider__duration" 
  label="Duration" 
  [min]="0" 
  [max]="24" 
  [value]="12" 
  [withTooltip]="true">
</wa-slider>

<script>
  const durationSlider = document.getElementById('slider__duration');
  const durationFormatter = new Intl.NumberFormat('en-US', { 
    style: 'unit', 
    unit: 'hour', 
    unitDisplay: 'long' 
  });

  customElements.whenDefined('wa-slider').then(() => {
    durationSlider.valueFormatter = value => durationFormatter.format(value);
  });
</script>

<!-- Currency formatter -->
<wa-slider 
  id="slider__currency" 
  label="Currency" 
  [min]="0" 
  [max]="100" 
  [value]="50" 
  [withTooltip]="true">
</wa-slider>

<script>
  const currencySlider = document.getElementById('slider__currency');
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
  });

  customElements.whenDefined('wa-slider').then(() => {
    currencySlider.valueFormatter = value => currencyFormatter.format(value);
  });
</script>
```

## Event Handling

```html
<wa-slider 
  label="Interactive Slider" 
  (inputEvent)="onSliderInput($event)" 
  (changeEvent)="onSliderChange($event)" 
  (focusEvent)="onSliderFocus()" 
  (blurEvent)="onSliderBlur()"
  (invalidEvent)="onSliderInvalid($event)">
</wa-slider>
```

```typescript
// In your component
function onSliderInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  console.log('Slider input:', value);
}

function onSliderChange(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  console.log('Slider change:', value);
}

function onSliderFocus(): void {
  console.log('Slider focused');
}

function onSliderBlur(): void {
  console.log('Slider blurred');
}

function onSliderInvalid(event: CustomEvent): void {
  console.log('Slider invalid:', event.detail);
}
```

## Using with Angular Bindings

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-slider-demo',
  template: `
    <wa-slider 
      [label]="sliderLabel" 
      [min]="sliderMin" 
      [max]="sliderMax" 
      [step]="sliderStep" 
      [value]="sliderValue" 
      [disabled]="isDisabled"
      [withTooltip]="showTooltip"
      [withMarkers]="showMarkers"
      [orientation]="orientation"
      [size]="sliderSize"
      (inputEvent)="onSliderInput($event)">
    </wa-slider>
    
    <div>Current value: {{ sliderValue }}</div>
    
    <div class="controls">
      <button (click)="isDisabled = !isDisabled">
        {{ isDisabled ? 'Enable' : 'Disable' }} Slider
      </button>
      
      <wa-select [(ngModel)]="orientation" label="Orientation">
        <wa-option value="horizontal">Horizontal</wa-option>
        <wa-option value="vertical">Vertical</wa-option>
      </wa-select>
      
      <wa-select [(ngModel)]="sliderSize" label="Size">
        <wa-option value="small">Small</wa-option>
        <wa-option value="medium">Medium</wa-option>
        <wa-option value="large">Large</wa-option>
      </wa-select>
      
      <wa-checkbox [(ngModel)]="showTooltip" label="Show Tooltip"></wa-checkbox>
      <wa-checkbox [(ngModel)]="showMarkers" label="Show Markers"></wa-checkbox>
    </div>
  `
})
export class SliderDemoComponent {
  sliderLabel = 'Customizable Slider';
  sliderMin = 0;
  sliderMax = 100;
  sliderStep = 1;
  sliderValue = 50;
  isDisabled = false;
  showTooltip = true;
  showMarkers = false;
  orientation = 'horizontal';
  sliderSize = 'medium';
  
  onSliderInput(event: Event): void {
    this.sliderValue = parseFloat((event.target as HTMLInputElement).value);
  }
}
```

## Using with ngModel

```html
<form #sliderForm="ngForm">
  <wa-slider 
    label="Volume" 
    name="volume" 
    [(ngModel)]="volumeLevel" 
    [min]="0" 
    [max]="100" 
    [step]="1"
    [withTooltip]="true">
  </wa-slider>
  
  <div>Current volume: {{ volumeLevel }}%</div>
</form>
```

## Using with Range Slider and ngModel

```html
<form #rangeForm="ngForm">
  <wa-slider 
    label="Price Range" 
    name="priceRange" 
    [range]="true"
    [min]="0" 
    [max]="1000" 
    [(ngModel)]="priceRange" 
    [withTooltip]="true">
  </wa-slider>
  
  <div>Min price: ${{ priceRange?.min }}</div>
  <div>Max price: ${{ priceRange?.max }}</div>
</form>
```

```typescript
// In your component
priceRange = { min: 200, max: 800 };
```

## Real-World Example: Image Editor Controls

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-editor',
  template: `
    <div class="image-editor">
      <h2>Image Editor</h2>
      
      <div class="editor-container">
        <div class="controls-panel">
          <wa-slider 
            label="Brightness" 
            [min]="-100" 
            [max]="100" 
            [step]="1" 
            [(ngModel)]="brightness"
            [withTooltip]="true"
            (inputEvent)="updateImage()">
          </wa-slider>
          
          <wa-slider 
            label="Contrast" 
            [min]="-100" 
            [max]="100" 
            [step]="1" 
            [(ngModel)]="contrast"
            [withTooltip]="true"
            (inputEvent)="updateImage()">
          </wa-slider>
          
          <wa-slider 
            label="Saturation" 
            [min]="-100" 
            [max]="100" 
            [step]="1" 
            [(ngModel)]="saturation"
            [withTooltip]="true"
            (inputEvent)="updateImage()">
          </wa-slider>
          
          <wa-slider 
            label="Blur" 
            [min]="0" 
            [max]="20" 
            [step]="0.1" 
            [(ngModel)]="blur"
            [withTooltip]="true"
            (inputEvent)="updateImage()">
          </wa-slider>
          
          <wa-slider 
            label="Hue Rotate" 
            [min]="0" 
            [max]="360" 
            [step]="1" 
            [(ngModel)]="hueRotate"
            [withTooltip]="true"
            [withMarkers]="true"
            [indicatorOffset]="0"
            (inputEvent)="updateImage()">
            <span slot="reference">0°</span>
            <span slot="reference">180°</span>
            <span slot="reference">360°</span>
          </wa-slider>
          
          <button (click)="resetFilters()">Reset All</button>
        </div>
        
        <div class="image-preview">
          <img 
            [src]="imageUrl" 
            [style.filter]="getFilterString()" 
            alt="Edited image">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .image-editor {
      padding: 20px;
    }
    
    .editor-container {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
    
    .controls-panel {
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .image-preview {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f0f0f0;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .image-preview img {
      max-width: 100%;
      max-height: 500px;
    }
  `]
})
export class ImageEditorComponent {
  imageUrl = 'assets/sample-image.jpg';
  brightness = 0;
  contrast = 0;
  saturation = 0;
  blur = 0;
  hueRotate = 0;
  
  updateImage(): void {
    // The image updates automatically via the style binding
    console.log('Image filters updated');
  }
  
  resetFilters(): void {
    this.brightness = 0;
    this.contrast = 0;
    this.saturation = 0;
    this.blur = 0;
    this.hueRotate = 0;
    this.updateImage();
  }
  
  getFilterString(): string {
    return `
      brightness(${100 + this.brightness}%) 
      contrast(${100 + this.contrast}%) 
      saturate(${100 + this.saturation}%) 
      blur(${this.blur}px) 
      hue-rotate(${this.hueRotate}deg)
    `;
  }
}
