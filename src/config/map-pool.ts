import maps from './maps';

type Maps = Array<keyof typeof maps>;

type MapPool = {
  [key: string]: Maps,
};

const ultiduoMaps: Maps = [
  'koth_ultiduo_r_b7',
  'ultiduo_badlands_b1',
  'ultiduo_baloo',
  'ultiduo_gullywash_b2',
  'ultiduo_nicecicles',
  'ultiduo_seclusion_b3',
];

const bballMaps: Maps = [
  'ctf_ballin_sky',
  'ctf_bball_alpine_b4',
  'ctf_bball_comptf',
  'ctf_bball_snow_b1',
  'ctf_pro_bball',
];

const mapPool: MapPool = {
  'eu-6v6': [
    'koth_product_rc8',
    'cp_process_final',
    'cp_prolands_b2c',
    'cp_gullywash_final1',
    'cp_snakewater_final1',
    'cp_sunshine',
    'cp_reckoner_rc2',
  ],

  'eu-9v9': [
    'koth_product_rc8',
    'pl_upward',
    'pl_borneo',
    'pl_badwater',
    'cp_steel',
  ],

  'eu-bball': ultiduoMaps,

  'eu-ultiduo': bballMaps,
};

export default mapPool;
