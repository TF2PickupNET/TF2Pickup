import React from 'react';
import LastPickupLoader from '@webapp/components/Loaders/LastPickupLoader';
import PickupQueueLoader from '@webapp/components/Loaders/PickupQueueLoader';

function Loaders() {
  return (
    <React.Fragment>
      <LastPickupLoader />

      <PickupQueueLoader />
    </React.Fragment>
  );
}

export default Loaders;
