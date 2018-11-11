// @flow

const divs = [
  'N/A',
  'Open',
  'Intermediate',
  'Premier',
];

function findHighestDiv(rosters: $ReadOnlyArray<{ division: typeof divs }>) {
  return rosters
    .map(roster => roster.division)
    .reduce((highestDiv, currentDiv) => {
      const highestDivIndex = divs.findIndex(div => div === highestDiv);
      const currentDivIndex = divs.findIndex(div => div === currentDiv);

      return highestDivIndex < currentDivIndex ? currentDiv : highestDiv;
    }, 'N/A');
}

export {
  findHighestDiv,
  divs,
};
