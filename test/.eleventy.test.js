const Eleventy = require('@11ty/eleventy/src/Eleventy')
const {
  configFunction: configFunctionDevelopmentPackage
} = require('../dist/eleventy-plugin-embed-cloudinary.cjs.development.js')
const {
  configFunction: configFunctionMinifiedPackage
} = require('../dist/eleventy-plugin-embed-cloudinary.cjs.production.min.js')

describe('configFunction (development package)', () => {
  const eleventy = new Eleventy()

  const eleventyConfig = eleventy.eleventyConfig.userConfig

  const userConfig = {
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME
  }

  it('does not throw when the provided configuration is valid', () => {
    expect(() =>
      configFunctionDevelopmentPackage(eleventyConfig, userConfig)
    ).not.toThrow()
  })
})

describe('configFunction (minified package)', () => {
  const eleventy = new Eleventy()

  const eleventyConfig = eleventy.eleventyConfig.userConfig

  const userConfig = {
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME
  }

  it('does not throw when the provided configuration is valid', () => {
    expect(() =>
      configFunctionMinifiedPackage(eleventyConfig, userConfig)
    ).not.toThrow()
  })
})
