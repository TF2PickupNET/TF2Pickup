// @flow

import AcceptRulesScreen from './AcceptRulesScreen';
import RegionSelectScreen from './RegionSelectScreen';
import NameSelectScreen from './NameSelectScreen';
import FinishScreen from './FinishScreen';

const steps = [{
  name: 'accept-rules',
  display: 'Accept the rules',
  description: '',
  component: AcceptRulesScreen,
}, {
  name: 'region-select',
  display: 'Select a region',
  description: '',
  component: RegionSelectScreen,
}, {
  name: 'select-name',
  display: 'Select a name',
  description: '',
  component: NameSelectScreen,
}, {
  name: 'finish',
  display: 'Finish',
  description: '',
  component: FinishScreen,
}];

export default steps;
