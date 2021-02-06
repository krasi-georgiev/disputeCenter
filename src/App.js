import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import styled from 'styled-components';

import Routes from './Routes';
import HeaderNav from 'components/shared/HeaderNav';
import User from 'contexts/User';
import Footer from 'components/shared/Footer';
import Theme from './contexts/Theme';
import Network from './contexts/Network';

const StyledLayout = styled(Layout)`
  height: 100%;
`;

const App = () => {
  const { Content } = Layout;

  return (
    <Theme>
      <Network>
        <Fragment>
          <Helmet defaultTitle="Tellor Dispute Center">
            <meta name="description" content="Tellor Dispute Center" />
          </Helmet>
          <StyledLayout>
            <Router>
              <User>
                <HeaderNav />
              </User>
              <Content>
                <Routes />
              </Content>
              <Footer />
            </Router>
          </StyledLayout>
        </Fragment>
      </Network>
    </Theme>
  );
};

export default App;
