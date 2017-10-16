import config from 'config';
import axios from 'axios';

export default function slack() {
  const that = this;

  that.service('slack', {
    setup() {
      this.url = config.get('service.slack.url');
    },

    create(data) {
      if (this.url) {
        return axios.post(`https://hooks.slack.com/services/${this.url}`, data);
      }

      return Promise.resolve();
    },
  });
}
