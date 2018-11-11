// @flow

import {
  Col,
  Row,
  Spin,
} from 'antd';
import Helmet from 'react-helmet';
import React from 'react';

export default function LoadingScreen() {
  return (
    <Row>
      <Helmet>
        <title>Loading...</title>
      </Helmet>

      <Col>
        <Spin delay={100} />
      </Col>
    </Row>
  );
}
