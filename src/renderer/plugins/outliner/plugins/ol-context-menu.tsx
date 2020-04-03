import { MenuDivider, MenuItem } from '@blueprintjs/core';
import * as React from 'react';
import { ViewModeOutliner, pasteAndSplitByLineBreak } from '../utils';
import { getI18nText, I18nKey, Icon } from '@blink-mind/renderer-react';
import { OlOpType } from '../op';
import { KeyboardHotKeyWidget } from '@blink-mind/renderer-react';

export function OlContextMenuPlugin() {
  return {
    customizeTopicContextMenu(ctx, next) {
      const { controller, model, topicKey } = ctx;
      if (model.config.viewMode !== ViewModeOutliner) return next();

      function onClickIndent(e) {
        controller.run('operation', {
          ...ctx,
          opType: OlOpType.INDENT
        });
      }
      function onClickOutdent(e) {
        controller.run('operation', {
          ...ctx,
          opType: OlOpType.OUTDENT
        });
      }

      const res = next();
      res.unshift(
        <MenuItem
          key="indent"
          icon={Icon('indent')}
          text={getI18nText(ctx, I18nKey.INDENT)}
          labelElement={<KeyboardHotKeyWidget hotkeys={['Tab']} />}
          onClick={onClickIndent}
        />,
        <MenuItem
          key="outdent"
          icon={Icon('outdent')}
          text={getI18nText(ctx, I18nKey.OUTDENT)}
          labelElement={<KeyboardHotKeyWidget hotkeys={['Shift', 'Tab']} />}
          onClick={onClickOutdent}
        />,
        <MenuItem
          key="pasteAndSplitByLineBreak"
          icon={Icon('list')}
          text={getI18nText(ctx, I18nKey.PASTE_AND_SPLIT_BY_LINE_BREAK)}
          labelElement={<KeyboardHotKeyWidget hotkeys={['Mod', 'Alt', 'V']} />}
          onClick={() => pasteAndSplitByLineBreak(ctx)}
        />
      );
      return res;
    }
  };
}
