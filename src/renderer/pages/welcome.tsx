import * as React from 'react';
import { Column, CreateFromTheme } from '../components';

export function WelcomePage(props) {
  return (
    <Column>
      <CreateFromTheme {...props} />
    </Column>
  );
}
