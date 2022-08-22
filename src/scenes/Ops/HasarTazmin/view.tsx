import React from 'react';
import './index.less';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  PageHeader,
  Radio,
  Row,
  Space,
  Spin,
  Tabs,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import rules from './HasarTazmin.validation';
import { Link } from 'react-router-dom';
import { isGranted, L } from '../../../lib/abpUtility';
// import GonderenCariSelect from './components/GonderenCariSelect';
// import AliciCariSelect from './components/AliciCariSelect';
// import FarkliCari from './components/FarkliCari';
// import EditableTagGroup from './components/LinkTag';
import Stores from '../../../stores/storeIdentifier';
import { SendOutlined, SwitcherOutlined } from '@ant-design/icons';
import KDamageCompensationStore from '../../../stores/kDamageCompensationStore';
import TextArea from 'rc-textarea';
import 'moment/locale/tr';
import DamageHistory from './components/damageHistory';
import AppComponentBase from '../../../components/AppComponentBase';

export interface IProps {
  kDamageCompensationStore: KDamageCompensationStore;
}

export interface IState {
  urlid: number;
  tazminStatu: string;
  takipNo: string;
  tazminMusteriTipi: string;
  loading: boolean;
  evaTalepEdilenTutar: string;
  listDataHistroy:any;
}

@inject(Stores.KDamageCompensationStore)
@observer
class DamageCompensationView extends AppComponentBase<IProps, IState> {
  formRef = React.createRef<FormInstance>();
  formRefDeg = React.createRef<FormInstance>();

  state = {
    urlid: 0,
    tazminStatu: '',
    takipNo: '',
    tazminMusteriTipi: '',
    loading: true,
    evaTalepEdilenTutar: '',
    listDataHistroy:[] as any
  };

  //gelen url idden sayfayı yükleme
  getdamagePage = async (id: number) => {
    this.props.kDamageCompensationStore.StoregetDamageComppensationViewById({ id: id });

    setTimeout(() => {
      this.setState({
        tazminStatu: this.props.kDamageCompensationStore.damageCompensationViewClass.tazminStatu,
      });
      this.setState({
        takipNo: this.props.kDamageCompensationStore.damageCompensationViewClass.takipNo,
      });
      this.setState({
        tazminMusteriTipi: this.props.kDamageCompensationStore.damageCompensationViewClass
          .tazmin_Musteri_Tipi,
      });
      //this.setState({tazminMusteriTipi:'AliciCari'})
      this.formRef.current?.setFieldsValue({
        ...this.props.kDamageCompensationStore.damageCompensationViewClass,
      });

      this.setState({ loading: false });
    }, 1000);
  };

  //gelen url idden Eva sayfayı yükleme
  getdamagePageEva = async (id: number) => {

    await this.props.kDamageCompensationStore.StoregetDamageComppensationEvaViewById({ id: id });
   
    if(this.props.kDamageCompensationStore.damageCompensationViewClass !=undefined)
     {
          setTimeout(() => {
            if (
              this.props.kDamageCompensationStore.damageCompensationViewClass.evaOdenecek_Tutar == '0'
            ) {
              this.setState({
                evaTalepEdilenTutar: this.props.kDamageCompensationStore.damageCompensationViewClass
                  .evaTalep_Edilen_Tutar,
              });
            } else {
              this.setState({
                evaTalepEdilenTutar: this.props.kDamageCompensationStore.damageCompensationViewClass
                  .evaOdenecek_Tutar,
              });
            }

            this.formRefDeg.current?.setFieldsValue({
              ...this.props.kDamageCompensationStore.damageCompensationViewClass,
            });
            this.setState({ loading: false });
          }, 500);
    }else{
      this.setState({ loading: false });
    }
  };


 //gelen url idden histrouy sayfayı yükleme
 getdamagePagehistroy = async (id: number) => {
  await this.props.kDamageCompensationStore.StoregetCompansationHistroy(id);
    this.setState({listDataHistroy:this.props.kDamageCompensationStore.gethistroy})
};



  async componentDidMount() {
    this.getdamagePage(this.props['match'].params['id']);
    this.getdamagePagehistroy(this.props['match'].params['id'])
  }

