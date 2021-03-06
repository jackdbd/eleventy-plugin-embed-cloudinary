# eleventy-plugin-embed-cloudinary

[![npm version](https://badge.fury.io/js/eleventy-plugin-embed-cloudinary.svg)](https://badge.fury.io/js/eleventy-plugin-embed-cloudinary) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/eleventy-plugin-embed-cloudinary) ![ci workflow](https://github.com/jackdbd/eleventy-plugin-embed-cloudinary/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/jackdbd/eleventy-plugin-embed-cloudinary/branch/main/graph/badge.svg?token=evryHx64zZ)](https://codecov.io/gh/jackdbd/eleventy-plugin-embed-cloudinary) [![CodeFactor](https://www.codefactor.io/repository/github/jackdbd/eleventy-plugin-embed-cloudinary/badge)](https://www.codefactor.io/repository/github/jackdbd/eleventy-plugin-embed-cloudinary) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jackdbd_eleventy-plugin-embed-cloudinary&metric=alert_status)](https://sonarcloud.io/dashboard?id=jackdbd_eleventy-plugin-embed-cloudinary)

Write an image URL → get a responsive image.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details><summary>Table of Contents</summary>

- [What is this?](#what-is-this)
- [Why?](#why)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Required parameters](#required-parameters)
  - [Options](#options)
  - [Image version and image public ID](#image-version-and-image-public-id)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
</details>

## What is this?

This library is an [Eleventy plugin](https://www.11ty.dev/docs/plugins/) that will let you write an **image URL** like this in your markdown...

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.

https://res.cloudinary.com/YOUR_CLOUDINARY_CLOUD_NAME/image/upload/YOUR_IMAGE_VERSION/YOUR_IMAGE_PUBLIC_ID.png

Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.
```

...and it will transform the image URL into a [responsive image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images), optimized for your website visitor's device and browser:

```html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula, elit vel condimentum porta, purus.</p>

<img
  alt="title of your image, retrieved automatically from Cloudinary at build time"
  class="CSS class/es to apply to all all <img> elements generated by this plugin"
  src="URL of the image hosted on your Cloudinary Media Library"
  srcset="comma-separated URLs of images transformed by Cloudinary (see details below)"
  sizes="media condition + comma-separated source size values (see details below)"
  width="width of your image, retrieved automatically from Cloudinary at build time"
  height="height of your image, retrieved automatically from Cloudinary at build time"
  loading="whether the image should be loaded using native lazy loading or not"
/>

<p>Maecenas non velit nibh. Aenean eu justo et odio commodo ornare. In scelerisque sapien at.</p>
```

## Why?

Image optimization is [hard](https://web.dev/fast/#optimize-your-images) and involves all of these steps:

1. serving the best available **image format** (e.g. [AVIF](https://caniuse.com/?search=AVIF), [WebP](https://caniuse.com/?search=WebP)) supported by your website visitors' browser.
2. picking the best **resolution** for each device used by your website visitors (you need to consider [screen quality, Device Pixel Ratio, etc](https://archive.fosdem.org/2021/schedule/event/webperf_making_rum_responsive/)).
3. defining appropriate **caching policies** for your images (see [Caching best practices & max-age gotchas](https://jakearchibald.com/2016/caching-best-practices/)).
4. optimizing your images for **SEO** and **accessibility**.
5. loading images **lazily**, not eagerly.

Even if you are a master of all of these things, it is still a lot of work. An [image CDN](https://web.dev/image-cdns/) like Cloudinary will take care of steps 1-3 (format, resolution, caching policies), so it will likely save you a lot of time. You just need to **upload your highest resolution image** to your Cloudinary Media Library and add `alt` and `title` metadata for SEO and accessibility.

## Installation

Install the plugin with your package manager of choice (npm, yarn, pnpm).

```sh
npm i -D eleventy-plugin-embed-cloudinary
```

Add this plugin to your [Eleventy configuration file](https://www.11ty.dev/docs/config/) (usually `.eleventy.js`):

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

Your API key and API secret are **not** exposed in the generated HTML. They are used to fetch the images hosted on your Cloudinary Media Library when Eleventy builds your site.

> :warning: Don't forget to set the Cloudinary **API key**, **API secret** and **cloud name** on your build server. For example, if your build runs on the Github CI, use [GitHub secrets](https://docs.github.com/en/actions/reference/encrypted-secrets); if the build runs on Netlify, use [Build environment variables](https://docs.netlify.com/configure-builds/environment-variables/).

## Configuration

### Required parameters

| Parameter | Explanation |
| --- | --- |
| `apiKey` | Your Cloudinary API key. |
| `apiSecret` | Your Cloudinary API secret. |
| `cloudName` | Your Cloudinary [cloud name]((https://cloudinary.com/documentation/how_to_integrate_cloudinary#create_and_tour_your_account)). |

### Options

| Option | Default | Explanation |
| --- | --- | --- |
| `cacheDirectory` | `.cache` | Directory where the 11ty `Cache` (see [eleventy-cache-assets](https://github.com/11ty/eleventy-cache-assets)) stores the responses from the Cloudinary API. It is strongly recommended that you add this folder to your `.gitignore` file. |
| `cacheDuration` | `30m` | How long a response stored in the 11ty `Cache` should be considered valid. For the syntax, see [here](https://www.11ty.dev/docs/plugins/cache/#change-the-cache-duration). |
| `classString` | `""` | CSS class/es to apply to the generated `<img>` element. |
| `shouldLazyLoad` | `true` | Whether the generated `<img>` element should have the attribute [loading="lazy"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) to instruct the browser to [defer loading the image](https://web.dev/browser-level-image-lazy-loading/) (browser support [here](https://caniuse.com/loading-lazy-attr)). |
| `shouldThrowOnMissingAlt` | `false` | Whether this plugin should throw an error when fetching an image that does not have an `alt` attribute. See [here](https://support.cloudinary.com/hc/en-us/articles/202521142-Can-I-add-metadata-to-images-) how to add a Description (alt) to an image hosted on your Cloudinary Media Library. |
| `shouldThrowOnMissingCaption` | `false` | Whether this plugin should throw an error when fetching an image that does not have a `caption` attribute. See [here](https://support.cloudinary.com/hc/en-us/articles/202521142-Can-I-add-metadata-to-images-) how to add a Title (caption) to an image hosted on your Cloudinary Media Library. |

### Image version and image public ID

For each image URL you write in your markdown files, you will need to specify its [public ID](https://cloudinary.com/documentation/upload_images#public_id) (it's the last part of the URL, without the file extension) and its [version](https://cloudinary.com/documentation/upload_images#asset_versions).

```markdown
https://res.cloudinary.com/YOUR_CLOUDINARY_CLOUD_NAME/image/upload/YOUR_IMAGE_VERSION/YOUR_IMAGE_PUBLIC_ID.png
```
