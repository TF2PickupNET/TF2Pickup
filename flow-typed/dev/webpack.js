// @flow strict-local

declare module 'webpack-merge' {
  declare function merge(...obj: $ReadOnlyArray<{}>): {};

  declare module.exports: merge;
}

declare module 'connect-history-api-fallback' {
  declare function history(): () => {};

  declare module.exports: history;
}

declare module 'koa-connect' {
  declare function connect(func: () => {}): () => void;

  declare module.exports: connect;
}

declare module 'html-webpack-plugin' {
  declare type Options = {
    template: string,
    filename: string,
    inject: string,
  };

  declare function HTMLPlugin(options: Options): {};

  declare module.exports: HTMLPlugin;
}

declare module 'mini-css-extract-plugin' {
  declare type Options = { filename: string };

  declare function ExtractPlugin(options: Options): {};

  declare module.exports: ExtractPlugin;
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

  declare module.exports: ServiceWorkerPlugin;
}
