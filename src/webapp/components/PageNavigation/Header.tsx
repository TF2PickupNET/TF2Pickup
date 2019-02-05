import {
  ContainerHeader,
  HeaderSection, ItemProps,
} from '@atlaskit/navigation-next';
import React, { useCallback } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { useLocation, useHistory } from '@webapp/utils/use-router';
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
    <HeaderSection>
      {({ className }) => (
        <div className={`${className} ${classes.container}`}>
          <ContainerHeader
            {...headerProps}
            onClick={handleClick}
            isSelected={location.pathname === path}
          />
        </div>
      )}
    </HeaderSection>
  );
}

export default withStyles(styles)(Header);
