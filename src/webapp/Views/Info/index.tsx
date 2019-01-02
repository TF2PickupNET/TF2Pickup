import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  GroupHeading,
  HeaderSection,
  MenuSection,
  Separator,
} from '@atlaskit/navigation-next';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import injectSheet, { Classes } from 'react-jss';

import PageNavigation, { Item } from '../../components/PageNavigation';
import socialMedias from '../../../config/social-medias';
import { Keys } from '../../../utils/types';
import NotFound from '../NotFound';

import Rules from './Rules';
import About from './About';

const styles = { header: { paddingBottom: 16 } };

type Props = Classes<typeof styles>;

const socialMediaKeys = Object.keys(socialMedias) as Keys<typeof socialMedias>;

function Info(props: Props) {
  return (
    <React.Fragment>
      <PageNavigation>
        <HeaderSection>
          {({ className }: { className: string }) => (
            <div className={`${className} ${props.classes.header}`}>
              <Item
                isHeader
                path="/info"
                text="Information"
              />
            </div>
          )}
        </HeaderSection>
        <MenuSection>
          {({ className }: { className: string }) => (
            <div className={className}>
              <Item
                text="Rules"
                path="/info/rules"
              />

              <Item
                text="Sponsors"
                path="/info/sponsors"
              />

              <Item
                text="Contact"
                path="/info/contact"
              />

              <Item
                text="Changelog"
                path="/info/changelog"
              />

              <Separator />

              <GroupHeading>Links</GroupHeading>

              {socialMediaKeys.map(socialMedia => (
                <Item
                  key={socialMedia}
                  before={ShortcutIcon}
                  href={socialMedias[socialMedia].url}
                  text={socialMedias[socialMedia].display}
                />
              ))}
            </div>
          )}
        </MenuSection>
      </PageNavigation>

      <Switch>
        <Route
          exact
          strict
          path="/info"
          component={About}
        />

        <Route
          path="/info/rules"
          component={Rules}
        />

        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default injectSheet<Props>(styles)(Info);
