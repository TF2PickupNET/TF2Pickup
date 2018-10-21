// @flow

type EmojiSet = {
  name: string,
  display: string,
};

const apple: EmojiSet = {
  name: 'apple',
  display: 'Apple',
};
const google: EmojiSet = {
  name: 'google',
  display: 'Google',
};
const twitter: EmojiSet = {
  name: 'twitter',
  display: 'Twitter',
};
const emojione: EmojiSet = {
  name: 'emojione',
  display: 'EmojiOne',
};
const messenger: EmojiSet = {
  name: 'messenger',
  display: 'Messenger',
};
const facebook: EmojiSet = {
  name: 'facebook',
  display: 'Facebook',
};
const emojiSets = {
  apple,
  google,
  twitter,
  emojione,
  messenger,
  facebook,
};

export const defaultSet: $Keys<typeof emojiSets> = 'emojione';

export default emojiSets;
