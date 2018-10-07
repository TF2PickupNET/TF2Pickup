// @flow strict-local

declare module 'webpack-merge' {
  declare function merge(...obj: $ReadOnlyArray<{}>): {};

  declare module.exports: typeof merge;
}

declare module 'connect-history-api-fallback' {
  declare function history(): () => {};

  declare module.exports: typeof history;
}

declare module 'koa-connect' {
  declare function connect(func: () => {}): () => void;

  declare module.exports: typeof connect;
}

declare module 'html-webpack-plugin' {
  declare type Options = {
    template: string,
    filename: string,
    inject: string,
  };

  declare function HTMLPlugin(options: Options): {};

  declare module.exports: typeof HTMLPlugin;
}

declare module 'mini-css-extract-plugin' {
  declare type Options = { filename: string };

  declare function ExtractPlugin(options: Options): {};

  declare module.exports: typeof ExtractPlugin;
}

declare module 'sw-precache-webpack-plugin' {
  declare type Options = {
    cacheId: string,
    dontCacheBustUrlsMatching: RegExp,
    minify: boolean,
    navigateFallback: string,
    staticFileGlobsIgnorePatterns: $ReadOnlyArray<RegExp>,
    navigateFallbackWhitelist: $ReadOnlyArray<RegExp>,
    filename: string,
  };

  declare function ServiceWorkerPlugin(options: Options): {};

  declare module.exports: typeof ServiceWorkerPlugin;
}

declare module 'webpack-bundle-analyzer' {
  declare type Options = {
    analyzerMode: 'static',
    generateStatsFile: boolean,
    openAnalyzer: boolean,
  };

  declare function BundleAnalyzerPlugin(options: Options): {};

  declare module.exports: {BundleAnalyzerPlugin: typeof BundleAnalyzerPlugin};
}

declare module 'webpack-serve-waitpage' {
  declare function middleware(options: {}): () => void;

  declare module.exports: typeof middleware;
}
