/*eslint-disable */
import './index.less';
import React from 'react';
import { L } from '../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import rules from './createNormForm.validation';
import { MailOutlined } from '@ant-design/icons';
import TalepTuru from '../../services/kNorm/dto/talepTuru';
import TalepNedeni from '../../services/kNorm/dto/talepNedeni';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { Input, Modal, Tabs, Form, Select, Button, Steps, Row, Col } from 'antd';
import { GetKPersonelOutput } from '../../services/kPersonel/dto/getKPersonelOutput';
import { GetAllHierarchyOutput } from '../../services/kHierarchy/dto/getAllHierarchyOutput';
import { GetKInkaLookUpTableOutput } from '../../services/kInkaLookUpTable/dto/getKInkaLookUpTableOutput';
import TextArea from 'antd/lib/input/TextArea';

const { Step } = Steps;
const TabPane = Tabs.TabPane;
//const { TextArea } = Input;
const { Option } = Select;


export interface Props {
  tip: string;
  subeId: string;
  visible: boolean;
  normCount: number;
  modalType: string;
  modalWidth: string;
  createFormState: {};
  onCancel: () => void;
  onCreateNorm: () => void;
  bagliOlduguSubeId: string;
  hierarchy: GetAllHierarchyOutput[];
  formRef: React.RefObject<FormInstance>;
  employees: PagedResultDto<GetKPersonelOutput>;
  checkEmployeeNormStatus?: (id: string) => void;
  position: PagedResultDto<GetKInkaLookUpTableOutput>;
  getHierarchy: (subeId: string, bolgeId: string, tip: string, pozisyon: string) => void;
}

export interface State {
  pozisyon: string;
  talepTuru: string;
  defaultActiveKey: {};
  confirmDirty: boolean;
  buttonVisible: boolean;
  submitVisible: boolean;
  employeeVisible: boolean;
  positionVisible: boolean;
  newPositionVisible: boolean;
  descriptionVisible: boolean;
  normRequestReasonVisible: boolean;
  groupEmployee: {};
}

class CreateNormForm extends React.Component<Props, State> {
  state = {
    defaultActiveKey: {
      name: 'Next',
      pane: 'PositionSelect',
      visible: false,
    },
    pozisyon: '',
    talepTuru: '',
    confirmDirty: false,
    submitVisible: false,
    buttonVisible: false,
    employeeVisible: false,
    positionVisible: false,
    newPositionVisible: false,
    descriptionVisible: false,
    normRequestReasonVisible: false,
    groupEmployee: {},
  };

  changeActiveTab = () => {
    const form = this.props.formRef.current;
    form!.validateFields().then(async (values: any) => {
      this.setState({
        defaultActiveKey: {
          name: this.state.defaultActiveKey.name === 'Back' ? 'Next' : 'Back',
          pane:
            this.state.defaultActiveKey.pane === 'AuthoritiesHierarchy'
              ? 'PositionSelect'
              : 'AuthoritiesHierarchy',
          visible: this.state.defaultActiveKey.name === 'Next' ? true : false,
        },
      });
    });
  };


  visibleEmployee = (param) => {
    if (param === 'Ayrilma') {
      this.setState({ employeeVisible: true });
    } else this.setState({ employeeVisible: false });
  };

  CreateNorm = () => {
    this.setState({
      defaultActiveKey: this.props.createFormState,
      employeeVisible: false,
      positionVisible: false,
      newPositionVisible: false,
      normRequestReasonVisible: false,
      descriptionVisible: false,
      talepTuru: '',
      buttonVisible: true,
      confirmDirty: true,
    });
  };

  resetForm = () => {
    const form = this.props.formRef.current;
    this.setState({
      confirmDirty: false,
      defaultActiveKey: {
        name: 'Next',
        pane: 'PositionSelect',
        visible: false,
      },
      employeeVisible: false,
      positionVisible: false,
      newPositionVisible: false,
      normRequestReasonVisible: false,
      descriptionVisible: false,
      talepTuru: '',
      buttonVisible: true,
    });

    form?.resetFields();
  };

  visibleChangeFormItems = (param) => {
    const form = this.props.formRef.current;
    form!.resetFields(['Pozisyon', 'Aciklama', 'TalepNedeni', 'PersonelId', 'YeniPozisyon']);

    this.setState({
      positionVisible: false,
      normRequestReasonVisible: false,
      descriptionVisible: false,
      newPositionVisible: false,
      buttonVisible: false,
      talepTuru: '',
    });

    if (TalepTuru[param] === TalepTuru.Norm_Doldurma) {
      this.setState({
        positionVisible: true,
        normRequestReasonVisible: true,
        descriptionVisible: true,
        newPositionVisible: false,
        talepTuru: param,
      });
    } else if (TalepTuru[param] === TalepTuru.Norm_Arttir) {
      this.setState({
        positionVisible: true,
        normRequestReasonVisible: true,
        descriptionVisible: true,
        newPositionVisible: false,
        talepTuru: param,
        employeeVisible: false,
      });
    } else if (TalepTuru[param] === TalepTuru.Norm_Kaydir) {
      this.setState({
        positionVisible: true,
        newPositionVisible: true,
        descriptionVisible: true,
        normRequestReasonVisible: false,
        talepTuru: param,
        employeeVisible: false,
      });
    }
  };

