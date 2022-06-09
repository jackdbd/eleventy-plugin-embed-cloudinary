/**
 * Fields required to authenticate with Cloudinary.
 *
 * @public
 * @remarks
 * Used by {@link UserConfig}
 */
export interface CloudinaryAuthConfig {
  apiKey: string
  apiSecret: string
  cloudName: string
}

/**
 * Optional fields to configure the Cloudinary client.
 *
 * @public
 * @remarks
 * Used by {@link UserConfig}
 */
export interface CloudinaryClientOptions {
  shouldThrowOnMissingAlt?: boolean
  shouldThrowOnMissingCaption?: boolean
}

export const defaultCloudinaryClientConfig: Required<CloudinaryClientOptions> = {
  shouldThrowOnMissingAlt: false,
  shouldThrowOnMissingCaption: false
}

/**
 * All non-Cloudinary optional fields.
 *
 * @public
 * @remarks
 * Used by {@link UserConfig}
 */
export interface NonCloudinaryOptions {
  cacheDirectory?: string
  cacheDuration?: string
  classString?: string
  shouldLazyLoad?: boolean
}

export const defaultNonCloudinaryConfig: Required<NonCloudinaryOptions> = {
  cacheDirectory: '.cache',
  cacheDuration: '30m',
  classString: '',
  shouldLazyLoad: true
}

export type PluginOptions = CloudinaryClientOptions & NonCloudinaryOptions

export const defaultPluginConfig = {
  ...defaultCloudinaryClientConfig,
  ...defaultNonCloudinaryConfig
}

export type CloudinaryClientConfig = CloudinaryAuthConfig &
  CloudinaryClientOptions

/**
 * Configuration for this plugin.
 *
 * @public
 */
export type UserConfig = CloudinaryAuthConfig &
  Partial<CloudinaryClientOptions> &
  Partial<NonCloudinaryOptions>

/**
 * Complete plugin config with no missing fields.
 *
 * @internal
 */
export type PluginConfig = CloudinaryAuthConfig &
  CloudinaryClientOptions &
  NonCloudinaryOptions