  public render() {
    const { TabPane } = Tabs;
    const oncahangeTab = (value) => {
      if (value == '2') {
        this.setState({ loading: true });
        this.getdamagePageEva(this.props['match'].params['id']);
      }
    };

    return (
      <>
        <React.Fragment>
          <Spin spinning={this.state.loading}>
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
                    <Breadcrumb.Item> {L('DamageCompensation')} </Breadcrumb.Item>
                    <Breadcrumb.Item>{L('DamageCompensationForm')}</Breadcrumb.Item>
                  </Breadcrumb>
                }
              ></PageHeader>
            </Card>

            <Card>
              <Tabs
                defaultActiveKey="1"
                tabBarGutter={50}
                // type="card"
                tabPosition="top"
                size="large"
                onChange={oncahangeTab}
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
                          <Col>
                            <Form.Item
                              name="TazminNoDisable"
                              label={
                                <label style={{ maxWidth: 150, minWidth: 150 }}>{L('CompensationNumber')}</label>
                              }
                            > 
                              <Input
                                value={this.props['match'].params['id']}
                                disabled
                                className="formInput"
                              />
                            </Form.Item>
                          </Col>

                          <Col>
                            <Form.Item
                              name="TazminStatuDisable"
                              label={<label style={{ maxWidth: 150, minWidth: 150 }} >{L('CompensationStatus')}</label>}
                              labelCol={{ span: 12 }}
                              wrapperCol={{ span: 16 }}
                            >
                              {console.log(this.state.tazminStatu)}
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
                                <label style={{ maxWidth: 150, minWidth: 150 }}>
                                  {L('CargoTrackingNumber')}
                                </label>
                              }
                            >
                              <Radio.Group disabled defaultValue={1}>
                                <Radio value={1}>Biliniyor</Radio>
                                {/* <Radio value={2}>Bilinmiyor</Radio> */}
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row>
                          <Col offset={2}>
                            <Form.Item
                              
                              name="ktno"
                            > 
                              <Input
                                disabled
                                className="formInput"
                                value={this.state.takipNo}
                               
                              ></Input>
                            </Form.Item>
                          </Col>

                          <Col style={{ marginLeft: 25 }}>
                            <Form.Item name="getirbutton">
                              <Button disabled style={{ width: 139 }} type="primary">
                                {L('Bring')}
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>

                  <Divider orientation="left">{L('ShipmentInformation')}</Divider>

                  <Form ref={this.formRef} initialValues={{ remember: false }} autoComplete="off">
                    <Row>
                      <Col span={12}>
                        <Form.Item hidden name="takipNo">
                          <Input />
                        </Form.Item>
                        <Form.Item
                         
