import {
  indent,
  outdent,
  selectWithMouseMove,
  OlOpType,
  olMoveFocus
} from '../op';
import { FocusMode, OpType, toDocModelModifierFunc } from '@blink-mind/core';

export function OlOpPlugin() {
  return {
    getOpMap(ctx, next) {
      const opMap = next();
      opMap.set(OlOpType.INDENT, toDocModelModifierFunc(indent));
      opMap.set(OlOpType.OUTDENT, toDocModelModifierFunc(outdent));
      opMap.set(
        OlOpType.SELECT_WITH_MOUSE_MOVE,
        toDocModelModifierFunc(selectWithMouseMove)
      );
      opMap.set(OlOpType.MOVE_FOCUS, toDocModelModifierFunc(olMoveFocus));
      return opMap;
    },

    customizeAllowUndo(ctx, next) {
      const { opType } = ctx;
      if (opType === OlOpType.SELECT_WITH_MOUSE_MOVE) return false;
      return next();
    }
  };
}
