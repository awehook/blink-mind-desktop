import React from 'react';
import { ViewModeOutliner } from '../utils';
import { OutlinerSheet } from '../components/widget';

export function RenderPlugin() {
  return {
    renderSheet(ctx, next) {
      const { model } = ctx;
      if (model.config.viewMode === ViewModeOutliner)
        return React.createElement(OutlinerSheet, ctx);
      return next();
    }
  };
}
