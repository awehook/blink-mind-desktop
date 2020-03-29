import React, { useImperativeHandle, useState } from 'react';
import cx from 'classnames';
import { BaseProps } from '@blink-mind/renderer-react';
import { BlockType, OpType } from '@blink-mind/core';

export function OLTopicCollapseIcon_(props: BaseProps, ref) {
  const { controller, topic } = props;
  const [hover, _setHover] = useState(false);
  const canCollapse = topic.subKeys.size > 0;
  const collapse = topic.collapse && canCollapse;
  const dotClassName =
    hover && canCollapse
      ? cx('icon', 'iconfont', {
          'bm-plus': collapse,
          'bm-minus': !collapse
        })
      : cx('dot', { 'dot-collapse': collapse });

  useImperativeHandle(ref, () => ({
    setHover(v) {
      _setHover(v);
    }
  }));

  const onClickDot = () => {
    if (canCollapse) {
      controller.run('operation', {
        ...props,
        opType: OpType.TOGGLE_COLLAPSE
      });
    }
  };

  const dotProps = {
    className: dotClassName,
    onClick: onClickDot
  };

  const descBlock = topic.getBlock(BlockType.DESC).block;

  let descCollapseIcon = <div className="bm-collapse-icon" />;
  if (descBlock) {
    const descCollapseIconProps = {
      className: cx('icon', 'iconfont', {
        'bm-s-plus': descBlock.data.collapse,
        'bm-s-minus': !descBlock.data.collapse
      }),
      onClick: () => {
        controller.run('operation', {
          ...props,
          opType: OpType.SET_TOPIC_BLOCK,
          blockType: BlockType.DESC,
          data: descBlock.data.set('collapse', !descBlock.data.collapse)
        });
      }
    };

    descCollapseIcon = <div {...descCollapseIconProps} />;
  }

  const topicContentStyle = controller.run('getTopicContentStyle', props);
  const fontSize = parseFloat(topicContentStyle.fontSize);
  const lineHeight = parseFloat(topicContentStyle.lineHeight);
  const h = lineHeight * fontSize;
  const marginTop = Math.max((h - 16.0) / 2, 0);

  return (
    <div className="bm-collapse-icons" style={{ marginTop: `${marginTop}px` }}>
      {/*<Icon className={iconClassName(IconName.PLUS)} />*/}
      {descCollapseIcon}
      <div {...dotProps} />
    </div>
  );
}

export const OLTopicCollapseIcon = React.forwardRef(OLTopicCollapseIcon_);
