import cx from 'classnames';
import * as React from 'react';
export function Icon(props) {
  const { className, iconName } = props;
  const nProps = {
    className: cx(className, 'icon', 'iconfont', `bm-${iconName}`)
  };
  return <div {...nProps} />;
}
