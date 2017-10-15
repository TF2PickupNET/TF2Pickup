export default async function configureServer(props) {
  const pickup = props.result;
  const server = props.app.service('servers').get(pickup.serverId);
}
