/* eslint-disable*/
import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { Modal, Timeline } from 'antd';
import { L } from '../../../lib/abpUtility';

interface HierarchyData {
  departmentManager: string;
  recruitment: string;
  hrManager: string;
}

export interface IApprovalHierarchyProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  hierarchyData: HierarchyData;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
}

const { Item } = Timeline;

class ApprovalHierarchy extends React.Component<IApprovalHierarchyProps> {
  state = {
    confirmDirty: false,
    loopCount: 0,
  };

  render() {
    const { visible, onCreate,onCancel } = this.props;

    return (
      <Modal
        visible={visible}
        cancelText={L('GiveUp')}
        okText={L('Send')}
        title={L('AuthoritiesHierarchy')}
        destroyOnClose={true}
        onCancel={onCancel}
        width={'50%'}
        onOk={onCreate}
      >
        <div>
          <h4>{L('promotion.request.header.information.title')}</h4>
          <span>
            <br></br>
          </span>
        </div>
        <div style={{ margin: '5px' }}>
          <Timeline style={{ margin: '5px' }}>
            {this.props.hierarchyData.departmentManager !== "" ? (
              <Item>{this.props.hierarchyData.departmentManager}</Item>
            ) : (
              ''
            )}
            {this.props.hierarchyData.recruitment !== "" ? (
              <Item>{this.props.hierarchyData.recruitment}</Item>
            ) : (
              ''
            )}
            {this.props.hierarchyData.hrManager !== "" ? (
              <Item>{this.props.hierarchyData.hrManager}</Item>
            ) : (
              ''
            )}
          </Timeline>
        </div>
      </Modal>
    );
  }
}
export default ApprovalHierarchy;
