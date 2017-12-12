import React from 'react';
import {
  Layout,
  Typography,
} from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

/**
 * Render the team name and the current score.
 *
 * @param {Object} props - The props for the  component.
 * @returns {JSX} - Returns the JSX.
 */
function TeamHeader(props) {
  return (
    <Layout reverse={props.name === 'BLU'}>
      <Typography
        typography="display1"
        className={props.classes.score}
      >
        {props.score}
      </Typography>

      <Typography
        typography="headline"
        className={props.classes.headerTitle}
      >
        {props.name}
      </Typography>
    </Layout>
  );
}

TeamHeader.propTypes = {
  classes: PropTypes.shape({
    headerTitle: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

TeamHeader.styles = {
  item: {
    textAlign: 'center',
    lineHeight: '48px',
    padding: '8px 16px',
    boxSizing: 'border-box',
  },

  headerTitle: {
    composes: '$item',
    flex: 1,
  },

  score: {
    composes: '$item',
    width: 72,
    height: 64,
  },
};

export default injectSheet(TeamHeader.styles)(TeamHeader);

