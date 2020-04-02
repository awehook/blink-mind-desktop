import debug from 'debug';
import { List } from 'immutable';
import React from 'react';
import { InsertImageDialog, TopicImagesWidget } from './components';
import {
  ExtDataImages,
  ImageRecord,
  TopicImageData,
  TopicImageRecord
} from './ext-data-images';
import {
  addImage,
  addTopicImage,
  deleteTopicImage,
  moveTopicImage,
  setTopicImage
} from './op-function';
import {
  EXT_DATA_KEY_IMAGES,
  OP_TYPE_ADD_IMAGE,
  OP_TYPE_ADD_TOPIC_IMAGE,
  OP_TYPE_DELETE_TOPIC_IMAGE,
  OP_TYPE_MOVE_TOPIC_IMAGE,
  OP_TYPE_SET_TOPIC_IMAGE,
  serializeImage
} from './utils';
import { MenuItem } from '@blueprintjs/core';
import { getI18nText, I18nKey, Icon, IconName } from "@blink-mind/renderer-react";

const log = debug('plugin:insert-image');

const md5 = require('blueimp-md5');
export function InsertImagesPlugin() {
  return {
    handleTopicPaste(ctx, next) {
      const { ev, ...rest } = ctx;
      log('handleTopicPaste', ev);
      const { controller } = rest;
      if (ev.clipboardData && ev.clipboardData.items.length > 0) {
        const data = ev.clipboardData;

        if (data.items.length === 1) {
          const item = data.items[0];
          if (item.type === 'image/png') {
            const blob = item.getAsFile();
            if (blob) {
              const src = URL.createObjectURL(blob);
              serializeImage(src).then(res => {
                // TODO md5
                const image = new ImageRecord({
                  key: md5(res.url),
                  ...res
                });
                controller.run('operation', {
                  ...rest,
                  opType: OP_TYPE_ADD_IMAGE,
                  image
                });
              });
            }
          }
        }
      }
    },

    customizeDialog(ctx, next) {
      const { diagramState, setDiagramState } = ctx;
      const onClose = () => {
        setDiagramState({ dialogType: null });
      };
      if (diagramState.dialogType === 'INSERT_IMAGE') {
        return {
          dialogProps: {
            title: getI18nText(ctx, I18nKey.INSERT_IMAGE),
            onClose
          },
          dialogContent: <InsertImageDialog {...ctx} />
        };
      }
      return next();
    },

    customizeTopicContextMenu(ctx, next) {
      const { controller, setDiagramState } = ctx;
      const res = next();
      const onClickInsertImage = () => {
        setDiagramState({
          dialogType: 'INSERT_IMAGE'
        });
      };

      res.push(
        <MenuItem
          key="insert-image"
          icon={Icon(IconName.IMAGE)}
          text={getI18nText(ctx, I18nKey.INSERT_IMAGE)}
          // labelElement={<KeyboardHotKeyWidget hotkeys={['Tab']} />}
          onClick={onClickInsertImage}
        />
      );
      return res;
    },

    getOpMap(ctx, next) {
      const opMap = next();
      opMap.set(OP_TYPE_ADD_IMAGE, addImage);
      opMap.set(OP_TYPE_ADD_TOPIC_IMAGE, addTopicImage);
      opMap.set(OP_TYPE_DELETE_TOPIC_IMAGE, deleteTopicImage);
      opMap.set(OP_TYPE_SET_TOPIC_IMAGE, setTopicImage);
      opMap.set(OP_TYPE_MOVE_TOPIC_IMAGE, moveTopicImage);
      return opMap;
    },

    renderTopicNodeRows(ctx, next) {
      const { controller } = ctx;
      const res = next();
      res.push(controller.run('renderTopicExtImage', ctx));
      return res;
    },

    renderTopicExtImage(ctx) {
      return <TopicImagesWidget key="images" {...ctx} />;
    },

    getTopicImages(ctx): TopicImageData[] {
      const { docModel, topicKey } = ctx;
      const extData = docModel.getExtDataItem(
        EXT_DATA_KEY_IMAGES,
        ExtDataImages
      );
      if (!extData.topics.has(topicKey)) return [];
      return extData.topics
        .get(topicKey)
        .toArray()
        .map(v => {
          return {
            key: v.key,
            imageRecord: extData.images.get(v.key),
            width: v.width,
            height: v.height
          };
        });
    },

    topicExtDataToJson(ctx, next) {
      const res = next();
      return res;
    },

    customizeAllowUndo(ctx, next) {
      const { opType } = ctx;
      if (opType === OP_TYPE_ADD_IMAGE) return true;
      return next();
    },

    deserializeExtDataItem(ctx, next) {
      const { extDataKey, extDataItem } = ctx;
      if (extDataKey === EXT_DATA_KEY_IMAGES) {
        let extData = new ExtDataImages();
        for (const key in extDataItem.images) {
          const item = extDataItem.images[key];
          const record = new ImageRecord(item);
          extData = extData.update('images', images => images.set(key, record));
        }
        for (const key in extDataItem.topics) {
          const item = extDataItem.topics[key];
          const record: List<TopicImageRecord> = List(
            item.map(v => {
              return new TopicImageRecord(v);
            })
          );
          extData = extData.update('topics', topics => topics.set(key, record));
        }
        return extData;
      }
      return next();
    },

    getTotalTopicImageCount(ctx) {
      const { model } = ctx;
      let extData = model.getExtDataItem(EXT_DATA_KEY_IMAGES, ExtDataImages);
      return extData.images.size;
    }
  };
}
