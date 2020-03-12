import {
  BaseSheetModelModifierArg,
  SheetModelModifierResult
} from '@blink-mind/core';

export function indent({
  model,
  topicKeys
}: BaseSheetModelModifierArg): SheetModelModifierResult {
  let firstKey = topicKeys[0];
  if (firstKey === model.editorRootTopicKey) return model;
  let pTopic = model.getParentTopic(firstKey);
  let idx = pTopic.subKeys.indexOf(firstKey);
  if (idx === 0) {
    return model;
  }
  let aboveTopicKey = pTopic.subKeys.get(idx - 1);
  let aboveTopic = model.getTopic(aboveTopicKey);

  for (let topicKey of topicKeys) {
    let topic = model.getTopic(topicKey);

    topic = topic.set('parentKey', aboveTopicKey);
    pTopic = pTopic.update('subKeys', subKeys => subKeys.delete(idx));
    aboveTopic = aboveTopic.update('subKeys', subKeys =>
      subKeys.push(topicKey)
    );
    model = model.setIn(['topics', topic.key], topic);
  }
  model = model.update('topics', topics =>
    topics.set(pTopic.key, pTopic).set(aboveTopic.key, aboveTopic)
  );
  return model;
}

export function outdent({
  model,
  topicKeys
}: BaseSheetModelModifierArg): SheetModelModifierResult {
  let firstKey = topicKeys[0];
  if (firstKey === model.editorRootTopicKey) return model;
  let pItem = model.getParentTopic(firstKey);
  if (pItem.parentKey === null) return model;
  let ppItem = model.getTopic(pItem.parentKey);
  let i = 0;
  for (let itemKey of topicKeys) {
    i++;
    let idx = pItem.subKeys.indexOf(itemKey);
    let pidx = ppItem.subKeys.indexOf(pItem.key);
    let item = model.getTopic(itemKey);
    item = item.merge({
      parentKey: ppItem.key
    });
    pItem = pItem.update('subKeys', subItemKeys => subItemKeys.delete(idx));
    ppItem = ppItem.update('subKeys', subItemKeys =>
      subItemKeys.splice(pidx + i, 0, item.key)
    );
    model = model.update('topics', topics => topics.set(item.key, item));
  }
  model = model.update('topics', topics =>
    topics.set(pItem.key, pItem).set(ppItem.key, ppItem)
  );
  return model;
}
