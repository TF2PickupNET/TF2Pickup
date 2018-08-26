// @flow

import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'antd';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

import RegionSetting from './RegionSetting';
import VolumeSetting from './VolumeSetting';

type Props = { classes: { setting: string } };
type State = { updatedFields: $ReadOnlyArray<string> };

const styles = { setting: { padding: '16px' } };

class Settings extends React.PureComponent<Props, State> {
  state = { updatedFields: [] };

  handlers = [];

  registerSaveHandler = (handler: () => void) => {
    this.handlers = [
      ...this.handlers,
      handler,
    ];
  };

  addUpdatedField = (name: string) => {
    this.setState((state) => {
      if (state.updatedFields.includes(name)) {
        return null;
      }

      return {
        updatedFields: [
          ...state.updatedFields,
          name,
        ],
      };
    });
  };

  removeUpdatedField = (name: string) => {
    this.setState((state) => {
      if (state.updatedFields.includes(name)) {
        return { updatedFields: state.updatedFields.filter(field => field !== name) };
      }

      return null;
    });
  };

  handleSave = () => {
    this.handlers.forEach(handler => handler());
  };

  renderSettings() {
    return (
      <React.Fragment>
        <RegionSetting
          className={this.props.classes.setting}
          registerSaveHandler={this.registerSaveHandler}
          addUpdatedField={this.addUpdatedField}
          removeUpdatedField={this.removeUpdatedField}
        />

        <VolumeSetting
          className={this.props.classes.setting}
          registerSaveHandler={this.registerSaveHandler}
          addUpdatedField={this.addUpdatedField}
          removeUpdatedField={this.removeUpdatedField}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Settings</title>
        </Helmet>

        <Row>
          <Col
            lg={12}
            md={24}
          >
            {this.renderSettings()}
          </Col>
        </Row>

        <Row>
          <Button
            disabled={this.state.updatedFields.length === 0}
            type="primary"
            onClick={this.handleSave}
          >
            Save
          </Button>
        </Row>
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(Settings);
