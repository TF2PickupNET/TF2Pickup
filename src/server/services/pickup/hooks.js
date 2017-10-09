import reserveServer from './reserve-server';

export default {
  after: {
    create(props) {
      reserveServer(props);

      return props;
    },
  },
};
