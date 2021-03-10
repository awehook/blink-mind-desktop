import { Diagram } from '@blink-mind/renderer-react';
import debug from 'debug';
import * as React from 'react';
import { FileModel } from '../models';
import { useEffect } from 'react';

const log = debug('bmd:mindmap');

interface Props {
  fileModel: FileModel;
}

export function MindMap(props: Props) {
  const { fileModel } = props;
  let { controller, docModel } = fileModel;

  const createDocModel = (fileModel: FileModel) => {
    if (fileModel.path == null) {
      return fileModel.controller.run('createNewDocModel');
    }
    return null;
  };

  docModel = docModel || createDocModel(fileModel);

  // const handlePaste = e => {
  //   console.log('handlePaste');
  //   controller.run('setPasteType', 'PASTE_PLAIN_TEXT');
  //   document.execCommand('paste');
  // };
  //
  // useEffect(() => {
  //   document.addEventListener('paste', handlePaste);
  //   return () => {
  //     document.removeEventListener('paste', handlePaste);
  //   };
  // });

  const renderDiagram = () => {
    log('renderDiagram', docModel, docModel.currentSheetModel.focusKey);
    const diagramProps = {
      controller,
      docModel
    };
    return <Diagram {...diagramProps} />;
  };

  return (
    <div
      className="mindmap"
    >
      {renderDiagram()}
    </div>
  );
}
