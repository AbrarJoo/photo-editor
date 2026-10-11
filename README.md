# Photo Editor

A browser-based photo editor. Pick an image, adjust nine live filters with sliders, apply one of sixteen one-click presets, and download the result as a PNG. Everything happens locally in your browser, so your image is never uploaded anywhere.

Built with plain HTML, CSS and JavaScript using the Canvas API. No frameworks, no build step.

<!-- Add a screenshot or GIF of the editor here, for example: -->
<!-- ![Photo Editor screenshot](screenshot.png) -->

**Live demo:** _add your GitHub Pages / Netlify link here_

## Features

- **Open any image** from your device (`image/*`)
- **9 live filters**: brightness, contrast, saturation, hue rotation, blur, grayscale, sepia, opacity and invert
- **16 presets**: Normal, Drama, Vintage, Old School, Cinematic, Black and White, Faded, Cool, Warm, Moody, Faded Film, Dreamy, Noir, Retro, Cyberpunk and Soft
- **Non-destructive editing**: the original image is kept untouched and redrawn on every change, so filters never pile up
- **Reset** all filters to their defaults in one click
- **Download** the edited image as `edited-image.png` at the original resolution
- **Dark theme** driven by CSS custom properties in a separate `theme.css`

## Tech Stack

| Layer | Technology |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3 (custom properties, Flexbox, styled range inputs) |
| Logic | Vanilla JavaScript (ES6) |
| Image processing | Canvas 2D API (`ctx.filter`) |
| Icons | [Remix Icon](https://remixicon.com/) via CDN (placeholder icon only) |

## Getting Started

No installation is needed.

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git

# 2. Go into the project folder
cd <your-repo>

# 3. Open index.html in your browser
```

You can also double-click `index.html`. An internet connection is only needed for the placeholder icon; everything else works offline.

## Usage

1. Click **Choose Image** and select a picture.
2. Drag the sliders in the **Filters** panel. The image updates live.
3. Or click a button in **Presets** for an instant look.
4. Click **Reset** to return every filter to its default.
5. Click **Download** to save the edited image as a PNG.

## Project Structure

```
.
├── index.html   # Page markup: buttons, preview area, filter and preset panels
├── theme.css    # Design tokens: colours, spacing, font sizes, radii
├── style.css    # Layout and component styling
└── script.js    # State, slider/preset generation, image loading, filtering, export
```

## How It Works

1. **State**: a `filters` object stores each filter's current value, slider range and CSS unit.
2. **Generated UI**: the sliders are created from that object, and the preset buttons from a `presets` object, so nothing is hard-coded in the HTML.
3. **Loading**: the chosen file becomes an `Image` through `URL.createObjectURL`. The canvas is sized to the image's natural size and the image is drawn on it.
4. **Filtering**: `applyFilters()` clears the canvas, builds a CSS filter string from the `filters` object, assigns it to `canvasCtx.filter`, and redraws the **original** image. The browser applies the whole chain while drawing.
5. **Exporting**: `canvas.toDataURL()` produces a PNG, which a temporary `<a download>` link saves.

The filters are always applied in this order:

```
brightness → contrast → saturate → hue-rotate → blur → grayscale → sepia → opacity → invert
```

### Filters

| Filter | Default | Range |
| --- | --- | --- |
| Brightness | 100% | 0 – 200% |
| Contrast | 100% | 0 – 200% |
| Saturation | 100% | 0 – 200% |
| Hue rotation | 0° | 0 – 360° |
| Blur | 0px | 0 – 20px |
| Grayscale | 0% | 0 – 100% |
| Sepia | 0% | 0 – 100% |
| Opacity | 100% | 0 – 100% |
| Invert | 0% | 0 – 100% |

## Customization

| Want to change | Where |
| --- | --- |
| Colours, spacing, radii | CSS variables in `theme.css` |
| A filter's range or default | Its entry in the `filters` object in `script.js` (and in the Reset copy) |
| Add a preset | Add an object to `presets` with all nine keys. The button is created automatically. |
| Add a filter | Add it to `filters` (and Reset), add its function to the string in `applyFilters()`, and add its key to every preset. The slider is generated automatically. |
| Export format | `link.download` and the `toDataURL()` argument, e.g. `toDataURL("image/jpeg", 0.9)` |

## Known Limitations

- Clicking a preset updates the image but does **not** move the sliders, so the sliders can show different values from the ones in use.
- Loading a new image draws it without filters, even if the sliders are not at their defaults.
- Cancelling the file picker throws a console error, and an undecodable file leaves a blank canvas.
- Some presets use decimal blur values (0.2, 0.3, 0.5), which the sliders cannot show because they use a step of 1.
- Download works with no image loaded and produces a blank PNG.
- Sliders show no numeric value, and labels use raw names such as `Huerotation`.
- Only the WebKit slider thumb is styled, so Firefox shows its default thumb.
- `CanvasRenderingContext2D.filter` has historically not been supported in every browser (notably Safari). Check the current compatibility tables.
- The layout is not responsive on small screens.

## Roadmap

- [ ] Sync sliders with presets and loaded images
- [ ] Error handling for cancelled or invalid files
- [ ] Show each slider's numeric value
- [ ] Before / after comparison
- [ ] Crop, rotate and flip
- [ ] Export as JPEG / WebP
- [ ] Custom presets, undo / redo
- [ ] Responsive layout

## Contributing

Contributions are welcome. Fork the repo, create a branch, make your changes and open a pull request.

## License

_Add a license of your choice (for example MIT) and link it here._
