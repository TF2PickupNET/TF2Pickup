import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import Panel from '@atlaskit/panel';

import {
  Row,
  Column,
} from '../../components/Grid';

import RegionSetting from './RegionSetting';
import VolumeSetting from './VolumeSetting';
import EmojiSetting from './EmojiSetting';
import Header from './Header';

const styles = {
  content: { padding: '0px 8px 0 24px' },

  container: { flex: 1 },
};

const settings = [
  RegionSetting,
  VolumeSetting,
  EmojiSetting,
];

type Props = WithStyles<typeof styles>;

function Settings(props: Props) {
  return (
    <Row justify="center" className={props.classes.container}>
      <Column col={16}>
        {settings.map(setting => (
          <Panel
            key={setting.key}
            header={(
              <Header title={setting.title} />
            )}
          >
            <div className={props.classes.content}>
              <setting.Comp />
            </div>
          </Panel>
        ))}

      </Column>
    </Row>
  );
}

export default withStyles(styles)(Settings);
