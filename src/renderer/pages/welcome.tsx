import * as React from 'react';
import { CreateFromTheme } from '../components';

export function WelcomePage(props) {
  return (
    <div className="bm-welcome bm-card">
      <CreateFromTheme {...props} />
    </div>
  );
}
