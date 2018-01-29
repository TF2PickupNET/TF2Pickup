import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'materialize-react';

function Pyro(props) {
  return (
    <svg
      x="0px"
      y="0px"
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 37.1 37.1"
      {...props}
    >
      <path
        fill={props.color}
        d={[
          'M31.549,29.536c-1.203,3.385-4.911,7.558-11.632,7.558c-14.139,0-13.303-5.607-16.455-',
          '10.06c0.789-0.092,1.993,1.298,1.993,1.298c-1.948-4.029-1.392-6.166-0.142-8.02c1.58-',
          '2.272,3.662-5.565,1.068-6.722c1.019-0.139,3.521-0.462,4.124,3.339c0.42,2.688,1.021,',
          '2.366,1.021,2.366s-0.049-5.197,3.432-9.647c3.429-4.449-1.344-8.993-2.087-9.643c2.967,',
          '1.394,12.052,3.804,10.431,17.988c-0.143,6.118,4.218,3.478,4.124,0.559c-0.139-2.921,',
          '1.482-5.424,2.596-5.843c-0.232,1.389-0.186,3.477,0.88,5.517C32.665,21.701,32.756,',
          '26.199,31.549,29.536z',
        ].join('')}
      />
    </svg>
  );
}

Pyro.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Pyro.defaultProps = {
  color: colors.blackIcons,
  size: 48,
};

export default Pyro;
