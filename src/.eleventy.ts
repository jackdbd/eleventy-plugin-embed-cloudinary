import { defaultPluginConfig, PluginConfig, UserConfig } from './config';
import { cloudinaryRespImage } from './shortcodes';
import { makeEmbedCloudinary } from './transforms';

export const configFunction = (eleventyConfig: any, userConfig: UserConfig) => {
  // plugin config with no missing fields
  const pluginConfig: Required<PluginConfig> = Object.assign(
    {},
    defaultPluginConfig,
    userConfig
  );

  eleventyConfig.addShortcode('cloudinaryRespImage', cloudinaryRespImage);
  eleventyConfig.addTransform(
    'embedCloudinary',
    makeEmbedCloudinary(pluginConfig)
  );
};
