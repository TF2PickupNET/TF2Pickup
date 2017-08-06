import React from 'react';
import injectSheet from 'react-jss';
import { typography } from 'materialize-react';
import PropTypes from 'prop-types';

import { breakpoints } from '../../config';

/**
 * A section for the Landing page with an image an some text.
 *
 * @param {Object} props - The props for the section.
 * @param {Object} props.classes - Classes provided by Jss for the component.
 * @param {String} props.imgSrc - The image source.
 * @param {Object} props.imgProps - Additional props for the image element.
 * @param {JSX} props.children - The text for the component.
 * @param {String} props.imagePosition - The position for the image. Either left or right.
 * @returns {JSX} - Returns the JSX.
 */
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
      <span className={classes.text}>
        {children}
      </span>

      <img
        alt="presentation"
        src={imgSrc}
        {...imgProps}
      />
    </section>
  );
}

LandingPageSection.propTypes = {
  classes: PropTypes.shape({
    section: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  imgSrc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  imagePosition: PropTypes.oneOf(['left', 'right']).isRequired,
  imgProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

LandingPageSection.defaultProps = { imgProps: {} };

LandingPageSection.styles = (theme) => {
  return {
    section: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
      padding: '80px 15%',

      '&.image-left': { flexDirection: 'column-reverse' },

      [breakpoints.getQuery('large')]: {
        flexDirection: 'row',

        '&.image-left': { flexDirection: 'row-reverse' },
      },
    },

    text: {
      ...typography.display1,
      padding: 40,
      textAlign: 'center',
      borderColor: theme.divider.backgroundColor,
    },
  };
};

export default injectSheet(LandingPageSection.styles)(LandingPageSection);
