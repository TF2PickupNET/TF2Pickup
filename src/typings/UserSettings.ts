import emojiSets from '../config/emoji-sets';
import announcers from '../config/announcers';

interface UserSettings {
  id: string,
  announcer: keyof typeof announcers,
  volume: number,
  emojiSet: keyof typeof emojiSets,
}

export default UserSettings;
