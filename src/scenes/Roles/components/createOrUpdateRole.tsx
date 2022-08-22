import * as React from 'react';
import './index.less'
import { Input, Modal, Tabs, Form, Checkbox } from 'antd';
import { GetAllPermissionsOutput } from '../../../services/role/dto/getAllPermissionsOutput';
import { L } from '../../../lib/abpUtility';
import RoleStore from '../../../stores/roleStore';
import rules from './createOrUpdateRole.validation';
import { FormInstance } from 'antd/lib/form';

const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateRoleProps {
  roleStore: RoleStore;
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onOk: () => void;
  permissions: GetAllPermissionsOutput[];
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateRole extends React.Component<ICreateOrUpdateRoleProps> {
  state = {
    confirmDirty: false,
  };

  render() {
    const { permissions } = this.props;

    const options = permissions.map((x: GetAllPermissionsOutput) => {
      return { label: x.displayName, value: x.name };
    });

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };

    return (
      <Modal
        width={'40%'}
        okText={L('Save')}
        destroyOnClose={true}
        onOk={this.props.onOk}
        cancelText={L('GiveUp')}
        title={L('AddUserRole')}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >

        <Form ref={this.props.formRef}>
          <Tabs defaultActiveKey={'role'} size={'small'} tabBarGutter={64}>
            <TabPane tab={L('UserRoleDetail')} key={'role'}>
              <Form.Item label={L('RoleName')} name={'name'} rules={rules.name} {...formItemLayout}>
                <Input />
              </Form.Item>
              <Form.Item label={L('DisplayName')} name={'displayName'} rules={rules.displayName} {...formItemLayout}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Description')} name={'description'} {...formItemLayout}>
                <Input />
              </Form.Item>

              <Form.Item style={{ display: 'none' }} name={'grantedPermissions'} valuePropName={'value'}>
                <Checkbox.Group options={options} />
              </Form.Item>
            </TabPane>


            {/* <TabPane style={{ display: 'none' }} tab={L('UserRolePermission')} key={'permission'} forceRender={true}>

              
            </TabPane> */}


          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateRole;
