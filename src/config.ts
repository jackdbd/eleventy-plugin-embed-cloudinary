// Fields required to authenticate with Cloudinary.
export interface CloudinaryAuthConfig {
  apiKey: string;
  apiSecret: string;
  cloudName: string;
}

// Optional fields to configure the Cloudinary client.
export interface CloudinaryClientOptions {
  shouldThrowOnMissingAlt?: boolean;
  shouldThrowOnMissingCaption?: boolean;
}

export const defaultCloudinaryClientConfig: Required<CloudinaryClientOptions> = {
  shouldThrowOnMissingAlt: false,
  shouldThrowOnMissingCaption: false,
};

// All non-Cloudinary optional fields.
export interface NonCloudinaryOptions {
  cacheDirectory?: string;
  cacheDuration?: string;
  classString?: string;
  shouldLazyLoad?: boolean;
}

export const defaultNonCloudinaryConfig: Required<NonCloudinaryOptions> = {
  cacheDirectory: '.cache',
  cacheDuration: '30m',
  classString: '',
  shouldLazyLoad: true,
};

export type PluginOptions = CloudinaryClientOptions & NonCloudinaryOptions;

export const defaultPluginConfig = {
  ...defaultCloudinaryClientConfig,
  ...defaultNonCloudinaryConfig,
};

// Configuration for any Cloudinary client. A Cloudinary client doesn't
// necessarily cache HTTP requests.
export type CloudinaryClientConfig = CloudinaryAuthConfig &
  CloudinaryClientOptions;

export type UserConfig = CloudinaryAuthConfig &
  Partial<CloudinaryClientOptions> &
  Partial<NonCloudinaryOptions>;

export type PluginConfig = CloudinaryAuthConfig &
  CloudinaryClientOptions &
  NonCloudinaryOptions;
