/*eslint-disable*/

import * as React from 'react';
import AppComponentBase from '../../components/AppComponentBase';
import ApprovalHierarchy from './components/approvalHierarchy';
import { isGranted, L } from '../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  PageHeader,
  Row,
  Select,
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';
import KPersonelStore from '../../stores/kPersonelStore';
import SessionStore from '../../stores/sessionStore';
import Stores from '../../stores/storeIdentifier';
import { inject, observer } from 'mobx-react';
import QueueAnim from 'rc-queue-anim';
import './index.less';
import InkaStore from '../../stores/inkaStore';
import JobStore from '../../stores/jobStore';
import { JobPromoteRequestDto } from '../../services/jobs/dto/jobPromoteRequestDto';
import PromotionStore from '../../stores/promotionStore';
import { PromotionType } from '../../services/promotion/dto/promotionType';
import { PromotionStatu } from '../../services/promotion/dto/promotionStatu';
import UserStore from '../../stores/userStore';
import { BaseSelectRef } from 'rc-select';

export interface Props {
  kPersonelStore: KPersonelStore;
  sessionStore: SessionStore;
  inkaStore: InkaStore;
  jobStore: JobStore;
  promotionStore: PromotionStore;
  userStore: UserStore;
}

export interface State {
  id: string;
  locationId: number;
  modalVisible: boolean;
  infoModalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  filter: string;
  isLoading: boolean;
  personelDivideVisible: boolean;
  birimObjId: string;
  jobsObjId: string;
  unit: string;
  department: string;
  departmentObjId: string;
  chiefObjId: string;
  hierarchyData: {};
  userRoles: any[];
  firstPromotionJob: number;
}

const { Option } = Select;

function onSearch2(val) {}

@inject(Stores.UserStore)
@inject(Stores.PromotionStore)
@inject(Stores.JobStore)
@inject(Stores.KPersonelStore)
@inject(Stores.SessionStore)
@inject(Stores.InkaStore)
@observer
class RequestForPromotion extends AppComponentBase<Props, State> {
  formRef = React.createRef<FormInstance>();
  selectRef = React.createRef<BaseSelectRef>();

