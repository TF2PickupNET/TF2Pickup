import { GlobalItem, GlobalItemProps } from '@atlaskit/navigation-next';
import { isString } from '@utils/string';
import React, { useCallback } from 'react';
import { Style } from '@atlaskit/theme';
import {
  navigate,
  Location,
} from '@reach/router';

export interface ItemProps extends GlobalItemProps {
  path?: string,
}

const styles = (style: Style) => {
  return {
    ...style,
    itemWrapper: {
      ...style.itemWrapper,
      marginBottom: '8px',
    },
  };
};

function Item(props: ItemProps) {
  const handleClick = useCallback((ev) => {
    if (isString(props.path)) {
      navigate(props.path);
    }

    if (props.onClick) {
      props.onClick(ev);
    }
  }, [props.path, props.onClick]);

  return (
    <Location>
      {({ location }) => (
        <GlobalItem
          isSelected={location.pathname === props.path}
          {...props}
          onClick={handleClick}
          styles={styles}
        />
      )}
    </Location>
  );
}

export default Item;
