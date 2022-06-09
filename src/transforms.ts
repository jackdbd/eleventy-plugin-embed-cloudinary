import { makeAPIClient } from './cloudinary-api-client'
import { PluginConfig } from './config'
import { messageImageIsNotOwned } from './errors'
import { getData, getMatches } from './regex'
import { cloudinaryRespImage } from './shortcodes'

type EmbedCloudinary = (content: string, outputPath: string) => Promise<string>

type MakeEmbedCloudinary = (
  pluginConfig: Required<PluginConfig>
) => EmbedCloudinary

export const makeEmbedCloudinary: MakeEmbedCloudinary = (pluginConfig) => {
  const eleventyCacheOptions = {
    directory: pluginConfig.cacheDirectory,
    duration: pluginConfig.cacheDuration,
    type: 'json' as 'buffer' | 'json' | 'text'
  }
  const { apiKey, apiSecret, cloudName } = pluginConfig
  const fetchFromCloudinary = makeAPIClient(
    {
      apiKey,
      apiSecret,
      cloudName
    },
    eleventyCacheOptions
  )
  return async function embdedCloudinary(content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      const matches = getMatches(content)
      if (!matches) {
        return content
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_index, stringToReplace] of matches.entries()) {
        const data = getData(stringToReplace)
        if (!data) {
          return content
        }

        if (data.cloudName !== cloudName) {
          throw new Error(messageImageIsNotOwned(cloudName, data))
        }

        const responseData = await fetchFromCloudinary(data.publicId)
        const src = `https://res.cloudinary.com/${data.cloudName}/image/upload/v${data.version}/${data.publicId}.${data.format}`
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
        )
        content = content.replace(stringToReplace, html)
      }
      return content
    }
    return content
  }
}
