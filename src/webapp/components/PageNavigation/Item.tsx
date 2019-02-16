import React, { useCallback } from 'react';
import {
  Item as ItemComp,
  ItemProps,
} from '@atlaskit/navigation-next';
import {
  Location,
  navigate,
} from '@reach/router';
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
  const handleClick = useCallback((ev) => {
    if (isString(path)) {
      navigate(path);
    }

    if (onClick) {
      onClick(ev);
    }
  }, []);

  return (
    <Location>
      {({ location }) => (
        <ItemComp
          {...otherProps}
          isSelected={location.pathname === path}
          styles={itemStyles}
          onClick={handleClick}
        />
      )}
    </Location>
  );
}

export default Item;
