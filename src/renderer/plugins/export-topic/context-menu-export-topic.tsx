import {
  BaseProps,
  getI18nText,
  I18nKey,
  Icon,
  IconName,
  RefKey,
  topicWidgetRootRefKey
} from '@blink-mind/renderer-react';
import { MenuItem } from '@blueprintjs/core';
import { saveAs } from 'file-saver';
import { toBlob, toSvgDataURL } from 'html-to-image';
import * as React from 'react';
import { ViewModeMindMap } from '@blink-mind/core';

export function ContextMenuExportTopic(props: BaseProps) {
  const { controller, model, topicKey, getRef } = props;
  const isMindMap = model.config.viewMode === ViewModeMindMap;
  const outlinerEle = document.getElementById(`bm-outliner-${model.id}`);
  const exportTo = (type: 'png' | 'jpg' | 'svg') => () => {
    const options = isMindMap
      ? {
          backgroundColor: model.config.theme.background
        }
      : {
          backgroundColor: window.getComputedStyle(outlinerEle).backgroundColor
        };
    const title = controller.run('getTopicTitle', { ...props, maxLength: 40 });
    const topicWidgetEle =
      isMindMap && topicKey === model.editorRootTopicKey
        ? getRef(RefKey.NODE_LAYER + model.id)
        : getRef(topicWidgetRootRefKey(topicKey));
    switch (type) {
      case 'png':
      case 'jpg':
        toBlob(topicWidgetEle, options).then(blob => {
          saveAs(blob, `${title}.${type}`);
        });
        break;
      case 'svg':
        toSvgDataURL(topicWidgetEle, options).then(dataUrl => {
          saveAs(dataUrl, `${title}.svg`);
        });
        break;
    }
  };

  return (
    <MenuItem
      icon={Icon(IconName.EXPORT)}
      text={getI18nText(props, I18nKey.EXPORT)}
    >
      <MenuItem text="PNG" onClick={exportTo('png')} />
      <MenuItem text="JPG" onClick={exportTo('jpg')} />
      <MenuItem text="SVG" onClick={exportTo('svg')} />
    </MenuItem>
  );
}
