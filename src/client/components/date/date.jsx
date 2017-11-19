import { PureComponent } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const hoursFormats = {
  eu: 'HH:mm',
  na: 'h:mm a',
  oc: 'HH:mm',
};

const dateFormats = {
  eu: 'DD.M.YYYY',
  na: 'DD.M.YYYY',
  oc: 'DD.M.YYYY',
};

let region = null;

const getRegion = () => region || 'eu';

/**
 * Format a date for the specific region.
 *
 * @class
 */
export default class Date extends PureComponent {
  static propTypes = {
    date: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]).isRequired,
    withoutDay: PropTypes.bool,
  };

  static defaultProps = { withoutDay: false };

  /**
   * Get the users region.
   */
  async componentWillMount() {
    if (!region) {
      const location = await axios.get('//api.userinfo.io/userinfos');

      region = location.data.continent.code.toLowerCase();
    }
  }

  render() {
    return format(
      this.props.date,
      this.props.withoutDay
        ? hoursFormats[getRegion()]
        : `${dateFormats[getRegion()]} | ${hoursFormats[getRegion()]}`,
    );
  }
}
