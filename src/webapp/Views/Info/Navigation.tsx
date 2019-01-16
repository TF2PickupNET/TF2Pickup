import React from 'react';
import {
  MenuSection,
  Separator,
  GroupHeading,
} from '@atlaskit/navigation-next';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';

import PageNavigation, { Item } from '../../components/PageNavigation';
import socialMedias from '../../../config/social-medias';
import { Keys } from '../../../utils/types';
import Header from '../../components/PageNavigation/Header';

const socialMediaKeys = Object.keys(socialMedias) as Keys<typeof socialMedias>;

function Navigation() {
  return (
    <PageNavigation>
      <Header
        path="/info"
        text="Information"
      />

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
  );
}

export default Navigation;
