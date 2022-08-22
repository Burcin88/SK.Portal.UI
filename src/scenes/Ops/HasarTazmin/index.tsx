/* eslint-disable */
import React from 'react';
import './index.less';
import AppComponentBase from '../../../components/AppComponentBase';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  PageHeader,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import rules from './HasarTazmin.validation';
import { Link } from 'react-router-dom';
import { isGranted, L } from '../../../lib/abpUtility';
// import GonderenCariSelect from './components/GonderenCariSelect';
// import AliciCariSelect from './components/AliciCariSelect';
import FarkliCari from './components/FarkliCari';
// import EditableTagGroup from './components/LinkTag';
import Stores from '../../../stores/storeIdentifier';
import {AlertOutlined,CheckCircleTwoTone,ExclamationCircleOutlined,SendOutlined,SwitcherOutlined,} from '@ant-design/icons';
import KDamageCompensationStore from '../../../stores/kDamageCompensationStore';
import OpsHierarchyStore from '../../../stores/opsHierarchyStore';
import TextArea from 'rc-textarea';
import moment from 'moment';
import 'moment/locale/tr';
import locale from 'antd/es/date-picker/locale/tr_TR';
import DamageHistory from './components/damageHistory';
import FileBase64 from 'react-file-base64';
import CargoLocations from  '../../../services/kDamageCompensations/dto/cargoLocations';



export interface IProps {
  kDamageCompensationStore: KDamageCompensationStore;
  opsHierarchyStore: OpsHierarchyStore;
}

export interface IState {
  setsorgulama: boolean;
  setradioValue: number;
  setformreadonly: boolean;
  setformselectdisable: boolean;
  settazminmusteriAlici: boolean;
  settazminmusteriFarkli: boolean;
  setradioValueTazminMusteri: number;
  settazminmusteriGonderici: boolean;
  Ktno: number;
  cariList: any;
  gonderiUnvanInput: string;
  aliciUnvanInput: string;
  subeList: any;
  birimList: any;
  bolgeList: any;
  lastId: number;
  SurecSahibibolgeList: any;
  tagLink: string;
  fileInput: string;
  //degerlendirme
  selectedItems: any;
  tckInput: boolean;
  vknInput: boolean;
  evrakolusturmatarihi: any;
  aktiftabs: string;
  gonderenKoduCom: string;
  gonderenCariCom: string;
  aliciKoduCom: string;
  aliciCariCom: string;
  talepedilentutar: string;
  odenecekTutar: boolean;
  evaTalepEdilenTutar: string;
  onayaGonderBtn: boolean;
  filesTazminDilekcesi: any;
  filesFatura: any;
  filesSevkirsaliye: any;
  filesTcVkno: any;
  tazminStatu: string;
  btnkaydet: boolean;
  TarihTab: Boolean;
  DegTab: Boolean;
  btngetir: boolean;
  loadingBring:boolean;
  listDataHistroy:any;
  opsRoleCode:any;
}

const { confirm } = Modal;
@inject(Stores.OpsHierarchyStore)
@inject(Stores.KDamageCompensationStore)

@observer
class DamageCompensation extends AppComponentBase<IProps, IState> {
  formRef = React.createRef<FormInstance>();

  formRefDeg = React.createRef<FormInstance>();

  state = {
    setradioValue: 1,
    setsorgulama: true,
    setformreadonly: true,
    setformselectdisable: true,
    settazminmusteriAlici: false,
    settazminmusteriFarkli: false,
    setradioValueTazminMusteri: 4,
    settazminmusteriGonderici: false,
    Ktno: 0,
    cariList: [],
    gonderiUnvanInput: '',
    aliciUnvanInput: '',
    subeList: [],
    birimList: [],
    bolgeList: [],
    lastId: 0,
    SurecSahibibolgeList: [],
    tagLink: 'Test',
    fileInput: '',
    tckInput: true,
    vknInput: true,
    //değerlendirme
    selectedItems: [],
    aktiftabs: '1',
    evrakolusturmatarihi: '',
    gonderenKoduCom: '',
    gonderenCariCom: '',
    aliciKoduCom: '',
    aliciCariCom: '',
    talepedilentutar: '',
    odenecekTutar: true,
    evaTalepEdilenTutar: '',
    onayaGonderBtn: false,
    filesTazminDilekcesi: [],
    filesFatura: [],
    filesSevkirsaliye: [],
    filesTcVkno: [],
    tazminStatu: 'Taslak',
    btnkaydet: false,
    TarihTab: true,
    DegTab: false,
    btngetir: false,
    loadingBring:false,
    listDataHistroy:[] as any,
    opsRoleCode:0
   
  };

