import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { chains } from './chains';

// const getChainIdName = (chainId) => {
//   switch (chainId) {
//     case 1:
//       return 'Mainnet';
//     case 3:
//       return 'Ropsten';
//     case 4:
//       return 'Rinkeby';
//     case 5:
//       return 'Goerli';
//     case 42:
//       return 'Kovan';
//     case 4447:
//       return 'Ganache';
//     default:
//       return 'Unknown';
//   }
// };

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
    },
  },
  injected: {
    display: {
      logo: "data:image/gif;base64,INSERT_BASE64_STRING",
      name: "Injected",
      description: "Connect with the provider in your Browser"
    },
    package: null
  },
};

export const w3connect = async (currentNetwork) => {
  const web3Modal = new Web3Modal({
    network: chains[currentNetwork].network, // optional
    providerOptions, // required
    cacheProvider: false,
  });
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const injectedChainId = await web3.eth.getChainId();
  if (injectedChainId !== +currentNetwork) {
    alert(
      `Please switch Web3 to the correct network and try signing in again. Detected network: ${chains[currentNetwork].network
      }, Required network: ${chains[currentNetwork].network}`,
    );
    throw new Error(
      `Injected web3 chainId: ${injectedChainId}, config: ${+currentNetwork}`,
    );
  }
  web3.autoRefreshOnNetworkChange = false;
  return { web3 };
};





// useEffect(() => {
//   signIn.web3Modal.network = getChainData(+currentNetwork).network
//   setSignIn(signIn)
// }, [currentNetwork]);

// useEffect(() => {
//   initCurrentUser()

//   if (web3Modal.cachedProvider) {
//     initCurrentUser();
//   }
// }, [web3Modal, currentUser, currentNetwork]);

// useEffect(() => {
//   updateCurrentUser()
//   initContract()
// }, [signIn]);

// useEffect(() => {
//   const initCurrentUserBalance = async () => {
//     try {
//       const balance = await contract.service.getBalance(currentUser.address);
//       const updatedUser = { ...currentUser, balance };
//       setCurrentUser(updatedUser);
//     } catch (e) {
//       console.error(`Could not get balance`);
//     }
//   };

//   if (contract && currentUser && !currentUser.hasOwnProperty('balance')) {
//     initCurrentUserBalance();
//   }
// }, [currentUser, contract]);


// export const createWeb3User = (accountAddress) => {
//   return {
//     type: 'web3',
//     username: accountAddress,
//   };
// };
