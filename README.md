# eleventy-plugin-embed-cloudinary

Eleventy plugin to automatically embed in markdown files any image hosted on your Cloudinary Media Library.

Write a URL → get a [responsive image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

## Installation

Install with npm or yarn.

```shell
npm i -D eleventy-plugin-embed-cloudinary
```

Add this plugin to your Eleventy config file (usually `.eleventy.js`):

```js
const embedCloudinary = require('eleventy-plugin-embed-cloudinary');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedCloudinary, {
    apiKey: 'YOUR_CLOUDINARY_API_KEY',
    apiSecret: 'YOUR_CLOUDINARY_API_SECRET'
  });
};
```

## Usage

In your markdown file, just paste the URL of the image you want to include. The URL should be the **only thing on that line**. The image must be hosted on your Cloudinary Media Library.

```mk
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://res.cloudinary.com/jackdbd/image/upload/v1620314435/waterfall_google_chrome_bp672m.png

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.
```

## Configuration

TODO: docs
