import React from 'react';
import cx from 'classnames';
export function Icon(props) {
  const { className, iconName } = props;
  const nProps = {
    className: cx(className, 'icon', 'iconfont', `bm-${iconName}`)
  };
  return <div {...nProps} />;
}