  componentDidMount = async () => {
    // this.setState({
    //   positionVisible: false,
    //   normRequestReasonVisible: false,
    //   descriptionVisible: false,
    //   newPositionVisible: false,
    //   buttonVisible: false,
    //   talepTuru: ''
    // });

  };


  compareToPositions = (rule: any, value: any, callback: any) => {
    const form = this.props.formRef.current;

    if (value && value === form!.getFieldValue('Pozisyon')) {
      return Promise.reject(L('TheNewPositionCannotBeTheSameAsTheOldPosition'));
    }
    return Promise.resolve();
  };

  render() {
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

    const {
      tip,
      visible,
      onCancel,
      employees,
      position,
      onCreateNorm,
      subeId,
      hierarchy,
      bagliOlduguSubeId,
      getHierarchy,
      modalWidth,
    } = this.props;
    const { pozisyon } = this.state;




    return (
      <Row>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 18, offset: 0 }}
          lg={{ span: 18, offset: 0 }}
          xl={{ span: 18, offset: 0 }}
          xxl={{ span: 18, offset: 0 }}
        >
          <Modal
            footer={[
              !this.state.buttonVisible && (
                <Button
                  key="next"
                  onClick={() => {
                    this.changeActiveTab(), getHierarchy(subeId, bagliOlduguSubeId, tip, pozisyon);
                  }}
                >
                  {L(this.state.defaultActiveKey.name)}
                </Button>
              ),

              this.state.defaultActiveKey.pane === 'AuthoritiesHierarchy' &&
              !this.state.buttonVisible && (
                <Button
                  onClick={() => {
                    onCreateNorm(), this.CreateNorm();
                  }}
                  className={'right'}
                  type="primary"
                >
                  {L('Send')}
                </Button>
              ),
            ]}
            onCancel={() => {
              onCancel();
              this.resetForm();
            }}
            okText={L('OK')}
            visible={visible}
            width={modalWidth}
            destroyOnClose={true}
            title={L('Position')}
            cancelText={L('Cancel')}
          >
            <Form ref={this.props.formRef}>
              <Tabs
                defaultActiveKey={this.state.defaultActiveKey.pane}
                size={'small'}
                tabBarGutter={64}
                activeKey={this.state.defaultActiveKey.pane}
              >
                <TabPane
                  tab={L('PositionSelect')}
                  key={'PositionSelect'}
                  className={'ant-tab-form'}
                >
                  <Form.Item className={'hidden-form-item'} initialValue={subeId} name="subeObjId">
                    <Input style={{ display: 'none' }} />
                  </Form.Item>

                  <Form.Item
                    className={'hidden-form-item'}
                    initialValue={bagliOlduguSubeId}
                    name="bagliOlduguSubeObjId"
                  >
                    <Input style={{ display: 'none' }} />
                  </Form.Item>

                  <Form.Item
                    className={'hidden-form-item'}
                    initialValue={tip}
                    name="tip"
                    rules={rules.tip}
                  >
                    <Input style={{ display: 'none' }} />
                  </Form.Item>

