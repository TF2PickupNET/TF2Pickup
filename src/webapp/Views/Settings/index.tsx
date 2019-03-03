import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import {
  Container,
  Column,
} from '@webapp/components/Grid';
import RequireLogin from '@webapp/components/RequireLogin';
import { MenuSection } from '@atlaskit/navigation-next';
import PageNavigation, { Header } from '@webapp/components/PageNavigation';

import RegionSetting from './RegionSetting';
import VolumeSetting from './VolumeSetting';
import EmojiSetting from './EmojiSetting';
import AnnouncerSetting from './AnnouncerSetting';

const styles = {
  content: {
    padding: [16, 8, 12, 16],
  },

  container: {
    flex: 1,
    padding: [32, 0],
  },
};

const settings = [
  RegionSetting,
  AnnouncerSetting,
  VolumeSetting,
  EmojiSetting,
];

interface Props extends WithStyles<typeof styles> {
  path: string,
}

function Settings(props: Props) {
  return (
    <RequireLogin>
      <PageNavigation>
        <Header text="Settings" />

        <MenuSection>
          {({ className }) => (
            <div className={className}>
              {settings.map(Setting => (
                <Setting.Navigation key={Setting.key} />
              ))}
            </div>
          )}
        </MenuSection>
      </PageNavigation>

      <Container
        justify="center"
        className={props.classes.container}
      >
        <Column col={16}>
          {settings.map(Setting => (
            <React.Fragment key={Setting.key}>
              <Setting.Title />

              <div className={props.classes.content}>
                <Setting />
              </div>
            </React.Fragment>
          ))}
        </Column>
      </Container>
    </RequireLogin>
  );
}

export default withStyles(styles)(Settings);
