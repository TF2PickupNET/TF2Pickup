import {OZFortressDivisions} from "../../../../../types/UserProfile";

const divs: Array<OZFortressDivisions> = [
  'N/A',
  'Open',
  'Intermediate',
  'Premier',
];

function findHighestDiv(rosters: Array<{ division: OZFortressDivisions }>) {
  return rosters
    .map(roster => roster.division)
    .reduce((highestDiv: OZFortressDivisions, currentDiv: OZFortressDivisions) => {
      const highestDivIndex = divs.findIndex(div => div === highestDiv);
      const currentDivIndex = divs.findIndex(div => div === currentDiv);

      return highestDivIndex < currentDivIndex ? currentDiv : highestDiv;
    }, 'N/A');
}

export {
  findHighestDiv,
  divs,
};
