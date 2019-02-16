import React, { useContext } from 'react';
import {
  Separator,
  GroupHeading,
} from '@atlaskit/navigation-next';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import { Item } from '@webapp/components/PageNavigation';
import { makeGetServiceLinks } from '@webapp/store/user-profiles/selectors';
import { useMakeMapState, State } from '@webapp/store';
import { UserIdContext } from '@webapp/Views/Profile';

const makeMapState = () => {
  const getServiceLinks = makeGetServiceLinks();

  return (state: State, userId: string | null) => {
    return { links: getServiceLinks(state, userId) };
  };
};

function Links() {
  const userId = useContext(UserIdContext);
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
