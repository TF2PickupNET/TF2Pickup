import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import {
  mapObject,
  pipe,
  flatten,
  capitalize,
} from '../../../../utils/functions';
// eslint-disable-next-line import/no-namespace
import * as Icons from '../../../icons';

import Team from './team';

/**
 * Render the different teams for the pickup.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Teams(props) {
  const classes = pipe(
    mapObject((players, className) => players.map(() => className)),
    Object.values,
    flatten,
  )(props.teams.red);

  return (
    <div className={props.classes.teamContainer}>
      <Team
        team={props.teams.blu}
        score={props.scores.blu}
        name="BLU"
      />

      <div
        className={props.classes.classesContainer}
        style={{ gridTemplateRows: `64px ${'56px '.repeat(classes.length)}` }}
      >
        <span />

        {classes.map((className, index) => {
          const Icon = Icons[capitalize(className)];

          return (
            <span // eslint-disable-next-line react/no-array-index-key
              key={`${className}${index}`}
              className={props.classes.classItem}
            >
              <Icon
                color={props.theme.iconColor}
                size={40}
              />
            </span>
          );
        })}
      </div>

      <Team
        team={props.teams.red}
        score={props.scores.red}
        name="RED"
      />
    </div>
  );
}

Teams.propTypes = {
  classes: PropTypes.shape({
    teamContainer: PropTypes.string.isRequired,
    classesContainer: PropTypes.string.isRequired,
    classItem: PropTypes.string.isRequired,
  }).isRequired,
  teams: PropTypes.shape({
    red: PropTypes.shape({}).isRequired,
    blu: PropTypes.shape({}).isRequired,
  }).isRequired,
  scores: PropTypes.shape({
    red: PropTypes.number.isRequired,
    blu: PropTypes.number.isRequired,
  }).isRequired,
  theme: PropTypes.shape({ iconColor: PropTypes.string.isRequired }).isRequired,
};

Teams.styles = () => {
  return {
    teamContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 56px 1fr',
      gridGap: '8px',
    },

    classesContainer: {
      display: 'grid',
      gridTemplateColumns: '56px',
      gridGap: '1px',
    },

    classItem: { padding: 8 },
  };
};

export default injectSheet(Teams.styles)(Teams);
