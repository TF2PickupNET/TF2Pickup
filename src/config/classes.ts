interface ClassInfo {
  name: string,
  aliases: string[],
}

const scout: ClassInfo = {
  name: 'scout',
  aliases: [],
};
const soldier: ClassInfo = {
  name: 'soldier',
  aliases: ['solly'],
};
const pocket: ClassInfo = {
  name: 'pocket',
  aliases: [],
};
const roamer: ClassInfo = {
  name: 'roamer',
  aliases: [],
};
const pyro: ClassInfo = {
  name: 'pyro',
  aliases: [],
};
const demoman: ClassInfo = {
  name: 'demoman',
  aliases: ['demo'],
};
const heavy: ClassInfo = {
  name: 'heavy',
  aliases: [],
};
const engineer: ClassInfo = {
  name: 'engineer',
  aliases: ['engi'],
};
const medic: ClassInfo = {
  name: 'medic',
  aliases: ['med'],
};
const sniper: ClassInfo = {
  name: 'sniper',
  aliases: [],
};
const spy: ClassInfo = {
  name: 'spy',
  aliases: [],
};

const classes = {
  scout,
  soldier,
  pocket,
  roamer,
  pyro,
  demoman,
  heavy,
  engineer,
  medic,
  sniper,
  spy,
};

export { ClassInfo };

export default classes;
