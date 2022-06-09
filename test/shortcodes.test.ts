import { cloudinaryRespImage } from '../src/shortcodes'

const cloudName = 'my_cloudinary_cloud_name'
const version = '1234567890'
const publicId = 'public_id_of_an_image'
const format = 'png'

describe('cloudinaryRespImage', () => {
  const src = `https://res.cloudinary.com/${cloudName}/image/upload/v${version}/${publicId}.${format}`
  const alt = 'alternative description'
  const width = 640
  const height = 480

  it('should contain the `width` attribute', () => {
    const html = cloudinaryRespImage(src, width, height, alt)
    expect(html).toContain('width')
  })

  it('should contain the `height` attribute', () => {
    const html = cloudinaryRespImage(src, width, height, alt)
    expect(html).toContain('height')
  })

  it('should contain the `srcset` attribute', () => {
    const html = cloudinaryRespImage(src, width, height, alt)
    expect(html).toContain('srcset')
  })

  it('should contain the `sizes` attribute', () => {
    const html = cloudinaryRespImage(src, width, height, alt)
    expect(html).toContain('sizes')
  })

  it('should not contain `loading="lazy" by default`', () => {
    const html = cloudinaryRespImage(src, width, height, alt)
    expect(html).not.toContain('loading="lazy"')
  })

  it('should contain `loading="lazy"` when specified', () => {
    const shouldLazyLoad = true
    const html = cloudinaryRespImage(
      src,
      width,
      height,
      alt,
      'some-class',
      shouldLazyLoad
    )
    expect(html).toContain('loading="lazy"')
  })
})
