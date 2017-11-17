import React, { PureComponent } from 'react';
import {
  RadioButton,
  RadioButtonGroup,
  Dialog,
  Label,
  Button,
} from 'materialize-react';
import { connect } from 'react-redux';
import Aux from 'react-aux';
import PropTypes from 'prop-types';

import {
  getGamemodeFromUrl,
  getPlayer,
} from '../../../../utils/pickup';
import maps from '../../../../config/maps';
import app from '../../../app';

/**
 * The dialog content for the map voting.
 *
 * @class
 */
class MapVoteDialog extends PureComponent {
  static propTypes = {
    selectedMap: PropTypes.string,
    maps: PropTypes.arrayOf(PropTypes.string).isRequired,
    close: PropTypes.func.isRequired,
    gamemode: PropTypes.string.isRequired,
  };

  static defaultProps = { selectedMap: '' };

  state = { selectedMap: this.props.selectedMap };

  handleCancelButtonPress = () => this.props.close();

  /**
   * Emit the pick-map event and close the dialog.
   */
  handleSelectButtonPress = () => {
    app.io.emit('pickup-queue.pick-map', {
      gamemode: this.props.gamemode,
      map: this.state.selectedMap,
    });

    this.props.close();
  };

  /**
   * Change the state when the user changes the selected map.
   *
   * @param {String} name - The name of the map.
   */
  handleMapChange = (name) => {
    this.setState({ selectedMap: name });
  };

  /**
   * Render the radio buttons for the maps.
   *
   * @returns {JSX[]} - Returns the JSX for the radio buttons.
   */
  renderRadioButtons() {
    return this.props.maps.map(map => (
      <Label key={map}>
        <RadioButton name={map} />

        {maps[map].display}
      </Label>
    ));
  }

  render() {
    return (
      <Aux>
        <Dialog.Header>
          Vote for a map
        </Dialog.Header>

        <Dialog.Content>
          <RadioButtonGroup
            selected={this.state.selectedMap}
            onChange={this.handleMapChange}
          >
            {this.renderRadioButtons()}
          </RadioButtonGroup>
        </Dialog.Content>

        <Dialog.Buttons>
          <Button onRelease={this.handleCancelButtonPress}>
            Cancel
          </Button>

          <Button onRelease={this.handleSelectButtonPress}>
            Select
          </Button>
        </Dialog.Buttons>
      </Aux>
    );
  }
}

export default connect(
  (state) => {
    const gamemode = getGamemodeFromUrl(state.router.location.pathname);
    const pickup = state.pickupQueue[gamemode];
    const player = getPlayer(state.user.id)(pickup.classes);

    return {
      gamemode,
      maps: pickup.maps,
      selectedMap: player.map,
    };
  },
)(MapVoteDialog);
