📌 This directive assumes compliance with general [Web Awesome Angular Rules](../../../RULES.md).

# Video (`wa-video`)

This directive wraps the `<wa-video>` Web Awesome component to provide Angular integration for embedded video playback with custom controls, captions, and full programmatic control.

## Selector

```ts
wa-video
```

## Projected Content

Use `<source>` and `<track>` elements as children for multi-format video or captioning. For a single source, use the `[src]` input instead.

## Inputs

| Input              | Type                             | Attribute           | Notes                                                                |
|--------------------|----------------------------------|---------------------|----------------------------------------------------------------------|
| `controls`         | `'none' \| 'standard' \| 'full'` | `controls`          | Controls preset. Default: `'standard'`.                              |
| `src`              | `string`                         | `src`               | URL of the video source.                                             |
| `poster`           | `string`                         | `poster`            | Poster image URL shown before playback.                              |
| `title`            | `string`                         | `title`             | Video title shown in the title overlay.                              |
| `thumbnails`       | `string`                         | `thumbnails`        | URL to a WebVTT file for timeline thumbnail previews.                |
| `playing`          | `boolean \| string`              | `playing`           | Indicates the video is currently playing.                            |
| `muted`            | `boolean \| string`              | `muted`             | Mutes the video.                                                     |
| `autoplay`         | `boolean \| string`              | `autoplay`          | Enables autoplay on connect.                                         |
| `loop`             | `boolean \| string`              | `loop`              | Loops playback when ended.                                           |
| `autoplayMuted`    | `boolean \| string`              | `autoplay-muted`    | Autoplay in muted state.                                             |
| `autoplayOnVisible`| `boolean \| string`              | `autoplay-on-visible`| Resume playback when scrolled back into view.                       |
| `volume`           | `number \| string`               | `volume`            | Volume level 0–1.                                                    |
| `duration`         | `number \| string`               | `duration`          | Total duration in seconds (typically read-only from the element).    |
| `currentTime`      | `number \| string`               | `current-time`      | Current playback position in seconds.                                |
| `preload`          | `'auto' \| 'metadata' \| 'none'` | `preload`           | Browser preload strategy. Default: `'metadata'`.                     |
| `iconLibrary`      | `string`                         | `icon-library`      | Icon library for built-in control icons.                             |

## Outputs

| Output            | Native event      | Description                                       |
|-------------------|-------------------|---------------------------------------------------|
| `waPlay`          | `play`            | Emitted when playback begins.                     |
| `waPause`         | `pause`           | Emitted when playback is paused.                  |
| `waTimeupdate`    | `timeupdate`      | Emitted periodically during playback.             |
| `waVolumechange`  | `volumechange`    | Emitted when the volume changes.                  |
| `waError`         | `error`           | Emitted when a loading or playback error occurs.  |
| `waEnded`         | `ended`           | Emitted when playback reaches the end.            |
| `waLoadedmetadata`| `loadedmetadata`  | Emitted when video metadata has loaded.           |

Both camelCase (`waPlay`) and native (`play`) aliases are available.

## Methods (Access via `@ViewChild`)

| Method                       | Description                                  |
|------------------------------|----------------------------------------------|
| `play()`                     | Starts playback.                             |
| `pause()`                    | Pauses playback.                             |
| `togglePlay()`               | Toggles between play and pause.              |
| `toggleMute()`               | Toggles the muted state.                     |
| `seek(time: number)`         | Seeks to the given position in seconds.      |
| `setVolume(volume: number)`  | Sets the volume level (0–1).                 |
| `setPlaybackRate(rate: number)` | Sets the playback speed.                  |
| `requestFullscreen()`        | Enters fullscreen mode.                      |
| `exitFullscreen()`           | Exits fullscreen mode.                       |
| `getVideoElement()`          | Returns the native `<video>` element.        |
| `getState()`                 | Returns the current playback state object.   |

## CSS Custom Properties

| Property                         | Description                                              |
|----------------------------------|----------------------------------------------------------|
| `--controls-color`               | Text/icon color for controls overlays (default: `white`) |
| `--controls-background`          | Background of the controls bar.                          |
| `--poster-play-button-background`| Background of the poster play button.                    |

## Slots

| Slot Name             | Purpose                                                |
|-----------------------|--------------------------------------------------------|
| (default)             | `<source>` and `<track>` elements for multi-format     |
| `controls-start`      | Content before play/pause (used by `wa-video-playlist`)|
| `controls-after-play` | Content after play/pause (used by `wa-video-playlist`) |
| `poster-icon`         | Icon on the poster play button.                        |
| `play-icon`           | Icon for the play state.                               |
| `pause-icon`          | Icon for the pause state.                              |
| `volume-icon`         | Icon when audio is active.                             |
| `mute-icon`           | Icon when muted.                                       |
| `fullscreen-icon`     | Icon for enter-fullscreen button.                      |
| `exit-fullscreen-icon`| Icon for exit-fullscreen button.                       |

---

# Video Playlist (`wa-video-playlist`)

This directive wraps the `<wa-video-playlist>` Web Awesome component, grouping multiple `<wa-video>` elements into a playlist with navigation sidebar and controls.

## Selector

```ts
wa-video-playlist
```

## Projected Content

Place `<wa-video>` elements as direct children to form the playlist.

## Inputs

| Input         | Type                             | Attribute      | Notes                                             |
|---------------|----------------------------------|----------------|---------------------------------------------------|
| `controls`    | `'none' \| 'standard' \| 'full'` | `controls`     | Controls preset forwarded to each child video. Default: `'full'`. |
| `iconLibrary` | `string`                         | `icon-library` | Icon library for placeholder icons.               |

## Outputs

| Output          | Native event       | Description                                |
|-----------------|--------------------|--------------------------------------------|
| `waVideoChange` | `wa-video-change`  | Emitted when the active video changes.     |

## Methods (Access via `@ViewChild`)

| Method              | Description                              |
|---------------------|------------------------------------------|
| `next()`            | Plays the next video in the playlist.    |
| `previous()`        | Plays the previous video in the playlist.|
| `goTo(index: number)` | Jumps to the video at the given index. |

## CSS Parts

| Part               | Description                             |
|--------------------|-----------------------------------------|
| `base`             | The component's base wrapper.           |
| `playlist`         | The playlist sidebar container.         |
| `playlist-item`    | An individual playlist item button.     |
| `playlist-thumbnail` | The thumbnail image in a playlist item. |

---

## Notes

- Use `[src]` for simple single-source videos; use `<source>` children for multi-format fallback.
- The `autoplayMuted` input enables autoplay in environments that block unmuted autoplay.
- Combine `wa-video-playlist` with `wa-video` children; playlist controls (`controls` input) override child video controls.
- Events use native names (`play`, `pause`, etc.) — no `wa-` prefix unlike most other Web Awesome events.
