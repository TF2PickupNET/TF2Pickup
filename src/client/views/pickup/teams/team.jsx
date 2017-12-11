import React from 'react';
import injectSheet from 'react-jss';
import { Card } from 'materialize-react';
import PropTypes from 'prop-types';

import {
  flatten,
  map,
  pipe,
} from '../../../../utils/functions';

import TeamHeader from './team-header';
import Player from './player';

/**
 * Render a team on the match page.
 * Renders the header and all the players.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Team(props) {
  return (
    <Card className={props.classes.card}>
      <TeamHeader
        name={props.name}
        score={props.score}
      />

      {pipe(
        Object.values,
        flatten,
        map(player => (
          <Player
            key={player.id}
            player={player}
            name={props.name}
          />
        )),
      )(props.team)}
    </Card>
  );
}

Team.propTypes = {
  classes: PropTypes.shape({ card: PropTypes.string.isRequired }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  team: PropTypes.shape({}).isRequired,
};

Team.styles = { card: { margin: 0 } };

export default injectSheet(Team.styles)(Team);
