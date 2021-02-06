import { Card, HTMLSelect, Switch } from '@blueprintjs/core';
import { ipcRenderer } from 'electron';
import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { I18nTextKey, IpcChannelName, StoreItemKey } from '../../common';
import { Column } from '../components';
import { useTranslation } from '../hooks';
import { getStoreItem } from '../utils';

const Item = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const Select = styled(HTMLSelect)`
  width: 300px;
`;

const ItemText = styled.div`
  width: 200px;
  margin-right: 10px;
  text-align: right;
`;

export function PreferencesPage(props) {
  const t = useTranslation();
  const lng = getStoreItem(StoreItemKey.preferences.normal.language);
  const _appearance = getStoreItem(StoreItemKey.preferences.normal.appearance);
  const _autoSave =
    getStoreItem(StoreItemKey.preferences.normal.autoSave) || false;

  const [appearance, setAppearance] = useState(_appearance);
  const [autoSave, setAutoSave] = useState(_autoSave);

  const onLngChange = e => {
    ipcRenderer.send(IpcChannelName.RM_SET_STORE_ITEM, {
      key: StoreItemKey.preferences.normal.language,
      value: e.target.value
    });
  };

  const onAppearanceChange = e => {
    setAppearance(e.target.value);
    ipcRenderer.send(IpcChannelName.RM_SET_STORE_ITEM, {
      key: StoreItemKey.preferences.normal.appearance,
      value: e.target.value
    });
  };

  const onAutoSaveChange = e => {
    const v = !autoSave;
    setAutoSave(v);
    ipcRenderer.send(IpcChannelName.RM_SET_STORE_ITEM, {
      key: StoreItemKey.preferences.normal.autoSave,
      value: v
    });
  };

  return (
    <Column>
      <Card>
        <Item>
          <ItemText>{t(I18nTextKey.APPEARANCE) + ':'}</ItemText>
          <Select value={appearance} onChange={onAppearanceChange}>
            <option value="light">{t(I18nTextKey.LIGHT)}</option>
            <option value="dark">{t(I18nTextKey.DARK)}</option>
          </Select>
        </Item>

        <Item>
          <ItemText>{t(I18nTextKey.DISPLAY_LANGUAGE) + ':'}</ItemText>
          <Select value={lng} onChange={onLngChange}>
            <option value="en">{t(I18nTextKey.ENGLISH)}</option>
            <option value="zh-CN">{t(I18nTextKey.CHINESE_SIMPLIFIED)}</option>
          </Select>
        </Item>

        <Item>
          <ItemText>{t(I18nTextKey.AUTO_SAVE) + ':'}</ItemText>
          <Switch
            checked={autoSave}
            style={{
              marginBottom: '0px'
            }}
            onChange={onAutoSaveChange}
          />
        </Item>
      </Card>
    </Column>
  );
}
