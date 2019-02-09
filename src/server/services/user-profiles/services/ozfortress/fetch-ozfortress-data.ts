// eslint-disable-next-line filenames/match-exported
import axios from 'axios';
import debug from 'debug';
import config from 'config';
import UserProfile, {
  OZFortressProfile,
  OZFortressDivisions,
  WithDivisions,
} from '@typings/UserProfile';

const log = debug('TF2Pickup:userId-user-profiles:ozfortress:fetch-data');
const apikey = config.get<string | null>('services.ozfortress.apikey');

interface Roster {
  division: keyof typeof OZFortressDivisions,
}

interface Response {
  user: {
    id: string,
    name: string,
    rosters: Roster[],
  },
}

const headers = { 'X-API-Key': apikey };

function findHighestDiv(rosters: Roster[]) {
  return rosters
    .reduce((highestDiv: keyof typeof OZFortressDivisions, roster: Roster) => {
      const highestDivIndex = OZFortressDivisions[roster.division];
      const currentLevel = OZFortressDivisions[highestDiv];

      return highestDivIndex < currentLevel ? roster.division : highestDiv;
    }, 'N/A');
}

function getDivisions(rosters: Roster[]): WithDivisions<typeof OZFortressDivisions> {
  return {
    div6v6: findHighestDiv(rosters),
    div9v9: 'N/A',
  };
}

export default async function fetchOZFortressData(
  profile: UserProfile,
  oneDaySinceLastUpdate: boolean,
): Promise<{ ozfortress?: OZFortressProfile }> {
  if (!oneDaySinceLastUpdate || apikey === null) {
    return {};
  }

  try {
    const { data } = await axios.get<Response>(
      `https://warzone.ozfortress.com/api/v1/users/steam_id/${profile.id}`,
      { headers },
    );

    return {
      ozfortress: {
        ...profile.ozfortress,
        id: data.user.id,
        name: data.user.name,
        ...getDivisions(data.user.rosters),
      },
    };
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      log('Error while requesting data from ozfortress', {
        userId: profile.id,
        error,
      });
    }

    return {};
  }
}
