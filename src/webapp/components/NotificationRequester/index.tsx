import React, {
  useCallback,
  useState,
} from 'react';
import Button from '@atlaskit/button';
import Banner from '@atlaskit/banner';
import withStyles, { WithStyles } from 'react-jss';

const styles = {
  text: { margin: '0 8px' },

  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: ['#FAFBFC', '!important'],
    margin: '0 8px',
  },
};

type Props = WithStyles<typeof styles>;

function NotificationRequester(props: Props) {
  const [showBanner, setShowBanner] = useState(Notification.permission === 'default');
  const handleDenyClick = useCallback(() => {
    setShowBanner(false);
  }, []);
  const handleEnableClick = useCallback(() => {
    setShowBanner(false);
    Notification.requestPermission();
  }, []);

  return (
    <Banner
      appearance="announcement"
      isOpen={showBanner}
    >
      <span className={props.classes.text}>
        Enable notifications for a better experience.
      </span>

      <Button
        className={props.classes.button}
        onClick={handleEnableClick}
      >
        Yes
      </Button>

      <Button
        className={props.classes.button}
        onClick={handleDenyClick}
      >
        No
      </Button>
    </Banner>
  );
}

export default withStyles(styles)(NotificationRequester);
