import { CheckCircleTwoTone } from '@ant-design/icons';
import { Col, Form, FormInstance, Input, Modal, notification, Radio, Row, Select, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { L } from '../../../../lib/abpUtility';
import KDamageCompensationStore from '../../../../stores/kDamageCompensationStore';
import Stores from '../../../../stores/storeIdentifier';


export interface ICProps {
  kDamageCompensationStore: KDamageCompensationStore;
}

export interface IState {

}

const { Option } = Select;
const TabPane = Tabs.TabPane;
@inject(Stores.KDamageCompensationStore)

@observer
class FarkliCari extends React.Component<ICProps, IState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: true,
    ilobjId: 0,
    ilceAdi: '',
    adresbul:[] as any,
    sahistuzel:2,
    lbltcVk:L('IdentityNo'),
    lbleValidation:L('MissingInputTc'),
    patternTcVk:/^\d*\.?\d{11,11}$/,
    inputTcVk:false
  };


  onCreate = () => {

    const form = this.formRef.current;
    form!.validateFields().then(async (values: any) => {
      await this.props.kDamageCompensationStore.StoreOpsCurrent(values)
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
    this.setState({ ilceAdi: values })
  }


  handOnKeyUp = async (values) => {

    // districtId:number ,districtName:string,myp_adi:string
    if (values.length > 5) {
      try {
        await this.props.kDamageCompensationStore.StoreGetByFindAddress(this.state.ilobjId, this.state.ilceAdi, values);
           
        this.setState({adresbul :this.props.kDamageCompensationStore.getStreet})

      } catch (error) {
        console.log('Error=>', error)
      }


    }
  }




  handOnChangeRadio=(values)=>{
    if(values.target.value ==1){
       this.setState({sahistuzel:1})    
       this.setState({lbltcVk : L('TaxNo')})
       this.setState({lbleValidation : L('MissingInputVkno')})
       this.setState({patternTcVk : /^\d*\.?\d{11,11}$/})

    }else{
      this.setState({sahistuzel:2})
      this.setState({lbltcVk : L('IdentityNo')})
      this.setState({lbleValidation : L('MissingInputTc')})
      this.setState({patternTcVk : /^\d*\.?\d{10,10}$/})
    }
   
  }

  handOnchangeNationality=(e)=>{
    if(e!=1){
      this.setState({inputTcVk :true })
    }else{
      this.setState({inputTcVk :false })
    }

  }



  render() {

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
          title={L('CariInfoCardCreate')}
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
                      <Input />
                    </Form.Item>

                    <Form.Item label={L('City')}  {...formItemLayout} name={'ili_Id'} 
                     rules={[
                      { required: true, message: L('MissingInputEmpty') }, 
                      ]}>
                      <Select placeholder={L('PleaseSelect')} onClick={this.getCity} onChange={this.handonChange} allowClear>
                        {this.props.kDamageCompensationStore.getAllCity !== undefined &&
                          this.props.kDamageCompensationStore.getAllCity.map((item) => (
                            <Option key={`il_${item.objId}`} value={item.objId}>
                              {item.adi}
                            </Option>
                          ))}

                      </Select>
                    </Form.Item>
                    <Form.Item label={L('District')} {...formItemLayout} name={'ilce_Id'} 
                     rules={[
                      { required: true, message: L('MissingInputEmpty') }, 
                      ]}>
                      <Select placeholder={L('PleaseSelect')} onChange={this.handonChangeDistrincty} allowClear>


                        {this.props.kDamageCompensationStore.getDistrictByIdList !== undefined &&
                          this.props.kDamageCompensationStore.getDistrictByIdList.map((item) => (
                            <Option key={`ilce_${item.objId}`} value={item.adi}>
                              {item.adi}  
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label={L('FindAddress')}  {...formItemLayout} name={'adresBul'} 
                     rules={[
                      { required: true, message: L('MissingInputEmpty') }, 
                      ]}>
                      <Select placeholder={L('PleaseSelect')} onSearch={this.handOnKeyUp} showSearch allowClear>

                        {this.state.adresbul !== undefined &&
                          this.state.adresbul.map((item) => (
                            <Option key={`adresbul_${item.mahalle_id}`} value={item.sonuc}>
                              {item.sonuc}
                            </Option>
                          ))}

                      </Select>
                    </Form.Item>

                    <Form.Item label={L('Neighborhood')}  {...formItemLayout} name={'mahalle'}hidden >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label={L('Street')}  {...formItemLayout} name={'cadde'} 
                     rules={[
                      { required: true, message: L('MissingInputEmpty') }, 
                      ]}>
                      <Input />
                    </Form.Item>

                    <Form.Item label={L('StreetTwo')}  {...formItemLayout} name={'sokak'} 
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
                    <Form.Item label={L('BuildingName')}  {...formItemLayout} name={'binaAdi'}  rules={[
                      { required: false, message: L('MissingInputEmpty') }, 
                      ]}
                      >
                      <Input />
                    </Form.Item>
                    <Form.Item label={L('Block')}  {...formItemLayout} name={'blok'}  rules={[
                      { required: false, message: L('MissingInputEmpty') }, 
                      ]}
                      >
                      <Input />
                    </Form.Item>
                    <Form.Item label={L('Circle')}  {...formItemLayout} name={'daire'}  rules={[
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

                    
                  <Form.Item  label={ this.state.lbltcVk  }    {...formItemLayout} name={'tckno'}                      
                    rules={                                         
                      [
                      { required: true, message: L('MissingInputEmpty') },
                      {
                        pattern: this.state.patternTcVk,
                        message: this.state.lbleValidation,
                      },
                      { pattern: /^(?:\d*)$/, message:L('MissingNumber') },
                      ]
                   }
                    
                  >
                      <Input disabled={this.state.inputTcVk}    maxLength={11} />
                    </Form.Item>


                    <Form.Item label={L('Telephone')} {...formItemLayout} name={'telefon'} 
                    rules={[
                      { required: true, message: L('MissingInputEmpty') },
                      {
                        pattern: /^[\d]{10,11}$/,
                        message: L('MissingInputPhone'),
                      },
                      { pattern: /^(?:\d*)$/, message:L('MissingNumber') },
                    ]}
                    
                    >
                      <Input maxLength={13} />
                    </Form.Item>

                    <Form.Item label={L('Nationality')} {...formItemLayout} name={'uyruk'}>
                      <Select placeholder={L('PleaseSelect')} onClick={this.getcountry} onChange={this.handOnchangeNationality}   allowClear>
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
                      name={'sahisTuzel'}
                      rules={[
                        { required: true, message: L('MissingInputEmpty') }, 
                        ]}
                    
                    >
                      <Radio.Group name="radiogroup" defaultValue={2} onChange={this.handOnChangeRadio}>
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



export default FarkliCari