import React from 'react'; 
import './index.less';
import AppComponentBase from '../../../components/AppComponentBase';
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
  Radio,
  Row,
  Select,
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
import { AlertOutlined, CheckCircleTwoTone, SendOutlined, SwitcherOutlined } from '@ant-design/icons';
import KDamageCompensationStore from '../../../stores/kDamageCompensationStore';
import TextArea from 'rc-textarea';
import 'moment/locale/tr';
import DamageHistory from './components/damageHistory'


 



export interface IProps {
  kDamageCompensationStore: KDamageCompensationStore;

}

export interface IState {
  urlid:number;
  tazminStatu:string;
  takipNo:string;
  tazminMusteriTipi:string;
  loading:boolean;
  selectedItems: any;
  odenecekTutar:boolean;
  evaTalepEdilenTutar:string;
  aktiveTab:string;
  onayaGonderBtn:boolean;
  listDataHistroy:any;
  talepedilentuatarState:any;
}
 const { confirm } = Modal;
@inject(Stores.KDamageCompensationStore)
@observer
class DamageCompensation extends AppComponentBase<IProps, IState> {

  formRef = React.createRef<FormInstance>();
  formRefDeg = React.createRef<FormInstance>();
  
  state = {
  urlid:0,
  tazminStatu:'',
  takipNo:'',
  tazminMusteriTipi:'',
  loading:false,
  selectedItems: [],
  odenecekTutar:true,
  evaTalepEdilenTutar:'',
  aktiveTab:'2',
  onayaGonderBtn:false,
  listDataHistroy:[] as any,
  talepedilentuatarState:0,
  };


  //gelen url idden sayfayı yükleme
  getdamagePage = async (id: number) => {

    this.props.kDamageCompensationStore.StoregetDamageComppensationViewById({ id: id }) 
     setTimeout(() => {  
      this.setState({tazminStatu:this.props.kDamageCompensationStore.damageCompensationViewClass.tazminStatu})
      this.setState({takipNo:this.props.kDamageCompensationStore.damageCompensationViewClass.takipNo})
      this.setState({tazminMusteriTipi:this.props.kDamageCompensationStore.damageCompensationViewClass.tazmin_Musteri_Tipi})
      this.setState({evaTalepEdilenTutar:this.props.kDamageCompensationStore.damageCompensationViewClass.talep_Edilen_Tutar})   
      //this.setState({tazminMusteriTipi:'AliciCari'})
      this.formRef.current?.setFieldsValue({               
            ...this.props.kDamageCompensationStore.damageCompensationViewClass,
      }); 
      this.setState({loading:false})
    }, 500)  
  };


  //gelen url idden Eva sayfayı yükleme
  getdamagePageEva = async (id: number) => {
   await this.props.kDamageCompensationStore.StoregetDamageComppensationEvaViewById({ id: id })    
      setTimeout(() => {     
          

        if(this.props.kDamageCompensationStore.damageCompensationViewClass!=undefined ){       
          if(this.props.kDamageCompensationStore.damageCompensationViewClass.evaOdenecek_Tutar ==="0")
          {
            this.setState({evaTalepEdilenTutar:this.props.kDamageCompensationStore.damageCompensationViewClass.evaTalep_Edilen_Tutar})    
          }
          else {
            this.setState({evaTalepEdilenTutar:this.props.kDamageCompensationStore.damageCompensationViewClass.evaOdenecek_Tutar})    
          }
        }else{
          this.getdamagePage(this.props['match'].params['id'])          
        }     
       this.setState({loading:false})
     }, 1000)


  };


async componentDidMount() {
   this.getdamagePageEva(this.props['match'].params['id'])

}




// Tanzim  Değerlendirm için  Oluşturma Metoduf
kDamageCompensationEvalutaionCreate = () => {

    const form = this.formRefDeg.current;
    form!.validateFields().then(async (values: any) => {     
      
      values.evaTalep_Edilen_Tutar=this.state.evaTalepEdilenTutar
      values.evaEkleyen_Kullanici='Admin'
      values.tazminId=this.props['match'].params['id']
      
       if(values.evaTazmin_Odeme_Durumu ==="Farklı Bir Tutar Ödenecek"){
        values.evaOdenecek_Tutar=values.evaOdenecek_Tutar.replace(',','.')
       }
     

      confirm({
              icon: <CheckCircleTwoTone />,
              content: 'Değerlendirme Onaya Gönderilsin mi?',
              okText: 'Onaya Gönder',
              cancelText:'Vazgeç',
              onOk: () => {
                this.props.kDamageCompensationStore.createDamageCompensationEvalutaion(values) 
                 this.setState({aktiveTab:'3'})
                 this.setState({onayaGonderBtn:true})
              },
              onCancel() { console.log(L('Cancel')); },
          })


    });
  };




