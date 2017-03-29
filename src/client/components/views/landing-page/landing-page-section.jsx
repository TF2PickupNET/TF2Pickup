import React, {
  PureComponent,
  PropTypes,
} from 'react';
import Chance from 'chance';
import {
  timings,
  Stylesheet,
} from 'tf2pickup-components/lib/index';

export default class LandingPageSection extends PureComponent {
  static propTypes = {
    imgProps: PropTypes.object,
    children: PropTypes.node,
    imagePosition: PropTypes.oneOf([
      'left',
      'right',
    ]).isRequired,
  };

  static defaultProps = {
    imgProps: {},
    children: '',
  };

  static contextTypes = { theme: PropTypes.object };

  componentWillMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.removeEventListener();
  }

  lastEvent = 0;

  get styles() {
    const chance = new Chance();
    const { imagePosition } = this.props;
    const capitalizedImgPos = chance.capitalize(imagePosition);

    return Stylesheet.compile({
      section: {
        layout: {
          direction: 'horizontal',
          mainAlign: 'center',
          crossAlign: 'center',
          reverse: imagePosition === 'right',
        },
        width: '100%',
        boxSizing: 'border-box',
        padding: '80px 15%',
        overflowX: 'hidden',
      },

      image: {
        elevation: 2,
        opacity: 0,
        transform: `translateX(${imagePosition === 'left' ? '-100%' : '100%'})`,
        willChange: 'opacity, transform',
        ...this.props.imgProps.style,
      },

      text: {
        typo: 'headline',
        padding: 40,
        opacity: 0,
        transform: `translateX(${imagePosition === 'left' ? '100%' : '-100%'})`,
        willChange: 'opacity, transform',
        textAlign: 'center',
        [`border${capitalizedImgPos}`]: 'solid 1px var(dividerColor)',
        [`margin${capitalizedImgPos}`]: 40,
      },
    }, { variables: this.context.theme.variables });
  }

  get isVisible() {
    const {
      top,
      bottom,
      height,
    } = this.section.getBoundingClientRect();

    return top >= 0 && bottom - height / 2 <= window.innerHeight;
  }

  removeEventListener = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  onScroll = () => {
    const currentTime = new Date();

    if (currentTime - this.lastEvent > 100) {
      this.lastEvent = currentTime;

      if (this.isVisible) {
        const imgIsLeft = this.props.imagePosition === 'left';
        const animateOptions = {
          duration: 500,
          easing: timings.easeInOutCubic,
          fill: 'forwards',
        };

        this.img.animate({
          transform: [
            `translateX(${imgIsLeft ? '-' : ''}100%)`,
            'translateX(0)',
          ],
          opacity: [0, 1],
        }, animateOptions);

        this.text.animate({
          transform: [
            `translateX(${imgIsLeft ? '' : '-'}100%)`,
            'translateX(0)',
          ],
          opacity: [0, 1],
        }, animateOptions);

        this.removeEventListener();
      }
    }
  };

  render() {
    const {
      imgProps,
      children,
    } = this.props;
    const styles = this.styles;

    return (
      <section
        ref={(element) => { this.section = element; }}
        style={styles.section}
      >
        <img
          {...imgProps}
          alt="presentation"
          ref={(element) => { this.img = element; }}
          style={styles.image}
        />

        <div
          ref={(element) => { this.text = element; }}
          style={styles.text}
        >
          {children}
        </div>
      </section>
    );
  }
}
