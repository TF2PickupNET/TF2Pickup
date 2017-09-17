import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import {
  Button,
  Typography,
  Spinner,
} from 'materialize-react';
import axios from 'axios';

import app from '../../app';

class RulesSection extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      rulesContainer: PropTypes.string.isRequired,
      buttonContainer: PropTypes.string.isRequired,
      rules: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
    rulesContainer: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gridGap: '8px',
      flex: 1,
    },

    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
    },

    rules: {
      '& ol, ul': {
        margin: 0,
        paddingLeft: 25,
      },
    },
  };

  state = {
    loadingRules: true,
    rules: null,
  };

  async componentWillMount() {
    const rules = await axios.get('https://raw.githubusercontent.com/TF2PickupNET/Info/master/RULES.md');

    this.setState({
      loadingRules: false,
      rules: rules.data,
    });
  }

  handleAcceptRules = () => app.io.emit('user.accept-rule');

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.rulesContainer}>
        <Typography typography="title">
          Rules
        </Typography>

        <div className={classes.rules}>
          {this.state.loadingRules ? (
            <Spinner active />
          ) : (
            <ReactMarkdown source={this.state.rules} />
          )}
        </div>

        <div className={classes.buttonContainer}>
          <Button onPress={this.handleAcceptRules}>
            Accept Rules
          </Button>
        </div>
      </div>
    );
  }
}

export default injectSheet(RulesSection.styles)(RulesSection);
