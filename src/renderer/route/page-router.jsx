import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { FilesPage, PreferencesPage, WelcomePage } from '../pages';
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

  const fileRouteProps = {
    exact: true,
    path: '/file',
    component: FilesPage
  };

  return (
    <HashRouter>
      <div className='full'>
        <RootRoute />
        <Switch>
          <Route {...preferencesRouteProps} />
          <Route {...welcomeRouteProps} />
          <Route {...fileRouteProps} />
        </Switch>
      </div>
    </HashRouter>
  );
}
