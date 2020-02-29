import React from 'react';
import { InputGroup } from '@blueprintjs/core';
import { getI18nText } from '@blink-mind/renderer-react';
import { I18nTextKey } from '../../common';

export function LoginPage(props) {
  return (
    <div className='bmd-login'>
      <div></div>

      <form>
        <div>
          <div>{getI18nText(props, I18nTextKey.EMAIL)}</div>
          <InputGroup />
        </div>
        <div>
          <div>
            <span>{getI18nText(props,I18nTextKey.PASSWORD)}</span>
          </div>
        </div>
      </form>
    </div>
  );
}
