import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  Button,
  Spinner,
  RadioButton,
  RadioButtonGroup,
  colors,
  Label,
  Layout,
} from 'materialize-react';

import Link from '../../../../components/link';
import app from '../../../../app';
import { discordUrls } from '../../../../../config/client';
import {
  filter,
  map,
  pipe,
} from '../../../../../utils/functions';

const serviceNames = {
  eu: 'etf2l',
  oz: 'ozfortress',
};

/**
 * The section for setting the username.
 *
 * @class
 */
class UsernameSection extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      errorText: PropTypes.string.isRequired,
    }).isRequired,
    region: PropTypes.string,
  };

  static defaultProps = { region: null };

  static styles = {
    container: {
      display: 'grid',
      gridTemplateRows: '1fr auto auto',
      gridGap: '8px',
      flex: 1,
    },

    link: {
      color: colors.blue500,
      padding: '0 3px',
    },

    errorText: {
      padding: 12,
      textAlign: 'center',
    },
  };

  state = {
    isLoading: true,
    names: null,
    selectedName: '',
    error: null,
  };

  /**
   * Get the valid names for the current user.
   */
  componentWillMount() {
    app.io.emit('user.get-valid-names', (names) => {
      if (names) {
        this.setState({
          isLoading: false,
          names,
        });
      }
    });
  }

  /**
   * Select the username from the region the user selected in the previous step.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.region !== null && this.props.region === null) {
      const serviceName = serviceNames[nextProps.region] || null;
      const names = pipe(
        Object.entries,
        filter(([, services]) => services.includes(serviceName)),
      )(this.state.names);

      if (names.length === 1) {
        this.setState({ selectedName: names[0][0] });
      }
    }
  }

  /**
   * Try setting the user name.
   */
  handleSetUsername = () => {
    app.io.emit('user.set-name', this.state.selectedName, ({ error }) => {
      if (error) {
        this.setState({ error });
      }
    });
  };

  /**
   * Change the state when the user changes the selected username.
   */
  handleNameChange = (name) => {
    this.setState({ selectedName: name });
  };

  renderNameOptions = () => pipe(
    Object.keys,
    map(name => (
      <Label key={name}>
        <RadioButton name={name} />

        {name} ({this.state.names[name].join(', ')})
      </Label>
    )),
  )(this.state.names);

  render() {
    if (this.state.isLoading) {
      return (
        <Layout mainAlign="center">
          <Spinner active />
        </Layout>
      );
    }

    return (
      <div className={this.props.classes.container}>
        {this.state.names ? (
          <RadioButtonGroup
            selected={this.state.selectedName}
            onChange={this.handleNameChange}
          >
            {this.renderNameOptions()}
          </RadioButtonGroup>
        ) : (
          <div style={{ textAlign: 'center' }}>
            No username from your external services is free.
            <br />
            We are working on an automated solution to this problem.
            Until then, please contact a developer on
            <Link
              primary
              href={discordUrls.help}
              className={this.props.classes.link}
            >
              Discord
            </Link>
            to set your username manually.
          </div>
        )}

        {this.state.error && (
          <div className={this.props.classes.errorText}>
            {this.state.error}
          </div>
        )}

        <Layout mainAlign="center">
          <Button
            disabled={Object.keys(this.state.names).length === 0 || !this.state.selectedName}
            onPress={this.handleSetUsername}
          >
            Set username
          </Button>
        </Layout>
      </div>
    );
  }
}

export default injectSheet(UsernameSection.styles)(UsernameSection);
