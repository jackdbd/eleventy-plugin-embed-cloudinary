import { defaultConfig } from '../src/config';

describe('defaultConfig', () => {
  it('has the expected cache directory', () => {
    expect(defaultConfig.cacheDirectory).toBe('.cache');
  });

  it('has the expected cache duration', () => {
    expect(defaultConfig.cacheDuration).toBe('30m');
  });
});
