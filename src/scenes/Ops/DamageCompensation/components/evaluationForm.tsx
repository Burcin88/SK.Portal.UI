/*eslint-disable*/
import React from 'react';

import {
  Button,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Spin,
} from 'antd';

import '../index.less';
import { L } from '../../../../lib/abpUtility';

import KDamageCompensationStore from '../../../../stores/kDamageCompensationStore';

import CargoLocations from '../../../../services/kDamageCompensations/dto/cargoLocations';

import TextArea from 'antd/lib/input/TextArea';

import { GetEnumCompensationWhy } from '../../../../services/kDamageCompensations/dto/getEnumCompensationWyh';

import { AlertOutlined, CheckCircleTwoTone, ExclamationCircleOutlined, SendOutlined } from '@ant-design/icons';





export interface ICProps {
  kDamageCompensationStore: KDamageCompensationStore;
  urlId: number
  UserNameSurname: any;
  processOwnerRegion: string;
  filesMultitable: any;
  title: any;
}


export interface IState {
  CompensationWhyList: GetEnumCompensationWhy[];
  odenecekTutar: boolean,
  Tutar: any,
  pageLoding: boolean

}


const { confirm } = Modal;
class EvalutionForm extends React.Component<ICProps, IState>  {

  formRefEvalution = React.createRef<FormInstance>();

  state = {
    CompensationWhyList: this.props.kDamageCompensationStore.getEnumCompensationWhy,
    pageLoding: false,
    odenecekTutar: true,
    Tutar: 0,
  };

  componentDidMount = async () => {
    await this.GetTalepEdilenTutar(this.props.urlId); 
    setTimeout(() => {       
       this.GetEva(this.props.urlId);
    }, 500);

    // if (this.props.kDamageCompensationStore.damageCompensationViewClass.evaTalep_Edilen_Tutar != null) {
    //   this.setState({ Tutar: this.props.kDamageCompensationStore.damageCompensationViewClass.evaTalep_Edilen_Tutar })
    
    // }
    // else {
    //   this.setState({ Tutar: this.props.kDamageCompensationStore.damageCompensationViewClass.talep_Edilen_Tutar })
    // }
  
  }


   // son değerlendirme

   //#endregion


  //#region TALEP EDILEN TUTAR CEKME

  GetTalepEdilenTutar = async (id: number) => {
    await this.props.kDamageCompensationStore.StoregetDamageComppensationViewById({ id: id })

     
  }


  //#endregion




  //#region  DEGERLENDIRME KAYDETME
  OnclickEvalutaionCreate = () => {

    if (this.state.Tutar === null || this.state.Tutar === undefined) {
      this.ValidateMessage(true, 'Uyari', 'Tutar Bilgisi Cekilemedi')
    }
    else {
      this.formRefEvalution!.current?.validateFields().then(async (values: any) => {
        values.evaTalep_Edilen_Tutar = this.state.Tutar;
        if (values.evaTazmin_Odeme_Durumu === "3") {
          values.evaOdenecek_Tutar = values.evaOdenecek_Tutar.replace(',', '.');
        } else {
          values.evaOdenecek_Tutar = this.state.Tutar;
        }
        values.tazminId = this.props.urlId;
        values.evaEkleyen_Kullanici = this.props.UserNameSurname

        values.file = JSON.stringify(this.props.filesMultitable);
        values.surecSahibiBolge = this.props.processOwnerRegion;


        confirm({
          icon: <ExclamationCircleOutlined />,
          content: 'Tazmin Degerlendirme Yapilacaktir.',
          okText: L('Kaydet'),
          cancelText: L('Vazgec'),
          onOk: async () => {

            this.setState({ pageLoding: true })           
            // await this.props.kDamageCompensationStore.createDamageCompensationEvalutaion(values).then(() => 
            // {
            //     // UpdateDamageStatus               
            //        this.props.kDamageCompensationStore.StoreUpdateDamageStatus({
            //        tazminId:this.props.urlId,
            //        surecsahibibolge:this.props.processOwnerRegion,
            //        unvan:this.props.title,
            //        file:JSON.stringify(this.props.filesMultitable)
            //     });
            // }
            // );


            this.setState({ pageLoding: true })
            await this.props.kDamageCompensationStore.createDamageCompensationEvalutaion(values).then(() => {
              // UpdateDamageStatus               
              this.props.kDamageCompensationStore.StoreUpdateDamageStatus({
                tazminId: this.props.urlId,
                surecsahibibolge: this.props.processOwnerRegion,
                unvan: this.props.title,
                file: JSON.stringify(this.props.filesMultitable)
              });
            }
            );



            setTimeout(() => {
              window.location.href = '/hasartazminsorgulama'
            }, 5000);

          },
          onCancel: () => {
            console.log(L('Cancel'));
          },
        });
      });
    }
  }
  //#endregion




