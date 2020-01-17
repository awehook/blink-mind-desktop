import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function RootRoute(props) {
  return (
    <Route
      exact
      path="/"
      render={props => {
        console.log('RootRoute render');
        return <Redirect to="/welcome" />;
      }}
    />
  );
}