  getdamage = async (id: number) => {
    try {
      await this.props.kDamageCompensationStore
        .getDamageComppensation({ id: id })
        .then((response) => {
          if (this.props.kDamageCompensationStore.getCreateDamageInput === null) {
            notification.open({
              icon: <AlertOutlined style={{ color: 'red' }} />,
              message: L('Warning'),
              description: L('ShippingTrackingNumberNotFound'),
            });
          } else if (
            this.props.kDamageCompensationStore.getCreateDamageInput.takipNo === '0'
          ) {
            notification.open({
              icon: <AlertOutlined style={{ color: 'red' }} />,
              message: L('Warning'),
              description:
                L('RegisteredWithCargoCompensationNumber') +
                this.props.kDamageCompensationStore.getCreateDamageInput.gonderenKodu +
                L('CompensationThereIsRegistration'),
            });
          } else {
            this.setState({
              gonderenKoduCom: this.props.kDamageCompensationStore.getCreateDamageInput
                .gonderenKodu,
            });
            this.setState({
              gonderenCariCom: this.props.kDamageCompensationStore.getCreateDamageInput
                .gonderenUnvan,
            });
            this.setState({
              aliciKoduCom: this.props.kDamageCompensationStore.getCreateDamageInput.aliciKodu,
            });
            this.setState({
              aliciCariCom: this.props.kDamageCompensationStore.getCreateDamageInput.aliciUnvan,
            });
            this.setState({
              evrakolusturmatarihi: moment(
                this.props.kDamageCompensationStore.getCreateDamageInput.sistem_InsertTime
              ).format('DD-MM-YYYY'),
            });

            setTimeout(() => {
              this.formRef.current?.setFieldsValue({
                ...this.props.kDamageCompensationStore.getCreateDamageInput,
              });
            }, 500);
          }
        })
        .catch(() =>
          notification.open({
            icon: <AlertOutlined style={{ color: 'red' }} />,
            message: L('Warning'),
            description: L('NoRecordTracking'),
          })
        );
    } catch (e) {}
  };

  getEnumCompensationWhy = async (id: string) => {
    try {
         await this.props.kDamageCompensationStore.StoregetCompansationWhy(id);     
    } catch (e) {
      console.log(e);
    }
  };

  getcarilistdamageCompensation = async (id: number) => {
    try {
      await this.props.kDamageCompensationStore.getCariListDamageComppensation({ id: id });
    } catch (e) {
      console.log(e);
    }
  };

  //sube listesi
  getsubelistdamageCompensation = async () => {
    try {
      await this.props.kDamageCompensationStore.getSubeListDamageComppensation();


    } catch (e) {
      console.log(e);
    }
  };

  //Bolge listesi
  getbolgelistdamageCompensation = async () => { 
    try {
      await this.props.kDamageCompensationStore.getBolgeListDamageComppensation();
    } catch (e) {
      console.log(e);
    }
  };

  //Birim listesi
  getbirimlistdamageCompensation = async () => {
    try {
      await this.props.kDamageCompensationStore.getBirimListDamageComppensation();
    } catch (e) {
      console.log(e);
    }
  };

  //sonıd cekme
  getlastiddamageCompensation = async () => {
    await this.props.kDamageCompensationStore.GetDamageComppensationLastId();
    this.setState({ lastId: this.props.kDamageCompensationStore.lastIdDamage });
  };

//ops node role code cekme 
OpsNodesRoleCode = async ()=>{
    await this.props.opsHierarchyStore.GetOpsNodesCode();
     this.setState({opsRoleCode :this.props.opsHierarchyStore.opsrolecode });
  
}


  async componentDidMount() {
    await  this.OpsNodesRoleCode();
    await this.getlastiddamageCompensation();
    await this.getsubelistdamageCompensation();
    //await this.getbirimlistdamageCompensation();
    await this.getbolgelistdamageCompensation();
  }

