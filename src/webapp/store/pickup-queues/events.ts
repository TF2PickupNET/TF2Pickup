import {ClientApp} from "@feathersjs/feathers";
import store from "../index";
import {updatePickupQueue} from "./actions";

export default function events() {
  return (app: ClientApp) => {
    app
      .service('pickup-queues')
      .on('patched', (queue) => {
        store.dispatch(updatePickupQueue(queue));
      });
  };
}
