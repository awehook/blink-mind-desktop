import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { PreferencesPage, WelcomePage } from '../pages';
import { RootRoute } from './root-route';

export function PageRouter(props) {
  const preferencesRouteProps = {
    exact: true,
    path: '/preferences',
    component: PreferencesPage
  };
  const welcomeRouteProps = {
    exact: true,
    path: '/welcome',
    component: WelcomePage
  };
  return (
    <HashRouter>
      <div>
        <RootRoute />
        <Switch>
          <Route {...preferencesRouteProps} />
          <Route {...welcomeRouteProps} />
        </Switch>
      </div>
    </HashRouter>
  );
}
