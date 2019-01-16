import React from 'react';
import { Separator, GroupHeading } from '@atlaskit/navigation-next';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';

import { Item } from '../../../../components/PageNavigation';
import { makeGetServiceLinks } from '../../../../store/user-profiles/selectors';
import { State } from '../../../../store';
import { useUserId } from '../../utils';
import { useMakeMapState } from '../../../../store/use-store';

const makeMapState = () => {
  const getServiceLinks = makeGetServiceLinks();

  return (state: State, userId: string | null) => {
    return { links: getServiceLinks(state, userId) };
  };
};

function Links() {
  const userId = useUserId();
  const { links } = useMakeMapState(makeMapState, userId);

  return (
    <React.Fragment>
      <Separator />

      <GroupHeading>Links</GroupHeading>

      {links.map(link => (
        <Item
          key={link.name}
          before={ShortcutIcon}
          href={link.url}
          text={link.display}
        />
      ))}
    </React.Fragment>
  );
}

export default Links;
