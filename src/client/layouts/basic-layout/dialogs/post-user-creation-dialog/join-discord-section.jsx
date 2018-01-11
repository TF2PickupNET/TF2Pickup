import React from 'react';
import {
  Button,
  Layout,
} from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

function JoinDiscordSection(props) {
  return (
    <div className={props.classes.container}>
      <Layout
        mainAlign="center"
        crossAlign="center"
      >
        <Button onPress={props.handleDiscordJoin}>
          Join Discord
        </Button>
      </Layout>

      <Layout mainAlign="center">
        <Button onPress={props.handleSkipPress}>
          Skip
        </Button>
      </Layout>
    </div>
  );
}

JoinDiscordSection.propTypes = {
  classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
  handleDiscordJoin: PropTypes.func.isRequired,
  handleSkipPress: PropTypes.func.isRequired,
};

JoinDiscordSection.styles = {
  container: {
    display: 'grid',
    gridTemplateRows: '1fr auto',
    gridGap: '16px',
    flex: 1,
  },
};

export default injectSheet(JoinDiscordSection.styles)(JoinDiscordSection);
