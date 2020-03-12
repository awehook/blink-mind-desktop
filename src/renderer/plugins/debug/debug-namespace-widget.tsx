import React, { useState } from 'react';
import { Checkbox } from '@blueprintjs/core';
import {
  SettingItemButton,
  SettingItemInput,
  SettingItemInputProps,
  SettingRow
} from '@blink-mind/renderer-react';

const _debugNameSpaces = [
  'bmd:*',
  // 'plugin:toolbar',
  'plugin:operation'
  // 'plugin:drag-and-drop'
];

if (!localStorage.allDebugNS)
  localStorage.allDebugNS = _debugNameSpaces.join(',');

export function DebugNamespaceWidget(props) {
  const [debugStr, setDebugStr] = useState(localStorage.debug || '');
  const [allDebugNS,setAllDebugNS] = useState(localStorage.allDebugNS.split(',').sort());
  const [nsName, setNsName] = useState('');

  const setDebugNS = nsArray => {};

  const nameProps: SettingItemInputProps = {
    title: 'namespace:',
    value: nsName,
    onChange: e => {
      //@ts-ignore
      setNsName(e.target.value);
    },
    style: {
      width: 100
    }
  };
  const nsNameInput = <SettingItemInput {...nameProps} />;
  const addNsBtnProps = {
    title: 'Add Or Delete Namespace',
    onClick(e) {
      let _allDebugNS;
      if (allDebugNS.includes(nsName)) {
        _allDebugNS = allDebugNS.filter(i => i !== nsName);
      } else {
        _allDebugNS = [...allDebugNS, nsName];
      }

      setAllDebugNS(_allDebugNS);
      localStorage.allDebugNS = _allDebugNS.join(',');
    }
  };
  const addNsBtn = <SettingItemButton {...addNsBtnProps} />;

  return (
    <div>
      <div>
        {allDebugNS.map(item => {
          const cprops = {
            key: item,
            label: item,
            checked: debugStr.split(',').includes(item),
            onChange: e => {
              let checkedItems = debugStr.split(',').filter(i => i !== '');
              if (checkedItems.includes(item)) {
                checkedItems = checkedItems.filter(i => i !== item);
              } else {
                checkedItems.push(item);
              }
              const newDebugStr = checkedItems.join(',');
              setDebugStr(newDebugStr);
              localStorage.debug = newDebugStr;
            }
          };
          return <Checkbox {...cprops} />;
        })}
      </div>
      <SettingRow>
        {nsNameInput}
        {addNsBtn}
      </SettingRow>
    </div>
  );
}