  //Tazmin Formu Onaylama
 DamageCompensationApproval=()=>{

      confirm({
        icon: <CheckCircleTwoTone />,
        content: 'Onaylama işlemi ile form değerlendirme süreci tamamlanacaktır. Devam etmek istiyor musunuz?',
        okText: L('Save'),
        cancelText:L('GiveUp'),
        onOk: () => {
          this.props.kDamageCompensationStore.StoregetpostCompensationApproval(this.props['match'].params['id']) 
          this.setState({onayaGonderBtn:false})

        },
        onCancel() { console.log(L('Cancel')); },
    })

 }





  public render() {
   
    const { TabPane } = Tabs
    const { Option } = Select;



    const oncahangeTab=(value)=>{

       this.setState({aktiveTab:''+value+''})
       if(value ==="1"){    
       this.setState({loading:true})  
       this.getdamagePage(this.props['match'].params['id'])
       }
    }



    
     /// tazmin odeme durumu 
     const tazminodemedurumu=(value)=>{
      
        if(value==='Ödenecek'){
         this.setState({odenecekTutar :true})
        }
        else if(value==='Ödenmicek')
        {
         this.setState({odenecekTutar :true})
        }else if(value ==='Farklı Bir Tutar Ödenecek')
        {
           this.setState({odenecekTutar :false})
        }else{
         this.setState({odenecekTutar :true})
        }
 
 
      }
 

    
    const Deghasar = ['Taşımadan Kaynaklı', 'İstif Hatası', 'Kaza', 'Teslimat Esnasında Tespit-DTT Var','Teslimattan Sonra-DTT','Aracın Su Alması','Banttan Düşme',
  'Farklı Kargonun Zarar Vermesi','Ambalaj Yetersizliği','Doğal Afet','Müşteri Memnuniyeti'];

   const DegKayıp=['Adres Teslim Sırasında Kayıp','Aktarma-Aktarma Arasında','Faturası Düzenlenmeden Kayıp','Gasp','İçten Eksilme','Kaza','Şube Kayıp','Birim-Aktarma Arasında Kayıp','Teslim Belgesi Sunulamaması','Yanlış Kişiye Teslimat','Müşteri Memnuniyeti']
   
   const DegGecTeslimat=['Geç Teslim']

   const DegMusteriMemnuniyeti=['Müşteri Memnuniyeti']

   const DegOnchangeTazminTipi=(value)=>{
    
    if(value==="Hasar"){    
      this.setState({ selectedItems:Deghasar.map((value, index) =>
        <Option key={index} value={value}> {value} </Option>
      ) });
    }
    else if(value ==="Kayıp")
    {
      this.setState({ selectedItems:DegKayıp.map((value, index) =>
        <Option key={index} value={value}> {value} </Option>
      ) });
      
    }
    else if(value ==="Geç Teslimat"){
      this.setState({ selectedItems:DegGecTeslimat.map((value, index) =>
        <Option key={index} value={value}> {value} </Option>
      ) });

    }
    else if(value ==="Müşteri Memnuniyeti"){
      this.setState({ selectedItems:DegMusteriMemnuniyeti.map((value, index) =>
        <Option key={index} value={value}> {value} </Option>
      ) });
    }
    else(
      notification.open({
        icon: <AlertOutlined style={{ color: 'red' }} />,
        message: 'Uyarı',
        description: 'Lütfen Tazmin Tipi Seçiniz.',
      })
    )

   }




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
                  <Breadcrumb.Item>Hasar Tazmin Değerlendirme </Breadcrumb.Item>
                </Breadcrumb>
              }
            ></PageHeader>
          </Card>