                          name="sistem_InsertTime"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>
                              {L('DocumentationHistory')}
                            </label>
                          }
                        >
                          <Input
                            className="formInput"
                            disabled
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          name="evrakSeriNo"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>
                              {L('DocumentationSerialNumber')}
                            </label>
                          }
                        >
                          <Input disabled className="formInput" placeholder="Evrak Seri Sıra No" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          name="gonderenKodu"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>{L('SenderCode')}</label>
                          }
                        >
                          <Input disabled className="formInput"  />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="gonderenUnvan"
                          label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('SenderTitle')}</label>}
                        >
                          <Input disabled className="formInput" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          name="aliciKodu"
                          label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('BuyerCode')}</label>}
                        >
                          <Input placeholder="Alıcı Kodu" disabled className="formInput" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="aliciUnvan"
                          label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('BuyerTitle')}</label>}
                        >
                          <Input disabled className="formInput"  />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                          name="cikis_Sube_Unvan"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>{L('ExitBranchName')}</label>
                          }
                        >
                          <Input className="formInput" disabled />
                        </Form.Item>

                        <Form.Item hidden name="ilkGondericiSube_ObjId">
                    
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item hidden name="varisSube_ObjId">
                        
                        </Form.Item>
                        <Form.Item
                          
                          name="varis_Sube_Unvan"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>{L('ArrivalBranchName')}</label>
                          }
                        >
                          <Input className="formInput" disabled />
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
                          <Input  className="formInput" disabled />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          rules={rules.adet}
                          name="adet"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>{L('PiecesQuantity')}</label>
                          }
                        >
                          <Input
                            disabled
                            className="formInput"
                            type="number"
                            min={1}
                            max={1000}
                            
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Divider orientation="left">{L('CompensationInformation')}</Divider>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                    
                          name="tazmin_Talep_Tarihi"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>
                              {L('CompensationRequestDate')}
                            </label>
                          }
                        >
                          <Input disabled className="formInput"  />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="tazmin_Tipi"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>{L('CompensationType')}</label>
                          }
                        >
                          <Input disabled className="formInput"  />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                          name="tazmin_Musteri_Tipi"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>{L('CompensationCustomer')}</label>
                          }
                        > 
                          <Radio.Group disabled value={this.state.tazminMusteriTipi}>
                            <Radio value="GonderenCari">{L('SenderCustomer')}</Radio>
                            <Radio value="AliciCari">{L('BuyerCustomer')}</Radio>
                            <Radio value="Farkli">{L('DifferentCustomer')}</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                        
                          name="odeme_Musteri_Tipi"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>
                              {L('CustomerPayableType')}
                            </label>
                          }
                        >
                          <Input disabled className="formInput"  />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                          name="tcK_NO"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>{L('IdentityNo')}</label>
                          }
                        >
                          <Input
                            disabled
                            className="formInput"
                            maxLength={11}
                            
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="vK_NO"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>{L('TaxNo')}</label>
                          }
                        >
                          <Input
                            disabled
                            className="formInput"
                            maxLength={11}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                    
                          name="odeme_Birimi_Bolge"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>
                             {L('PaymentUnitBranchs')}
                            </label>
                          }
                        >
                          <Input disabled className="formInput"  />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="talep_Edilen_Tutar"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>
                              {L('RequestedAmount')}
                            </label>
                          }
                        >
                          <Input
                            disabled
                            className="formInput"
                          
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                          rules={rules.Surec_Sahibi_Birim_Bolge}
                          name="surec_Sahibi_Birim_Bolge"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>
                              {L('ProcessOwnerRegion')}
                            </label>
                          }
                        >
                          <Input disabled className="formInput" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                          name="telefon"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>
                              {L('InformationSms')}
                            </label>
                          }
                        >
                          <Input disabled className="formInput" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                          name="email"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>
                              {L('InformationEmail')}
                            </label>
                          }
                        >
                          <Input disabled className="formInput"  />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row style={{ float: 'right' }}>
                      <Col span={12}>
                        <Space style={{ width: '100%' }}>
                          <Button type="primary" icon={<SendOutlined />} disabled htmlType="submit">
                            {L('Save')}
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                    
                  </Form>

                </TabPane>

                <TabPane
                  tab={
                    <span>
                      <SwitcherOutlined />
                      {L('Evalution')}
                    </span>
                  }
                  key="2"
                >
                  <Form ref={this.formRefDeg} layout="horizontal">
                    <Row>
                      <Col span={7}>
                        <Form.Item
                          name="evaTazmin_Tipi"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>Tazmin Tipi</label>
                          }
                        >
                          <Input className="formInput" disabled />
                        </Form.Item>
                      </Col>

                      <Col span={7}>
                        <Form.Item
                          name="evaTazmin_Nedeni"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>{L('CompensationType')}</label>
                          }
                        >
                          <Input className="formInput" disabled />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={7}>
                        <Form.Item
                          name="evaKargo_Bulundugu_Yer"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>
                              {L('LocationOfCargo')}
                            </label>
                          }
                        >
                          <Input className="formInput" disabled />
                        </Form.Item>
                      </Col>

                      <Col span={7}>
                        <Form.Item
                          name="evaKusurlu_Birim"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>
                             {L('IsThereDefectiveUnit')}
                            </label>
                          }
                        >
                          <Input className="formInput" disabled />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={7}>
                        <Form.Item
                          name="evaIcerik_Grubu"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>{L('ContentesGruop')}</label>
                          }
                        >
                          <Input className="formInput" disabled />
                        </Form.Item>
                      </Col>

                      <Col span={7}>
                        <Form.Item
                          name="evaIcerik"
                          label={<label style={{ maxWidth: 155, minWidth: 155 }}>{L('Contentes')}</label>}
                        >
                          <Input disabled className="formInput" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={7}>
                        <Form.Item
                          name="evaUrun_Aciklama"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>{L('ProductDescription')}</label>
                          }
                        >
                          <Input className="formInput" disabled />
                        </Form.Item>
                      </Col>

                      <Col span={7}>
                        <Form.Item
                          name="evaEkleyen_Kullanici"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>{L('AddedUser')}</label>
                          }
                        >
                          <Input className="formInput" disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={13}>
                        <Form.Item
                          name="evaBolge_Aciklama"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>{L('AreaDescription')}</label>
                          }
                        >
                          <TextArea disabled rows={4} style={{ width: '100%' }}></TextArea>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={13}>
                        <Form.Item
                          name="evaGm_Aciklama"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>{L('GMDescription')}</label>
                          }
                        >
                          <TextArea disabled rows={4} style={{ width: '100%' }}></TextArea>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={7}>
                        <Form.Item
                          name="evaOdenecek_Tutar"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>
                              {L('RequestedAmount')}
                            </label>
                          }
                        > 
                          <Input
                            className="formInput"
                            value={this.state.evaTalepEdilenTutar}
                            disabled
                          ></Input>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={7}>
                        <Form.Item
                          name="evaTazmin_Odeme_Durumu"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>
                              {L('CompensationPaymentStatus')}
                            </label>
                          }
                        >
                          <Input className="formInput" disabled />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={7}>
                        <Form.Item
                          name="evaOdenecek_Tutar"
                          label={
                            <label style={{ maxWidth: 155, minWidth: 155 }}>{L('AmountPaid')}</label>
                          }
                        >
                          <Input className="formInput" disabled />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row style={{ float: 'right' }}>
                      <Col span={12}>
                        <Space style={{ width: '100%' }}>
                          <Button type="primary" icon={<SendOutlined />} disabled htmlType="submit">
                            {L('ApprovalSend')}
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>

                <TabPane
                  tab={
                    <span>
                      <SwitcherOutlined />
                      {L('History')}
                    </span>
                  }
                  key="3"
                >
                  <DamageHistory 
                  kDamageCompensationStore={this.props.kDamageCompensationStore}  
                  listdata={this.state.listDataHistroy} 
                  />
                </TabPane>
              </Tabs>
            </Card>
          </Spin>
        </React.Fragment>
      </>
    );
  }
}

export default DamageCompensationView;
