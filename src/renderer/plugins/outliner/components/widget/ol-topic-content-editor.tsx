import React from 'react';
import { BaseProps,  } from '@blink-mind/renderer-react';
import { ViewModeOutliner } from '../../utils';
import { FocusMode, OpType } from '@blink-mind/core';

interface Props extends BaseProps {}

// export class OLTopicContentEditor extends TopicContentEditor {
//   protected onMouseDown(e) {
//     super.onMouseDown(e);
//     const { controller, model, topicKey } = this.props;
//     if (
//       model.config.viewMode === ViewModeOutliner &&
//       model.editingContentKey !== topicKey
//     ) {
//       controller.run('operation', {
//         ...this.props,
//         opType: OpType.FOCUS_TOPIC,
//         focusMode: FocusMode.EDITING_CONTENT
//       });
//     }
//   }
// }
