import { getData, getMatches } from '../src/regex'

const cloudName = 'my_cloudinary_cloud_name'
const version = '1234567890'
const otherVersion = '9876543210'
const publicId = 'public_id_of_an_image'
const otherPublicId = 'other_public_id_of_an_image'
const format = 'png'

describe('getData', () => {
  const html = `<p><a href="https://res.cloudinary.com/${cloudName}/image/upload/v${version}/${publicId}.${format}">https://res.cloudinary.com/${cloudName}/image/upload/v${version}/${publicId}.${format}</a></p>`

  it('returns `null` when there are no matches', () => {
    const result = getData('<div>Nothing here</div>')
    expect(result).toBeNull()
  })

  it('returns an object with the expected properties', () => {
    const result = getData(html)
    expect(result).toHaveProperty('cloudName')
    expect(result).toHaveProperty('publicId')
    expect(result).toHaveProperty('version')
    expect(result).toHaveProperty('format')
  })

  it('returns an object with the expected publicId', () => {
    const result = getData(html)
    expect(result).not.toBeNull()
    expect(result!.publicId).toBe(publicId)
  })
})

describe('getMatches', () => {
  const html = `
  <div>
    <p>stuff</p>
    <p><a href="https://res.cloudinary.com/${cloudName}/image/upload/v${version}/${publicId}.${format}">https://res.cloudinary.com/${cloudName}/image/upload/v${version}/${publicId}.${format}</a></p>
    <p>more stuff</p>
    <p><a href="https://res.cloudinary.com/${cloudName}/image/upload/v${otherVersion}/${otherPublicId}.${format}">https://res.cloudinary.com/${cloudName}/image/upload/v${otherVersion}/${otherPublicId}.${format}</a></p>
    <p>some more stuff</p>
  </div>`

  it('returns an object with the expected publicId', () => {
    const result = getMatches(html)
    expect(result).toHaveLength(2)
  })
})
