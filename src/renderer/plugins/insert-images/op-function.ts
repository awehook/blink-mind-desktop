import {BaseDocModelModifierArg, BaseSheetModelModifierArg} from '@blink-mind/core';
import { swap } from '@blink-mind/renderer-react';
import { List } from 'immutable';
import {
  ExtDataImages,
  ImageRecord,
  TopicImageRecord
} from './ext-data-images';
import { EXT_DATA_KEY_IMAGES } from './utils';

export function addImage({
  docModel,
  topicKey,
  image
}: BaseDocModelModifierArg & {
  image: ImageRecord;
}) {
  let extData = docModel.getExtDataItem(EXT_DATA_KEY_IMAGES, ExtDataImages);
  const topicImage = new TopicImageRecord({
    key: image.key,
    width: image.width,
    height: image.height
  });
  extData = extData
    .update('images', images => images.set(image.key, image))
    .update('topics', topics => {
      if (!topics.has(topicKey)) {
        return topics.set(topicKey, List([topicImage]));
      } else {
        const imgData = topics.get(topicKey).find(v => v.key === image.key);

        if (imgData != null) return topics;
        return topics.update(topicKey, list => list.push(topicImage));
      }
    });
  docModel = docModel.setIn(['extData', EXT_DATA_KEY_IMAGES], extData);
  return docModel;
}

export function deleteTopicImage({ docModel, topicKey, imageKey }) {
  let extData = docModel.getExtDataItem(EXT_DATA_KEY_IMAGES, ExtDataImages);
  extData = extData.updateIn(['topics', topicKey], list =>
    list.delete(list.findIndex(v => v.key === imageKey))
  );
  if (getUsedImageKeyTopicCount(extData, imageKey) === 0) {
    extData = extData.update('images', images => images.delete(imageKey));
  }
  docModel = docModel.setIn(['extData', EXT_DATA_KEY_IMAGES], extData);
  return docModel;
}

export function addTopicImage({ docModel, topicKey, imageKey }) {
  let extData = docModel.getExtDataItem(EXT_DATA_KEY_IMAGES, ExtDataImages);
  const image = extData.images.get(imageKey);
  if (image == null) {
    throw new Error(`imageKey ${imageKey} not exist`);
  }
  let topicData = extData.topics.get(topicKey) || List();
  if (topicData.find(v => v.key === imageKey) == null) {
    topicData = topicData.push(
      new TopicImageRecord({
        key: imageKey,
        width: image.width,
        height: image.height
      })
    );
    extData = extData.update('topics', topics =>
      topics.set(topicKey, topicData)
    );
    docModel = docModel.setIn(['extData', EXT_DATA_KEY_IMAGES], extData);
  }
  return docModel;
}

export function setTopicImage({ docModel, topicKey, imageKey, imageData }) {
  let extData = docModel.getExtDataItem(EXT_DATA_KEY_IMAGES, ExtDataImages);
  let topicData = extData.topics.get(topicKey);
  if (topicData == null) {
    throw new Error(`topicKey ${topicKey} does not has imageData`);
  }
  if (topicData.find(v => v.key === imageKey) == null) {
    throw new Error(
      `topicKey ${topicKey} does not has imageData of key ${imageKey}`
    );
  }
  const index = topicData.findIndex(v => v.key === imageKey);
  topicData = topicData.update(index, topicImage =>
    topicImage.merge(imageData)
  );
  extData = extData.update('topics', topics => topics.set(topicKey, topicData));
  docModel = docModel.setIn(['extData', EXT_DATA_KEY_IMAGES], extData);
  return docModel;
}

export function moveTopicImage({ docModel, topicKey, imageKey, moveDir }) {
  let extData = docModel.getExtDataItem(EXT_DATA_KEY_IMAGES, ExtDataImages);
  let topicData = extData.topics.get(topicKey);
  const index = topicData.findIndex(v => v.key === imageKey);
  if (moveDir === 'up') {
    topicData = swap(topicData, index, index - 1);
  } else {
    topicData = swap(topicData, index, index + 1);
  }
  extData = extData.update('topics', topics => topics.set(topicKey, topicData));
  docModel = docModel.setIn(['extData', EXT_DATA_KEY_IMAGES], extData);
  return docModel;
}

export function getUsedImageKeyTopicCount(
  extData: ExtDataImages,
  imageKey: KeyType
) {
  let count = 0;
  extData.topics.forEach(v => {
    if (v.find(v => v.key === imageKey)) count++;
  });
  return count;
}
