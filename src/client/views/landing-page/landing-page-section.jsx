import React from 'react';
import injectSheet from 'react-jss';
import { typography } from 'materialize-react';
import PropTypes from 'prop-types';

function LandingPageSection({
  classes,
  imgSrc,
  imgProps,
  children,
  imagePosition,
}) {
  const imgPositionClass = imagePosition === 'left' && 'image-left';

  return (
    <section className={`${classes.section} ${imgPositionClass}`}>
      <img
        alt="presentation"
        src={imgSrc}
        {...imgProps}
      />

      <span className={classes.text}>
        {children}
      </span>
    </section>
  );
}

LandingPageSection.propTypes = {
  classes: PropTypes.object.isRequired,
  imgSrc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  imagePosition: PropTypes.oneOf(['left', 'right']).isRequired,
  imgProps: PropTypes.object,
};

LandingPageSection.defaultProps = { imgProps: {} };

LandingPageSection.styles = (theme) => {
  return {
    section: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
      padding: '80px 15%',
      overflowX: 'hidden',

      '&.image-left': { flexDirection: 'row-reverse' },

      '&.image-left $text': {
        borderLeft: 0,
        marginLeft: 0,
        borderRight: `solid 1px ${theme.divider.backgroundColor}`,
        marginRight: 40,
      },
    },

    text: {
      ...typography.display1,
      padding: 40,
      textAlign: 'center',
      borderLeft: `solid 1px ${theme.divider.backgroundColor}`,
      marginLeft: 40,
    },
  };
};

export default injectSheet(LandingPageSection.styles)(LandingPageSection);
