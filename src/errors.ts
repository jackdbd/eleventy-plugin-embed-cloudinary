import { ImageData } from './interfaces'

export const messageImageHasNoAlt = (public_id: string) => {
  return `Image with public_id ${public_id} has no 'Description (alt)' metadata. Update the image on your Cloudinary media library.`
}

export const messageImageHasNoCaption = (public_id: string) => {
  return `Image with public_id ${public_id} has no 'Title (caption)' metadata. Update the image on your Cloudinary media library.`
}

export const messageImageIsNotOwned = (cloudName: string, data: ImageData) => {
  return `Your Cloudinary cloud_name is ${cloudName}. You cannot fetch the image with public_id ${data.publicId} because it belongs to cloud_name ${data.cloudName}`
}
