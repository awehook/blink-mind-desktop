import React, { useState } from 'react';
import { Button, FileInput } from '@blueprintjs/core';
import { BaseProps, getI18nText, I18nKey } from '@blink-mind/renderer-react';
import styled from 'styled-components';
import { OP_TYPE_ADD_IMAGE, serializeImage } from '../utils';
import { ImageRecord } from '../ext-data-images';
const md5 = require('blueimp-md5');

const Root = styled.div``;
const ErrorTip = styled.div`
  color: red;
  height: 24px;
`;

const Tips = styled.div`
  margin-top: 20px;
`;

const Tip = styled.div`
  padding: 5px 0;
`;

export function InsertImageDialog(props: BaseProps) {
  const { controller, setDiagramState } = props;
  const [inputText, setInputText] = useState(
    getI18nText(props, I18nKey.CHOOSE_FILE)
  );
  const onInputChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      const file: File = e.target.files[0];
      if (
        !['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(
          file.type
        )
      ) {
        setInputText(
          <ErrorTip>
            {getI18nText(props, I18nKey.SELECT_IMAGE_ERR_TIP)}
          </ErrorTip>
        );
      } else {
        const fr = new FileReader();
        fr.onload = () => {
          const url = fr.result;
          const img = new Image();
          img.onload = () => {
            //@ts-ignore
            const image = new ImageRecord({
              key: md5(url),
              url,
              width: img.width,
              height: img.height
            });
            setDiagramState({ dialogType: null });
            controller.run('operation', {
              ...props,
              opType: OP_TYPE_ADD_IMAGE,
              image
            });
          };
          //@ts-ignore
          img.src = url;
        };
        fr.readAsDataURL(file);
        const src = URL.createObjectURL(file);
        serializeImage(src, file.type).then(res => {
          // TODO md5
        });
      }
    }
  };

  const fileInputProps = {
    onInputChange,
    text: inputText,
    fill: true,
    buttonText: getI18nText(props, I18nKey.BROWSE)
  };

  return (
    <Root>
      <div>
        <FileInput {...fileInputProps} />
      </div>
      <Tips>
        <Tip>{getI18nText(props, I18nKey.SELECT_IMAGE_TIP1)}</Tip>
        <Tip>{getI18nText(props, I18nKey.SELECT_IMAGE_TIP2)}</Tip>
      </Tips>
    </Root>
  );
}
