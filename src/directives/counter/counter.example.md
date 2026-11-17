### Countdown with custom finished content

```html
<wa-counter label="Registration opens in" [duration]="90_000" largestUnit="minutes">
  <span slot="finished">Registration is open.</span>
</wa-counter>
```

### Elapsed time

```html
<wa-counter direction="up" [date]="launchDate" format="short"></wa-counter>
```
