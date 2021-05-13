declare module '@11ty/eleventy-cache-assets' {
  interface Options {
    directory: string;
    duration: string;
    type: 'json' | 'text' | 'buffer';
  }
  const Cache: (source: string, options: Options) => any;
  export default Cache;
}
