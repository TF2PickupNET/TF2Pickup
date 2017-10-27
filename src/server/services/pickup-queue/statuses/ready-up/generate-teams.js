import debug from 'debug';

const log = debug('TF2Pickup:pickup-queue:statuses:generating-teams');

const prio = {
  '6v6': [
    'scout',
    'demoman',
    'pocket',
    'roamer',
    'medic'
  ],
  '9v9': [
    'demoman',
    'sniper',
    'spy',
    'medic',
    'pyro',
    'scout',
    'soldier',
    'heavy',
    'engineer'
  ],
  'bball': [
    'soldier'
  ],
  'ultiduo': [
    'soldier',
    'medic'
  ]
};

function sortClass(arr){
  arr.sort(function (a, b) {
    if (a.elo < b.elo) {
      return 1;
    }
    if (a.elo > b.elo) {
      return -1;
    }
    return 0;
  });
  return arr;
}

function getAvgTeamElo(arr){
  var tmp_elos = {
    red: 0,
    blu: 0,
    diff: 0
  };

  Object.entries(arr).forEach(([team, tfclasses]) => {

    var p = 0;
    Object.entries(tfclasses).forEach( ([tfclass, tfplayers]) => {
      tfplayers.forEach( (el) => {
        p++;
        tmp_elos[team] += el.elo;
      });
    });

    tmp_elos[team] = Math.round(tmp_elos[team]/p);
  });

  var diff = tmp_elos.red - tmp_elos.blu;
  if(diff < 0) diff = diff * -1;
  tmp_elos.diff = diff;

  return tmp_elos;
}

function balanceTeams(arr, mode){

  prio[mode].forEach( tfclass => {

    var tfplayers = arr.red[tfclass];
    var avg = getAvgTeamElo(arr);
    var diff = avg.red - avg.blu;

    if(diff < 0) diff = diff * -1;

    //swap players of this class
    // for 6s we dont swap scouts again, since we started with them and they should be balanced already
    if(tfplayers.length == 1){
      var p1 = arr.red[tfclass].shift();
      var p2 = arr.blu[tfclass].shift();

      arr.red[tfclass].push(p2);
      arr.blu[tfclass].push(p1);

      //check elo and if less than before keep changes
      var new_avg = getAvgTeamElo(arr);
      var new_diff = new_avg.red - new_avg.blu;
      if(new_diff < 0) new_diff = new_diff * -1;

      if(new_diff > diff){

        var p1 = arr.red[tfclass].shift();
        var p2 = arr.blu[tfclass].shift();

        arr.red[tfclass].push(p2);
        arr.blu[tfclass].push(p1);

      }
    }
  });

  return arr;
}

/**
 * Generate the teams.
 *
 * @returns {Object} - Returns the teams.
 */
export default function generateTeams(props, players, mode) {
  const userService = props.app.service('users');

  var teams = {
    red: {},
    blu: {}
  };

  //get user elos per class and sort

  prio[mode].forEach( tfclass => {
    if(!teams.red.hasOwnProperty(tfclass)){
      teams.red[tfclass] = [];
    }

    if(!teams.blu.hasOwnProperty(tfclass)){
      teams.blu[tfclass] = [];
    }

    var users = players[tfclass];

    users.forEach( user => {
      var userElos = userService.find({
        query: {
          id: user.id,
        },
        limit: 1,
        sort: { elo: -1 },
      });

      user.elo = userElos[tfclass];
    });

    users = sortClass(users);

    var max = users.length;
    while( (teams.red[tfclass].length + teams.blu[tfclass].length) < max ){

      var avg = getAvgTeamElo(teams);

      var top = users.shift();
      var bot = users.pop();

      if(avg.blu > avg.red){
        teams.blu[tfclass].push( bot );
        teams.red[tfclass].push( top );
      }else{
        teams.blu[tfclass].push( top );
        teams.red[tfclass].push( bot );
      }
    }
  });

  //running through teams
  for(var i = 0; i < 5; i++){
    teams = balanceTeams(teams, mode);
  }
  log(teams);
  return teams;
}
