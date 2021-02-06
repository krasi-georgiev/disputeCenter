import React, { useContext } from 'react';

import { NetworkContext } from '../../contexts/Network';
import { UserContext } from '../../contexts/User';
import { Button } from 'antd';
import { chains } from 'utils/chains';
import TellorService from 'utils/tellorService';
import { w3connect } from 'utils/auth';



export const Web3SignIn = () => {
  const [, setCurrentUser] = useContext(UserContext);
  const [currentNetwork] = useContext(NetworkContext);

  return (
    <Button
      type="default"
      size="large"
      onClick={async () => {
        try {
          let user = {}
          user.web3 = await w3connect(currentNetwork)
          user.address = await user.web3.eth.getAccounts()
          user.contracts = await TellorService(user.web3, chains[currentNetwork].contractAddr,)
          user.balance = await user.contracts.service.getBalance(user.address);
          setCurrentUser(user);
        } catch (err) {
          console.log('login error', err);
        }
      }}
    >
      Connect
    </Button>
  );
};
