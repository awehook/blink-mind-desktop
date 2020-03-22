import { HotKeyName, HotKeysConfig } from '@blink-mind/renderer-react';
import { ViewModeOutliner } from '../utils';
import { OlOpType } from '../op';
import { IHotkeyProps } from '@blueprintjs/core';
import { OpType } from '@blink-mind/core';

function op(opType: string, props) {
  const { topicKey, controller } = props;
  if (topicKey === undefined) {
    props = { ...props, topicKey: controller.model.focusKey };
  }
  controller.run('operation', { ...props, opType });
}

export function OlHotKeyPlugin() {
  return {
    customizeHotKeys(ctx, next): HotKeysConfig {
      const { controller } = ctx;
      const model = controller.model;
      const res: HotKeysConfig = next();

      const handleHotKeyDown = (opType, opArg?) => e => {
        // log('HotKeyPlugin', opType);
        op(opType, { ...ctx, ...opArg });
      };

      const viewModeOutlinerTopicHotKeys = new Map<string, IHotkeyProps>([
        [
          'ENTER',
          {
            label: 'enter',
            combo: 'enter',
            allowInInput: true,
            preventDefault: true,
            stopPropagation: true,
            onKeyDown: () => {
              const topic = model.currentFocusTopic;
              (topic.subKeys.size > 0 && !topic.collapse) ||
              topic.key === model.editorRootTopicKey
                ? op(OpType.ADD_CHILD, { ...ctx, addAtFront: true })
                : op(OpType.ADD_SIBLING, ctx);
            }
          }
        ],
        [
          'INDENT',
          {
            label: 'indent',
            combo: 'tab',
            allowInInput: true,
            preventDefault: true,
            stopPropagation: true,
            onKeyDown: handleHotKeyDown(OlOpType.INDENT)
          }
        ],
        [
          'OUTDENT',
          {
            label: 'outdent',
            combo: 'shift + tab',
            allowInInput: true,
            preventDefault: true,
            stopPropagation: true,
            onKeyDown: handleHotKeyDown(OlOpType.OUTDENT)
          }
        ]
      ]);
      res.viewModeTopicHotKeys.set(
        ViewModeOutliner,
        viewModeOutlinerTopicHotKeys
      );
      return res;
    }
  };
}