                  <Form.Item
                    className={'mt-5'}
                    label={L('RequestType')}
                    {...formItemLayout}
                    name={'TalepTuru'}
                    rules={rules.requestType}
                  >
                    <Select placeholder={L('PleaseSelect')} onChange={this.visibleChangeFormItems} >
                      {Object.keys(TalepTuru).map((value, index) => (
                        <Option key={'talep_turu_' + value} value={value}>
                          {' '}
                          {L(TalepTuru[value].replace(' ', ''))}{' '}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {this.state.positionVisible && (
                    <Form.Item
                      label={L('Position')}
                      {...formItemLayout}
                      name={'Pozisyon'}
                      rules={rules.position}
                    >
                      <Select
                        notFoundContent={{ emptyText: L('NoSelectData') }}
                        placeholder={L('PleaseSelect')}
                        onSelect={(x: any) =>
                          position !== undefined && this.setState({ pozisyon: x.toString() })
                        }
                      >
                        {position !== undefined &&
                          position.items.map((value, index) => (
                            <Option key={'pozisyon_' + value.adi + index} value={value.adi}>
                              {' '}
                              {value.adi}{' '}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  )}

                  {this.state.newPositionVisible && (
                    <Form.Item
                      label={L('NewPosition')}
                      {...formItemLayout}
                      name={'YeniPozisyon'}
                      rules={[
                        {
                          required: true,
                          message: L('ThisFieldIsRequired'),
                        },
                        {
                          validator: this.compareToPositions,
                        },
                      ]}
                    >
                      <Select key={'YeniPozisyon'} placeholder={L('PleaseSelect')}>
                        {position !== undefined &&
                          position.items.map((value, index) => (
                            <Option key={'yeni_pozisyon_' + value.adi} value={value.adi}>
                              {' '}
                              {value.adi}{' '}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  )}
                  {this.state.normRequestReasonVisible && (
                    <Form.Item
                      label={L('NormRequestReason')}
                      {...formItemLayout}
                      name={'TalepNedeni'}
                      rules={rules.requestReason}
                    >
                      <Select placeholder={L('PleaseSelect')} onChange={this.visibleEmployee}>
                        {Object.keys(TalepNedeni).map((value, index) => (
                          <>
                            {employees !== undefined &&
                              TalepTuru[this.state.talepTuru] === TalepTuru.Norm_Doldurma &&
                              TalepNedeni[value] !== TalepNedeni.Kadro_Genisleme ? (
                              <Option key={'talep_nedeni_' + value} value={value}>
                                {' '}
                                {TalepNedeni[value]}{' '}
                              </Option>
                            ) : (
                              TalepTuru[this.state.talepTuru] === TalepTuru.Norm_Arttir &&
                              TalepNedeni[value] === TalepNedeni.Kadro_Genisleme && (
                                <Option key={'talep_nedeni_' + value} value={value}>
                                  {' '}
                                  {TalepNedeni[value]}{' '}
                                </Option>
                              )
                            )}
                          </>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                  {this.state.employeeVisible && (
                    <Form.Item
                      label={L('Employee')}
                      {...formItemLayout}
                      name={'PersonelId'}
                      rules={rules.employeeId}
                    >
                      <Select placeholder={L('PleaseSelect')} onChange={this.props.checkEmployeeNormStatus}>
                        {employees != undefined &&
                          employees.items.map((value, index) => (
                            <Option key={'personel_id_' + value.objId} value={value.objId}>
                              {' '}
                              {value.ad} {value.soyad}{' '}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  )}
                  {this.state.descriptionVisible && (
                    <Form.Item
                      label={L('Description')}
                      {...formItemLayout}
                      name={'Aciklama'}
                      rules={rules.description}
                    >
                      <TextArea rows={8} />
                    </Form.Item>
                  )}
                </TabPane>
                <TabPane
                  className={'form-tabPane'}
                  tab={L('AuthoritiesHierarchy')}
                  key={'AuthoritiesHierarchy'}
                  forceRender={true}
                >
                  <Steps direction="vertical">
                    {hierarchy !== undefined &&
                      hierarchy.map((data) => (
                        <Step
                          key={'step_' + data.mail}
                          icon={<MailOutlined />}
                          status={'finish'}
                          title={''}
                          description={
                            <Row>
                              <Col
                                xs={{ span: 8, offset: 0 }}
                                sm={{ span: 8, offset: 0 }}
                                md={{ span: 8, offset: 0 }}
                                lg={{ span: 8, offset: 0 }}
                                xl={{ span: 8, offset: 0 }}
                                xxl={{ span: 8, offset: 0 }}
                              >
                                {' '}
                                {data.title}{' '}
                              </Col>
                              <Col
                                xs={{ span: 3, offset: 0 }}
                                sm={{ span: 3, offset: 0 }}
                                md={{ span: 3, offset: 0 }}
                                lg={{ span: 3, offset: 0 }}
                                xl={{ span: 3, offset: 0 }}
                                xxl={{ span: 3, offset: 0 }}
                              >
                                {' '}
                                {data.firstName}{' '}
                              </Col>
                              <Col
                                xs={{ span: 3, offset: 0 }}
                                sm={{ span: 3, offset: 0 }}
                                md={{ span: 3, offset: 0 }}
                                lg={{ span: 3, offset: 0 }}
                                xl={{ span: 3, offset: 0 }}
                                xxl={{ span: 3, offset: 0 }}
                              >
                                {' '}
                                {data.lastName}{' '}
                              </Col>
                              <Col
                                xs={{ span: 10, offset: 0 }}
                                sm={{ span: 10, offset: 0 }}
                                md={{ span: 10, offset: 0 }}
                                lg={{ span: 10, offset: 0 }}
                                xl={{ span: 10, offset: 0 }}
                                xxl={{ span: 10, offset: 0 }}
                              >
                                {' '}
                                <strong> {data.mail} </strong>{' '}
                              </Col>
                            </Row>
                          }
                        />
                      ))}
                  </Steps>
                </TabPane>
              </Tabs>
            </Form>
          </Modal>
        </Col>
      </Row>
    );
  }
}
export default CreateNormForm;
