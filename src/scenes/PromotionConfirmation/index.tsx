/*eslint-disable*/
import {
  Breadcrumb,
  Card,
  Col,
  Divider,
  FormInstance,
  PageHeader,
  notification,
  Row,
  Form,
  Input,
  Space,
} from 'antd';
import Button from 'antd-button-color';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'antd-button-color/dist/css/style.css'; // or 'antd-button-color/dist/css/style.less'
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import AppComponentBase from '../../components/AppComponentBase';
import { isGranted, L } from '../../lib/abpUtility';
import './index.less';
import PromotionStore from '../../stores/promotionStore';
import { PromotionType } from '../../services/promotion/dto/promotionType';
import { PromotionStatu } from '../../services/promotion/dto/promotionStatu';
import SessionStore from '../../stores/sessionStore';
import Stores from '../../stores/storeIdentifier';
import UserStore from '../../stores/userStore';

export interface Props {
  sessionStore: SessionStore;
  promotionStore: PromotionStore;
  userStore: UserStore;
}

export interface State {
  id: string;
  isLoading: boolean;
  isHRManager: boolean;
  department: string;
  departmentObjId: string;
  birimObjId: string;
  jobsObjId: string;
  unit: string;
  modalVisible: boolean;
}

@inject(Stores.UserStore)
@inject(Stores.PromotionStore)
@inject(Stores.SessionStore)
@observer
class PromotionConfirmation extends AppComponentBase<Props, State> {
  formRef = React.createRef<FormInstance>();

  state = {
    id: '',
    isLoading: true,
    isHRManager: false,
    department: '',
    departmentObjId: '',
    birimObjId: '0',
    jobsObjId: '0',
    unit: '',
    modalVisible: false,
  };