  //#region BILGILENDIRME MESAJI METOT
  ValidateMessage = async (typ: boolean, headerMsg: string, msg: string) => {

    if (typ === true) {
      notification.open({
        icon: <AlertOutlined style={{ color: 'red' }} />,
        message: L(headerMsg),
        description: L(msg),
      })
    } else {
      notification.open({
        icon: <CheckCircleTwoTone style={{ color: 'green' }} />,
        message: L(headerMsg),
        description: L(msg),
      })
    }
  }

  //#endregion



  //#region  REVIZEYE GONDER

  OnclickEvalutaionRevize=()=>{
    this.props.kDamageCompensationStore.StorePostRevize( this.props.urlId.toString());
  }
  //#endregion



//#region  EVA GETİRME
  GetEva= async(id: number)=>{
 
      await this.props.kDamageCompensationStore.StoreGetEvaById({id:id})
          
    if( this.props.kDamageCompensationStore.eva  !== null )
    {
    
            await this.props.kDamageCompensationStore.StoreGetEvaById({id:id}).then(()=>{        
              this.formRefEvalution.current?.setFieldsValue({
                ...this.props.kDamageCompensationStore.eva        
              })    

       })
  
       await this.props.kDamageCompensationStore.StoregetCompansationWhy(this.props.kDamageCompensationStore.eva.evaTazmin_Tipi);
       var tt=this.props.kDamageCompensationStore.eva.evaTazmin_Nedeni
      var tazminNedeni=  await this.props.kDamageCompensationStore.getEnumCompensationWhy.find((x)=>x.id.toString()===tt.toString())?.name
       
          
         var tutar=this.props.kDamageCompensationStore.eva.evaOdenecek_Tutar
         var farkli=this.props.kDamageCompensationStore.eva.evaTalep_Edilen_Tutar;
    
        if(tutar !== undefined || tutar !==null){
         this.setState({Tutar:tutar})
     
        }else{
          this.setState({Tutar:farkli})
          
        }
    

        this.formRefEvalution.current?.setFieldsValue({
          'evaTazmin_Nedeni':tazminNedeni
          });
      

    }
    
     
     
  }
//#endregion 

