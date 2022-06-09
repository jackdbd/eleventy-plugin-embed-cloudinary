import Cache, { EleventyCacheOptions } from '@11ty/eleventy-cache-assets'
import { CloudinaryAuthConfig, CloudinaryClientConfig } from './config'
import { messageImageHasNoAlt, messageImageHasNoCaption } from './errors'

interface CloudinaryResource {
  width: number
  height: number
  public_id: string
  context: {
    alt?: string
    caption?: string
    description?: string
  }
}

export interface CloudinaryResponse {
  resources: CloudinaryResource[]
}

type FetchOptions = any

export interface ImageResponse {
  width: number
  height: number
  alt?: string
  caption?: string
}

export type FetchImplementation = (
  url: string,
  options: FetchOptions
) => Promise<any>
export type FetchFromCloudinary = (publicId: string) => Promise<ImageResponse>

export type MakeGenericAPIClient = (
  clientConfig: CloudinaryClientConfig,
  fetchImplementation: FetchImplementation,
  fetchOptions?: FetchOptions
) => FetchFromCloudinary

export type MakeAPIClient = (
  clientConfig: CloudinaryClientConfig,
  eleventyCacheOptions: EleventyCacheOptions
) => FetchFromCloudinary

const toImageResponse = (
  response: CloudinaryResponse,
  shouldThrowOnMissingAlt?: boolean,
  shouldThrowOnMissingCaption?: boolean
) => {
  const r = response.resources[0]

  if (shouldThrowOnMissingAlt && r.context.alt === undefined) {
    throw new Error(messageImageHasNoAlt(r.public_id))
  }

  if (shouldThrowOnMissingCaption && r.context.caption === undefined) {
    throw new Error(messageImageHasNoCaption(r.public_id))
  }

  return {
    width: r.width as number,
    height: r.height as number,
    alt: (r.context.alt as string) || undefined,
    caption: (r.context.caption as string) || undefined
  }
}

type GetEndpoint = (auth: CloudinaryAuthConfig) => string

const getEndpoint: GetEndpoint = ({ apiKey, apiSecret, cloudName }) => {
  const baseUrl = `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}`
  return `${baseUrl}/resources/search`
}

// Fetch an image hosted on your Cloudinary Media Library using the Cloudinary
// Search API. The caller needs to pass a `fetch` implementation.
// Note: there is an official Node.js API client library, but it seems overkill
// to use a full-fledged API client for this simple use case.
// https://github.com/cloudinary/cloudinary_npm
export const makeGenericAPIClient: MakeGenericAPIClient = (
  clientConfig,
  fetchImplementation,
  fetchOptions
) => {
  const {
    apiKey,
    apiSecret,
    cloudName,
    shouldThrowOnMissingAlt,
    shouldThrowOnMissingCaption
  } = clientConfig

  const apiEndpoint = getEndpoint({ apiKey, apiSecret, cloudName })

  return async function apiClient(publicId) {
    const qs = `expression=resource_type%3Aimage%20AND%20public_id%3A${publicId}&with_field=context&max_results=1`
    const url = `${apiEndpoint}?${qs}`

    const response: CloudinaryResponse = await fetchImplementation(
      url,
      fetchOptions
    )

    return toImageResponse(
      response,
      shouldThrowOnMissingAlt,
      shouldThrowOnMissingCaption
    )
  }
}

// Fetch an image hosted on your Cloudinary Media Library using the Cloudinary
// Search API. Cache each response using the 11ty Cache.
// https://github.com/11ty/eleventy-cache-assets
export const makeAPIClient: MakeAPIClient = (
  clientConfig,
  eleventyCacheOptions
) => {
  const {
    apiKey,
    apiSecret,
    cloudName,
    shouldThrowOnMissingAlt,
    shouldThrowOnMissingCaption
  } = clientConfig

  const apiEndpoint = getEndpoint({ apiKey, apiSecret, cloudName })

  return async function apiClient(publicId) {
    const qs = `expression=resource_type%3Aimage%20AND%20public_id%3A${publicId}&with_field=context&max_results=1`
    const url = `${apiEndpoint}?${qs}`

    const response: CloudinaryResponse = await Cache(url, eleventyCacheOptions)
    return toImageResponse(
      response,
      shouldThrowOnMissingAlt,
      shouldThrowOnMissingCaption
    )
  }
}
