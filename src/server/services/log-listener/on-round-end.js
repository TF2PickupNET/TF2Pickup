import debug from 'debug';

const log = debug('TF2Pickup:log-listener:on-round-end');

export default {
  line: /World triggered "Game_Over" reason "(.*?)"/,

  // Data[1] - Reason for round end.
  async handler(app, pickup) {
    log('Ending pickup because the game is over', pickup.id);

    await app.service('pickup').patch(pickup.id, {
      $set: {
        status: 'game-finished',
        endedOn: new Date(),
      },
    });
  },
};
