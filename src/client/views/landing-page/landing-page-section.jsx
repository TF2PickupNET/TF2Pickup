import React from 'react';
import injectSheet from 'react-jss';
import { typography } from 'materialize-react';

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
