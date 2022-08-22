import { AlertOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Col, Form, FormInstance, Input, Modal, notification, Radio, Row, Select, Spin, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { L } from '../../../../lib/abpUtility';
import KDamageCompensationStore from '../../../../stores/kDamageCompensationStore';
import Stores from '../../../../stores/storeIdentifier';

import { KcariFind } from '../../../../services/kDamageCompensations/dto/kcariFind';


export interface ICProps {
  differentCariObJ: (string) => void;
  kDamageCompensationStore: KDamageCompensationStore;
}

export interface IState {
  modalVisible: boolean;
  ilobjId: number;
  ilceAdi: string;
  adresbul: any;
  sahistuzel: number;
  lbltcVk: string;
  lbleValidation: string;
  patternTcVk: any;
  inputTcVk: boolean,
  data: KcariFind[];
  fetchingKcari: boolean;
  fetchingIl: boolean;
  fetchingIlce: boolean;
  fetchingAdress: boolean;
  fetchingTuru:Number;
  selectCariId:Number;

}

const { Option } = Select;
const TabPane = Tabs.TabPane;


@inject(Stores.KDamageCompensationStore)

@observer
class DifferentCari extends React.Component<ICProps, IState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: true,
    ilobjId: 0,
    ilceAdi: '',
    adresbul: [] as any,
    sahistuzel: 2,
    lbltcVk: L('IdentityNo'),
    lbleValidation: L('MissingInputTc'),
    patternTcVk: /^\d*\.?\d{11,11}$/,
    inputTcVk: false,
    data: this.props.kDamageCompensationStore.getKcariFind,
    fetchingKcari: true,
    fetchingIl: true,
    fetchingIlce: true,
    fetchingAdress: true,
    fetchingTuru:2,
    selectCariId:0
  };




  onCreate = () => {

    const form = this.formRef.current;
    form!.validateFields().then(async (values: any) => {  
    
        var  resultData = await this.props.kDamageCompensationStore.getKcariFind.filter(x => x.objId === this.state.selectCariId);
      
     if(resultData ===  null && resultData ===undefined){     
      notification.open({
        icon: <AlertOutlined style={{ color: 'red' }} />,
        message: 'Uyari',
        description: 'Cari secimi yapilamadi. Lutfen tekrar cari seciniz',
      });



     }

      values.unvan=resultData[0].unvan;
      values.ili_Id=resultData[0].ili;
      values.ilce_Id=resultData[0].ilcesi;
      values.adresBul=resultData[0].adres;
      values.mahalle=resultData[0].mahallesi;
      values.cadde=resultData[0].sokagi;
      values.sokak=resultData[0].sokagi;
      values.binaNo=resultData[0].binaNo;
      values.binaAdi=resultData[0].binaAdi;
      values.blok=resultData[0].blok;
      values.daire=resultData[0].daire;
      values.telefon=resultData[0].cepTel;
      values.uyruk='Turkiye'
      values.sahisTuzel=resultData[0].turu;
      values.objId=resultData[0].objId;
      values.kodu='000000000'
             
      await this.props.kDamageCompensationStore.StoreOpsCurrent(values)
      
      this.props.differentCariObJ(resultData[0].objId.toString())
      // differentCariObJ = resultData[0].objId.toString();
      this.setState({ modalVisible: false });

      notification.open({
        icon: <CheckCircleTwoTone style={{ color: 'green' }} />,
        message: 'Bilgilendirme',
        description: 'Cari Kart Kaydedildi',
      });



    }).catch((err) => console.log('CreateError : ', err));

  }
  


  getcountry = async () => {
    try {
      await this.props.kDamageCompensationStore.StoreGetCountryAll(); 
    } catch (error) {
      console.log('Error=>', error)
    }
  }



  getCity = async () => {
    try {
      await this.props.kDamageCompensationStore.StoreGetCityAll();
    } catch (error) {
      console.log('Error=>', error)
    }
  }


  handonChange = async (values) => {
    try {
      await this.props.kDamageCompensationStore.StoreGetDistrictById(values);
      this.setState({ ilobjId: values })
    } catch (error) {
      console.log('Error=>', error)
    }
  }


  handonChangeDistrincty = async (values) => {
    console.log('values=>', values)
    this.setState({ ilceAdi: values })
  }


  handOnKeyUp = async (values) => {

    // districtId:number ,districtName:string,myp_adi:string
    if (values.length > 5) {
      try {
        await this.props.kDamageCompensationStore.StoreGetByFindAddress(this.state.ilobjId, this.state.ilceAdi, values);

        this.setState({ adresbul: this.props.kDamageCompensationStore.getStreet })

      } catch (error) {
        console.log('Error=>', error)
      }


    }
  }


  handOnChangeRadio = (values) => {
    
    if (values.target.value === 1) {
      this.setState({ sahistuzel: 1 })
      this.setState({ lbltcVk: L('TaxNo') })
      this.setState({ lbleValidation: L('MissingInputVkno') })
      this.setState({ patternTcVk: /^\d*\.?\d{11,11}$/ })

    } else if(values.target.value === 2) {
      this.setState({ sahistuzel: 2 })
      this.setState({ lbltcVk: L('IdentityNo') })
      this.setState({ lbleValidation: L('MissingInputTc') })
      this.setState({ patternTcVk: /^\d*\.?\d{10,10}$/ })
    }
    else{
      this.setState({ sahistuzel: 2 })
      this.setState({ lbltcVk: L('IdentityNo') })
      this.setState({ lbleValidation: L('MissingInputTc') })
      this.setState({ patternTcVk: /^\d*\.?\d{10,10}$/ })
    }

  }


  handOnChangeRadioSetForm = (values) => {
    
    if (values === 1) {
      this.setState({ sahistuzel: 1 })
      this.setState({ lbltcVk: L('TaxNo') })
      this.setState({ lbleValidation: L('MissingInputVkno') })
      this.setState({ patternTcVk: /^\d*\.?\d{11,11}$/ })
      this.setState({ fetchingTuru :1})

    } else if(values === 2) {
      this.setState({ sahistuzel: 2 })
      this.setState({ lbltcVk: L('IdentityNo') })
      this.setState({ lbleValidation: L('MissingInputTc') })
      this.setState({ patternTcVk: /^\d*\.?\d{10,10}$/ })
      this.setState({ fetchingTuru :2})
    }
    else{
      this.setState({ sahistuzel: 2 })
      this.setState({ lbltcVk: L('IdentityNo') })
      this.setState({ lbleValidation: L('MissingInputTc') })
      this.setState({ patternTcVk: /^\d*\.?\d{10,10}$/ })
      this.setState({ fetchingTuru :2})
    }

  }


  handOnchangeNationality = (e) => {
    if (e != 1) {
      this.setState({ inputTcVk: true })
    } else {
      this.setState({ inputTcVk: false })
    }

  }

  //#region cari listeleme

  OnSearchCari = async (value) => {

    if (value) {
      if (value.length > 4) {
        await this.props.kDamageCompensationStore.StoreGetKcariFind(value,1);
        this.setState({ data: this.props.kDamageCompensationStore.getKcariFind })
      }
    }
    //console.log('test=>',this.state.data)
  }


  //#endregion

  //#region Cari secme
  OnSelectCari = (id) => {
     
     var resultData = this.props.kDamageCompensationStore.getKcariFind.filter(x => x.objId === id);

        this.setState({selectCariId :id})
          setTimeout(() => {  
            this.setState({fetchingTuru : resultData[0].turu})           
            this.formRef.current?.setFieldsValue({ ...resultData[0] });
        }, 100); 
        
     this.handOnChangeRadioSetForm(this.state.fetchingTuru)
  }
  //#endregion


  render() {

    const optionsCariList = this.state.data !== undefined && this.state.data.map(d => <Option key={'c' + d.objId + ''} value={d.objId} >{d.unvan}</Option>);


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



    return (
      <>
        <Modal
          width={'80%'}
          visible={this.state.modalVisible}
          cancelText={L('GiveUp')}
          okText={L('Save')}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            //this.formRef.current?.resetFields();
          }}
          onOk={this.onCreate}
          title={L('Farkli Cari Form')}
          destroyOnClose={true}
        >
          <Form ref={this.formRef}>
            <Tabs defaultActiveKey={'1'} size={'large'}>
              <TabPane tab={L('CariInfoCard')} key={'1'}>
                <Row>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 24, offset: 0 }}
                    md={{ span: 12, offset: 0 }}
                    lg={{ span: 10, offset: 2 }}
                    xl={{ span: 10, offset: 2 }}
                    xxl={{ span: 10, offset: 2 }}
                  >
                    <Form.Item label={L('CariTitle')} {...formItemLayout} name={'unvan'}
                      rules={[
                        { required: true, message: L('MissingInputEmpty') },
                      ]}
                    >
                      <Select

                        showSearch
                        placeholder={L('PleaseSelect')}
                        notFoundContent={this.state.fetchingKcari ? <Spin size="small" /> : null}
                        onSearch={this.OnSearchCari}
                        showArrow={true}
                        filterOption={false}
                        defaultActiveFirstOption={false}
                        onSelect={this.OnSelectCari}
                      >

                        {optionsCariList}
                        {/* {this.state.data !== undefined &&
                          this.state.data.map((item) => (
                            <Option key={`il_${item.objId}`} value={item.objId}>
                              {item.unvan}
                            </Option>
                          ))} */}
                      </Select>
                    </Form.Item>

                    <Form.Item label={L('City')}  {...formItemLayout} name={'ili'}
                      rules={[
                        { required: true, message: L('MissingInputEmpty') },
                      ]}>
                      <Select
                        placeholder={L('PleaseSelect')}
                        onClick={this.getCity}
                        onChange={this.handonChange}
                        notFoundContent={this.state.fetchingIl ? <Spin size="small" /> : null}
                        allowClear>
                        {this.props.kDamageCompensationStore.getAllCity !== undefined &&
                          this.props.kDamageCompensationStore.getAllCity.map((item) => (
                            <Option key={`il_${item.objId}`} value={item.objId}>
                              {item.adi}
                            </Option>
                          ))}

                      </Select>
                    </Form.Item>
                    <Form.Item label={L('District')} {...formItemLayout} name={'ilcesi'}
                      rules={[
                        { required: true, message: L('MissingInputEmpty') },
                      ]}>
                      <Select
                        placeholder={L('PleaseSelect')}
                        onChange={this.handonChangeDistrincty}
                        notFoundContent={this.state.fetchingIlce ? <Spin size="small" /> : null}
                        allowClear>
                        {this.props.kDamageCompensationStore.getDistrictByIdList !== undefined &&
                          this.props.kDamageCompensationStore.getDistrictByIdList.map((item) => (
                            <Option key={`ilce_${item.objId}`} value={item.adi}>
                              {item.adi}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label={L('FindAddress')}  {...formItemLayout} name={'adres'}
                      rules={[
                        { required: true, message: L('MissingInputEmpty') },
                      ]}>
                      <Select
                        placeholder={L('PleaseSelect')}
                        onSearch={this.handOnKeyUp}
                        notFoundContent={this.state.fetchingAdress ? <Spin size="small" /> : null}
                        showSearch
                        allowClear>

                        {this.state.adresbul !== undefined &&
                          this.state.adresbul.map((item) => (
                            <Option key={`adresbul_${item.mahalle_id}`} value={item.sonuc}>
                              {item.sonuc}
                            </Option>
                          ))}

                      </Select>
                    </Form.Item>

                    <Form.Item label={L('Neighborhood')}  {...formItemLayout} name={'mahallesi'} hidden >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label={L('Street')}  {...formItemLayout} name={'cadde'}
                      rules={[
                        { required: true, message: L('MissingInputEmpty') },
                      ]}>
                      <Input />
                    </Form.Item>

                    <Form.Item label={L('StreetTwo')}  {...formItemLayout} name={'sokagi'}
                      rules={[
                        { required: true, message: L('MissingInputEmpty') },
                      ]}>
                      <Input />
                    </Form.Item>

                    <Form.Item label={L('BuildingNumber')}  {...formItemLayout} name={'binaNo'}
                      rules={[
                        { required: false, message: L('MissingInputEmpty') },
                      ]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label={L('BuildingName')}  {...formItemLayout} name={'binaAdi'} rules={[
                      { required: false, message: L('MissingInputEmpty') },
                    ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label={L('Block')}  {...formItemLayout} name={'blok'} rules={[
                      { required: false, message: L('MissingInputEmpty') },
                    ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label={L('Circle')}  {...formItemLayout} name={'daire'} rules={[
                      { required: false, message: L('MissingInputEmpty') },
                    ]}
                    >
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


                    <Form.Item label={this.state.lbltcVk}    {...formItemLayout} name={'tCVergiNo'}
                      rules={
                        [
                          { required: true, message: L('MissingInputEmpty') },
                          {
                            pattern: this.state.patternTcVk,
                            message: this.state.lbleValidation,
                          },
                          { pattern: /^(?:\d*)$/, message: L('MissingNumber') },
                        ]
                      }

                    >
                      <Input disabled={this.state.inputTcVk} maxLength={11} />
                    </Form.Item>


                    <Form.Item

                      label={L('Telephone')} {...formItemLayout} name={'cepTel'}
                      rules={[
                        { required: true, message: L('MissingInputEmpty') },
                        {
                          pattern: /^[\d]{10,11}$/,
                          message: L('MissingInputPhone'),
                        },
                        { pattern: /^(?:\d*)$/, message: L('MissingNumber') },
                      ]}

                    >
                      <Input maxLength={13} />
                    </Form.Item>

                    <Form.Item label={L('Nationality')} {...formItemLayout} name={'uyruk'}>
                      <Select placeholder={L('PleaseSelect')} onClick={this.getcountry} onChange={this.handOnchangeNationality} allowClear>
                        {this.props.kDamageCompensationStore.getCountry !== undefined &&
                          this.props.kDamageCompensationStore.getCountry.map((item) => (
                            <Option key={`Na_${item.objId}`} value={item.objId}>
                              {item.adi}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>


                    <Form.Item
                      label={L('IndividualPerson')}
                      {...tailFormItemLayout}
                      name={'turu'}
                      rules={[
                        { required: true, message: L('MissingInputEmpty') },
                      ]} > 
                      <Radio.Group  value={this.state.fetchingTuru} 
                      onChange={this.handOnChangeRadio}  > 
                        <Radio value={1}>{L('Individuall')}</Radio>
                        <Radio value={2}>{L('Person')}</Radio>
                      </Radio.Group>
                    </Form.Item>


                  </Col>
                </Row>
              </TabPane>

            </Tabs>
          </Form>
        </Modal>

      </>);
  }
}



export default DifferentCari