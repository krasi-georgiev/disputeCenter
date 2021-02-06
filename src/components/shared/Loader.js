import React, { useContext } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import { ThemeContext } from 'contexts/Theme';

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
`;

const Loader = () => {
  const [mode] = useContext(ThemeContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: mode,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <LoadingDiv>
      <Lottie options={defaultOptions} height={120} width={120} />
    </LoadingDiv>
  );
};

export default Loader;
