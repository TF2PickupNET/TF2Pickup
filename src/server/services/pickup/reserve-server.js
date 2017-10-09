import servemeStrategy from './serveme-strategy';

const strategies = {
  eu(props) {
    return servemeStrategy(
      'http://serveme.tf',
      props.app.get('config').SERVEME_API_KEY_EU,
    );
  },

  na(props) {
    return servemeStrategy(
      'http://na.serveme.tf',
      props.app.get('config').SERVEME_API_KEY_NA,
    );
  },

  au() {

  },
};

export default async function reserveServer(props) {
  const pickupId = props.result.id;
  console.log(pickupId);

}
