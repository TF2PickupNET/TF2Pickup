interface ConfigType {
  name: string,
  display: string,
}

const cp: ConfigType = {
  name: '5cp',
  display: '5CP',
};
const koth: ConfigType = {
  name: 'koth',
  display: 'KOTH',
};
const stopwatch: ConfigType = {
  name: 'stopwatch',
  display: 'Stopwatch',

};

const configTypes = {
  '5cp': cp,
  koth,
  stopwatch,
};

export { ConfigType };

export default configTypes;
