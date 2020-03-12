// import React, { useRef } from 'react';
// import 'braft-editor/dist/index.css';
// import { BaseProps } from '@blink-mind/renderer-react';
// import { BlockType, FocusMode, OpType } from '@blink-mind/core';
// import BraftEditor from 'braft-editor';
//
// export function BraftDescEditor(props: BaseProps) {
//   const { model, controller, topic } = props;
//   const divRef = useRef();
//   const onClick = () => {
//     if (model.focusMode !== FocusMode.EDITING_DESC) {
//       controller.run('operation', {
//         ...props,
//         opType: OpType.START_EDITING_DESC
//       });
//     }
//   };
//   const blockData = topic.getBlock(BlockType.DESC).block.data;
//
//   let editorState = blockData.data;
//   if (typeof blockData.data === 'string') {
//     editorState = BraftEditor.createEditorState(blockData.data);
//   }
//
//   const onChange = editorState => {};
//
//   const editorProps = {
//     value: editorState,
//     onChange
//   };
//
//   return (
//     <div className="bm-desc-editor-root" ref={divRef} onClick={onClick}>
//       <BraftEditor {...editorState} />
//     </div>
//   );
// }
