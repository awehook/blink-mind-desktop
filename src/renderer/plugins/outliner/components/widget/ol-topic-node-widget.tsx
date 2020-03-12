import React from 'react';
import styled from 'styled-components';
import { OLTopicCollapseIcon } from './ol-topic-collapse-icon';
import { BaseProps, BaseWidget } from '@blink-mind/renderer-react';
import { ContextMenuTarget } from '@blueprintjs/core';

const OLTopicNodeWidgetRoot = styled.div`
  display: flex;
  align-content: flex-start;
  padding: 1px 0;
  margin: 10px 0;
`;

const OLNodeRows = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 2px;
`;

const OLNodeRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

interface State {
  hover: boolean;
}

@ContextMenuTarget
export class OLTopicNodeWidget extends BaseWidget<BaseProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  public renderContextMenu() {
    return null;
  }

  onMouseEnter = () => {
    this.setState({ hover: true });
  };

  onMouseLeave = () => {
    this.setState({ hover: false });
  };

  onPaste = ev => {
    // log('onPaste');
    this.run('handleTopicPaste', { ...this.props, ev });
  };

  render() {
    const props = this.props;
    const { controller, model, topicKey } = props;
    const rootProps = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onPaste: this.onPaste
    };
    const collpaseProps = {
      ...props,
      hover: this.state.hover
    };
    return (
      <OLTopicNodeWidgetRoot {...rootProps}>
        <OLTopicCollapseIcon {...collpaseProps} />
        <OLNodeRows>
          {controller.run('renderTopicNodeRows', props)}
          {/*<OLNodeRow>*/}
          {/*  {controller.run('renderTopicBlocks', props)}*/}
          {/*  {controller.run('renderTopicNodeLastRowOthers', props)}*/}
          {/*</OLNodeRow>*/}
        </OLNodeRows>
      </OLTopicNodeWidgetRoot>
    );
  }
}
