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


  //gelen url idden sayfay?? y??kleme
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


  //gelen url idden Eva sayfay?? y??kleme
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




// Tanzim  De??erlendirm i??in  Olu??turma Metoduf
kDamageCompensationEvalutaionCreate = () => {

    const form = this.formRefDeg.current;
    form!.validateFields().then(async (values: any) => {     
      
      values.evaTalep_Edilen_Tutar=this.state.evaTalepEdilenTutar
      values.evaEkleyen_Kullanici='Admin'
      values.tazminId=this.props['match'].params['id']
      
       if(values.evaTazmin_Odeme_Durumu ==="Farkl?? Bir Tutar ??denecek"){
        values.evaOdenecek_Tutar=values.evaOdenecek_Tutar.replace(',','.')
       }
     

      confirm({
              icon: <CheckCircleTwoTone />,
              content: 'De??erlendirme Onaya G??nderilsin mi?',
              okText: 'Onaya G??nder',
              cancelText:'Vazge??',
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
        content: 'Onaylama i??lemi ile form de??erlendirme s??reci tamamlanacakt??r. Devam etmek istiyor musunuz?',
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
      
        if(value==='??denecek'){
         this.setState({odenecekTutar :true})
        }
        else if(value==='??denmicek')
        {
         this.setState({odenecekTutar :true})
        }else if(value ==='Farkl?? Bir Tutar ??denecek')
        {
           this.setState({odenecekTutar :false})
        }else{
         this.setState({odenecekTutar :true})
        }
 
 
      }
 

    
    const Deghasar = ['Ta????madan Kaynakl??', '??stif Hatas??', 'Kaza', 'Teslimat Esnas??nda Tespit-DTT Var','Teslimattan Sonra-DTT','Arac??n Su Almas??','Banttan D????me',
  'Farkl?? Kargonun Zarar Vermesi','Ambalaj Yetersizli??i','Do??al Afet','M????teri Memnuniyeti'];

   const DegKay??p=['Adres Teslim S??ras??nda Kay??p','Aktarma-Aktarma Aras??nda','Faturas?? D??zenlenmeden Kay??p','Gasp','????ten Eksilme','Kaza','??ube Kay??p','Birim-Aktarma Aras??nda Kay??p','Teslim Belgesi Sunulamamas??','Yanl???? Ki??iye Teslimat','M????teri Memnuniyeti']
   
   const DegGecTeslimat=['Ge?? Teslim']

   const DegMusteriMemnuniyeti=['M????teri Memnuniyeti']

   const DegOnchangeTazminTipi=(value)=>{
    
    if(value==="Hasar"){    
      this.setState({ selectedItems:Deghasar.map((value, index) =>
        <Option key={index} value={value}> {value} </Option>
      ) });
    }
    else if(value ==="Kay??p")
    {
      this.setState({ selectedItems:DegKay??p.map((value, index) =>
        <Option key={index} value={value}> {value} </Option>
      ) });
      
    }
    else if(value ==="Ge?? Teslimat"){
      this.setState({ selectedItems:DegGecTeslimat.map((value, index) =>
        <Option key={index} value={value}> {value} </Option>
      ) });

    }
    else if(value ==="M????teri Memnuniyeti"){
      this.setState({ selectedItems:DegMusteriMemnuniyeti.map((value, index) =>
        <Option key={index} value={value}> {value} </Option>
      ) });
    }
    else(
      notification.open({
        icon: <AlertOutlined style={{ color: 'red' }} />,
        message: 'Uyar??',
        description: 'L??tfen Tazmin Tipi Se??iniz.',
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
                  <Breadcrumb.Item>Hasar Tazmin De??erlendirme </Breadcrumb.Item>
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
                                          label={<label>Tanzim Stat??s??</label>}
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
                                        { pattern: /^(?:\d*)$/, message: 'Sadece say??sal de??erler girilebilir' }
                                      ]
                                    }               
                                   name="ktno" > 
                                  <Input disabled
                                  className='formInput'
                                  value={this.state.takipNo}
                                   placeholder='Kargo Takip Numaras??'  
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




                <Divider orientation="left">G??nderi Bilgileri</Divider>

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
                            Evrak Olu??turma Tarihi
                          </label>
                        }>
                       

                         
                         
                        <Input                     
                          className="formInput"      
                          disabled
                          placeholder='Evrak Olu??turma Tarihi'
                        
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                    <Form.Item
                         
                          name="evrakSeriNo"
                          label={
                            <label style={{ maxWidth: 150, minWidth: 150 }}>Evrak Seri S??ra No</label>
                          }>
                          <Input
                             disabled                           
                            className="formInput"
                            placeholder="Evrak Seri S??ra No"
                           
                          />
                        </Form.Item>

                    </Col>
                  
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                      
                        name="gonderenKodu"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>G??nderici Kodu</label>
                        }
                      >
                    
                         <Input  disabled   className="formInput"  placeholder='G??nderici Kodu' />

                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="gonderenUnvan"
                 
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>G??nderici</label>}
                      >
                        <Input disabled className="formInput" placeholder="G??nderici"

                    

                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        
                        name="aliciKodu"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>Al??c?? Kodu</label>}
                      >
                        
                        <Input  placeholder='Al??c?? Kodu'  disabled   className="formInput"  />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="aliciUnvan"
                      
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>Al??c??</label>}
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
                          <label style={{ maxWidth: 150, minWidth: 150 }}>????k???? ??ube Ad??</label>
                        }
                      >
                        

                         <Input placeholder='????k???? ??ube Ad??' className='formInput' disabled />
                      </Form.Item>




                      <Form.Item hidden name="ilkGondericiSube_ObjId"> </Form.Item>





                    </Col>
                    <Col span={12}>
                      <Form.Item hidden name="varisSube_ObjId"> </Form.Item>
                      <Form.Item
                        rules={rules.varis_Sube_Unvan}
                        name="varis_Sube_Unvan"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>Var???? ??ube Ad??</label>
                        }
                      >
                        

                        <Input placeholder='Var???? ??ube Ad??'  className='formInput' disabled />
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
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>Par??a Adedi</label>}
                      >
                        <Input
                          disabled
                          className="formInput"
                          type="number"
                          min={1}
                          max={1000}
                          placeholder="Par??a Adedi"
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
                          placeholder="Tarih Se??iniz"
                        />

                       

                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item 
                        rules={rules.Tazmin_Tipi}
                        name="tazmin_Tipi"
                        label={<label style={{ maxWidth: 150, minWidth: 150 }}>Tazmin Tipi</label>}
                      >
                        {/* <Select className="formInput"  placeholder="Se??iniz" allowClear>
                          <Option value="1">Hasar</Option>
                          <Option value="2">Kay??p</Option>
                          <Option value="3" >Ge?? Teslimat</Option>
                          <Option value="4">M????teri Memnuniyeti</Option>
                        </Select> */}

                        <Input disabled  className="formInput"  placeholder="Se??iniz"  />


                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item 
                        rules={rules.Tazmin_Musteri_Tipi}
                        name="tazmin_Musteri_Tipi"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150 }}>Tazmin M????terisi</label>
                        }
                      > 
                        <Radio.Group
                          disabled
                          value={this.state.tazminMusteriTipi}
                        >
                          <Radio value='GonderenCari'>G??nderen Cari</Radio>
                          <Radio value='AliciCari'>Al??c?? Cari</Radio>
                          <Radio value='Farkli'>Farkl?? Cari</Radio>
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
                            ??denecek M????teri Tipi
                          </label>
                        }
                      >
                       
                        <Input  disabled  className="formInput"  placeholder="Se??iniz"  />
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
                          <label style={{ maxWidth: 150, minWidth: 150 }}>??deme Birimi/B??lge</label>
                        }
                      >
                      

                        <Input  disabled  className="formInput"  placeholder="Se??iniz"  />
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
                          placeholder="Talep Edilen Tutar KDV Hari??"
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
                            S??re?? Sahibi Birim/B??lge
                          </label>
                        }
                      >
                           <Input   disabled className="formInput"  placeholder="Se??iniz"  />
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
                    De??erlendirme
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
                              { required: true, message: 'L??tfen Bo?? B??rakmay??n??z!' }
                            ]
                          }
                            name='evaTazmin_Tipi'  label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Tazmin Tipi</label>
                        } >
                                   

                                <Select 
                                  className="formInput"
                                  placeholder="Se??iniz"
                                  allowClear                                  
                                  onChange={DegOnchangeTazminTipi}
                                >
                                      <Option value="Hasar">Hasar</Option>
                                      <Option value="Kay??p">Kay??p</Option>
                                      <Option value="Ge?? Teslimat" >Ge?? Teslimat</Option>
                                      <Option value="M????teri Memnuniyeti">M????teri Memnuniyeti</Option>
                                </Select>



                          </Form.Item>
                        </Col>


                        <Col span={7}>
                              <Form.Item name='evaTazmin_Nedeni' 
                               rules={
                                [
                                  { required: true, message: 'L??tfen Bo?? B??rakmay??n??z!' }
                                ]
                              }
                              label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Tazmin Nedeni</label>
                        }>
                                     <Select
                                           className="formInput"
                                        placeholder="Se??iniz"
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
                            { required: true, message: 'L??tfen Bo?? B??rakmay??n??z!' }
                          ]
                        }
                         label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Kargonun Bulundu??u Yer</label>
                        }>
                                   <Select
                                           className="formInput"
                                        placeholder="Se??iniz"
                                        allowClear
                                          
                                      >
                                               <Option value="????k???? Birim">????k???? Birim</Option>
                                               <Option value="????k???? Aktarma">????k???? Aktarma</Option>
                                               <Option value="Var???? Aktarma">Var???? Aktarma</Option>
                                               <Option value="Var???? Birim">Var???? Birim</Option>
                                               <Option value="G??nderici M??steri">G??nderici M??steri</Option>
                                               <Option value="Al??c?? M????teri">Al??c?? M????teri</Option>
                                               <Option value="Di??er">Di??er</Option>
                                               <Option value="??mha">??mha</Option>

                                      </Select>
                         </Form.Item>
                       </Col>

                       <Col span={7}>
                         <Form.Item 
                         rules={
                            [
                              { required: true, message: 'L??tfen Bo?? B??rakmay??n??z!' }
                            ]
                          }
                         name='evaKusurlu_Birim'                     
                         label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Kusurlu Birim Var m???</label>
                        }>
                                 <Select
                                           className="formInput"
                                        placeholder="Se??iniz"
                                        allowClear
                                          
                                      >
                                               <Option value="Evet">Evet</Option>
                                               <Option value="Hay??r">Hay??r</Option>
                                              
                                      </Select>
                         </Form.Item>
                       </Col>




                    </Row>



                    <Row>
                       <Col span={7}>
                         <Form.Item
                         rules={
                            [
                              { required: true, message: 'L??tfen Bo?? B??rakmay??n??z!' }
                            ]
                          }
                         name='evaIcerik_Grubu'                          
                         label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>????erik Grubu</label>
                        }>
                                  <Select
                                           className="formInput"
                                        placeholder="Se??iniz"
                                        allowClear
                                          
                                      >
                                       <Option value="E-Ticaret">E-Ticaret</Option>
                                       <Option value="Teknoloji">Teknoloji</Option>
                                       <Option value="Bas??n">Bas??n</Option>
                                       <Option value="Di??er">Di??er</Option>
                                           

                                      </Select>
                         </Form.Item>
                       </Col>

                       <Col span={7}>
                         <Form.Item 
                         rules={
                            [
                              { required: true, message: 'L??tfen Bo?? B??rakmay??n??z!' }
                            ]
                          }
                         name='evaIcerik' 
                         label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>????erik</label>
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
                              { required: true, message: 'L??tfen Bo?? B??rakmay??n??z!' }
                            ]
                          }
                         name='evaUrun_Aciklama'    label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>??r??n A????klamas??</label>
                        }>
                                <Input className='formInput'  />
                         </Form.Item>
                       </Col>

                       <Col span={7}>
                         <Form.Item name='evaEkleyen_Kullanici' label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Ekleyen Kullanc??</label>
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
                              { required: true, message: 'L??tfen Bo?? B??rakmay??n??z!' }
                            ]
                          }
                          name='evaBolge_Aciklama'  
                          label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>B??lge A????klama</label>
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
                              { required: true, message: 'L??tfen Bo?? B??rakmay??n??z!' }
                            ]
                          }
                          name='evaGm_Aciklama' 
                          label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Gm A????klama</label>
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
                            { required: true, message: 'L??tfen Bo?? B??rakmay??n??z!' }
                          ]
                        }
                        label={
                          <label style={{ maxWidth: 155, minWidth: 155 }}>Tazmin ??deme Durumu</label>
                        }>
                            <Select
                                        className="formInput"
                                        placeholder="Se??iniz"
                                        allowClear
                                        onChange={tazminodemedurumu}
                                      >
                                                <Option value="??denecek">??denecek</Option>
                                               <Option value="??denmicek">??denmicek</Option>
                                               <Option value="Farkl?? Bir Tutar ??denecek">Farkl?? Bir Tutar ??denecek</Option>                                           
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
                           { required: false, message: 'L??tfen Bo?? B??rakmay??n??z!' },
                           { pattern: /^\$?([0-9]{1,1},([0-9]{1,1},)*[0-9]{1,1}|[0-9]+)(.[0-9][0-9])?$/, message: 'Sadece parasal de??erler girilebilir' }
                         ]
                       }
                       label={
                         <label style={{ maxWidth: 155, minWidth: 155 }}>??denecek Tutar</label>
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
                                {/* Onaya G??nder */}
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
                  Tarih??e
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