          <Card>
            <Tabs
              defaultActiveKey="2"           
              tabBarGutter={50}
              tabPosition="top"
              size="large"
              onChange={oncahangeTab}
              activeKey={this.state.aktiveTab}
        
            >
              <TabPane
                tab={
                  <span>
                    <SwitcherOutlined />
                    Tanzim Bilgileri
                  </span>
                }
                key="1"
              >
                <Row>
                  <Col span={24}>
                    <Form>

                      <Row>
                          <Col >
                                <Form.Item                                    
                                      name="TazminNoDisable"
                                      label={
                                        <label style={{ maxWidth: 150, minWidth: 150 }}>Tazmin No</label>
                                      } 
                                    > 
                                      <Input value={this.props['match'].params['id']}  disabled  className="formInput"   />
                               </Form.Item>
                          </Col>     

                          <Col >
                                  <Form.Item
                                          name="TazminStatuDisable"
                                          label={<label>Tanzim Statüsü</label>}
                                          labelCol={{ span: 10 }}
                                          wrapperCol={{ span: 16 }}
                                        > 
                                  <Input disabled className="formInput"   
                                   value={this.state.tazminStatu}
                                  ></Input>
                                </Form.Item>
                          </Col>  
                      </Row>
                    </Form>
                  </Col>
                </Row>

                <Divider orientation="left">Sorgulama</Divider>

                <Row>
                  <Col span={24}>
                    <Form>

                      <Row>
                          <Col>
                          <Form.Item        
                                     
                                      name="kargotakipNoRadio"
                                      label={
                                        <label style={{ maxWidth: 150, minWidth: 150 }}>Kargo Takip No</label>
                                      }
                                    >
                                         <Radio.Group  disabled  defaultValue={1} >
                                            <Radio value={1}>Biliniyor</Radio>
                                            {/* <Radio value={2}>Bilinmiyor</Radio> */}
                                        </Radio.Group>
                               </Form.Item>
                          </Col>     
                             
                      </Row>
                          
                        <Row>
                        <Col offset={2}>
                                  <Form.Item 
                                    rules={
                                      [                                                       
                                        { pattern: /^(?:\d*)$/, message: 'Sadece sayısal değerler girilebilir' }
                                      ]
                                    }               
                                   name="ktno" > 
                                  <Input disabled
                                  className='formInput'
                                  value={this.state.takipNo}
                                   placeholder='Kargo Takip Numarası'  
                                  ></Input>
                                </Form.Item>
                          </Col>  




                          <Col style={{marginLeft:25}} >
                                <Form.Item name='getirbutton'>

                                  <Button  disabled style={{width:139}}  type="primary" >
                                    Getir
                                  </Button>
                                </Form.Item>
                          </Col>          
                        </Row>   


                    </Form>
                  </Col>
                </Row>




                <Divider orientation="left">Gönderi Bilgileri</Divider>

                <Form
                  ref={this.formRef}
                  initialValues={{ remember: false }}
                  autoComplete="off" >
                  <Row>
                    <Col span={12}>
                      <Form.Item hidden name='takipNo'>
                        <Input />
                      </Form.Item>
                      <Form.Item
             
