// @flow

declare module 'emoji-mart' {
  declare export type Sets = 'apple' | 'google' | 'twitter' | 'emojione' | 'messenger' | 'facebook';
  declare export type SkinColor = 1 | 2 | 3 | 4 | 5 | 6;
  declare type SheetSizes = 16 | 20 | 32 | 64;
  declare type EmojiType = string | {
    id: string,
    skin?: SkinColor,
  };

  declare export class Emoji<E: EmojiType> extends React$Component<{
    emoji: E,
    size: number,
    native?: boolean,
    onClick?: (emoji: string, emoji: E) => void,
    fallback?: (emoji: E, props: {}) => string,
    set?: Sets,
    sheetSize?: SheetSizes,
    backgroundImageFn?: (set: Sets, sheetSize: SheetSizes) => string,
    skin?: SkinColor,
    tooltip?: boolean,
  }> {}
}
