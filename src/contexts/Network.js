import React, { useState, createContext } from 'react';
// import Web3Modal from 'web3modal';

// import { w3connect, providerOptions, createWeb3User, signIn } from '../utils/auth';
// import { theme } from '../theme';
// import { getChainData } from '../utils/chains';
// import tellorLoaderDark from '../assets/Tellor__Loader--Dark.json';
// import tellorLoaderLight from '../assets/Tellor__Loader--Light.json';

// export const UserContext = createContext();
// export const Web3Context = createContext();
// export const ThemeContext = createContext();
export const NetworkContext = createContext();


const Network = (props) => {
  const [currentNetwork, setCurrentNetwork] = useState(
    window.localStorage.getItem('defaultNetwork') || '1'
  );

  return (
    <NetworkContext.Provider value={[currentNetwork, setCurrentNetwork]}>
      {props.children}
    </NetworkContext.Provider >
  );
};

export default Network;
