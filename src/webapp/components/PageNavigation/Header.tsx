import {
  ContainerHeader,
  HeaderSection,
  ItemProps,
} from '@atlaskit/navigation-next';
import {
  navigate,
  Location,
} from '@reach/router';
import React, { useCallback } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { isString } from '@utils/string';

const styles = { container: { paddingBottom: 16 } };

interface Props extends WithStyles<typeof styles>, ItemProps {
  path?: string,
}

function Header(props: Props) {
  const {
    classes,
    path,
    onClick,
    ...headerProps
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
    <HeaderSection>
      {({ className }) => (
        <Location>
          {({ location }) => (
            <div className={`${className} ${classes.container}`}>
              <ContainerHeader
                {...headerProps}
                isSelected={location.pathname === path}
                onClick={handleClick}
              />
            </div>
          )}
        </Location>
      )}
    </HeaderSection>
  );
}

export default withStyles(styles)(Header);
