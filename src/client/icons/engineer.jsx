import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'materialize-react';

export default function Engineer({
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
          'M34.853,24.17c1.948,1.949,2.597,4.635,2.042,7.092l-4.544-4.543l-5.657,5.656l4.543,',
          '4.547c-2.456,0.51-5.146-0.094-7.092-2.045c-2.089-2.082-2.689-5.145-1.809-7.783L10.002,',
          '14.756c-2.641,0.883-5.702,0.278-7.786-1.809C0.269,11-0.332,8.312,0.176,5.855l4.543,',
          '4.542l5.655-5.654L5.83,0.198c2.46-0.557,5.147,0.092,7.096,2.043c2.085,2.081,2.689,5.',
          '143,1.808,7.79l12.331,12.329C29.707,21.48,32.767,22.084,34.853,24.17z',
        ].join('')}
      />
    </svg>
  );
}

Engineer.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Engineer.defaultProps = {
  color: colors.blackIcons,
  size: 48,
};
