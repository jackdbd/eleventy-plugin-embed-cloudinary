import { defaultPluginConfig, PluginConfig, UserConfig } from './config';
import { cloudinaryRespImage } from './shortcodes';
import { makeEmbedCloudinary } from './transforms';

/**
 * Configure the plugin to work with your eleventy configuration.
 *
 * @public
 * @param eleventyConfig - Configuration for eleventy.
 * @param userConfig - Configuration for this plugin.
 * @remarks
 * This is the function exported by this plugin.
 */
export const configFunction = (eleventyConfig: any, userConfig: UserConfig) => {
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
