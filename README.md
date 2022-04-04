# Alpine Breakpoints Plugin
A [Alpine.js](https://alpinejs.dev/) plugin and magic method that helps components respond to 📱 💻 🖥 breakpoint changes.

## Installation
---
### CDN

You can include the CDN build of this plugin as a `<script>` tag, just make sure to include it before Alpinejs file.

```html
  <script defer src="https://unpkg.com/alpinejs-breakpoints"></script>
  <script defer src="https://unpkg.com/alpinejs"></script>
```

### NPM

You can install Intersect from NPM for use inside your bundle like so:

```bash
  npm install alpinejs-breakpoints
```
Then initialize it from your bundle:

```js
import Alpine from 'alpinejs'
import breakpoint from 'alpinejs-breakpoints'
 
Alpine.plugin(breakpoint)
Alpine.start()
```

## Usage
First define the breakpoints for all screen sizes you want, as in the example below:

```css
:root { --breakpoint: 'unset';}
@media screen and (min-width: 567px) {
  :root { --breakpoint: 'sm'; }
}
@media screen and (min-width: 900px) {
  :root { --breakpoint: 'md'; }
}
@media screen and (min-width: 1200px) {
  :root { --breakpoint: 'lg'; }
}
@media screen and (min-width: 1600px) {
  :root { --breakpoint: '2xl'; }
}
```

An example of markup for a component that reacts to screen size changes.

```html
<div
  x-data="{ text: null }"
  x-text="text"
  x-breakpoint="
    if($isBreakpoint('lg+')) text = 'Large screen and above'
    if($isBreakpoint('md-')) text = 'Medium screen and below'
  ">
</div>
```

## How it works

The plugin monitors changes to the `--breakpoint` variable through `x-effect`, with each change using the `$isBreakpoint()` magic method, you can check the current breakpoint and call the desired behavior.

`$isBreakpoint()` method takes a breakpoint string from your css and optional `+` or `-` modifier.

Example:   
```html
  $isBreakpoint('xl')  <!-- will work only on [xl] screen -->
  $isBreakpoint('lg+') <!-- will work on [lg xl 2xl] (lg and above) screens -->   
  $isBreakpoint('md-') <!-- will work on [md sm unset] (md and below) screens -->
```

## Customization

```js
  // The default breakpoints array:
  // ['unset', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
  // 
  // You can change default breakpoints array: 
  window.AlpineBreakpointPluginBreakpointsList = ['mobile', 'tablet', 'desktop']
```
