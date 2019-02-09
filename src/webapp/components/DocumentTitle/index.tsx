import withSideEffect from 'react-side-effect';
import { isString } from '@utils/string';

const suffix = '| TF2Pickup.net';

interface Props {
  title?: string,
  onChange?(title: string | null): void,
}

interface State {
  title: string | null,
  onChange: Array<(title: string | null) => void>,
}

const defaultState: State = {
  title: null,
  onChange: [],
};

function reducePropsToState(propsList: Props[]): State {
  return propsList.reduce((accu, props) => {
    return {
      title: accu.title !== null && isString(props.title) ? props.title : accu.title,
      onChange: [
        ...accu.onChange,
        (title: string | null) => props.onChange && props.onChange(title),
      ],
    };
  }, defaultState);
}

function handleStateChangeOnClient(state: State) {
  const { title } = state;

  if (title !== null && title !== document.title) {
    document.title = title + suffix;

    state.onChange.forEach(fn => fn(title));
  }
}

function DocumentTitle() {
  return null;
}

export default withSideEffect<Props, State>(
  reducePropsToState,
  handleStateChangeOnClient,
)(DocumentTitle);
