import React from 'react';
import PropTypes from 'prop-types';

export default function Medic({
  color,
  size,
  ...props
}) {
  return (
    <svg
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 37.1 37.1"
      {...props}
    >
      <path
        fill={color}
        d={[
          'M37.085,10.948v15.206h-10.94v10.939H10.941V26.154H0.004V10.948h10.938V0.006h15.',
          '203v10.942H37.085zM34.998,13.032h-8.854h-1.251H24.06v-0.834v-1.25V2.095H13.027v8.',
          '854v1.25v0.834h-0.833h-1.253H2.089v11.032h8.853h1.253h0.833V24.9v1.254v8.854H24.06v-',
          '8.854V24.9v-0.836h0.834h1.251h8.854V13.032z M3.295,16.278h30.496v6.536h-7.646h-1.251H24',
          '.06h-1.254v1.25V24.9v1.254v7.646h-8.529v-7.646V24.9v-0.836v-1.25h-1.249h-0.833h-',
          '1.253H3.295V16.278z',
        ].join('')}
      />
    </svg>
  );
}

Medic.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Medic.defaultProps = { size: 48 };
