import * as React from 'react';
import { Checkbox, Input, Modal, Tabs, Form, Row, Col } from 'antd';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateUser.validation';
import { FormInstance } from 'antd/lib/form';

const TabPane = Tabs.TabPane;

export interface IProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  roles: GetRoles[];
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateUser extends React.Component<IProps> {
  state = {
    confirmDirty: false,
  };

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.formRef.current;
    if (value && value !== form!.getFieldValue('password')) {
      return Promise.reject(L('TwoPasswordsThatYouEnterIsInconsistent'));
    }
    return Promise.resolve();
  };



  validateToNextPassword = (rule: any, value: any, callback: any) => {

    const { validateFields, getFieldValue } = this.props.formRef.current!;

    this.setState({
      confirmDirty: true,
    });

    if (value && this.state.confirmDirty && getFieldValue('confirm')) {
      validateFields(['confirm']);
      validateFields(['password']);
    }

    return Promise.resolve();
  };

  render() {
    const { roles } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };

    const { visible, onCancel, onCreate } = this.props;

    const options = roles.map((x: GetRoles) => {
      var test = { label: x.displayName, value: x.normalizedName };
      return test;
    });

    return (
      <Modal
        width={'80%'}
        visible={visible}
        cancelText={L('GiveUp')}
        okText={L('Save')}
        onCancel={onCancel}
        onOk={onCreate}
        title={L('UserDetail')}
        destroyOnClose={true}
      >
        <Form ref={this.props.formRef}>
          <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
            <TabPane tab={L('User')} key={'userInfo'}>
              <Row>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 12, offset: 0 }}
                  lg={{ span: 10, offset: 2 }}
                  xl={{ span: 10, offset: 2 }}
                  xxl={{ span: 10, offset: 2 }}
                >
                  <Form.Item label={L('Name')} {...formItemLayout} name={'name'} rules={rules.name}>
                    <Input />
                  </Form.Item>

                  <Form.Item label={L('Surname')}  {...formItemLayout} name={'surname'} rules={rules.surname}   >
                    <Input />
                  </Form.Item>

                  <Form.Item label={L('Title')} {...formItemLayout} name={'title'} rules={rules.title}   >
                    <Input />
                  </Form.Item>

                  <Form.Item label={L('UserName')}  {...formItemLayout} name={'userName'} rules={rules.userName}   >
                    <Input />
                  </Form.Item>

                </Col>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 12, offset: 0 }}
                  lg={{ span: 10, offset: 0 }}
                  xl={{ span: 10, offset: 0 }}
                  xxl={{ span: 10, offset: 0 }}
                >
                  <Form.Item label={'sicilNo'} {...formItemLayout} name={'sicilNo'}>
                    <Input />
                  </Form.Item>

                  <Form.Item label={L('Email')} {...formItemLayout} name={'emailAddress'} rules={rules.emailAddress as []}>
                    <Input />
                  </Form.Item>

                  {this.props.modalType === 'edit' ? (
                    <Form.Item
                      label={L('Password')}
                      {...formItemLayout}
                      name={'password'}
                      rules={[
                        {
                          required: true,
                          message: L('PleaseInputYourPassword'),
                        },
                        {
                          //validator: this.validateToNextPassword,
                        },
                      ]}
                    >
                      <Input type="password" />
                    </Form.Item>
                  ) : null}
                  {/* {this.props.modalType === 'edit' ? (
                    <Form.Item
                      label={L('ConfirmPassword')}
                      {...formItemLayout}
                      name={'confirm'}
                      rules={[
                        {
                          required: true,
                          message: L('PleaseInputYourConfirmPassword'),
                        },
                        {
                          validator: this.compareToFirstPassword,
                        },
                      ]}
                    >
                      <Input type="password" />
                    </Form.Item>
                  ) : null} */}
                  <Form.Item
                    label={L('IsActiveStatus')}
                    {...tailFormItemLayout}
                    name={'isActive'}
                    valuePropName={'checked'}
                  >
                    <Checkbox defaultChecked>{L('Active')}</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={L('Roles')} key={'rol'} forceRender={true}>
              <Form.Item {...tailFormItemLayout} name={'roleNames'}>
                <Checkbox.Group options={options} />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateUser;
