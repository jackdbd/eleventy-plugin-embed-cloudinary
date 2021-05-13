import { configFunction } from '../src/.eleventy';
// load the default eleventy configuration handler
import eleventyConfig from '@11ty/eleventy/src/EleventyConfig';

describe('configFunction', () => {
  const apiKey = process.env.CLOUDINARY_API_KEY as string;
  const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
  const userConfig = { apiKey, apiSecret };

  it('has a valid configuration function', () => {
    expect(() => configFunction(eleventyConfig, userConfig)).not.toThrow();
  });
});
