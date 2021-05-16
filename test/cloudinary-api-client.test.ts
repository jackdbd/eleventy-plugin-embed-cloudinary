import {
  FetchImplementation,
  makeAPIClient,
  makeGenericAPIClient,
} from '../src/cloudinary-api-client';
import { CloudinaryClientConfig } from '../src/config';
import { messageImageHasNoAlt, messageImageHasNoCaption } from '../src/errors';

const CAPTION_FRESH_RESPONSE = 'This is a FRESH response';
const freshResponse = {
  resources: [
    {
      width: 123,
      height: 456,
      public_id: 'mock_cloudinary_public_id',
      context: {
        alt: 'mock alt text',
        caption: CAPTION_FRESH_RESPONSE,
        description: 'mock description',
      },
    },
  ],
};

const CAPTION_CACHED_RESPONSE = 'This is a CACHED response';
const cachedResponse = {
  resources: [
    {
      width: 123,
      height: 456,
      public_id: 'mock_cloudinary_public_id',
      context: {
        alt: 'mock alt text',
        caption: CAPTION_CACHED_RESPONSE,
        description: 'mock description',
      },
    },
  ],
};

const PUBLIC_ID_MISSING_ALT = 'mock_cloudinary_public_id_no_alt';
const imageResponseWithMissingAlt = {
  resources: [
    {
      width: 123,
      height: 456,
      public_id: PUBLIC_ID_MISSING_ALT,
      context: {
        caption: 'mock caption',
        description: 'mock description',
      },
    },
  ],
};

const PUBLIC_ID_MISSING_CAPTION = 'mock_cloudinary_public_id_no_caption';
const imageResponseWithMissingCaption = {
  resources: [
    {
      width: 123,
      height: 456,
      public_id: PUBLIC_ID_MISSING_CAPTION,
      context: {
        alt: 'mock alt text',
        description: 'mock description',
      },
    },
  ],
};

// true means that the corresponding image attribute is missing
interface MissingImageAttr {
  alt?: boolean;
  caption?: boolean;
}

const makeMockFetchWithMissingImageAttr = (
  missingImageFields: MissingImageAttr
) => {
  const fetchImplementation: FetchImplementation = _url => {
    return new Promise(resolve => {
      process.nextTick(() => {
        if (missingImageFields.alt) {
          resolve(imageResponseWithMissingAlt);
        } else if (missingImageFields.caption) {
          resolve(imageResponseWithMissingCaption);
        } else {
          resolve(freshResponse);
        }
      });
    });
  };
  return fetchImplementation;
};

const accountConfigValid: CloudinaryClientConfig = {
  apiKey: process.env.CLOUDINARY_API_KEY as string,
  apiSecret: process.env.CLOUDINARY_API_SECRET as string,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
};

const makeMockFetchWithCache = () => {
  const cache = new Map<string, boolean>();
  const fetchImplementation: FetchImplementation = url => {
    return new Promise(resolve => {
      process.nextTick(() => {
        const seen = cache.get(url);
        if (seen) {
          resolve(cachedResponse);
        } else {
          cache.set(url, true);
          resolve(freshResponse);
        }
      });
    });
  };
  return fetchImplementation;
};

describe('fetchFromCloudinary (mock)', () => {
  it('returns the expected response (mock)', async () => {
    const fetchFromCloudinary = makeGenericAPIClient(
      accountConfigValid,
      makeMockFetchWithCache()
    );
    const publicId = process.env.CLOUDINARY_IMAGE_PUBLIC_ID as string;

    const result = await fetchFromCloudinary(publicId);

    expect(result).toHaveProperty('width');
    expect(result).toHaveProperty('height');
    expect(result).toHaveProperty('alt');
    expect(result).toHaveProperty('caption');
  });

  it('returns a cached response (mock)', async () => {
    const fetchFromCloudinary = makeGenericAPIClient(
      accountConfigValid,
      makeMockFetchWithCache(),
      { someFetchOption: 'foo' }
    );
    const publicId = process.env.CLOUDINARY_IMAGE_PUBLIC_ID as string;

    const fresh = await fetchFromCloudinary(publicId);
    expect(fresh.caption).toBe(CAPTION_FRESH_RESPONSE);

    const cached = await fetchFromCloudinary(publicId);
    expect(cached.caption).toBe(CAPTION_CACHED_RESPONSE);
  });

  it('throws with the expected error message when the image `alt` is missing, and the client was configured to throw when this occurs (mock)', async () => {
    const clientConfig = {
      ...accountConfigValid,
      shouldThrowOnMissingAlt: true,
    };
    const fetchFromCloudinary = makeGenericAPIClient(
      clientConfig,
      makeMockFetchWithMissingImageAttr({ alt: true })
    );
    const publicId = PUBLIC_ID_MISSING_ALT;
    const expectedErrorMessage = messageImageHasNoAlt(publicId);

    await expect(fetchFromCloudinary(publicId)).rejects.toThrowError(
      expectedErrorMessage
    );
  });

  it('throws with the expected error message when the image `caption` is missing, and the client was configured to throw when this occurs (mock)', async () => {
    const clientConfig = {
      ...accountConfigValid,
      shouldThrowOnMissingCaption: true,
    };
    const fetchFromCloudinary = makeGenericAPIClient(
      clientConfig,
      makeMockFetchWithMissingImageAttr({ caption: true })
    );
    const publicId = PUBLIC_ID_MISSING_CAPTION;
    const expectedErrorMessage = messageImageHasNoCaption(publicId);

    await expect(fetchFromCloudinary(publicId)).rejects.toThrowError(
      expectedErrorMessage
    );
  });
});

describe('fetchFromCloudinary (network)', () => {
  // 11ty Cache options
  const cacheOptions = {
    directory: '.cache',
    duration: '5s',
    type: 'json' as 'buffer' | 'json' | 'text',
  };

  it('throws when configured with invalid Cloudinary account credentials (network)', async () => {
    const clientConfigWithInvalidCredentials = {
      apiKey: 'invalid_api_key',
      apiSecret: 'invalid_api_secret',
      cloudName: 'invalid_clound_name',
    };
    const fetchFromCloudinary = makeAPIClient(
      clientConfigWithInvalidCredentials,
      cacheOptions
    );
    const publicId = 'public_id_of_an_image';

    try {
      await fetchFromCloudinary(publicId);
      expect(true).toBe(false); // so if fetch succeeds, this test fails
    } catch (e) {
      expect(e.message).toContain('401');
      expect(e.message).toContain('Unauthorized');
    }

    // await expect(fetchFromCloudinary(publicId)).rejects.toThrowError('aaa');
  });

  it('returns an image response with width,height,alt,caption (network)', async () => {
    const fetchFromCloudinary = makeAPIClient(accountConfigValid, cacheOptions);
    const publicId = process.env.CLOUDINARY_IMAGE_PUBLIC_ID as string;

    const result = await fetchFromCloudinary(publicId);

    expect(result).toHaveProperty('width');
    expect(result).toHaveProperty('height');
    expect(result).toHaveProperty('alt');
    expect(result).toHaveProperty('caption');
  });

  it('returns a cached response (network)', async () => {
    const fetchFromCloudinary = makeAPIClient(accountConfigValid, cacheOptions);
    const publicId = process.env.CLOUDINARY_IMAGE_PUBLIC_ID as string;

    const fresh = await fetchFromCloudinary(publicId);
    expect(fresh).toBeTruthy();

    const cached = await fetchFromCloudinary(publicId);
    expect(cached).toBeTruthy();
  });
});
