// @flow

import React from 'react';
import {
  Row,
  Col,
} from 'antd';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

import RegionSetting from './RegionSetting';
import VolumeSetting from './VolumeSetting';

const styles = { setting: { padding: '16px' } };

function Settings() {
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
          <RegionSetting />

          <VolumeSetting />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default injectSheet(styles)(Settings);