  componentDidMount = async () => {
    this.setState({ id: this.props['match'].params['id'] });
    this.props.sessionStore && (await this.props.sessionStore.getCurrentLoginInformations());
    await this.props.userStore
      .get({ id: this.props.sessionStore.currentLogin.user.id })
      .then(() => {
        this.setState({
          isHRManager:
            this.props.userStore.editUser.roleNames.includes('PROMOTIONHRMANAGER') === true
              ? true
              : false,
        });
      });
    await this.getPromotionById(this.state.id);
  };
  handleCreate = async ( ) => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      await this.props.promotionStore.isAnyPersonel(values.registrationNumber.toString());
        let id=this.state.id;
        var splitNames = values.firstNameLastName.split('_');
        var splitTitles = values.promotionRequestTitle.split('_');
        let firstName = splitNames.toString();
        let lastName = splitNames.toString();
        let promotionRequestTitle = splitTitles[0].toString();
        let Dates = values.dateOfStart.split('.');
        let dateOfStartString = `${Dates[1].toString()}/${Dates[0].toString()}/${Dates[2].toString()}`;
        const description = values.description !== undefined ? values.description.toString() : '';
        const dateOfStart = new Date(dateOfStartString);
        const hierarchyStatu =
          this.props.userStore.editUser.roleNames.includes('DEPARTMENTMANAGER') === true
            ? PromotionStatu.Department
            : PromotionStatu.None;
        await this.props.promotionStore
          .ToApprove({id:id,
            registrationNumber: values.registrationNumber.toString(),                        
            firstName: firstName,
            lastName: lastName,
            title: values.title.toString(),
            levelOfEducation: values.levelOfEducation.toString(),
            promotionRequestTitle: promotionRequestTitle,
            militaryStatus: values.militaryStatus.toString(),
            department: this.state.department,
            departmentObjId: this.state.departmentObjId,
            unit: this.state.unit,
            unitObjId: this.state.birimObjId,
            description: description,
            requestDate: new Date(),
            dateOfStart: dateOfStart,
            lastPromotionDate: new Date(),
            statu: PromotionType.Onaylandi,
            hierarchyStatu: hierarchyStatu,
          })
          .then(() => {
            this.setState({ modalVisible: false });
            this.formRef.current?.resetFields();
            this.openSuccessNotification('topRight');
          })
          .catch(() => {
            this.openErrorNotification('topRight');
          });
      }
    );
  };
  openSuccessNotification = (placement) => {
    notification.success({
      message: `Terfi Talebi`,
      description: 'Belirtmiş olduğunuz personel için terfi talebi onaylanmıştır.',
      placement,
    });
  };

  openErrorNotification = (placement) => {
    notification.error({
      message: `Terfi Talebi`,
      description: 'İşleminiz sırasında beklenmedik bir hata meydana geldi!',
      placement,
    });
  };

  openInfoNotification = (placement) => {
    notification.info({
      message: `Terfi Talebi`,
      description:
        'Belirtmiş olduğunuz personel için terfi talebi süreci devam etmektedir. ',
      placement,
    });
  };
  getPromotionById = async (id: string) => {
    await this.props.promotionStore.getIKPromotion(id).then(() => {
      this.setState({ isLoading: false });
      let formValue = {
        ...this.props.promotionStore.getPromotion,
        firstNameLastName: `${this.props.promotionStore.getPromotion.firstName} ${this.props.promotionStore.getPromotion.lastName}`,
        dateOfStart: new Date(
          this.props.promotionStore.getPromotion.dateOfStart
        ).toLocaleDateString(),
        lastPromotionDate: new Date(
          this.props.promotionStore.getPromotion.lastPromotionDate
        ).toLocaleDateString(),
      };
      setTimeout(() => {
        this.formRef.current?.setFieldsValue(formValue);
      }, 100);
    });
  };

  public render() {
    // const { inkaUsersByUnit } = this.props.inkaStore;
    // const { jobPositions } = this.props.jobStore;

    return !this.state.isLoading === true ? (
      <>
        <Card style={{ marginBottom: 20 }}>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={
              <Breadcrumb>
                <Breadcrumb.Item>
                  {isGranted('items.dashboard.view') ? (
                    <Link to="/dashboard">{L('Dashboard')}</Link>
                  ) : (
                    <Link to="/home">{L('Dashboard')}</Link>
                  )}{' '}
                </Breadcrumb.Item>
                <Breadcrumb.Item> {L('pages.home')} </Breadcrumb.Item>
              </Breadcrumb>
            }
          ></PageHeader>
        </Card>

        <Card>
          <Divider orientation="left">Terfi Talep Değerlendir</Divider>
          <Form ref={this.formRef}>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="firstNameLastName"
                  label={
                    <label style={{ maxWidth: 160, minWidth: 160 }}>
                      {L('promotion.request.personel')}
                    </label>
                  }
                  rules={[{ required: true, message: L('ThisFieldIsRequired') }]}
                >
                  <Input
                    disabled
                    className="formInput"
                    placeholder={L('promotion.request.personel')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div key="personel-info">
              <Divider orientation="left">Personel Bilgileri</Divider>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="registrationNumber"
                    label={
                      <label style={{ maxWidth: 160, minWidth: 160 }}>
                        {' '}
                        {L('promotion.request.personel.registrationnumber')}
                      </label>
                    }
                    rules={[{ required: true, message: L('ThisFieldIsRequired') }]}
                  >
                    <Input
                      type="text"
                      disabled
                      className="formInput"
                      placeholder={L('promotion.request.personel.registrationnumber')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="title"
                    label={
                      <label style={{ maxWidth: 160, minWidth: 160 }}>
                        {L('promotion.request.personel.title')}
                      </label>
                    }
                    rules={[{ required: true, message: L('ThisFieldIsRequired') }]}
                  >
                    <Input
                      disabled
                      className="formInput"
                      placeholder={L('promotion.request.personel.title')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="dateOfStart"
                    label={
                      <label style={{ maxWidth: 160, minWidth: 160 }}>
                        {L('promotion.request.personel.dateofstart')}
                      </label>
                    }
                    rules={[{ required: true, message: L('ThisFieldIsRequired') }]}
                  >
                    <Input
                      disabled
                      className="formInput"
                      placeholder={L('promotion.request.personel.dateofstart')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="lastPromotionDate"
                    label={
                      <label style={{ maxWidth: 160, minWidth: 160 }}>
                        {L('promotion.request.personel.lastpromotindate')}
                      </label>
                    }
                  >
                    <Input
                      disabled
                      className="formInput"
                      placeholder={L('promotion.request.personel.lastpromotindate')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="levelOfEducation"
                    label={
                      <label style={{ maxWidth: 160, minWidth: 160 }}>
                        {L('promotion.request.personel.educationlevel')}
                      </label>
                    }
                    rules={[{ required: true, message: L('ThisFieldIsRequired') }]}
                  >
                    <Input
                      disabled
                      className="formInput"
                      placeholder={L('promotion.request.personel.educationlevel')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="militaryStatus"
                    label={
                      <label style={{ maxWidth: 160, minWidth: 160 }}>
                        {L('promotion.request.personel.militarystatus')}
                      </label>
                    }
                    rules={[{ required: true, message: L('ThisFieldIsRequired') }]}
                  >
                    <Input
                      disabled
                      className="formInput"
                      placeholder={L('promotion.request.personel.militarystatus')}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Divider orientation="left">{L('promotion.request.promotion.information')}</Divider>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="promotionRequestTitle"
                  label={
                    <label style={{ maxWidth: 160, minWidth: 160 }}>
                      {L('promotion.request.promotion.title')}
                    </label>
                  }
                  rules={[{ required: true, message: L('ThisFieldIsRequired') }]}
                >
                  <Input
                    disabled
                    className="formInput"
                    placeholder={L('promotion.request.promotion.title')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="description"
                  label={
                    <label style={{ maxWidth: 160, minWidth: 160 }}>
                      {L('promotion.request.promotion.description')}
                    </label>
                  }
                >
                  <Input.TextArea disabled />
                </Form.Item>
              </Col>
            </Row>

            {this.state.isHRManager === true ? (
              <>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="unit"
                      label={
                        <label style={{ maxWidth: 160, minWidth: 160 }}>
                          {L('promotion.request.promotion.unit')}
                        </label>
                      }
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="department"
                      label={
                        <label style={{ maxWidth: 160, minWidth: 160 }}>
                          {L('promotion.request.promotion.department')}
                        </label>
                      }
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              ''
            )}

            <Row style={{ float: 'right' }}>
              <Col span={10}>
                <Space style={{ width: '100%' }}>
                  <Button
                    type="success"

                      onClick={() => this.handleCreate()}
                  >
                    {L('Approve')}
                  </Button>
                </Space>
              </Col>
              <Col span={4}></Col>
              <Col span={10}>
                <Space style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    danger
                       onClick={() => this.handleCreate()}
                  >
                    {L('items.knorm.reject.btn')}
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>
      </>
    ) : (
      ''
    );
  }
}
export default PromotionConfirmation;
