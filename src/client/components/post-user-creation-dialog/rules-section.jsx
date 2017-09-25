import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import {
  Button,
  Typography,
  Spinner,
} from 'materialize-react';
import axios from 'axios';

import app from '../../app';

/**
 * The section for accepting the rules.
 *
 * @class
 */
class RulesSection extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      rulesContainer: PropTypes.string.isRequired,
      buttonContainer: PropTypes.string.isRequired,
      rules: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({ hasAcceptedTheRules: PropTypes.bool }),
  };

  static defaultProps = { user: {} };

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

  /**
   * Get the rules from GitHub.
   */
  async componentWillMount() {
    const rules = await axios.get('https://raw.githubusercontent.com/TF2PickupNET/Info/master/RULES.md');

    this.setState({
      loadingRules: false,
      rules: rules.data,
    });
  }

  handleAcceptRules = () => app.io.emit('user.accept-rules');

  render() {
    return (
      <div className={this.props.classes.rulesContainer}>
        <Typography typography="title">
          Rules
        </Typography>

        <div className={this.props.classes.rules}>
          {this.state.loadingRules ? (
            <Spinner active />
          ) : (
            <ReactMarkdown source={this.state.rules} />
          )}
        </div>

        <div className={this.props.classes.buttonContainer}>
          <Button
            disabled={this.props.user.hasAcceptedTheRules}
            onPress={this.handleAcceptRules}
          >
            Accept Rules
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ user }) => {
    return { user };
  },
)(injectSheet(RulesSection.styles)(RulesSection));
