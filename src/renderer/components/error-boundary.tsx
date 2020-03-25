import React from 'react';
import * as Sentry from '@sentry/electron';
import styled from 'styled-components';
import { isDev } from '../utils';
interface Props {}
interface State {
  error: Error;
  errorInfo: any;
}

const ErrorRoot = styled.div`
  color: black;
  padding: 100px;
`;

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    if (isDev) console.error(error);
    else Sentry.captureException(error);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <ErrorRoot>
          <h2>Regrettably something went wrong.</h2>
          <h2>
            If you want to continue from your saved file, please try to click
            menu item [View->Force Reload].
          </h2>
          <h2>
            If [View->Force Reload] faild, please quit this application and
            restart to open your saved file.
          </h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </ErrorRoot>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
