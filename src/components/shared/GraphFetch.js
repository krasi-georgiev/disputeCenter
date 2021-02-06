import React, { useContext, useEffect } from 'react';
import { ApolloClient, useQuery } from '@apollo/client'


import { cache } from '../../utils/cache';
import { chains } from 'utils/chains';
import { NetworkContext } from 'contexts/Network';
import Loader from './Loader';

const GraphFetch = ({ query, setRecords, variables, suppressLoading }) => {
  const [currentNetwork] = useContext(NetworkContext);

  const { loading, error, data } = useQuery(query, {
    client: new ApolloClient({
      uri: chains[currentNetwork].subgraphURL,
      cache: cache
    }),
    variables,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  });

  useEffect(() => {
    if (data) {
      setRecords(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <>{!suppressLoading ? <Loader /> : null}</>;
  if (error) console.log('error', error);

  return <></>;
};

export default GraphFetch;
