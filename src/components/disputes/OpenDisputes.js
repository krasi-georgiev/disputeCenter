import React, { useState } from 'react';

import DisputesTable from './DisputesTable';
import { OpenDisputesFetch } from './OpenDiputesFetch';

const OpenDisputes = () => {
  let [openDisputes, setOpenDisputes] = useState()

  return (
    <div>
      <div className="TableHeader">
        <h2>Open Disputes</h2>
      </div>
      <OpenDisputesFetch setDisputes={setOpenDisputes} />
      {openDisputes && (
        <DisputesTable pagination={false} disputes={openDisputes} open={true} />
      )}
    </div>
  );
};

export default OpenDisputes;
