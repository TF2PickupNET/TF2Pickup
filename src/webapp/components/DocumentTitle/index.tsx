import {
  FunctionComponent,
  ReactNode,
} from 'react';
import withSideEffect from 'react-side-effect';

import { isString } from '../../../utils/string';

const suffix = '| TF2Pickup.net';

interface Props {
  title?: string,
  onChange?(title: string | null): void,
  children?: ReactNode,
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
      onChange: props.onChange ? [
        ...accu.onChange,
        props.onChange.bind(null),
      ] : accu.onChange,
    };
  }, defaultState);
}

function handleStateChangeOnClient(state: State) {
  const nextTitle = state.title;

  if (nextTitle !== null && nextTitle !== document.title) {
    document.title = nextTitle + suffix;

    state.onChange.forEach(fn => fn(nextTitle));
  }
}

function DocumentTitle(props: Props) {
  return props.children;
}

DocumentTitle.defaultProps = { children: null };

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient,
)(DocumentTitle as FunctionComponent<Props>);