  state = {
    id: '',
    modalVisible: false,
    infoModalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    filter: '',
    locationId: 0,
    isLoading: true,
    personelDivideVisible: false,
    birimObjId: '0',
    jobsObjId: '0',
    unit: '',
    department: '',
    departmentObjId: '',
    chiefObjId: '',
    hierarchyData: {
      departmentManager: '',
      recruitment: '',
      hrManager: '',
    },
    userRoles: [],
    firstPromotionJob: 0,
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  showInfoModal = () => {
    this.setState({
      infoModalVisible: true,
    });
  };

  hideInfoModal = () => {
    this.setState({
      infoModalVisible: false,
    });
  };

  componentDidMount = async () => {
    this.props.sessionStore && (await this.props.sessionStore.getCurrentLoginInformations());
    this.setState({ locationId: this.props['match'].params['id'] });
    await this.getInkaPersonelByTcNo(await this.props.sessionStore.currentLogin.user.tcKimlikNo);
    await this.props.userStore.get({ id: this.props.sessionStore.currentLogin.user.id });
    await this.getAllEmployeesForGroupBy(
      this.state.chiefObjId !== undefined ? this.state.chiefObjId : ''
    );
    await this.getInkaPersonelByChief(this.state.chiefObjId);
  };

  getInkaPersonelByTcNo = async (tcNo: string) => {
    if (this.props.inkaStore !== undefined) {
      await this.props.inkaStore.getInkaEmployeeByTcNo(tcNo).then(() => {
        this.setState({
          birimObjId: this.props.inkaStore.inkaUser && this.props.inkaStore.inkaUser.birimObjId,
          departmentObjId:
            this.props.inkaStore.inkaUser && this.props.inkaStore.inkaUser.departmanObjId,
          unit: this.props.inkaStore.inkaUser && this.props.inkaStore.inkaUser.birimAdi,
          department: this.props.inkaStore.inkaUser && this.props.inkaStore.inkaUser.isyeriTipi,
          chiefObjId:
            this.props.inkaStore.inkaUser && this.props.inkaStore.inkaUser.birimAmir_ObjId,
        });
      });
    }
  };

  getAllEmployeesForGroupBy = async (birimObjId: string) => {
    await this.props.inkaStore.getAllInkaEmployeesByUnit(birimObjId).then(() => {
      this.setState({ isLoading: false });
    });
  };

  getEmployeeDetail = async (tcNo: string) => {
    await this.props.kPersonelStore.getByTcNo(tcNo);
    let formValue = {
      ...this.props.kPersonelStore.kPersonel,
      grubaGirisTarihi: new Date(
        this.props.kPersonelStore.kPersonel.grubaGirisTarihi
      ).toLocaleDateString(),
    };
    setTimeout(() => {
      this.formRef.current?.setFieldsValue(formValue);
    }, 100);
  };

  getEmployeePromotionPositons = async (jobsPromoteRequestDto: JobPromoteRequestDto) => {
    if (this.props.jobStore !== undefined) {
      await this.props.jobStore.getAllPositionForTitlee({
        objId: jobsPromoteRequestDto.objId,
        birimObjId: jobsPromoteRequestDto.birimObjId,
      });
    }
  };

  getInkaPersonelByChief = async (chiefId: string) => {
    if (this.props.inkaStore !== undefined) {
      await this.props.inkaStore.getInkaEmployeeByChief(chiefId).then(() => {
        if (this.props.userStore.editUser.roleNames.includes('DEPARTMENTMANAGER') === true) {
          this.setState({
            hierarchyData: {
              departmentManager: ``,
            },
          });
        } else {
          this.setState({
            hierarchyData: {
              departmentManager: `${this.props.inkaStore.inkaUserByChief.iKGorev}`,
            },
          });
        }
      });
    }
  };

  getInkaPersonelByTitleRecruitment = async (titleObjId: string) => {
    if (this.props.inkaStore !== undefined) {
      await this.props.inkaStore.getAllIKPersonelByTitle(titleObjId).then(() => {
        this.setState({
          hierarchyData: {
            ...this.state.hierarchyData,
            recruitment: `${this.props.inkaStore.inkaUsersByTitle[0].iKGorev}`,
          },
        });
      });
    }
  };

  getInkaPersonelByTitleHRManager = async (titleObjId: string) => {
    if (this.props.inkaStore !== undefined) {
      await this.props.inkaStore.getAllIKPersonelByTitle(titleObjId).then(() => {
        this.setState({
          hierarchyData: {
            ...this.state.hierarchyData,
            hrManager: `${this.props.inkaStore.inkaUsersByTitle[0].iKGorev}`,
          },
        });
      });
    }
  };

  async createOrUpdateModalOpen() {
    this.Modal();
  }

  handleCreate = async () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      let id=this.state.id;
      await this.props.promotionStore.isAnyPersonel(values.sicilNo.toString());
      if (this.props.promotionStore.isAnyPersonelResult && this.props.promotionStore.isAnyPersonelResult) {
        this.openInfoNotification('topRight');
      } else {
        var splitNames = values.adiSoyadi.split('_');
        var splitTitles = values.terfiTalepEdilenGorev.split('_');
        let firstName = splitNames[2].toString();
        let lastName = splitNames[3].toString();
        let promotionRequestTitle = splitTitles[0].toString();
        let Dates = values.grubaGirisTarihi.split('.');
        let dateOfStartString = `${Dates[1].toString()}/${Dates[0].toString()}/${Dates[2].toString()}`;
        const description = values.description !== undefined ? values.description.toString() : '';
        const dateOfStart = new Date(dateOfStartString);
        const hierarchyStatu =
          this.props.userStore.editUser.roleNames.includes('DEPARTMENTMANAGER') === true
            ? PromotionStatu.Department
            : PromotionStatu.None;
        await this.props.promotionStore
          .create({id:id,
            registrationNumber: values.sicilNo.toString(),
            firstName: firstName,
            lastName: lastName,
            title: values.gorevi.toString(),
            levelOfEducation: values.ogrenimDurumu.toString(),
            promotionRequestTitle: promotionRequestTitle,
            militaryStatus: values.askerlikDurumu.toString(),
            department: this.state.department,
            departmentObjId: this.state.departmentObjId,
            unit: this.state.unit,
            unitObjId: this.state.birimObjId,
            description: description,
            requestDate: new Date(),
            dateOfStart: dateOfStart,
            lastPromotionDate: new Date(),
            statu: PromotionType.None,
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
    });
  };

  openSuccessNotification = (placement) => {
    notification.success({
      message: `Terfi Talebi`,
      description: 'Belirtmiş olduğunuz personel için terfi talebi başarıyla oluşmuştur.',
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
        'Belirtmiş olduğunuz personel için terfi talebi süreci devam etmektedir. Bu sebepten dolayı terfi talebini gerçekleştiremessiniz.',
      placement,
    });
  };

  public render() {
    const { inkaUsersByUnit } = this.props.inkaStore;
    //const { inkaUserByChief } = this.props.inkaStore;
    const { jobPositions } = this.props.jobStore;

    const onChangePersonel = async (value: string) => {
      focusTextInput();
      var data = value.split('_');
      await this.getEmployeeDetail(data[1].toString()).then(() => {
        this.setState({
          personelDivideVisible: true,
          jobsObjId: data[0].toString(),
        });
      });
      await this.getEmployeePromotionPositons({
        objId: this.state.jobsObjId,
        birimObjId: this.state.birimObjId,
      });
      await this.getInkaPersonelByChief(this.state.chiefObjId);
      await this.getInkaPersonelByTitleRecruitment('5000900100000010483');
      await this.getInkaPersonelByTitleHRManager('5000900100000010476');
      this.setState({
        firstPromotionJob: this.props.jobStore.jobPositions[0].durum,
      });
    };

    const onChangeTitle = async (value: string) => {
      var data = value.split('_');
      if (Number(data[1]) > this.state.firstPromotionJob) {
        this.setState({ infoModalVisible: true });
      }
    };

    const focusTextInput = () => {
      this.selectRef.current?.focus();
    };

    const onSearchPersonel = (value) => {};

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
          <Divider orientation="left">{L('promotion.request.header')}</Divider>
          <Form ref={this.formRef}>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="adiSoyadi"
                  label={
                    <label style={{ maxWidth: 160, minWidth: 160 }}>
                      {L('promotion.request.personel')}
                    </label>
                  }
                  rules={[{ required: true, message: L('ThisFieldIsRequired') }]}
                >
                  <Select
                    showSearch
                    placeholder={L('Choose')}
                    optionFilterProp="children"
                    onChange={onChangePersonel}
                    onSearch={onSearchPersonel}
                    filterOption={(input, option) =>
                      (option?.children &&
                        option?.children?.toString().toLowerCase().indexOf(input.toLowerCase()) >=
                          0) ||
                      option?.props.value.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {inkaUsersByUnit !== undefined
                      ? inkaUsersByUnit.map((item, index) => (item.isyeriTipi==='Merkez'?item.birimObjId===this.state.birimObjId&&(
                        
                          <Option
                            value={`${item.gorevObjId}_${item.tcKimlikNo}_${item.adi}_${item.soyadi}`}
                            key={index} 
                          >                       
                            
                            {item.adi} {item.soyadi}
                          </Option>
                        
                        ):item.isyeriTipi===this.state.department&&(
                        
                          <Option
                            value={`${item.gorevObjId}_${item.tcKimlikNo}_${item.adi}_${item.soyadi}`}
                            key={index} 
                          >                       
                            
                            {item.adi} {item.soyadi}  
                          </Option>
                        
                        )))
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {this.state.personelDivideVisible === true ? (
              <>
                {' '}
                <QueueAnim delay={300} className="queue-simple">
                  <div key="personel-info">
                    <Divider orientation="left">Personel Bilgileri</Divider>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          name="sicilNo"
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
                          name="gorevi"
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
                          name="grubaGirisTarihi"
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
                          name="sonTerfiTarihi"
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
                          name="ogrenimDurumu"
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
                          name="askerlikDurumu"
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
                </QueueAnim>
              </>
            ) : (
              ''
            )}

            {this.state.personelDivideVisible === true ? (
              <>
                {' '}
                <QueueAnim delay={300} className="queue-simple">
                  <Divider orientation="left">
                    {L('promotion.request.promotion.information')}
                  </Divider>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="terfiTalepEdilenGorev"
                        label={
                          <label style={{ maxWidth: 160, minWidth: 160 }}>
                            {L('promotion.request.promotion.title')}
                          </label>
                        }
                        rules={[{ required: true, message: L('ThisFieldIsRequired') }]}
                      >
                        <Select
                          showSearch
                          ref={this.selectRef}
                          placeholder={L('Choose')}
                          optionFilterProp="children"
                          onChange={onChangeTitle}
                          onSearch={onSearch2}
                          filterOption={(input, option) =>
                            (option?.children &&
                              option?.children
                                ?.toString()
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0) ||
                            option?.props.value
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {jobPositions !== undefined
                            ? jobPositions.map((item, index) => (
                                <Option value={`${item.adi}_${item.durum}`} key={index}>
                                  {item.adi}
                                </Option>
                              ))
                            : ''}
                        </Select>
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
                        <Input.TextArea />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="unit"
                        label={
                          <label style={{ maxWidth: 160, minWidth: 160 }}>
                            {L('promotion.request.promotion.unit')}
                          </label>
                        }
                        hidden={true}
                      >
                        <Input />
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
                        hidden={true}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </QueueAnim>
              </>
            ) : (
              ''
            )}
            {this.state.personelDivideVisible === true ? (
              <Row style={{ float: 'right' }}>
                <Col span={12}>
                  <Space style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={() => this.createOrUpdateModalOpen()}
                    >
                      {L('Save')}
                    </Button>
                  </Space>
                </Col>
              </Row>
            ) : (
              ''
            )}
          </Form>
          <ApprovalHierarchy
            formRef={this.formRef}
            visible={this.state.modalVisible}
            modalType="View"
            onCancel={() => {
              this.setState({
                modalVisible: false,
              });
              // this.formRef.current?.resetFields();
            }}
            hierarchyData={this.state.hierarchyData}
            onCreate={this.handleCreate}
          ></ApprovalHierarchy>
          <Modal
            title={L('Warning')}
            visible={this.state.infoModalVisible}
            onOk={this.hideInfoModal}
            onCancel={this.hideInfoModal}
            okText={L('Yes')}
            cancelText={L('No')}
          >
            <p>1’den fazla kıdem atlamak istediğinizden emin misiniz?</p>
          </Modal>
        </Card>
      </>
    ) : (
      ''
    );
  }
}
export default RequestForPromotion;
