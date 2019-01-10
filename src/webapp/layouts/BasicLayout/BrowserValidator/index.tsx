import React, {
  ReactNode,
  useState,
  useCallback,
} from 'react';
import is from 'is_js';
import Button from '@atlaskit/button';
import withStyles, { WithStyles } from 'react-jss';

import { Row } from '../../../components/Grid';
import DocumentTitle from '../../../components/DocumentTitle';

const styles = {
  container: { minHeight: '100vh' },
  text: { margin: '0px 20% 16px' },
};
const STORAGE_KEY = 'IGNORE_UNSUPPORTED_BROWSER_WARNING';
const isDesktop = is.desktop();
const isValidBrowser = is.chrome('>=65') || is.firefox('>=59');

const commonCardContent = (
  <React.Fragment>
    <br />
    <br />

    Please note that when you report any bug or something is broken
    and you aren&apos;t using a desktop and supported browser,
    we will not fix your bug.
  </React.Fragment>
);
const cardTitle = isDesktop
  ? 'It appears you are using an unsupported browser'
  : 'It appears you are not on a desktop browser';
const cardContent = isDesktop ? (
  <React.Fragment>
    You are apparently using an unsupported browsers.
    <br />

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

interface Props extends WithStyles<typeof styles> {
  children: ReactNode,
}

const hideWarning = isValidBrowser && isDesktop;

function BrowserValidator(props: Props) {
  const [ignoreWarning, setIgnoreWarning] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true',
  );
  const handleClick = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');

    setIgnoreWarning(true);
  }, []);

  if (hideWarning || ignoreWarning) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    );
  }

  return (
    <Row
      dir="column"
      justify="center"
      align="center"
      className={props.classes.container}
    >
      <DocumentTitle title="Invalid Browser" />

      <h2 className={props.classes.text}>
        {cardTitle}
      </h2>

      <p className={props.classes.text}>
        {cardContent}
      </p>

      <Button onClick={handleClick}>
        Ignore warning and continue
      </Button>
    </Row>
  );
}

export default withStyles(styles)(BrowserValidator);
