import { indent, outdent, OlOpType } from '../op';
import { toDocModelModifierFunc } from '@blink-mind/core';

export function OpPlugin() {
  return {
    getOpMap(props, next) {
      const opMap = next();
      opMap.set(OlOpType.INDENT, toDocModelModifierFunc(indent));
      opMap.set(OlOpType.OUTDENT, toDocModelModifierFunc(outdent));
      return opMap;
    }
  };
}
