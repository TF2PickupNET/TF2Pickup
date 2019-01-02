import React, { useCallback } from 'react';
import {
  ContainerHeader,
  Item as ItemComp,
  ItemProps,
} from '@atlaskit/navigation-next';

import {
  useLocation,
  useHistory,
} from '../../../utils/use-router';

interface Props extends ItemProps {
  isHeader?: boolean,
  path?: string,
}

function Item(props: Props) {
  const {
    path,
    isHeader,
    ...otherProps
  } = props;
  const location = useLocation();
  const history = useHistory();
  const handleClick = useCallback(() => {
    if (path) {
      history.push(path);
    }
  }, []);
  const Comp = isHeader ? ContainerHeader : ItemComp;

  return (
    <Comp
      {...otherProps}
      isSelected={location.pathname === path}
      onClick={handleClick}
    />
  );
}

export default Item;
