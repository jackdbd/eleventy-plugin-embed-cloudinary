import { defaultConfig, PluginConfig, UserConfig } from './config';
import { getData, getMatches } from './regex';
import { fetchFromCloudinary } from './cloudinary-api-client';
import { cloudinaryRespImage } from './shortcodes';

const makeEmbedCloudinary = (pluginConfig: PluginConfig) => {
  return async (content: string, outputPath: string) => {
    if (outputPath && outputPath.endsWith('.html')) {
      const matches = getMatches(content);
      if (!matches) {
        return content;
      }

      for (const [_index, stringToReplace] of matches.entries()) {
        const data = getData(stringToReplace);
        if (!data) {
          return content;
        }
        const responseData = await fetchFromCloudinary(
          data.cloudName,
          data.publicId,
          pluginConfig
        );
        const src = `https://res.cloudinary.com/${data.cloudName}/image/upload/v${data.version}/${data.publicId}.${data.format}`;
        // TODO: make this configurable? cloudinaryRespImage could be a custom
        // function set when configuring this plugin. This would allow a user to
        // decide how to trasform a Cloudinary URL into any custom HTML.
        const html = cloudinaryRespImage(
          src,
          responseData.width,
          responseData.height,
          responseData.alt,
          pluginConfig.classString,
          pluginConfig.shouldLazyLoad
        );
        content = content.replace(stringToReplace, html);
      }
      return content;
    }
    return content;
  };
};

export default async function(eleventyConfig: any, userConfig: UserConfig) {
  const pluginConfig = Object.assign({}, defaultConfig, userConfig);
  // One can manually use the shortcode...
  eleventyConfig.addShortcode('cloudinaryRespImage', cloudinaryRespImage);
  // ...or use the transform.
  eleventyConfig.addTransform(
    'embedCloudinary',
    makeEmbedCloudinary(pluginConfig)
  );
}
