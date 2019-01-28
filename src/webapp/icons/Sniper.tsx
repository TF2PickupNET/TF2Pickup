import React from 'react';

import {
  IconProps,
  defaultProps,
} from '.';

function Sniper(props: IconProps) {
  return (
    <svg
      x="0px"
      y="0px"
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 37.1 37.1"
    >
      <path
        fill={props.color}
        d="M18.544,0.006c-10.24,0-18.543,8.299-18.543,18.541c0,10.245,8.303,18.546,18.543,18.546c10.244,0,18.544-8.301,18.544-18.546C37.088,8.305,28.788,0.006,18.544,0.006z M18.544,34.833c-8.99-0.016-16.263-7.289-16.281-16.286C2.281,9.556,9.554,2.281,18.544,2.264c8.994,0.018,16.269,7.292,16.285,16.283C34.813,27.544,27.538,34.818,18.544,34.833z M18.544,4.286C10.646,4.298,4.302,10.648,4.285,18.547c0.017,7.903,6.36,14.249,14.259,14.267c7.902-0.018,14.248-6.363,14.265-14.267C32.792,10.648,26.446,4.298,18.544,4.286zM17.481,30.605c-5.824-0.502-10.487-5.168-10.993-10.994h6.199c0.451,2.438,2.362,4.344,4.794,4.795V30.605z M17.481,22.874c-1.59-0.406-2.857-1.676-3.269-3.264h3.269V22.874z M17.481,17.488h-3.269c0.409-1.592,1.679-2.861,3.269-3.269V17.488zM17.481,12.731c-2.437,0.415-4.343,2.324-4.794,4.757H6.488C6.992,11.656,11.657,6.994,17.481,6.49V12.731z M19.606,6.49c5.825,0.502,10.493,5.165,10.998,10.998h-6.239c-0.415-2.438-2.324-4.342-4.759-4.757V6.49z M19.606,14.219c1.59,0.407,2.86,1.677,3.27,3.269h-3.27V14.219z M19.606,19.611h3.27c-0.409,1.588-1.68,2.857-3.27,3.264V19.611z M19.606,30.605v-6.199c2.43-0.447,4.342-2.354,4.759-4.795h6.239C30.098,25.439,25.432,30.107,19.606,30.605z"
      />
    </svg>
  );
}

Sniper.defaultProps = defaultProps;

export default Sniper;