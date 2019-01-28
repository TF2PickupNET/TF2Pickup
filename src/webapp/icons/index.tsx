import { ComponentType } from 'react';

import classes from '../../config/classes';

import Soldier from './Soldier';
import Heavy from './Heavy';
import Scout from './Scout';
import Demoman from './Demoman';
import Medic from './Medic';
import Pyro from './Pyro';
import Spy from './Spy';
import Sniper from './Sniper';
import Engineer from './Engineer';

interface IconProps {
  size?: number,
  color?: string,
}

const defaultProps: IconProps = {
  size: 32,
  color: '',
};

function getIconForClassName(className: keyof typeof classes): ComponentType<IconProps> {
  switch (className) {
    case 'soldier':
    case 'roamer':
    case 'pocket':
      return Soldier;
    case 'heavy':
      return Heavy;
    case 'scout':
      return Scout;
    case 'demoman':
      return Demoman;
    case 'sniper':
      return Sniper;
    case 'spy':
      return Spy;
    case 'pyro':
      return Pyro;
    case 'medic':
      return Medic;
    case 'engineer':
      return Engineer;
    default:
      throw new TypeError(`Invalid class name ${className}`);
  }
}

export {
  IconProps,
  defaultProps,
  getIconForClassName,

  Soldier,
  Heavy,
  Scout,
  Demoman,
  Medic,
  Engineer,
  Spy,
  Pyro,
  Sniper,
};
