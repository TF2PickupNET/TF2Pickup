interface Announcer {
  name: string,
  display: string,
  needsPurchase: boolean,
}

const DEFAULT_ANNOUNCER = 'default';

const defaultAnnouncer: Announcer = {
  name: 'default',
  display: 'TF2 Announcer (default)',
  needsPurchase: false,
};

const pyrovision: Announcer = {
  name: 'pyrovision',
  display: 'TF2 Pyrovision',
  needsPurchase: true,
};

const admirable: Announcer = {
  name: 'admirable',
  display: 'Admirable',
  needsPurchase: false,
};

const admirablePyrovision: Announcer = {
  name: 'admirable-pyrovision',
  display: 'Admirable (Pyrovision)',
  needsPurchase: true,
};

const higps: Announcer = {
  name: 'higps',
  display: 'HiGPS',
  needsPurchase: false,
};

const langeh: Announcer = {
  name: 'langeh',
  display: 'Lange',
  needsPurchase: false,
};

const salamancer: Announcer = {
  name: 'salamancer',
  display: 'Salamancer',
  needsPurchase: true,
};

const truktruk: Announcer = {
  name: 'truktruk',
  display: 'TrukTruk',
  needsPurchase: true,
};

const jon: Announcer = {
  name: 'jon',
  display: 'Jon',
  needsPurchase: true,
};

const announcers = {
  default: defaultAnnouncer,
  pyrovision,
  admirable,
  'admirable-pyrovision': admirablePyrovision,
  higps,
  langeh,
  salamancer,
  truktruk,
  jon,
};

export {
  Announcer,
  DEFAULT_ANNOUNCER,
};

export default announcers;
