import * as React from 'react';
import { remote,ipcRenderer } from 'electron';
import { BaseProps, getI18nText } from '@blink-mind/renderer-react';
import { ExtName, I18nTextKey, IpcChannelName } from '../../../common';

export function Toolbar(props: BaseProps) {
  const { controller } = props;
  //@ts-ignore
  const windowData = remote.getCurrentWindow().windowData;
  const { files, focusFileId } = windowData;
  const focusFile = files.find(f => f.id === focusFileId);
  let title = focusFile.path;
  if (title) title = title.split(/[\\/]/).pop();
  title = title || getI18nText(props, I18nTextKey.UNTITLED) + ExtName;
  title = `${title} ${
    focusFile.edited ? '-' + getI18nText(props, I18nTextKey.EDITED) : ''
  }`;
  return (
    <div
      className="bmd-toolbar"
      onDoubleClick={() => {
        ipcRenderer.send(IpcChannelName.RM_MAXIMUM_WINDOW);
      }}
    >
      <div className="bmd-title">{title}</div>
      <div className="bm-toolbar">
        {controller.run('renderToolbarItems', props)}
      </div>
    </div>
  );
}
