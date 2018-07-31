/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';

export default class HomePage extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="Home page of React.js Boilerplate application"
          />
        </Helmet>
        <h1>
          Home
        </h1>
      </div>
    );
  }
}
