import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Typography,
} from 'materialize-react';

import app from '../../app';
import MarkdownView from '../../components/markdown-view';

const RULES_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/RULES.md';

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

  handleAcceptRules = () => app.io.emit('user.accept-rules');

  render() {
    return (
      <div className={this.props.classes.rulesContainer}>
        <Typography typography="title">
          Rules
        </Typography>

        <div className={this.props.classes.rules}>
          <MarkdownView url={RULES_URL} />
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
