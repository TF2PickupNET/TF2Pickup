/* eslint-disable no-console, id-blacklist */

import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

console.warn = (message) => {
  throw new Error(message);
};

console.error = (message) => {
  throw new Error(message);
};
