import { defaultConfig, UserConfig } from './config';
import { cloudinaryRespImage } from './shortcodes';
import { makeEmbedCloudinary } from './transforms';

export const configFunction = (eleventyConfig: any, userConfig: UserConfig) => {
  const pluginConfig = Object.assign({}, defaultConfig, userConfig);
  eleventyConfig.addShortcode('cloudinaryRespImage', cloudinaryRespImage);
  eleventyConfig.addTransform(
    'embedCloudinary',
    makeEmbedCloudinary(pluginConfig)
  );
};
