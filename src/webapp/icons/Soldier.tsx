import React from 'react';

import {
  IconProps,
  defaultProps,
} from '.';

/* tslint:disable:max-line-length */

function Soldier(props: IconProps) {
  return (
    <svg
      x="0px"
      y="0px"
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 37.1 37.1"
    >
      <g>
        <path
          fill={props.color}
          d="M12.395,15.675l8.839,9.018c-0.186,0.095-0.367,0.183-0.641,0.369c-0.453,0.278-0.908,0.55-1.273,0.743c-0.094,0-0.094,0.087-0.094,0.087c-2.46,1.287-4.829,2.21-7.195,4.781c-1.823-1.832-3.736-3.683-5.562-5.611c3.011-2.942,3.826-5.887,5.648-8.831C12.119,16.23,12.211,15.95,12.395,15.675z"
        />
        <polygon
          fill={props.color}
          points="16.042,18.068 13.579,15.585 15.857,13.285 18.316,15.766"
        />
        <polygon
          fill={props.color}
          points="20.957,13.01 18.5,10.521 20.775,8.227 23.236,10.704"
        />
        <polygon
          fill={props.color}
          points="18.862,15.862 21.143,13.557 23.602,15.95 21.322,18.347"
        />
        <polygon
          fill={props.color}
          points="21.234,18.709 23.691,21.195 21.412,23.498 18.956,21.015"
        />
        <polygon
          fill={props.color}
          points="30.344,1.964 35.172,6.752 29.793,16.043 20.867,7.119"
        />
        <polygon
          fill={props.color}
          points="26.15,13.653 28.613,16.137 26.332,18.439 23.873,16.043"
        />
        <polygon
          fill={props.color}
          points="37.086,2.7 35.719,5.371 31.801,1.317 34.445,0.032"
        />
        <polygon
          fill={props.color}
          points="5.288,24.875 12.211,31.786 6.928,37.119 0.004,30.217"
        />
      </g>
    </svg>
  );
}

Soldier.defaultProps = defaultProps;

export default Soldier;
