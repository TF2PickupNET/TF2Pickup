export default async function configureServer(props) {
  const pickup = props.result;
  const server = await props.app.service('servers').get(pickup.serverId);
}
