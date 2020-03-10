import React from 'react';
import { ViewModeOutliner } from '../utils';
import { OutlinerSheet } from '../components/widget';
import { BlockType, DescBlockData } from '@blink-mind/core';
import { OLTopicBlockContent } from '../components/widget/ol-topic-block-content';
import { OLTopicWidget } from '../components/widget/ol-topic-widget';
import { TopicDescEditor } from '../../desc-editor/components';
// import { OLTopicContentEditor } from '../components/widget/ol-topic-content-editor';

export function RenderPlugin() {
  return {
    renderSheet(ctx, next) {
      const { model } = ctx;
      if (model.config.viewMode === ViewModeOutliner)
        return React.createElement(OutlinerSheet, ctx);
      return next();
    },

    deserializeBlockData(ctx, next) {
      const { block } = ctx;
      if (block.type === BlockType.DESC) {
        return new DescBlockData(block.data);
      }
      return next();
    },

    renderOLTopicWidget(ctx) {
      return <OLTopicWidget {...ctx} />;
    },

    renderTopicContentEditor(ctx, next) {
      // const { model } = ctx;
      // if (model.config.viewMode === ViewModeOutliner) {
      //   return <OLTopicContentEditor {...ctx} />;
      // }
      return next();
    },

    renderTopicNodeRows(ctx, next) {
      const { controller, model } = ctx;
      if (model.config.viewMode === ViewModeOutliner) {
        const res = next();
        res.push(
          controller.run('renderTopicBlockDesc', { ...ctx, key: 'block-desc' })
        );
        return res;
      }
      return next();
    },

    renderTopicBlocks(props, next) {
      const { model, topic, controller } = props;
      if (model.config.viewMode === ViewModeOutliner) {
        const blocks = topic.blocks.filter(b => b.type !== BlockType.DESC);
        const res = [];
        let i = 0;
        blocks.forEach(block => {
          const b = controller.run('renderTopicBlock', {
            ...props,
            block,
            blockKey: `block-${i}`
          });
          if (b) {
            res.push(<React.Fragment key={`block-${i}`}>{b}</React.Fragment>);
            i++;
          }
        });
        return res;
      }
      return next();
    },

    renderTopicBlockContent(ctx, next) {
      const { model } = ctx;
      if (model.config.viewMode === ViewModeOutliner) {
        return <OLTopicBlockContent {...ctx} />;
      }
      return next();
    },

    renderTopicBlockDesc(ctx, next) {
      const { model, topic } = ctx;
      if (model.config.viewMode === ViewModeOutliner) {
        const block = topic.getBlock(BlockType.DESC).block;
        if (block && !block.data.collapse) return <TopicDescEditor {...ctx} />;
        return null;
      }
      return next();
    }
  };
}
