/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Layout from '../../components/Layout';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

class App extends React.Component {

  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta name="description" content="A React.js Boilerplate application"/>
        </Helmet>
        <Layout>
          <Switch>
            <Route exact path="/homePage" component={HomePage}/>
            <Route exact path="/systemManage" component={() => <Redirect to="/systemManage/funcManage" component={FeaturePage}/>}/>
            <Route path="/systemManage/funcManage" component={FeaturePage}/>
            <Route path="" component={NotFoundPage}/>
          </Switch>
        </Layout>
      </AppWrapper>
    );
  }
}


export default App;