                        rules={rules.sistem_InsertTime}
                        name="sistem_InsertTime"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>
                            Evrak Oluşturma Tarihi
                          </label>
                        }>
                       

                         
                         
                        <Input                     
                          className="formInput"      
                          disabled
                          placeholder='Evrak Oluşturma Tarihi'
                        
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                    <Form.Item
                         
                          name="evrakSeriNo"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>Evrak Seri Sıra No</label>
                          }>
                          <Input
                             disabled                           
                            className="formInput"
                            placeholder="Evrak Seri Sıra No"
                           
                          />
                        </Form.Item>

                    </Col>
                  
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                      
                        name="gonderenKodu"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>Gönderici Kodu</label>
                        }
                      >
                    
                         <Input  disabled   className="formInput"  placeholder='Gönderici Kodu' />

                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="gonderenUnvan"
                 
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>Gönderici</label>}
                      >
                        <Input disabled className="formInput" placeholder="Gönderici"

                    

                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        
                        name="aliciKodu"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>Alıcı Kodu</label>}
                      >
                        
                        <Input  placeholder='Alıcı Kodu'  disabled   className="formInput"  />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="aliciUnvan"
                      
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>Alıcı</label>}
                      >
                        <Input
                          disabled
                          className="formInput"
                          placeholder="Alici"
                       
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                      
                        name="cikis_Sube_Unvan"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>Çıkış Şube Adı</label>
                        }
                      >
                        

                         <Input placeholder='Çıkış Şube Adı' className='formInput' disabled />
                      </Form.Item>




                      <Form.Item hidden name="ilkGondericiSube_ObjId"> </Form.Item>





                    </Col>
                    <Col span={12}>
                      <Form.Item hidden name="varisSube_ObjId"> </Form.Item>
                      <Form.Item
                        rules={rules.varis_Sube_Unvan}
                        name="varis_Sube_Unvan"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>Varış Şube Adı</label>
                        }
                      >
                        

                        <Input placeholder='Varış Şube Adı'  className='formInput' disabled />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item hidden name="birimi_ObjId"> </Form.Item>
                      <Form.Item
                        rules={rules.birimi}
                        name="birimi"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>Kargo Tipi</label>}
                      >
                       

                        <Input placeholder='Kargo Tipi' className='formInput' disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.adet}
                        name="adet"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>Parça Adedi</label>}
                      >
                        <Input
                          disabled
                          className="formInput"
                          type="number"
                          min={1}
                          max={1000}
                          placeholder="Parça Adedi"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider orientation="left">Tazmin Bilgileri</Divider>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.Tazmin_Talep_Tarihi}
                        name="tazmin_Talep_Tarihi"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>
                            Tazmin Talep Tarihi
                          </label>
                        }
                      >
                      

                      <Input
                          disabled
                          className="formInput"                        
                          placeholder="Tarih Seçiniz"
                        />

                       

                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item 
                        rules={rules.Tazmin_Tipi}
                        name="tazmin_Tipi"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>Tazmin Tipi</label>}
                      >
                        {/* <Select className="formInput"  placeholder="Seçiniz" allowClear>
                          <Option value="1">Hasar</Option>
                          <Option value="2">Kayıp</Option>
                          <Option value="3" >Geç Teslimat</Option>
                          <Option value="4">Müşteri Memnuniyeti</Option>
                        </Select> */}

                        <Input disabled  className="formInput"  placeholder="Seçiniz"  />


                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item 
                        rules={rules.Tazmin_Musteri_Tipi}
                        name="tazmin_Musteri_Tipi"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>Tazmin Müşterisi</label>
                        }
                      > 
                        <Radio.Group
                          disabled
                          value={this.state.tazminMusteriTipi}
                        >
                          <Radio value='GonderenCari'>Gönderen Cari</Radio>
                          <Radio value='AliciCari'>Alıcı Cari</Radio>
                          <Radio value='Farkli'>Farklı Cari</Radio>
                        </Radio.Group>
                      </Form.Item>

                      {/* {this.state.settazminmusteriGonderici ? <GonderenCariSelect
                         gonderenCariCom={this.state.gonderenCariCom} 
                         gonderenKoduCom={this.state.gonderenKoduCom}
                        kDamageCompensationStore={this.props.kDamageCompensationStore} /> : ''}


                      {this.state.settazminmusteriAlici ? <AliciCariSelect 
                      
                       aliciCariCom={this.state.aliciCariCom} 
                       aliciCariKoduCom={this.state.aliciKoduCom}
                      kDamageCompensationStore={this.props.kDamageCompensationStore} /> : ''}


                      {this.state.settazminmusteriFarkli ? <FarkliCari   /> : ''} */}
                    </Col>
                    <Col span={12}>
                      <Form.Item 
                        rules={rules.Odeme_Musteri_Tipi}
                        name="odeme_Musteri_Tipi"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>
                            Ödenecek Müşteri Tipi
                          </label>
                        }
                      >
                       
                        <Input  disabled  className="formInput"  placeholder="Seçiniz"  />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        
                        name="tcK_NO"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>TC Kimlik No</label>}
                      >
                        <Input  disabled className="formInput"  maxLength={11}  placeholder="TC Kimlik No" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                       
                        name="vK_NO"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>Vergi Kimlik No</label>
                        }
                      >
                          
                        <Input disabled  className="formInput"  maxLength={11}    placeholder="Vergi Kimlik No" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={rules.Odeme_Birimi_Bolge}
                        name="odeme_Birimi_Bolge"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>Ödeme Birimi/Bölge</label>
                        }
                      >
                      

                        <Input  disabled  className="formInput"  placeholder="Seçiniz"  />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                       
                    
                        name="talep_Edilen_Tutar"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>Talep Edilen Tutar </label>
                        }
                      >
                        <Input
                          disabled
                          className="formInput"
                          placeholder="Talep Edilen Tutar KDV Hariç"
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
                            Süreç Sahibi Birim/Bölge
                          </label>
                        }
                      >
                           <Input   disabled className="formInput"  placeholder="Seçiniz"  />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="telefon"
                       
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>Bilgilendirme(SMS)</label>
                        }
                      >
                        <Input disabled className="formInput" placeholder="Cep Telefonu" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>
                            Bilgilendirme(Email)
                          </label>
                        }
                      >
                        <Input disabled className="formInput" placeholder="Email" />
                      </Form.Item>
                    </Col>
                  </Row>

                

                  <Row style={{ float: 'right' }}>
                    <Col span={12}>
                      <Space style={{ width: '100%' }}>
                        <Button type="primary"  icon={<SendOutlined />} disabled htmlType="submit">
                         Kaydet                     
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
                    Değerlendirme
                  </span>
                }
                key="2">
                  
              <Form 
              ref={this.formRefDeg}
               layout='horizontal'>
                    <Row>

                        <Col span={7}>
                            <Form.Item 
                           rules={
                            [
                              { required: true, message: 'Lütfen Boş Bırakmayınız!' }
                            ]
                          }
                            name='evaTazmin_Tipi'  label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Tazmin Tipi</label>
                        } >
                                   

                                <Select 
                                  className="formInput"
                                  placeholder="Seçiniz"
                                  allowClear                                  
                                  onChange={DegOnchangeTazminTipi}
                                >
                                      <Option value="Hasar">Hasar</Option>
                                      <Option value="Kayıp">Kayıp</Option>
                                      <Option value="Geç Teslimat" >Geç Teslimat</Option>
                                      <Option value="Müşteri Memnuniyeti">Müşteri Memnuniyeti</Option>
                                </Select>



                          </Form.Item>
                        </Col>


                        <Col span={7}>
                              <Form.Item name='evaTazmin_Nedeni' 
                               rules={
                                [
                                  { required: true, message: 'Lütfen Boş Bırakmayınız!' }
                                ]
                              }
                              label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Tazmin Nedeni</label>
                        }>
                                     <Select
                                           className="formInput"
                                        placeholder="Seçiniz"
                                        allowClear
                                          
                                      >
                                            {this.state.selectedItems}
                                      </Select>
                                </Form.Item>

                        </Col>
                    
                    </Row>


                    <Row>
                       <Col span={7}>
                         <Form.Item name='evaKargo_Bulundugu_Yer' 
                         rules={
                          [
                            { required: true, message: 'Lütfen Boş Bırakmayınız!' }
                          ]
                        }
                         label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Kargonun Bulunduğu Yer</label>
                        }>
                                   <Select
                                           className="formInput"
                                        placeholder="Seçiniz"
                                        allowClear
                                          
                                      >
                                               <Option value="Çıkış Birim">Çıkış Birim</Option>
                                               <Option value="Çıkış Aktarma">Çıkış Aktarma</Option>
                                               <Option value="Varış Aktarma">Varış Aktarma</Option>
                                               <Option value="Varış Birim">Varış Birim</Option>
                                               <Option value="Gönderici Müsteri">Gönderici Müsteri</Option>
                                               <Option value="Alıcı Müşteri">Alıcı Müşteri</Option>
                                               <Option value="Diğer">Diğer</Option>
                                               <Option value="İmha">İmha</Option>

                                      </Select>
                         </Form.Item>
                       </Col>

                       <Col span={7}>
                         <Form.Item 
                         rules={
                            [
                              { required: true, message: 'Lütfen Boş Bırakmayınız!' }
                            ]
                          }
                         name='evaKusurlu_Birim'                     
                         label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Kusurlu Birim Var mı?</label>
                        }>
                                 <Select
                                           className="formInput"
                                        placeholder="Seçiniz"
                                        allowClear
                                          
                                      >
                                               <Option value="Evet">Evet</Option>
                                               <Option value="Hayır">Hayır</Option>
                                              
                                      </Select>
                         </Form.Item>
                       </Col>




                    </Row>



                    <Row>
                       <Col span={7}>
                         <Form.Item
                         rules={
                            [
                              { required: true, message: 'Lütfen Boş Bırakmayınız!' }
                            ]
                          }
                         name='evaIcerik_Grubu'                          
                         label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>İçerik Grubu</label>
                        }>
                                  <Select
                                           className="formInput"
                                        placeholder="Seçiniz"
                                        allowClear
                                          
                                      >
                                       <Option value="E-Ticaret">E-Ticaret</Option>
                                       <Option value="Teknoloji">Teknoloji</Option>
                                       <Option value="Basın">Basın</Option>
                                       <Option value="Diğer">Diğer</Option>
                                           

                                      </Select>
                         </Form.Item>
                       </Col>

                       <Col span={7}>
                         <Form.Item 
                         rules={
                            [
                              { required: true, message: 'Lütfen Boş Bırakmayınız!' }
                            ]
                          }
                         name='evaIcerik' 
                         label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>İçerik</label>
                        }>
                                
                                <Input className='formInput'  />
                         </Form.Item>
                       </Col>

                    </Row>    


                    <Row>
                       <Col span={7}>
                         <Form.Item
                         rules={
                            [
                              { required: true, message: 'Lütfen Boş Bırakmayınız!' }
                            ]
                          }
                         name='evaUrun_Aciklama'    label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Ürün Açıklaması</label>
                        }>
                                <Input className='formInput'  />
                         </Form.Item>
                       </Col>

                       <Col span={7}>
                         <Form.Item name='evaEkleyen_Kullanici' label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Ekleyen Kullancı</label>
                        }>
                                   <Input className='formInput' disabled defaultValue='Admin' />
                         </Form.Item>
                       </Col>
                    </Row>   
                    <Row>
                        <Col span={13}>
                          <Form.Item 
                          rules={
                            [
                              { required: true, message: 'Lütfen Boş Bırakmayınız!' }
                            ]
                          }
                          name='evaBolge_Aciklama'  
                          label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Bölge Açıklama</label>
                        }>

                           <TextArea  rows={4} style={{width:'100%'}} ></TextArea>
                          </Form.Item>
                        </Col>
                    </Row> 

                    <Row>
                        <Col span={13}>
                          <Form.Item
                          rules={
                            [
                              { required: true, message: 'Lütfen Boş Bırakmayınız!' }
                            ]
                          }
                          name='evaGm_Aciklama' 
                          label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Gm Açıklama</label>
                        }>

                           <TextArea  rows={4} style={{width:'100%'}} ></TextArea>
                          </Form.Item>
                        </Col>
                    </Row> 

                    <Row>
                        <Col span={7}>
                        <Form.Item name='evaTalep_Edilen_Tutar' 
    
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Talep Edilen Tutar</label>
                        }> 
                          <Input  className="formInput" disabled value={this.state.evaTalepEdilenTutar}
                          ></Input>
                        </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={7}>
                        <Form.Item name='evaTazmin_Odeme_Durumu' 
                        rules={
                          [
                            { required: true, message: 'Lütfen Boş Bırakmayınız!' }
                          ]
                        }
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Tazmin Ödeme Durumu</label>
                        }>
                            <Select
                                        className="formInput"
                                        placeholder="Seçiniz"
                                        allowClear
                                        onChange={tazminodemedurumu}
                                      >
                                                <Option value="Ödenecek">Ödenecek</Option>
                                               <Option value="Ödenmicek">Ödenmicek</Option>
                                               <Option value="Farklı Bir Tutar Ödenecek">Farklı Bir Tutar Ödenecek</Option>                                           
                                      </Select>
                        </Form.Item>
                        </Col>
                    </Row>

                    {this.state.odenecekTutar ? '' :
                       <Row>
                       <Col span={7}>
                       <Form.Item name='evaOdenecek_Tutar' 
                       rules={
                         [
                           { required: false, message: 'Lütfen Boş Bırakmayınız!' },
                           { pattern: /^\$?([0-9]{1,1},([0-9]{1,1},)*[0-9]{1,1}|[0-9]+)(.[0-9][0-9])?$/, message: 'Sadece parasal değerler girilebilir' }
                         ]
                       }
                       label={
                         <label style={{ maxWidth: 155, minWidth: 155 }}>Ödenecek Tutar</label>
                       }>
                         <Input  className="formInput"  disabled={this.state.odenecekTutar}  ></Input>
                       </Form.Item>
                       </Col>
                   </Row>}

                    <Row style={{ float: 'right' }}>
                    <Col span={12}>
                      <Space style={{ width: '100%' }}>



                      { isGranted("items.damagecompensation.approval.btn") ? 
                                (<Button type="primary"  icon={<SendOutlined />} disabled={this.state.onayaGonderBtn}  onClick={this.kDamageCompensationEvalutaionCreate}   htmlType="submit">
                                {L('items.damagecompensation.approval.btn')}
                                {/* Onaya Gönder */}
                              </Button>) : '' 
                        
                        }

                      
                         { isGranted("items.damagecompensation.approvalsend.btnO") ? 
                                (<Button type="primary"  icon={<SendOutlined />} disabled={this.state.onayaGonderBtn}  onClick={this.DamageCompensationApproval}   >
                               {L('items.damagecompensation.approvalsend.btn')}   
                               {/* Onaylama */}
                              </Button>) : '' 
                        
                        }
                           
                        


                      </Space>
                    </Col>
                  </Row>
              </Form>
              </TabPane>
              <TabPane tab={
                <span>
                  <SwitcherOutlined />
                  Tarihçe
                </span>
              } key="3">
                  <DamageHistory  kDamageCompensationStore={this.props.kDamageCompensationStore} listdata={this.state.listDataHistroy}/>
              </TabPane>
            </Tabs>
          </Card>
          </Spin>

        </React.Fragment>
      </>
    );
  }
}

export default DamageCompensation;
