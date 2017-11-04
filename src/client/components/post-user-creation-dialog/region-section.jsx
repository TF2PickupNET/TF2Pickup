import React, { PureComponent } from 'react';
import {
  Typography,
  RadioButtonGroup,
  RadioButton,
  Label,
  Button,
  Layout,
} from 'materialize-react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import regions from '@tf2-pickup/configs/regions';
import axios from 'axios';

import app from '../../app';

/**
 * The section for the setting the initial region.
 *
 * @class
 */
class RegionSection extends PureComponent {
  static propTypes = { classes: PropTypes.shape({ container: PropTypes.string }).isRequired };

  static styles = {
    container: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gridGap: '8px',
      flex: 1,
    },
  };

  /**
   * Get the location of the user so we can have a good default value for the preferred region.
   *
   * @returns {String} - Returns the regions code.
   */
  static async calculateDefaultRegion() {
    try {
      const location = await axios.get('//api.userinfo.io/userinfos');

      return location.data.continent.code.toLowerCase();
    } catch (err) { // eslint-disable-line no-unused-vars
      return '';
    }
  }

  state = { selectedRegion: '' };

  /**
   * Get the default region for the user.
   */
  async componentWillMount() {
    const defaultRegion = await RegionSection.calculateDefaultRegion();

    this.setState({ selectedRegion: defaultRegion });
  }

  /**
   * Set the region for the user.
   */
  handleSetRegion = () => {
    const region = this.state.selectedRegion;

    if (Object.keys(regions).includes(region)) {
      app.io.emit('user.change-region', { region });
    }
  };

  /**
   * Update the state when the user changes the region.
   */
  handleRegionChange = (region) => {
    this.setState({ selectedRegion: region });
  };

  render() {
    return (
      <div className={this.props.classes.container}>
        <Typography typography="title">
          Select a region
        </Typography>

        <RadioButtonGroup
          selected={this.state.selectedRegion}
          onChange={this.handleRegionChange}
        >
          {Object
            .values(regions)
            .map(region => (
              <Label key={region.name}>
                <RadioButton name={region.name} />

                {region.fullName}
              </Label>
            ))
          }
        </RadioButtonGroup>

        <Layout mainAlign="center">
          <Button onPress={this.handleSetRegion}>
            Set region
          </Button>
        </Layout>
      </div>
    );
  }
}

export default injectSheet(RegionSection.styles)(RegionSection);
