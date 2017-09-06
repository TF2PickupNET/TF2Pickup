import React from 'react';
import injectSheet from 'react-jss';
import {
  breakpoints,
  Typography,
} from 'materialize-react';
import PropTypes from 'prop-types';

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
function Section({
  classes,
  imgSrc,
  imgProps,
  children,
  imagePosition,
}) {
  const imgPositionClass = imagePosition === 'left' && 'image-left';

  return (
    <section className={`${classes.section} ${imgPositionClass}`}>
      <Typography
        className={classes.text}
        typography="display1"
      >
        {children}
      </Typography>

      <img
        alt="presentation"
        src={imgSrc}
        {...imgProps}
      />
    </section>
  );
}

Section.propTypes = {
  classes: PropTypes.shape({
    section: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  imgSrc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  imagePosition: PropTypes.oneOf(['left', 'right']).isRequired,
  imgProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Section.defaultProps = { imgProps: {} };

Section.styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    padding: '80px 15%',

    '&.image-left': { flexDirection: 'column-reverse' },

    [breakpoints.up('desktop')]: {
      flexDirection: 'row',

      '&.image-left': { flexDirection: 'row-reverse' },
    },
  },

  text: {
    padding: 40,
    textAlign: 'center',
  },
};

export default injectSheet(Section.styles)(Section);
