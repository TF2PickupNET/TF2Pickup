import AcceptRulesScreen from './AcceptRulesScreen';
import RegionSelectScreen from './RegionSelectScreen';
import NameSelectScreen from './NameSelectScreen';
import FinishScreen from './FinishScreen';

const steps = [{
  id: 'accept-rules',
  label: 'Accept the rules',
  component: AcceptRulesScreen,
}, {
  id: 'region-select',
  label: 'Select a region',
  component: RegionSelectScreen,
}, {
  id: 'select-name',
  label: 'Select a name',
  component: NameSelectScreen,
}, {
  id: 'finish',
  label: 'Finish',
  component: FinishScreen,
}];

export default steps;
