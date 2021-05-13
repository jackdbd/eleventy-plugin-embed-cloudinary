import { defaultConfig, UserConfig } from './config';
import { cloudinaryRespImage } from './shortcodes';
import { makeEmbedCloudinary } from './transforms';

export const configFunction = (eleventyConfig: any, userConfig: UserConfig) => {
  const pluginConfig = Object.assign({}, defaultConfig, userConfig);
  // One can manually use the shortcode...
  eleventyConfig.addShortcode('cloudinaryRespImage', cloudinaryRespImage);
  // ...or use the transform.
  eleventyConfig.addTransform(
    'embedCloudinary',
    makeEmbedCloudinary(pluginConfig)
  );
};
