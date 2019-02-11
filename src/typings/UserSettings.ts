import emojiSets from '../config/emoji-sets';
import announcers from '../config/announcers';

interface UserSettings {
  readonly id: string,
  readonly announcer: keyof typeof announcers,
  readonly volume: number,
  readonly emojiSet: keyof typeof emojiSets,
}

export default UserSettings;
