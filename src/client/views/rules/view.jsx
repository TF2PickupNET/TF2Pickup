import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import injectSheet from 'react-jss';
import { Card, Spinner } from 'materialize-react';
import Aux from 'react-aux';
import PropTypes from 'prop-types';

const RULES_URL = 'https://raw.githubusercontent.com/TF2PickupNET/Info/master/RULES.md';

/**
 * The view for the rules page.
 *
 * @class
 */
class View extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      rules: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    rules: {
      width: '100%',
      maxWidth: 1000,
    },
  }

  state = { rules: null };

  /**
   * Fetch rules from GitHub.
   */
  async componentWillMount() {
    const response = await axios.get(RULES_URL);

    this.setState({ rules: response.data });
  }

  render() {
    return (
      <Aux>
        <Helmet>
          <title>Rules</title>
        </Helmet>

        {this.state.rules === null ? (
          <Spinner active />
        ) : (
          <div className={this.props.classes.container}>
            <Card className={this.props.classes.rules}>
              <ReactMarkdown source={this.state.rules} />
            </Card>
          </div>
        )}
      </Aux>
    );
  }
}

export default injectSheet(View.styles)(View);
