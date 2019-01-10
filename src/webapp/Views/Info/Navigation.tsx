import React from 'react';
import withStyles, { WithStyles } from 'react-jss';
import {
  HeaderSection,
  MenuSection,
  Separator,
  GroupHeading,
} from '@atlaskit/navigation-next';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';

import PageNavigation, { Item } from '../../components/PageNavigation';
import socialMedias from '../../../config/social-medias';
import { Keys } from '../../../utils/types';

const styles = { header: { paddingBottom: 16 } };

type Props = WithStyles<typeof styles>;

const socialMediaKeys = Object.keys(socialMedias) as Keys<typeof socialMedias>;

function Navigation(props: Props) {
  return (
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
  );
}

export default withStyles(styles)(Navigation);
