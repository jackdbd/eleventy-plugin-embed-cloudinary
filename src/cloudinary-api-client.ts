import Cache from '@11ty/eleventy-cache-assets';
import { PluginConfig } from './config';

// Fetch an image hosted on your Cloudinary Media Library using the Cloudinary
// Search API. Cache each response using the 11ty Cache.
// Note: there is an official Node.js API client library, but it seems overkill
// to use a full-fledged API client for this simple use case.
// https://github.com/cloudinary/cloudinary_npm
export const fetchFromCloudinary = async (
  cloudName: string,
  publicId: string,
  pluginConfig: PluginConfig
) => {
  const baseUrl = `https://${pluginConfig.apiKey}:${pluginConfig.apiSecret}@api.cloudinary.com/v1_1/${cloudName}`;
  const apiEndpoint = `${baseUrl}/resources/search`;
  // %3A is for colon and %20 is for space
  const qs = `expression=resource_type%3Aimage%20AND%20public_id%3A${publicId}&with_field=context&max_results=1`;
  const url = `${apiEndpoint}?${qs}`;

  // https://github.com/11ty/eleventy-cache-assets
  const response = await Cache(url, {
    directory: pluginConfig.cacheDirectory,
    duration: pluginConfig.cacheDuration,
    type: 'json',
  });

  const r = response.resources[0];

  if (pluginConfig.shouldThrowOnMissingAlt && r.context.alt === undefined) {
    // or console.error?
    throw new Error(
      `Image with public_id ${r.public_id} has no 'Description (alt)' metadata. Update the image on your Cloudinary media library.`
    );
  }

  if (
    pluginConfig.shouldThrowOnMissingCaption &&
    r.context.caption === undefined
  ) {
    throw new Error(
      `Image with public_id ${r.public_id} has no 'Title (caption)' metadata. Update the image on your Cloudinary media library.`
    );
  }

  return {
    width: r.width as number,
    height: r.height as number,
    alt: (r.context.alt as string) || undefined,
    caption: (r.context.caption as string) || undefined,
  };
};
