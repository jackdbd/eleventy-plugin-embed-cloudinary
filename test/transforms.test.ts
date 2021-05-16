import { defaultPluginConfig } from '../src/config';
import { messageImageIsNotOwned } from '../src/errors';
import { makeEmbedCloudinary } from '../src/transforms';

describe('makeEmbedCloudinary', () => {
  const apiKey = process.env.CLOUDINARY_API_KEY as string;
  const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;
  const userConfig = { apiKey, apiSecret, cloudName };

  const publicId = process.env.CLOUDINARY_IMAGE_PUBLIC_ID as string;
  const format = 'png';
  const version = '1234567890';

  it('should not alter the content of a CSS file', async () => {
    const content = `
    .some-class {
      background-color: 'red';
    }`;
    const pluginConfig = Object.assign({}, defaultPluginConfig, userConfig);
    const embedCloudinary = makeEmbedCloudinary(pluginConfig);

    const replacedContent = await embedCloudinary(content, 'some-file.css');

    expect(replacedContent).toBe(content);
  });

  it('should not alter the content of a HTML file that contains no Cloudinary URLs', async () => {
    const content = `
    <div>
      <p>stuff</p>
      <p>more stuff</p>
    </div>`;
    const pluginConfig = Object.assign({}, defaultPluginConfig, userConfig);
    const embedCloudinary = makeEmbedCloudinary(pluginConfig);

    const replacedContent = await embedCloudinary(content, 'some-file.html');

    expect(replacedContent).toBe(content);
  });

  it('throws with the expected error when the HTML contains an image not hosted on your Cloudinary account', async () => {
    const NOT_YOUR_CLOUD_NAME = 'not_your_cloud_name';
    // public_id of an image that is NOT hosted on your Cloudinary Media library
    const NOT_OWNED_PUBLIC_ID = 'not_public_id';
    const contentWithNotOwnedImage = `
    <div>
      <p>stuff</p>
      <p><a href="https://res.cloudinary.com/${NOT_YOUR_CLOUD_NAME}/image/upload/v${version}/${NOT_OWNED_PUBLIC_ID}.${format}">https://res.cloudinary.com/${NOT_YOUR_CLOUD_NAME}/image/upload/v${version}/${NOT_OWNED_PUBLIC_ID}.${format}</a></p>
      <p>more stuff</p>
    </div>`;
    const pluginConfig = Object.assign({}, defaultPluginConfig, userConfig);
    const expectedErrorMessage = messageImageIsNotOwned(cloudName, {
      cloudName: NOT_YOUR_CLOUD_NAME,
      publicId: NOT_OWNED_PUBLIC_ID,
      format,
      version,
    });
    const embedCloudinary = makeEmbedCloudinary(pluginConfig);

    expect(async () => {
      await embedCloudinary(contentWithNotOwnedImage, 'some-file.html');
    }).rejects.toThrowError(expectedErrorMessage);
  });

  it('transforms the HTML content as expected (network)', async () => {
    const content = `
    <div>
      <p>stuff</p>
      <p><a href="https://res.cloudinary.com/${cloudName}/image/upload/v${version}/${publicId}.${format}">https://res.cloudinary.com/${cloudName}/image/upload/v${version}/${publicId}.${format}</a></p>
      <p>more stuff</p>
    </div>`;
    const pluginConfig = Object.assign({}, defaultPluginConfig, userConfig);
    const embedCloudinary = makeEmbedCloudinary(pluginConfig);

    const replacedContent = await embedCloudinary(content, 'some-file.html');

    expect(replacedContent).not.toBe(content);
    expect(replacedContent).toContain('<img');
    expect(replacedContent).toContain('srcset=');
    expect(replacedContent).toContain('sizes=');
  });
});
