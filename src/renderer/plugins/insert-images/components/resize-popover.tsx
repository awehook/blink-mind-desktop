// import {
//   getI18nText,
//   I18nKey,
//   iconClassName,
//   IconName,
//   SettingItemInput
// } from '@blink-mind/renderer-react';
// import { Popover } from '@blueprintjs/core';
// import * as React from 'react';
// export function ResizePopover(props) {
//   const { width, height } = props;
//   const resizePopoverProps = {
//     hasBackdrop: true
//   };
//   const cancelEvent = e => {
//     e.nativeEvent.stopImmediatePropagation();
//   };
//
//   const widthProps = {
//     title: getI18nText(props, I18nKey.WIDTH),
//     value: width,
//     onValueChange
//   };
//   return (
//     <Popover {...resizePopoverProps}>
//       <EditButton className={iconClassName(IconName.RESIZE)} />
//       <ResizePopoverContent onMouseDown={cancelEvent}>
//         <SettingItemInput />
//         <SettingItemInput />
//         <button>hello</button>
//       </ResizePopoverContent>
//     </Popover>
//   );
// }