  render() {



    //#region  TAZMIN TIPI SECME 
    const OnChangeGetTazminTipi = (values) => {
      getEnumCompensationWhy(values)
    }
    //#endregion

    //#region TAZMIN NEDENI CAGIRMA 
    const getEnumCompensationWhy = async (id: string) => {

      try {
        await this.props.kDamageCompensationStore.StoregetCompansationWhy(id);
        this.setState({ CompensationWhyList: this.props.kDamageCompensationStore.getEnumCompensationWhy })
      } catch (e) {
        console.log(e);
      }
    };
    //#endregion

    //#region  ODEME DURUMU
    const OnchangeOdemeDurumu = (values) => {
      if (values === "3")
        this.setState({ odenecekTutar: false })
    }
    //#endregion


    return (
      <>

        <Spin spinning={this.state.pageLoding}
          tip='Isleminiz Tamamlaniyor.Havuza Yonlendiriliyorsunuz.'
          size='large'>

          <Divider orientation="left">{L('Degerlendirme Bilgileri')}</  Divider>

          <Form ref={this.formRefEvalution} labelCol={{ flex: '145px' }} labelAlign="right" wrapperCol={{ flex: 5 }} colon={false}>
            <Row>
              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                <Form.Item label={L('Tazmin Tipi')} name="evaTazmin_Tipi" rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                  <Select
                    placeholder={L('Lutfen Seciniz')}
                    allowClear
                    onChange={OnChangeGetTazminTipi}
                  >
                    <Select.Option value="1">{L('Hasar')}</Select.Option>
                    <Select.Option value="2">{L('Kayip')}</Select.Option>
                    <Select.Option value="3">{L('Gec Teslimat')}</Select.Option>
                    <Select.Option value="4">{L('Musteri Memnuniyeti')}</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                <Form.Item name='evaTazmin_Nedeni' label={L('Tazmin Nedeni')} rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                  <Select
                    placeholder={L('Lutfen Seciniz')}
                  >
                    {
                      this.state.CompensationWhyList !== undefined &&
                      this.state.CompensationWhyList.map((item) => (
                        <Select.Option key={'id ' + item.id + ''} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))
                    }

                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                <Form.Item label={L('Kargonun Bulungu Yer')} name="evaKargo_Bulundugu_Yer" rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                  <Select
                    placeholder={L('Lutfen Seciniz')}
                    allowClear
                  >
                    {Object.keys(CargoLocations).map(key => (
                      <option key={key} value={CargoLocations[key].id}>
                        {CargoLocations[key].name}
                      </option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                <Form.Item name='evaKusurlu_Birim' label={L('Kusurlu Birim Var Mi')} rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                  <Select
                    placeholder={L('Lutfen Seciniz')}
                    allowClear
                  >
                    <Select.Option value="1">{L('Evet')}</Select.Option>
                    <Select.Option value="2">{L('Hayir')}</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                <Form.Item label={L('Icerik Grubu')} name="evaIcerik_Grubu" rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                  <Select
                    placeholder={L('Lutfen Seciniz')}
                    allowClear
                  >
                    <Select.Option value="E-Ticaret">E-Ticaret</Select.Option>
                    <Select.Option value="Teknoloji">Teknoloji</Select.Option>
                    <Select.Option value="Basin">Basin</Select.Option>
                    <Select.Option value="Diger">Diger</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                <Form.Item name='evaIcerik' label={L('Icerik')} rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                <Form.Item label={L('Urun Aciklama')} name="evaUrun_Aciklama" rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                <Form.Item name='evaEkleyen_Kullanici' label={L('Eklenyen Kullanici')} rules={[{ required: false, message: L('MissingInputEmpty') }]}> 
                  <Input disabled value={this.props.UserNameSurname} />

                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                <Form.Item label={L('Bolge Aciklama')} name="evaBolge_Aciklama" rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                  <TextArea rows={4} style={{ width: '100%' }}></TextArea>
                </Form.Item>
              </Col>

              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                <Form.Item name='evaGm_Aciklama' label={L('GM Aciklama')} rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                  <TextArea rows={4} style={{ width: '100%' }}></TextArea>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                <Form.Item label={L('Talep Edilen Tutar')}
                  name="evaTalep_Edilen_Tutar"
                  rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                  {console.log(this.state.Tutar)}
                  <Input
                    value={this.state.Tutar}
                    defaultValue={this.state.Tutar}
                    disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                <Form.Item label={L('Odeme Durumu')} name="evaTazmin_Odeme_Durumu" rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                  <Select
                    className="formInput"
                    placeholder={L('PleaseSelect')}
                    allowClear
                    showSearch
                    onChange={OnchangeOdemeDurumu}
                  >
                    <Select.Option value="1">{L('Odenecek')}</Select.Option>
                    <Select.Option value="2">{L('Odenmeyecek')}</Select.Option>
                    <Select.Option value="3">
                      {L('Farkli Bir Tutar Odenecek')}
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>

            </Row>

            {
              this.state.odenecekTutar ? ('') :
                (
                  <Row>
                    <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                      <Form.Item label={L('Odenecek Tutar')} name="evaOdenecek_Tutar" rules={[{ required: true, message: L('MissingInputEmpty') }
                        , {
                        pattern: /^\$?([0-9]{1,1},([0-9]{1,1},)*[0-9]{1,1}|[0-9]+)(.[0-9][0-9])?$/,
                        message: L('MissingNumber'),
                      }]}>
                        <Input />
                      </Form.Item>
                    </Col>

                  </Row>
                )
            }

            <Row style={{ float: 'right' }}>
              <Space style={{ width: '100%' }}>
                <Col xs={{ order: 12, offset: 1 }} sm={{ order: 12, offset: 1 }} md={{ order: 3, offset: 1 }} lg={{ order: 4, offset: 1 }} > 
                    <Button
                      type="primary"
                      onClick={this.OnclickEvalutaionCreate}
                      icon={<SendOutlined />}
                      htmlType="submit"
                    >
                      {L('Gonder')}
                    </Button>
                </Col>
                <Col xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 8 }} >

                  <Button
                    type="default"
                    onClick={this.OnclickEvalutaionRevize}
                    icon={<SendOutlined />}
                    htmlType="button"
                  >
                    {L('Revize')}
                  </Button>
                </Col>
              </Space>

            </Row>
          </Form>
        </Spin>
      </>);
  }
}



export default EvalutionForm
