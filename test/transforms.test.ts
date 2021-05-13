import { defaultConfig } from '../src/config';
import { makeEmbedCloudinary } from '../src/transforms';

describe('makeEmbedCloudinary', () => {
  const apiKey = process.env.CLOUDINARY_API_KEY as string;
  const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
  const userConfig = { apiKey, apiSecret };

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;
  const cloudNameInvalid = 'my_cloudinary_cloud_name';
  const version = '1234567890';
  const publicId = process.env.CLOUDINARY_IMAGE_PUBLIC_ID;
  const publicIdInvalid = 'public_id_of_an_image';
  const format = 'png';

  it('should not alter the content of a CSS file', async () => {
    const content = `
    .some-class {
      background-color: 'red';
    }`;
    const pluginConfig = Object.assign({}, defaultConfig, userConfig);
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
    const pluginConfig = Object.assign({}, defaultConfig, userConfig);
    const embedCloudinary = makeEmbedCloudinary(pluginConfig);
    const replacedContent = await embedCloudinary(content, 'some-file.html');
    expect(replacedContent).toBe(content);
  });

  it('throws with invalid config', async () => {
    const content = `
    <div>
      <p>stuff</p>
      <p><a href="https://res.cloudinary.com/${cloudNameInvalid}/image/upload/v${version}/${publicIdInvalid}.${format}">https://res.cloudinary.com/${cloudNameInvalid}/image/upload/v${version}/${publicIdInvalid}.${format}</a></p>
      <p>more stuff</p>
    </div>`;
    const pluginConfig = Object.assign({}, defaultConfig, userConfig);
    const embedCloudinary = makeEmbedCloudinary(pluginConfig);
    await expect(embedCloudinary(content, 'some-file.html')).rejects.toThrow();
  });

  it('returns the expected response', async () => {
    const content = `
    <div>
      <p>stuff</p>
      <p><a href="https://res.cloudinary.com/${cloudName}/image/upload/v${version}/${publicId}.${format}">https://res.cloudinary.com/${cloudName}/image/upload/v${version}/${publicId}.${format}</a></p>
      <p>more stuff</p>
    </div>`;
    const pluginConfig = Object.assign({}, defaultConfig, userConfig);
    const embedCloudinary = makeEmbedCloudinary(pluginConfig);
    const replacedContent = await embedCloudinary(content, 'some-file.html');
    expect(replacedContent).toContain('<img');
    expect(replacedContent).toContain('srcset=');
    expect(replacedContent).toContain('sizes=');
  });
});
