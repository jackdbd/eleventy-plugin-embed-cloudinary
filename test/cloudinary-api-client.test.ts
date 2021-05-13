import { fetchFromCloudinary } from '../src/cloudinary-api-client';
import { defaultConfig } from '../src/config';

// TODO: avoid real API calls. Mock them.

describe('fetchFromCloudinary', () => {
  it('throws with invalid config', async () => {
    const cloudName = 'non-existing-cloud-name';
    const publicId = 'public_id_of_an_image';
    const apiKey = 'invalidApiKey';
    const apiSecret = 'invalidApiSecret';
    const config = { ...defaultConfig, apiKey, apiSecret };

    await expect(
      fetchFromCloudinary(cloudName, publicId, config)
    ).rejects.toThrow();
  });

  it('returns the expected response', async () => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;
    const publicId = process.env.CLOUDINARY_IMAGE_PUBLIC_ID as string;
    const apiKey = process.env.CLOUDINARY_API_KEY as string;
    const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
    const config = { ...defaultConfig, apiKey, apiSecret };

    const result = await fetchFromCloudinary(cloudName, publicId, config);
    expect(result).toHaveProperty('width');
    expect(result).toHaveProperty('height');
    expect(result).toHaveProperty('alt');
    expect(result).toHaveProperty('caption');
  });
});
