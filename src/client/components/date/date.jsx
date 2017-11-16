import { PureComponent } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const defaultFormat = 'DD.M.YYYY HH:mm';

const formats = {
  eu: defaultFormat,
  na: defaultFormat,
  oc: defaultFormat,
};

let region = null;

export default class Date extends PureComponent {
  static propTypes = {};

  static getFormat() {
    return region
      ? formats[region]
      : defaultFormat;
  }

  async componentWillMount() {
    if (!region) {
      const location = await axios.get('//api.userinfo.io/userinfos');

      region = location.data.continent.code.toLowerCase();
    }
  }

  render() {
    return format(this.props.date, Date.getFormat());
  }
}