  //Tanzim  için  Oluşturma Metodu
  kDamageCompensationCreate = () => {
    const form = this.formRef.current;

    form!
      .validateFields()
      .then(async (values: any) => {
        values.FileTazminDilekcesi = JSON.stringify(this.state.filesTazminDilekcesi);
        values.FileFatura = JSON.stringify(this.state.filesFatura);
        values.FileSevkirsaliye = JSON.stringify(this.state.filesSevkirsaliye);
        values.FileTcVkno = JSON.stringify(this.state.filesTcVkno);
        values.TazminId = this.state.lastId;

        if (values.evaTazmin_Odeme_Durumu == '3') {
          values.evaOdenecek_Tutar = values.evaOdenecek_Tutar.replace(',', '.');
        }

        if ( values.FileTazminDilekcesi === '[]'
        ) {
          confirm({
            icon: <ExclamationCircleOutlined />,
            content:L('MissingDocumentationWarning'),
            okText: L('Save'),
            cancelText: L('GiveUp'),
            onOk: () => {              
              this.props.kDamageCompensationStore.create(values);
              this.setState({ talepedilentutar: values.Talep_Edilen_Tutar });
              this.setState({ btnkaydet: true });
              this.setState({ btngetir: true });
              this.setState({ tazminStatu: 'Tazmin Eksik Evrak' });
            },
            onCancel() {
              console.log(L('Cancel'));
            },
          });
        } else {
          setTimeout(() => {
            this.props.kDamageCompensationStore.create(values);
          }, 3000);
          confirm({
            icon: <ExclamationCircleOutlined />,
            content: 'Hasar Tazmin Kaydedildi',
            okText: L('Save'),
            cancelText: L('GiveUp'),
            onOk: () => {              
              this.setState({ talepedilentutar: values.Talep_Edilen_Tutar });
              this.setState({ tazminStatu: 'Tazmin Oluşturuldu' });
              this.setState({ btnkaydet: true }); 
              this.setState({ btngetir: true });
                                  
            },
            onCancel: () => {
              this.setState({ btnkaydet: true });
              this.setState({ tazminStatu: 'Taslak' });
              this.setState({ btngetir: true });
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // Tanzim  Değerlendirm için  Oluşturma Metoduf
  kDamageCompensationEvalutaionCreate = () => {
   if(this.state.talepedilentutar !==''){
    const form = this.formRefDeg.current;
    form!.validateFields().then(async (values: any) => {
      values.tazminId = this.state.lastId;
      values.evaTalep_Edilen_Tutar = this.state.talepedilentutar;
      if (values.evaTazmin_Odeme_Durumu === '3') {
        values.evaOdenecek_Tutar = values.evaOdenecek_Tutar.replace(',', '.');
      } else {
        values.evaOdenecek_Tutar = values.evaOdenecek_Tutar;
      }
      await this.props.kDamageCompensationStore.createDamageCompensationEvalutaion(values);
      confirm({
        icon: <CheckCircleTwoTone />,
        content: L('MissingCompensationConfirmation'),
        okText: L('NewPage'),
        cancelText: L('GiveUp'),
        onOk: () => {
          window.location.reload();
        },
        onCancel: () => {
          this.setState({ onayaGonderBtn: true });
        },
      });
    });
   }else{
    notification.open({
      icon: <AlertOutlined style={{ color: 'red' }} />,
      message: L('Warning'),
      description: L('Pleasefillinthecompensationinformationtab'),
    });        
   }
  };

  openNotificationWithIcon = (type) => {
    notification[type]({
      message:
        type === 'success' ? 'Tazmin Onaya Gönderildi' : L('NormRejectNotificationMessageTitle'),
      description: type === 'success' ? '' : L('NormCreateNotificationMessageDescription'),
      duration: 5,
    });
  };

  public render() {
    const { Option } = Select;
    const { TabPane } = Tabs;

    const dateFormat = 'YYYY-MM-DD';
    var today = new Date();
    const todayFinish = moment(today).format(dateFormat);

    const onChangeRadio = (e) => {
      let changeRadio = e.target.value;
      this.setState({ setradioValue: changeRadio });
      if (changeRadio === 1) {
        this.setState({ setformreadonly: true });
        this.setState({ setformselectdisable: true });
        this.setState({ setsorgulama: true });
        this.setState({ settazminmusteriGonderici: false });
        this.setState({ settazminmusteriAlici: false });
        this.setState({ settazminmusteriFarkli: false });
        this.formRef?.current?.resetFields();
      } else {
        this.setState({ setformreadonly: false });
        this.setState({ setformselectdisable: false });
        this.setState({ setsorgulama: false });
        this.setState({ settazminmusteriGonderici: false });
        this.setState({ settazminmusteriAlici: false });
        this.setState({ settazminmusteriFarkli: false });
        this.formRef?.current?.resetFields();
      }
    };

    const onChangeRadioTazminMusteri = (e) => {
      this.setState({ setradioValueTazminMusteri: e.target.value });
      if (e.target.value === 0) {
        this.setState({ settazminmusteriGonderici: true });
        this.setState({ settazminmusteriAlici: false });
        this.setState({ settazminmusteriFarkli: false });
      } else if (e.target.value === 1) {
        this.setState({ settazminmusteriGonderici: false });
        this.setState({ settazminmusteriAlici: true });
        this.setState({ settazminmusteriFarkli: false });
      } else {
        this.setState({ settazminmusteriGonderici: false });
        this.setState({ settazminmusteriAlici: false });

        /// farklı  cari burda
        this.setState({ settazminmusteriFarkli: true });
        // this.setState({ setradioValueTazminMusteri: 4 });
        // this.setState({ settazminmusteriGonderici: false });
        // this.setState({ settazminmusteriAlici: false });
      }
    };

    const onFinish = (values: any) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    //tab callback
    const callback = (key) => {
      this.setState({ aktiftabs: key });
    };

    const handleChange = (e) => {  
       this.setState({ Ktno: e.target.value });
    };

 





    const handleClick = (e) => {
      this.setState({loadingBring :true})
      if (this.state.Ktno !== 0) {
        this.getdamage(this.state.Ktno);    
        setTimeout(() => {
            this.setState({loadingBring :false})
        }, 500);  
      } else { 
        notification.open({
          icon: <AlertOutlined style={{ color: 'red' }} />,
          message: L('Warning'),      
          description:L('EnterTrackingNumber'),
          
        });
        setTimeout(() => {
          this.setState({loadingBring :false})
      }, 500);

      }
 
    };

    //onDropdownVisibleChangeBolge ödeme bolge selectin tıklandıgında
    const onDropdownVisibleChangeBolge = () => {
      this.setState({
        bolgeList:
          this.props.kDamageCompensationStore.getBolgeListDamage !== undefined &&
          this.props.kDamageCompensationStore.getBolgeListDamage.map((value, index) => (
            <Option key={value.objId + '-' + index} value={value.objId + '-' + index}>
              {value.adi}
            </Option>
          )),
      });
    };

    //onDropdownVisibleChange SurecSahibiBolge ödeme bolge selectin tıklandıgında
    const onDropdownVisibleChangeSurecSahibiBolge = () => {
      this.setState({
        SurecSahibibolgeList:
          this.props.kDamageCompensationStore.getBolgeListDamage !== undefined &&
          this.props.kDamageCompensationStore.getBolgeListDamage.map((value, index) => (
            <Option key={value.objId + '-' + index} value={value.objId + '-' + index}>
              {value.adi}
            </Option>
          )),
      });
    };

    const tazminodemedurumu = (value) => {
      if (value === '1') {
        this.setState({ odenecekTutar: true });
      } else if (value === '2') {
        this.setState({ odenecekTutar: true });
      } else if (value === '3') {
        this.setState({ odenecekTutar: false });
      } else {
        this.setState({ odenecekTutar: true });
      }
    };




    const DegOnchangeTazminTipi = (values) => {
     
       this.getEnumCompensationWhy(values)  
  
            
    };

    const OnChangeOdemeMusteriTipi = (value) => {
      if (value === '1') {
        this.setState({ vknInput: true });
        this.setState({ tckInput: false });
        this.formRef.current?.resetFields(['VK_NO']);
      } else if (value === '2') {
        this.setState({ vknInput: false });
        this.setState({ tckInput: true });
        this.formRef.current?.resetFields(['TCK_NO']);
      } else {
        this.setState({ vknInput: true });
        this.setState({ tckInput: true });
      }
    };


    // Callback~
    const getFileTazminDilekcesi = (files) => {
      if (
        files.type === '' ||
        files.type === undefined ||
        files.type === 'application/x-msdownload'
      ) {
        notification.open({
          icon: <AlertOutlined style={{ color: 'red' }} />,
          message: L('Warning'),
          description: L('MissingInputFile'),
        });
      } else {
        this.setState({ filesTazminDilekcesi: files });
      }
    };


    return (
      <>
        <React.Fragment>
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
                    )}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item> {L('DamageCompensation')} </Breadcrumb.Item>
                  <Breadcrumb.Item>{L('DamageCompensationForm')} </Breadcrumb.Item>
                </Breadcrumb>
              }
            ></PageHeader>
          </Card>
           
          <Card>
            
            <Tabs 
              defaultActiveKey="1"
              onChange={callback}
              tabBarGutter={50}
              // type="card"
              tabPosition="top"
              size="large"
              activeKey={this.state.aktiftabs}
            >
              <TabPane
                tab={
                  <span>
                    <SwitcherOutlined />
                    {L('CompensationInformation')}
                  </span>
                }
                key="1"
              >
                <Row>
                  <Col span={24}>
                    <Form>
                      <Row>
                        <Col style={{ float: 'right' }}>
                          <Form.Item
                            label={<label>{L('CompensationNumber')}</label>}
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 16 }}
                          > 
                            <Input disabled className="formInput" value={this.state.lastId} />
                          </Form.Item>
                        </Col>

                        <Col>
                          <Form.Item
                            label={<label>{L('CompensationStatus')}</label>}
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 16 }}
                          > 
                            <Input
                              disabled
                              className="formInput"
                              value={this.state.tazminStatu}
                            ></Input>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>

                <Divider orientation="left">{L('Questioning')}</Divider>

                <Row>
                  <Col span={24}>
                    <Form>
                      <Row>
                        <Col>
                          <Form.Item
                            name="kargotakipNoRadio"
                            label={
                              <label style={{ maxWidth: 150, minWidth: 150 }}>{L('CargoTrackingNumber')}</label>
                            }
                          >
                            <Radio.Group
                              onChange={onChangeRadio}
                              defaultValue={this.state.setradioValue}
                            >
                              <Radio value={1}>{L('Know')}</Radio>
                               <Radio value={2}>{L('UnKnow')}</Radio> 
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col offset={2}>
                          <Form.Item
                            rules={[
                              {
                                pattern: /^(?:\d*)$/,
                                message:L('MissingNumber'),
                        
                              },
                            ]}
                            name="ktno"
                          >
                            <Input
                              placeholder={L('CargoTrackingNumber')}
                              className="formInput"
                              onChange={handleChange}
                              type='number' 
                              min={0}                       
                            ></Input>
                          </Form.Item>
                        </Col>

                        <Col style={{ marginLeft: 25 }}>
                          <Form.Item name="getirbutton">
                            <Button
                              style={{ width: 139 }}
                              type="primary"
                              disabled={this.state.btngetir}
                              onClick={handleClick}
                              loading={this.state.loadingBring}
                            >
                              {L('Bring')}
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                   
                    </Form>
                  </Col>
                </Row>

                <Divider orientation="left">{L('ShipmentInformation')}</Divider>

                <Form
                  ref={this.formRef}
                  initialValues={{ remember: false }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Row>
                    <Col span={12}>
                      <Form.Item hidden name="takipNo">
                        <Input />
                      </Form.Item>
                      <Form.Item
                        rules={rules.sistem_InsertTime}
                        name="sistem_InsertTime"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>
                            {L('DocumentationHistory')}
                          </label>
                        }
                      > 
                        <Input
                          disabled
                          className="formInput"
                          value={this.state.evrakolusturmatarihi}
                          placeholder={L('DocumentationHistory')}
                        />
                      </Form.Item>
                    </Col>
                    {this.state.setsorgulama ? (
                      <Col span={12}>
                        <Form.Item
                          rules={rules.evrakSeriNo}
                          name="evrakSeriNo"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>
                             {L('DocumentationSerialNumber')}
                            </label>
                          }
                        >
                          <Input
                            disabled
                            readOnly={this.state.setformreadonly}
                            className="formInput"
                            placeholder={L('DocumentationSerialNumber')}
                            defaultValue={this.state.evrakolusturmatarihi}
                          
                          />
                        </Form.Item>
                      </Col>
                    ) : (
                      ''
                    )}
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.gonderenKodu}
                        name="gonderenKodu"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>{L('SenderCode')}</label>
                        }
                      >
                    
                        <Input disabled className="formInput" placeholder={L('SenderCode')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="gonderenUnvan"
                        rules={rules.gonderenUnvan}
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('SenderTitle')}</label>}
                      >
                        <Input
                          disabled
                          className="formInput"
                          placeholder={L('SenderTitle')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.aliciKodu}
                        name="aliciKodu"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('BuyerCode')}</label>}
                      >
                        <Input placeholder={L('BuyerCode')} disabled className="formInput" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="aliciUnvan"
                        rules={rules.aliciUnvan}
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('BuyerTitle')}</label>}
                      >
                        <Input
                          disabled
                          className="formInput"
                          placeholder={L('BuyerTitle')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.cikis_Sube_Unvan}
                        name="cikis_Sube_Unvan"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>{L('ExitBranchName')}</label>
                        }
                      >
                        
                        <Input placeholder={L('ExitBranchName')} className="formInput" disabled />
                      </Form.Item>

                      <Form.Item hidden name="ilkGondericiSube_ObjId">
                        
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item hidden name="varisSube_ObjId">
                        
                      </Form.Item>
                      <Form.Item
                        rules={rules.varis_Sube_Unvan}
                        name="varis_Sube_Unvan"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>{L('ArrivalBranchName')}</label>
                        }
                      >
                        

                        <Input placeholder={L('ArrivalBranchName')} className="formInput" disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item hidden name="birimi_ObjId">
                        
                      </Form.Item>
                      <Form.Item
                        rules={rules.birimi}
                        name="birimi"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('CargoTyp')}</label>}
                      >
                      
                        <Input placeholder={L('CargoTyp')} className="formInput" disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.adet}
                        name="adet"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('PiecesQuantity')}</label>}
                      >
                        <Input
                          disabled
                          className="formInput"
                          type="number"
                          min={1}
                          max={1000}
                          placeholder={L('PiecesQuantity')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider orientation="left">{L('CompensationInformation')}</Divider>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.Tazmin_Talep_Tarihi}
                        name="Tazmin_Talep_Tarihi"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>
                           {L('CompensationRequestDate')}
                          </label>
                        }
                      >
                      
                        <DatePicker
                          className="formInputDate"
                          locale={locale}
                          disabledDate={(d) =>
                            !d || d.isAfter(todayFinish) || d.isSameOrBefore('2000-01-01')
                          }
                          format="YYYY-MM-DD"
                          defaultPickerValue={moment(todayFinish)}
                          placeholder={L('SelectDate')}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.Tazmin_Tipi}
                        name="Tazmin_Tipi"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('CompensationType')}</label>}
                      >
                        <Select className="formInput" placeholder={L('PleaseSelect')} allowClear>
                          <Option value="1">{L('Damage')}</Option>
                          <Option value="2">{L('Loss')}</Option>
                          <Option value="3">{L('LateDelivery')}</Option>
                          <Option value="4">{L('CustomerSatisfaction')}</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.Tazmin_Musteri_Tipi}
                        name="Tazmin_Musteri_Tipi"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>{L('CompensationCustomer')}</label>
                        }
                      >
                        <Radio.Group
                          onChange={onChangeRadioTazminMusteri}
                          value={this.state.setradioValueTazminMusteri}
                        >
                          <Radio value={0}>{L('SenderCustomer')}</Radio>
                          <Radio value={1}>{L('BuyerCustomer')}</Radio>
                          <Radio value={2}>{L('DifferentCustomer')}</Radio>
                        </Radio.Group>
                      </Form.Item>

                      {/* {this.state.settazminmusteriGonderici ? (
                        <GonderenCariSelect
                          gonderenCariCom={this.state.gonderenCariCom}
                          gonderenKoduCom={this.state.gonderenKoduCom}
                          kDamageCompensationStore={this.props.kDamageCompensationStore}
                        />
                      ) : (2
                        ''
                      )}

                      {this.state.settazminmusteriAlici ? (
                        <AliciCariSelect
                          aliciCariCom={this.state.aliciCariCom}
                          aliciCariKoduCom={this.state.aliciKoduCom}
                          kDamageCompensationStore={this.props.kDamageCompensationStore}
                        />
                      ) : (
                        ''
                      )} */}

                      {this.state.settazminmusteriFarkli ? <FarkliCari 
                       kDamageCompensationStore={this.props.kDamageCompensationStore}   /> : ''}

                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.Odeme_Musteri_Tipi}
                        name="Odeme_Musteri_Tipi"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>
                            {L('CustomerPayableType')}
                          </label>
                        }
                      >
                        <Select
                          className="formInput"
                          placeholder={L('PleaseSelect')}
                          allowClear
                          onChange={OnChangeOdemeMusteriTipi}
                        >
                          <Option value="1">{L('Individual')}</Option>
                          <Option value="2">{L('Institutional')}</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={[
                          { required: this.state.vknInput, message: L('MissingInputEmpty') },
                          {
                            pattern: /^\d*\.?\d{11,11}$/,
                            message: L('MissingInputTc'),
                          },
                          { pattern: /^(?:\d*)$/, message:L('MissingNumber') },
                        ]}
                        name="TCK_NO"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('IdentityNo')}</label>}
                      >
                        <Input
                          className="formInput"
                          disabled={this.state.tckInput}
                          maxLength={11}
             
                          placeholder={L('IdentityNo')}
                          
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={[
                          { required: this.state.tckInput, message:L('MissingInputEmpty')},
                          {
                            pattern: /^\d*\.?\d{10,10}$/,
                            message:L('MissingInputVkno'),
                          },
                          { pattern: /^(?:\d*)$/, message:L('MissingNumber')  },
                        ]}
                        name="VK_NO"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>{L('TaxNo')}</label>
                        }
                      >
                        <Input
                          className="formInput"
                          maxLength={11}
                          disabled={this.state.vknInput}
                          placeholder={L('TaxNo') }
                          
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.Odeme_Birimi_Bolge}
                        name="Odeme_Birimi_Bolge"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>{L('PaymentUnitBranchs')}</label>
                        }
                      >
                        <Select
                          className="formInput"
                          placeholder={L('PleaseSelect')}
                          allowClear
                          onDropdownVisibleChange={onDropdownVisibleChangeBolge}
                        >
                          {this.state.bolgeList}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={[
                          { required: true, message:L('MissingInputEmpty') },
                          {
                            pattern: /^\$?([0-9]{1,1},([0-9]{1,1},)*[0-9]{1,1}|[0-9]+)(.[0-9][0-9])?$/,
                            message: L('MissingNumber'),
                          },
                        ]}
                        name="Talep_Edilen_Tutar"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>
                            {L('RequestedAmount')}
                          </label>
                        }
                      >
                        <Input className="formInput" placeholder={L('AmountRequestedExcludingVAT')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.Surec_Sahibi_Birim_Bolge}
                        name="Surec_Sahibi_Birim_Bolge"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>
                            {L('ProcessOwnerRegion')}
                          </label>
                        }
                      >
                        <Select
                          className="formInput"
                          placeholder={L('PleaseSelect')}
                          allowClear
                          onDropdownVisibleChange={onDropdownVisibleChangeSurecSahibiBolge}
                        >
                          {this.state.SurecSahibibolgeList}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="Telefon"
                        rules={[
                          { required: false, message:L('MissingInputEmpty') },
                          {
                            pattern: /^[\d]{10,11}$/,
                            message: L('MissingInputPhone'),
                          },
                          { pattern: /^(?:\d*)$/, message: L('MissingInputCurrency') },
                        ]}
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>{L('InformationSms')}</label>
                        }
                      >
                        <Input className="formInput" placeholder={L('InformationSms')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="Email"
                        rules={[
                          { required: false, message:L('MissingInputEmpty') },
                          { type: 'email', message: L('MissingInputEmail') },
                        ]}
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>
                           {L('InformationEmail')}
                          </label>
                        }
                      >
                        <Input className="formInput" placeholder={L('InformationEmail')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider orientation="left">{L('CompensationFiles')}</Divider>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="FileTazminDilekcesi"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>{L('File')}</label>
                        }
                      >
                        <FileBase64 multiple={false} onDone={getFileTazminDilekcesi.bind(this)} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{ float: 'right' }}>
                    <Col span={12}>
                      <Space style={{ width: '100%' }}>
                        <Button
                          type="primary"
                          onClick={this.kDamageCompensationCreate}
                          icon={<SendOutlined />}
                          disabled={this.state.btnkaydet}
                          htmlType="submit"
                        >
                          {L('Save')}
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Form>
              </TabPane>

              <TabPane
                disabled={this.state.DegTab}
                tab={
                  <span>
                    <SwitcherOutlined />
                    {L('DamageCompensationEvalution')}
                  </span>
                }
                key="2"
              >
                <Form ref={this.formRefDeg} layout="horizontal">
                  <Row>
                    <Col span={7}>
                      <Form.Item
                        name="evaTazmin_Tipi"
                        label={<label style={{ maxWidth: 155, minWidth: 155 }}>{L('CompensationType')}</label>}
                        rules={[{ required: true, message:L('MissingInputEmpty') }]}
                      >
                        <Select
                          className="formInput"
                          placeholder={L('PleaseSelect')}
                          allowClear
                          showSearch
                          onChange={DegOnchangeTazminTipi}
                        >
                          <Option value="1">{L('Damage')}</Option>
                          <Option value="2">{L('Loss')}</Option>
                          <Option value="3">{L('LateDelivery')}</Option>
                          <Option value="4">{L('CustomerSatisfaction')}</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={7}>
                      <Form.Item
                        name="evaTazmin_Nedeni"
                        rules={[{ required: true, message:L('MissingInputEmpty') }]}
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>{L('CompensationReason')}</label>
                        }
                      >                   
                            <Select className="formInput" placeholder={L('PleaseSelect')}  >                              
                            {this.props.kDamageCompensationStore.getEnumCompensationWhy !== undefined &&
                                      this.props.kDamageCompensationStore.getEnumCompensationWhy.map((item) => (
                                        <Option key={`position_${item.id}`} value={item.name}>
                                          {item.name}
                                        </Option>
                                      ))}
                            </Select>
            
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={7}>
                      <Form.Item
                        name="evaKargo_Bulundugu_Yer"
                        rules={[{ required: true, message:L('MissingInputEmpty') }]}
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>
                            {L('LocationOfCargo')}
                          </label>
                        }
                      >
                        <Select className="formInput" placeholder={L('PleaseSelect')} allowClear showSearch>                       
                        {Object.keys(CargoLocations).map(value  =>(
                          <Option key={value} value={value}>
                            {value}
                          </Option>
                        ))}                                
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={7}>
                      <Form.Item
                        name="evaKusurlu_Birim"
                        rules={[{ required: true, message:L('MissingInputEmpty') }]}
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>
                            {L('IsThereDefectiveUnit')}
                          </label>
                        }
                      >
                        <Select className="formInput" placeholder={L('PleaseSelect')} allowClear showSearch>
                          <Option value="1">{L('Yes')}</Option>
                          <Option value="2">{L('No')}</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={7}>
                      <Form.Item
                        name="evaIcerik_Grubu"
                        rules={[{ required: true, message:L('MissingInputEmpty') }]}
                        label={<label style={{ maxWidth: 155, minWidth: 155 }}>{L('ContentesGruop')}</label>}
                      >
                        <Select className="formInput" placeholder={L('PleaseSelect')} allowClear showSearch>
                          <Option value="E-Ticaret">E-Ticaret</Option>
                          <Option value="Teknoloji">Teknoloji</Option>
                          <Option value="Basın">Basın</Option>
                          <Option value="Diğer">Diğer</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={7}>
                      <Form.Item
                        name="evaIcerik"
                        rules={[{ required: true, message:L('MissingInputEmpty') }]}
                        label={<label style={{ maxWidth: 155, minWidth: 155 }}>{L('Contentes')}</label>}
                      >
                        <Input placeholder={L('Contentes')}  />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={7}>
                      <Form.Item
                        name="evaUrun_Aciklama"
                        rules={[{ required: true, message:L('MissingInputEmpty') }]}
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>{L('ProductDescription')}</label>
                        }
                      >
                        <Input className="formInput" placeholder={L('ProductDescription')} />
                      </Form.Item>
                    </Col>

                    <Col span={7}>
                      <Form.Item
                        name="evaEkleyen_Kullanici"
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>{L('AddedUser')}</label>
                        }
                      >
                        <Input disabled defaultValue={'Admin'} className="formInput" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={13}>
                      <Form.Item
                        name="evaBolge_Aciklama"
                        rules={[{ required: false, message:L('MissingInputEmpty') }]}
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>{L('AreaDescription')}</label>
                        }
                      >
                        <TextArea rows={4} style={{ width: '100%' }}></TextArea>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={13}>
                      <Form.Item
                        name="evaGm_Aciklama"
                        rules={[{ required: false, message:L('MissingInputEmpty') }]}
                        label={<label style={{ maxWidth: 155, minWidth: 155 }}>{L('GMDescription')}</label>}
                      >
                        <TextArea rows={4} style={{ width: '100%' }}></TextArea>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={7}>
                      <Form.Item
                        name="evaTalep_Edilen_Tutar"
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>{L('RequestedAmount')}</label>
                        }
                      >
                        {console.log(this.state.talepedilentutar)}
                        <Input
                          defaultValue={this.state.talepedilentutar}
                          disabled
                          className="formInput"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={7}>
                      <Form.Item
                        name="evaTazmin_Odeme_Durumu"
                        rules={[{ required: true, message:L('MissingInputEmpty') }]}
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>
                            {L('CompensationPaymentStatus')}
                          </label>
                        }
                      >
                        <Select
                          className="formInput"
                          placeholder={L('PleaseSelect')}
                          allowClear
                          showSearch
                          onChange={tazminodemedurumu}
                        >
                          <Option value="1">{L('Payable')}</Option>
                          <Option value="2">{L('Ödenmicek')}</Option>
                          <Option value="3">
                           {L('ADifferentAmountWillBePaid')}
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  {this.state.odenecekTutar ? (
                    ''
                  ) : (
                    <Row>
                      <Col span={7}>
                        <Form.Item
                          name="evaOdenecek_Tutar"
                          rules={[
                            { required: false, message: L('MissingInputEmpty') },
                            {
                              pattern: /^\$?([0-9]{1,1},([0-9]{1,1},)*[0-9]{1,1}|[0-9]+)(.[0-9][0-9])?$/,
                              message:L('MissingNumber'),
                            },
                          ]}
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>{L('AmountPaid')}</label>
                          }
                        >
                          <Input className="formInput" disabled={this.state.odenecekTutar}></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                  )}

                  <Row style={{ float: 'right' }}>
                    <Col span={12}>
                      <Space style={{ width: '100%' }}>
                        <Button
                          type="primary"
                          icon={<SendOutlined />}
                          disabled={this.state.onayaGonderBtn}
                          onClick={this.kDamageCompensationEvalutaionCreate}
                          htmlType="submit"
                        >
                          Onaya Gönder
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Form>
              </TabPane>

              <TabPane
                disabled={this.state.TarihTab}
                tab={
                  <span>
                    <SwitcherOutlined />
                    {L('History')}
                  </span>
                }
                key="3"
              >
                <DamageHistory kDamageCompensationStore={this.props.kDamageCompensationStore} 
                 listdata={this.state.listDataHistroy} />
              </TabPane>
            </Tabs>
       
          </Card>
        </React.Fragment>
      </>
    );
  }
}

export default DamageCompensation;
