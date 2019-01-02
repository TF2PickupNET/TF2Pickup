import {
  useEffect,
  useState,
} from 'react';

import playSound from '../../utils/play-sound';

export default function SoundFix() {
  const [playedSound, setPlayedSound] = useState(false);

  useEffect(() => {
    function handleClick() {
      if (document.visibilityState === 'visible' && !playedSound) {
        playSound('sound-fix', { volume: 1 });

        setPlayedSound(true);
      }
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [playedSound]);

  return null;
}
