// @flow

import React, {
  Suspense,
  type ComponentType,
} from 'react';
import { Spin } from 'antd';

export default function createLazyRoute(Comp: ComponentType<{}>) {
  return <P>(props: P) => (
    <Suspense fallback={<Spin delay={100} />}>
      <Comp {...props} />
    </Suspense>
  );
}
