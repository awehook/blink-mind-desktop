import * as React from 'react';
import styled from 'styled-components';
import { ImageWidget } from './image-widget';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export function TopicImagesWidget(props) {
  const { controller } = props;
  const images = controller.run('getTopicImages', props);
  let index = 0;
  const child = images.map(image => {
    const imageProps = {
      ...props,
      image,
      index,
      totalCount: images.length
    };
    index++;

    return <ImageWidget key={image.key} {...imageProps} />;
  });
  return <Root>{child}</Root>;
}
