import React from 'react';
import cx from 'classnames';
import { BaseProps } from '@blink-mind/renderer-react';
import {OpType} from "@blink-mind/core";

interface Props extends BaseProps {
  hover: boolean;
}

export function OLTopicCollapseIcon(props: Props) {
  const { controller, hover, topic } = props;
  const canCollapse = topic.subKeys.size > 0;
  const collapse = topic.collapse && canCollapse;
  const dotClassName =
    hover && canCollapse
      ? cx('icon', 'iconfont', {
          'bm-plus': collapse,
          'bm-minus': !collapse
        })
      : cx('dot', { 'dot-collapse': collapse });

  const onClickDot = () => {
    if (canCollapse) {
      controller.run('operation',{
        ...props,
        opType: OpType.TOGGLE_COLLAPSE
      })
    }
  };

  const dotProps = {
    className: dotClassName,
    onClick: onClickDot
  };

  return (
    <div className="bm-collapse-icon">
      {/*<Icon className={iconClassName(IconName.PLUS)} />*/}
      <div {...dotProps} />
    </div>
  );
}
