import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { FilesPage, PreferencesPage, WelcomePage, LoginPage } from '../pages';
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

  const loginRouteProps = {
    exact: true,
    path: '/login',
    component: LoginPage
  };

  return (
    <HashRouter>
      <div className='full'>
        <RootRoute />
        <Switch>
          <Route {...preferencesRouteProps} />
          <Route {...welcomeRouteProps} />
          <Route {...fileRouteProps} />
          <Route {...loginRouteProps} />
        </Switch>
      </div>
    </HashRouter>
  );
}
