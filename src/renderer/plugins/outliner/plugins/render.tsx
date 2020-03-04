import React from 'react';
import { ViewModeOutliner } from '../utils';
import { OutlinerSheet } from '../components/widget';
import { BlockType } from '@blink-mind/core';
import {OLTopicBlockContent} from "../components/widget/ol-topic-block-content";
import {OLTopicWidget} from "../components/widget/ol-topic-widget";

export function RenderPlugin() {
  return {
    renderSheet(ctx, next) {
      const { model } = ctx;
      if (model.config.viewMode === ViewModeOutliner)
        return React.createElement(OutlinerSheet, ctx);
      return next();
    },

    renderOLTopicWidget(ctx) {
      return <OLTopicWidget {...ctx}/>
    },

    renderTopicBlock(ctx, next) {
      const { model, controller, block } = ctx;
      if (model.config.viewMode === ViewModeOutliner) {
        switch (block.type) {
          case BlockType.CONTENT:
            return controller.run('renderOLTopicBlockContent', ctx);
          default:
            break;
        }
      }
      return next();
    },

    renderOLTopicBlockContent(ctx) {
      return <OLTopicBlockContent {...ctx}/>
    }
  };
}
