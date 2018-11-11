// @flow

import React, {
  type Node,
  useState,
  useCallback,
} from 'react';
import is from 'is_js';
import {
  Card,
  Col,
  Row,
  Button,
} from 'antd';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

type Props = {
  children: Node,
  classes: {
    card: string,
    container: string,
  },
};

const styles = {
  container: { minHeight: '100vh' },

  card: { margin: 20 },
};
const STORAGE_KEY = 'IGNORE_UNSUPPORTED_BROWSER_WARNING';
const isDesktop = is.desktop();
const isValidBrowser = is.chrome('>=65') || is.firefox('>=59');

const commonCardContent = (
  <React.Fragment>
    <br />
    <br />

    Please note that when you report any bug or something is broken
    and you aren&amp;t using a desktop and supported browser,
    we will not fix your bug.
  </React.Fragment>
);
const cardTitle = isDesktop
  ? 'It appears you are using an unsupported browser'
  : 'It appears you are not on a desktop browser';
const cardContent = isDesktop ? (
  <React.Fragment>
    You are apparently using an unsupported browsers.<br />

    We currently only support:
    <ul>
      <li>Chrome 65 or higher</li>
      <li>Chrome 59 or higher</li>
    </ul>

    {commonCardContent}
  </React.Fragment>
) : (
  <React.Fragment>
    We currently support only desktop browsers.
    {commonCardContent}
  </React.Fragment>
);

function BrowserValidator(props: Props) {
  const [ignoreWarning, setIgnoreWarning] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true',
  );
  const handleClick = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');

    setIgnoreWarning(true);
  }, []);

  if ((isDesktop && isValidBrowser) || ignoreWarning) {
    return props.children;
  }

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      className={props.classes.container}
    >
      <Helmet>
        <title>Wrong browser</title>
      </Helmet>

      <Col>
        <Card
          title={cardTitle}
          className={props.classes.card}
        >
          {cardContent}

          <Button onClick={handleClick}>
            Ignore warning and continue
          </Button>
        </Card>
      </Col>
    </Row>
  );
}

export default injectSheet(styles)(BrowserValidator);
