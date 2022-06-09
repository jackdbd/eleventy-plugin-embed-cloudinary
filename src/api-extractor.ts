/**
 * Eleventy plugin to automatically embed images hosted on Cloudinary.
 *
 * @example
 * Here is the minimal configuration:
 * ```
 * const embedCloudinary = require('eleventy-plugin-embed-cloudinary');
 *
 * eleventyConfig.addPlugin(embedCloudinary, {
 *   apiKey: process.env.CLOUDINARY_API_KEY,
 *   apiSecret: process.env.CLOUDINARY_API_SECRET,
 *   cloudName: process.env.CLOUDINARY_CLOUD_NAME
 * });
 * ```
 *
 * @packageDocumentation
 */

// Note: this is a dummy source file to overcome api-extractor's limitations.
// See "An important limitation" in this article
// https://api-extractor.com/pages/setup/configure_rollup/

import { configFunction } from './.eleventy'

export {
  CloudinaryAuthConfig,
  NonCloudinaryOptions,
  CloudinaryClientOptions,
  UserConfig
} from './config'

export default configFunction
