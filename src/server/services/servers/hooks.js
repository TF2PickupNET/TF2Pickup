import omit from 'lodash.omit';

export default {
  after: {
    get(props) {
      return {
        ...props,
        result: omit(props.result, [
          'password',
          'reservationId',
        ]),
      };
    },
  },
};
