import React, { useState, createContext } from 'react';

// import { w3connect, providerOptions, createWeb3User, signIn } from '../utils/auth';
// import { theme } from '../theme';
// import { getChainData } from '../utils/chains';
// import tellorLoaderDark from '../assets/Tellor__Loader--Dark.json';
// import tellorLoaderLight from '../assets/Tellor__Loader--Light.json';

export const UserContext = createContext();

const User = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    // const updateCurrentUser = async (signIn) => {
    //   try {
    //     const [account] = await signIn.web3.eth.getAccounts();
    //     setCurrentUser(createWeb3User(account));
    //   } catch (e) {
    //     console.error(`Could not log in`);
    //     setCurrentUser();
    //   }
    // };

    // const initContract = async (web3, network) => {
    //     try {
    //         const tellorService = new TellorService(web3, network);
    //         await tellorService.initContract();
    //         const disputeFee = await tellorService.getDisputeFee();

    //         setContract({ service: tellorService, disputeFee });
    //     } catch (e) {
    //         console.error(`Could not init contract`, e);
    //     }
    // };




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

    return (
        <UserContext.Provider value={[currentUser, setCurrentUser]}>
            {children}
        </UserContext.Provider >
    );
};

export default User;
