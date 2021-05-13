export interface BasicConfig {
  cacheDirectory: string;
  cacheDuration: string;
  classString: string;
  shouldLazyLoad: boolean;
  shouldThrowOnMissingAlt: boolean;
  shouldThrowOnMissingCaption: boolean;
}

export interface RequiredConfig {
  apiKey: string;
  apiSecret: string;
}

export interface PluginConfig extends BasicConfig {
  apiKey: string;
  apiSecret: string;
}

export type UserConfig = RequiredConfig & Partial<BasicConfig>;

export const defaultConfig: BasicConfig = {
  cacheDirectory: '.cache',
  cacheDuration: '30m',
  classString: '',
  shouldLazyLoad: true,
  shouldThrowOnMissingAlt: false,
  shouldThrowOnMissingCaption: false,
};
