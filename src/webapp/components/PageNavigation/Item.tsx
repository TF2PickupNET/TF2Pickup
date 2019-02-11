import React, { useCallback } from 'react';
import {
  Item as ItemComp,
  ItemProps,
} from '@atlaskit/navigation-next';
import {
  useLocation,
  useHistory,
} from '@webapp/utils/use-router';
import { isString } from '@utils/string';
import { Styles } from '@atlaskit/theme';

interface Props extends ItemProps {
  path?: string,
}

const itemStyles: Styles = (style) => {
  return {
    ...style,
    itemBase: {
      ...style.itemBase,
      marginBottom: '8px',
    },
  };
};

function Item(props: Props) {
  const {
    path,
    onClick,
    ...otherProps
  } = props;
  const location = useLocation();
  const history = useHistory();
  const handleClick = useCallback((ev) => {
    if (isString(path)) {
      history.push(path);
    }

    if (onClick) {
      onClick(ev);
    }
  }, []);

  return (
    <ItemComp
      {...otherProps}
      isSelected={location.pathname === path}
      styles={itemStyles}
      onClick={handleClick}
    />
  );
}

export default Item;
