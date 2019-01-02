import React from 'react';
import injectSheet, { Classes } from 'react-jss';

import {
  Row,
  Column,
} from '../../components/Grid';

import RegionSetting from './RegionSetting';
import VolumeSetting from './VolumeSetting';
import EmojiSetting from './EmojiSetting';
import Header from './Header';

const styles = {
  panel: { '& > .ant-collapse-header': { display: 'flex' } },

  content: { padding: '0px 8px 0 24px' },
};

const settings = [
  RegionSetting,
  VolumeSetting,
  EmojiSetting,
];

type Props = Classes<typeof styles>;

function Settings(props: Props) {
  return (
    <Row justify="center">
      <Column col={16}>
        <Collapse bordered={false}>
          {settings.map(setting => (
            <Collapse.Panel
              key={setting.key}
              className={props.classes.panel}
              header={(
                <Header
                  selector={setting.selector}
                  title={setting.title}
                />
              )}
            >
              <div className={props.classes.content}>
                <setting.Comp/>
              </div>
            </Collapse.Panel>
          ))}
        </Collapse>
      </Column>
    </Row>
  );
}

export default injectSheet<Props>(styles)(Settings);
