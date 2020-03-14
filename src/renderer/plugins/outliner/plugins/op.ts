import { indent, outdent, selectWithMouseMove, OlOpType } from '../op';
import { toDocModelModifierFunc } from '@blink-mind/core';

export function OpPlugin() {
  return {
    getOpMap(ctx, next) {
      const opMap = next();
      opMap.set(OlOpType.INDENT, toDocModelModifierFunc(indent));
      opMap.set(OlOpType.OUTDENT, toDocModelModifierFunc(outdent));
      opMap.set(
        OlOpType.SELECT_WITH_MOUSE_MOVE,
        toDocModelModifierFunc(selectWithMouseMove)
      );
      return opMap;
    },

    customizeAllowUndo(ctx, next) {
      const { opType } = ctx;
      if (opType === OlOpType.SELECT_WITH_MOUSE_MOVE) return false;
      return next();
    }
  };
}
