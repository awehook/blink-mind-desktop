import {
  BaseSheetModelModifierArg,
  SheetModelModifierResult,
  getSiblingAncestorKeys,
  getRangeSubKeys,
  KeyType,
  SheetModel,
  getVisualBottomDescendantKey,
  SheetModelModifier,
  FocusMode
} from '@blink-mind/core';

export function indent({
  model,
  topicKeys
}: BaseSheetModelModifierArg): SheetModelModifierResult {
  if (topicKeys == null) topicKeys = model.focusOrSelectedKeys;
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
  if (topicKeys == null) topicKeys = model.focusOrSelectedKeys;
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

export function pasteAndSplitByLineBreak({
  model,
  topicKey,
  content,
  replaceCurrentTopic
}: BaseSheetModelModifierArg & {
  content: string;
  replaceCurrentTopic: boolean;
}) {
  const contentArray = content.split('\n');
  if (contentArray.length > 0) {
    if (replaceCurrentTopic) {
      let firstLine = contentArray[0];
      model = SheetModelModifier.setTopicBlockContentData({model,topicKey,data:firstLine});
      contentArray.shift();
    }
    model = SheetModelModifier.addMultiSibling({model,topicKey,contentArray});
  }
  return model;
}

export function selectWithMouseMove({
  model,
  topicKey
}: BaseSheetModelModifierArg): SheetModelModifierResult {
  let focusKey = model.focusKey;
  let [key1, key2] = getSiblingAncestorKeys(model, focusKey, topicKey);
  const selectedKeys =
    key1 === key2 ? [key1] : getRangeSubKeys(model, key1, key2);
  return model.set('selectedKeys', selectedKeys);
}

export function olMoveFocus({
  model,
  topicKey,
  dir
}: BaseSheetModelModifierArg & { dir: 'U' | 'D' }): SheetModelModifierResult {
  let focusKey =
    dir === 'U'
      ? getVisualUpTopicKey(model, topicKey)
      : getVisualDownTopicKey(model, topicKey);
  if (focusKey)
    model = SheetModelModifier.focusTopic({
      model,
      topicKey: focusKey,
      focusMode: FocusMode.EDITING_CONTENT
    });
  return model;
}

/**
 * 获取视觉上面元素的key,需要考虑到元素展开和收缩的情况
 * @param model
 * @param key
 */
function getVisualUpTopicKey(model: SheetModel, key: KeyType): KeyType {
  let previousSiblingKey = model.getPreviousSiblingKey(key);
  if (!previousSiblingKey) {
    return model.getParentKey(key) !== model.editorRootTopicKey
      ? model.getParentKey(key)
      : null;
  }
  return getVisualBottomDescendantKey(model, previousSiblingKey);
}

/**
 * 获取视觉下面元素的key,需要考虑到元素展开和收缩的情况
 * @param model
 * @param key
 */
function getVisualDownTopicKey(model: SheetModel, key: KeyType): KeyType {
  const topic = model.getTopic(key);
  if (topic.subKeys.size > 0 && !topic.collapse) {
    return topic.subKeys.first();
  }
  const nextSiblingKey = model.getNextSiblingKey(key);
  if (nextSiblingKey) return nextSiblingKey;
  let parentKey = topic.parentKey;
  while (parentKey !== model.editorRootTopicKey) {
    if (model.getNextSiblingKey(parentKey))
      return model.getNextSiblingKey(parentKey);
    parentKey = model.getParentKey(parentKey);
  }
  return null;
}
