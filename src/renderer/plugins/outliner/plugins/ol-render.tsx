import React from 'react';
import { ViewModeOutliner } from '../utils';
import { OLRootTopicWidget, OutlinerSheet } from '../components/widget';
import { BlockType } from '@blink-mind/core';
import {
  OLTopicBlockContent,
  OLTopicWidget,
  OLTopicBlockDesc
} from '../components';
import { PropKey } from '@blink-mind/renderer-react';

export function OlRenderPlugin() {
  return {
    renderSheet(ctx, next) {
      const { model } = ctx;
      if (model.config.viewMode === ViewModeOutliner)
        return React.createElement(OutlinerSheet, ctx);
      return next();
    },

    renderSheetCustomize(ctx, next) {
      const { controller, model } = ctx;
      if (model.config.viewMode === ViewModeOutliner) {
        const zIndex = controller.getValue(
          PropKey.DIAGRAM_CUSTOMIZE_BASE_Z_INDEX
        );
        const nProps = {
          ...ctx,
          zIndex,
          topicKey: model.focusKey,
          topic: model.getTopic(model.focusKey)
        };

        const dialog = controller.run('renderDialog', {
          ...nProps,
          zIndex: zIndex + 1
        });
        const drawer = controller.run('renderDrawer', {
          ...nProps,
          zIndex: zIndex + 1
        });
        const viewportViewer = controller.run('renderViewPortViewer', nProps);
        return [dialog, drawer, viewportViewer];
      }
      return next();
    },

    renderRootTopicWidget(ctx, next) {
      const { model } = ctx;
      if (model.config.viewMode === ViewModeOutliner)
        return <OLRootTopicWidget {...ctx} />;
      return next();
    },

    renderOLTopicWidget(ctx) {
      return <OLTopicWidget {...ctx} />;
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
        if (block && !block.data.collapse) {
          const props = { ...ctx, block };
          return <OLTopicBlockDesc {...props} />;
        }
        return null;
      }
      return next();
    }
  };
}
