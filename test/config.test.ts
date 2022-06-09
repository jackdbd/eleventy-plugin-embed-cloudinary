import { defaultPluginConfig } from '../src/config'

describe('defaultConfig', () => {
  it('uses `.cache` as cache directory', () => {
    expect(defaultPluginConfig.cacheDirectory).toBe('.cache')
  })

  it('uses `30m` as cache duration', () => {
    expect(defaultPluginConfig.cacheDuration).toBe('30m')
  })

  it('lazy loads images', () => {
    expect(defaultPluginConfig.shouldLazyLoad).toBeTruthy()
  })

  it('has no custom CSS class', () => {
    expect(defaultPluginConfig.classString).toBe('')
  })
})
