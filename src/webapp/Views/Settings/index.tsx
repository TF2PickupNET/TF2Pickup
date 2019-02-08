import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import {
  Row,
  Column,
} from '@webapp/components/Grid';
import RequireLogin from '@webapp/components/RequireLogin';

import RegionSetting from './RegionSetting';
import VolumeSetting from './VolumeSetting';
import EmojiSetting from './EmojiSetting';
import Navigation from './Navigation';
import AnnouncerSetting from './AnnouncerSetting';

const styles = {
  content: {
    padding: {
      top: 16,
      left: 16,
      right: 8,
      bottom: 12,
    },
  },

  container: {
    flex: 1,
    padding: '32px 0',
  },
};

const settings = [
  RegionSetting,
  AnnouncerSetting,
  VolumeSetting,
  EmojiSetting,
];

type Props = WithStyles<typeof styles>;

function Settings(props: Props) {
  return (
    <RequireLogin>
      <Navigation />

      <Row
        justify="center"
        className={props.classes.container}
      >
        <Column col={16}>
          {settings.map(setting => (
            <React.Fragment key={setting.key}>
              <h3>
                {setting.title}
              </h3>

              <div className={props.classes.content}>
                <setting.Comp />
              </div>
            </React.Fragment>
          ))}
        </Column>
      </Row>
    </RequireLogin>
  );
}

export default withStyles(styles)(Settings);
