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
    apiSecret: 'YOUR_CLOUDINARY_API_SECRET',
    cloudName: 'YOUR_CLOUDINARY_CLOUD_NAME'
  });
};
```

## Usage

In your markdown file, just paste the URL of the image you want to include. The URL should be the **only thing on that line**. The image must be hosted on your Cloudinary Media Library.

```mk
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://res.cloudinary.com/CLOUD_NAME/image/upload/VERSION/PUBLIC_ID.png

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.
```

Where:

- `CLOUD_NAME` is your Cloudinary [cloud name](https://cloudinary.com/documentation/how_to_integrate_cloudinary#create_and_tour_your_account);
- `PUBLIC_ID` is the [unique identifier](https://cloudinary.com/documentation/upload_images#public_id) for the image hosted on your Cloudinary Media Library;
- `VERSION` is the [asset version](https://cloudinary.com/documentation/upload_images#asset_versions) of the image.

## Configuration

### Required

- `apiKey` [string]: API key of your Cloudinary account
- `apiSecret` [string]: API secret of your Cloudinary account
- `cloudName` [string]: cloud name of your Cloudinary account

### Optional

- `cacheDirectory` [string] [default: `.cache`]: directory where the 11ty `Cache` (see [eleventy-cache-assets](https://github.com/11ty/eleventy-cache-assets)) stores the responses from the Cloudinary API (it is strongly recommended that you add this folder to your `.gitignore` file).
- `cacheDuration` [string] [default: `30m`]: how long a response stored in the 11ty `Cache` should be considered valid. For the syntax, see [here](https://www.11ty.dev/docs/plugins/cache/#change-the-cache-duration).
- `classString` [string] [default: `""`]: CSS class/es to apply to the generated `<img>` element.
- `shouldLazyLoad` [boolean] [default: `true`]: whether the generated `<img>` element should have the attribute [loading="lazy"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) to instruct the browser to [defer loading the image](https://web.dev/browser-level-image-lazy-loading/) (browser support [here](https://caniuse.com/loading-lazy-attr)).
- `shouldThrowOnMissingAlt` [boolean] [default: `false`]: whether this plugin should throw an error when fetching an image that does not have an `alt` attribute. See [here](https://support.cloudinary.com/hc/en-us/articles/202521142-Can-I-add-metadata-to-images-) how to add a Description (alt) to an image hosted on your Cloudinary Media Library.
- `shouldThrowOnMissingCaption` [boolean] [default: `false`]: whether this plugin should throw an error when fetching an image that does not have a `caption` attribute. See [here](https://support.cloudinary.com/hc/en-us/articles/202521142-Can-I-add-metadata-to-images-) how to add a Title (caption) to an image hosted on your Cloudinary Media Library.

## Release management

This project uses a combination of bash scripts, [xyz](https://github.com/davidchambers/xyz), [auto-changelog](https://github.com/cookpete/auto-changelog) and the [GitHub CLI](https://github.com/cli/cli) to update the `CHANGELOG.md`, create a new GitHub release, and publish a new version of the [package on npm](https://www.npmjs.com/package/eleventy-plugin-embed-cloudinary).

The version number is assigned according to [Semantic Versioning](http://semver.org/).

```sh
npm run release:patch
npm run release:minor
npm run release:major
```
