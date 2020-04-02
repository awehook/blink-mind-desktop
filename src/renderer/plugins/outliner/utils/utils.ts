import { OlOpType } from '../op';

export function pasteAndSplitByLineBreak(ctx) {
  const { topicKey, controller, model } = ctx;
  navigator.clipboard.readText().then(text => {
    if (text && text.length > 0) {
      const topicContent = model.getTopic(topicKey).contentData;
      if (topicContent != null) {
        controller.run('operation', {
          ...ctx,
          opType: OlOpType.PASTE_AND_SPLIT_BY_LINE_BREAK,
          content: text,
          replaceCurrentTopic: topicContent.length === 0
        });
      }
    }
  });
}
