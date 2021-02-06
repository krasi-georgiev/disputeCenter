import React, { useEffect, useState } from 'react';

import { GET_LATEST_DISPUTES } from 'utils/queries';
import GraphFetch from 'components/shared/GraphFetch';

export const OpenDisputesFetch = ({ setRecords }) => {
  const [latestValues, setLatestValues] = useState();

  useEffect(() => {
    if (latestValues) {
      const disputes = latestValues.disputes.filter(
        (dispute) => dispute.status === 'Open Dispute',
      );

      setRecords(disputes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestValues]);

  return (
    <>
      <GraphFetch
        query={GET_LATEST_DISPUTES}
        setRecords={setLatestValues}
        suppressLoading={true}
      />
    </>
  );
};

export default OpenDisputesFetch;
