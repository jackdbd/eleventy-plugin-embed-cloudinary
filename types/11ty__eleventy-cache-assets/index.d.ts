declare module '@11ty/eleventy-cache-assets' {
  export interface EleventyCacheOptions {
    directory: string;
    duration: string;
    type: 'json' | 'text' | 'buffer';
  }
  const Cache: (source: string, options: EleventyCacheOptions) => Promise<any>;
  export default Cache;
}
