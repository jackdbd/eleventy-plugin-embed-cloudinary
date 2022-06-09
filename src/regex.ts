// https://regex101.com/r/79P8kN/1

// I don't know how long can a Cloudinary cloud_name be. Let's assume it's
// within 1-25 characters.

// Cloudinary supports many image formats. I think that specifying them in the
// regex makes no sense. But I guess we can assume that an image format is 2-4
// character long.
// https://cloudinary.com/documentation/image_transformations#supported_image_formats
const pattern = /<p>\s*(?:<a.*>)?(?:\s*)(?:https?:\/\/)(?:res\.cloudinary\.com)\/([a-zA-Z0-9_]{1,25})\/image\/upload\/v(\d+)\/(\S+)\.([a-zA-Z]{2,4})(?:<\/a>)?(?:\s*)<\/p>/

// Parse HTML for pattern matches.
export const getMatches = (html: string) => {
  return html.match(new RegExp(pattern, 'g'))
}

// Parse HTML and extract pieces of data which identify an image hosted on your
// Cloudinary Media Library.
export const getData = (html: string) => {
  const result = new RegExp(pattern).exec(html)
  if (!result) {
    return null
  }
  const [, cloudName, version, publicId, format] = result
  return {
    cloudName,
    format,
    publicId,
    version
  }
}
