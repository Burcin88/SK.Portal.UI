import { Modal, Row, Timeline } from 'antd';
import * as React from 'react';
import './index.less';

export interface IProps {
  visible: boolean;
  onCancel: () => void;
}
export interface IState {}

class EditOrViewIncoming extends React.Component<IProps> {
  render() {
    const { visible, onCancel } = this.props;

    return (
      <Modal footer={null} visible={visible} onCancel={onCancel}>
        <Timeline>
          <Timeline.Item>Gelen Evrak Giriş - 11.11.2021 14:32:19 - <strong>Ad Soyad</strong></Timeline.Item>
          <Timeline.Item>Havale - 14.11.2021 14:00:19 - <strong>Ad Soyad</strong></Timeline.Item>
          <Timeline.Item>Havale - 20.11.2021 14:00:19 - <strong>Ad Soyad</strong></Timeline.Item>
          <Timeline.Item>Havale - 22.11.2021 14:32:19 - <strong>Ad Soyad</strong></Timeline.Item>
          <Timeline.Item>Havale - 24.11.2021 14:32:19 - <strong>Ad Soyad</strong></Timeline.Item>
        </Timeline>
        <Row gutter={16}></Row>
      </Modal>
    );
  }
}

export default EditOrViewIncoming;
