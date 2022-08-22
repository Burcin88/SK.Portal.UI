import React  from 'react';

import {   
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    FormInstance,
    Input,
    Modal,
    notification,
    Radio,
    Row,
    Select,
    Space,
    Spin,  
  } from 'antd';

  import '../index.less';
  import { L } from '../../../../lib/abpUtility';
  import FileBase64 from 'react-file-base64';
  import { AlertOutlined, CheckCircleTwoTone, ExclamationCircleOutlined, SendOutlined } from '@ant-design/icons';

import moment from 'moment';
import 'moment/locale/tr';
import locale from 'antd/es/date-picker/locale/tr_TR';
import KDamageCompensationStore from '../../../../stores/kDamageCompensationStore';
import DifferentCari from '../components/differentCari';
import uuid from 'react-uuid'

  export interface ICProps {
    kDamageCompensationStore:KDamageCompensationStore,
    OdemeBirimiBolgeListe:any,
    SurecSahiniBolgeListe:any,
    LastIdDamageCompensation:number,
  }

  
export interface IState {

}
 


const { confirm } = Modal;
class CompensationForm extends React.Component<ICProps,IState>  {  
    formRef = React.createRef<FormInstance>();
    formRefQuery= React.createRef<FormInstance>();
    state={
    RadioQuery: 1,
    KnowUnknown:true,
    KnowUnknownQuery:false,
    TcInputdisable:true,
    VkInputdisable:true,
    TcInputrequired:true,
    VkInputrequired:true,
    Ktno:0,
    GetirLoding:false,
    sistemInsertTime:'01-01-2020',
    pageLoding:false,
    lblQuery:'Kargo Takip No',
    lblEvrakSeriNoAndIrsaliye:'Evrak Seri Sira No',
    fileControl:false,
    filesMultitable:[],
    differentCari:false,
    differentCariObJ :'',
    tazminMusteriRadio:'0',
    webSiparisKodu:'',

    dataCariList: this.props.kDamageCompensationStore.getKcariFind,
    dataCariListKod: this.props.kDamageCompensationStore.getKcariFind,
    dataCikisSube:this.props.kDamageCompensationStore.getSubeListDamage,
    dataVarisSube:this.props.kDamageCompensationStore.getSubeListDamage,
    fetchingKcari: true,
    kcariKodu:''
   };



    render() {
        const { Option } = Select;

        const dateFormat = 'DD-MM-YYYY';
        const todayFinishtwoFormat = 'YYY-MM-DD';
        var today = new Date();

        const todayFinish = moment(today).format(dateFormat);
        const todayFinishtwo = moment(today).format(todayFinishtwoFormat);
        


    
        const optionsCariList = this.state.dataCariList !== undefined && this.state.dataCariList.map(d => <Option key={'c' + d.objId + ''} value={d.unvan} >{d.unvan}</Option>);

        const optionsCariListKod = this.state.dataCariListKod !== undefined && this.state.dataCariListKod.map(d => <Option key={uuid()} value={d.kodu} >{d.kodu}</Option>);

        const optionsCikisSube = this.state.dataCikisSube !== undefined && this.state.dataCikisSube.map(d => <Option key={uuid()} value={d.adi} >{d.adi}</Option>);

        const optionsVarisSube = this.state.dataCikisSube !== undefined && this.state.dataCikisSube.map(d => <Option key={uuid()} value={d.adi} >{d.adi}</Option>);





//#region   
const OnSelectCikisSube = async()=>{
    await this.props.kDamageCompensationStore.getSubeListDamageComppensation();
    this.setState({dataCikisSube :this.props.kDamageCompensationStore.getSubeListDamage})
}


const OnSelectVarisSube = async()=>{
    await this.props.kDamageCompensationStore.getSubeListDamageComppensation();
    this.setState({dataCikisSube :this.props.kDamageCompensationStore.getSubeListDamage})
}


//#endregion




        
 //#region cari listeleme

  const OnSearchCari = async (value) => {

    if (value) {
      if (value.length > 4) {
        await this.props.kDamageCompensationStore.StoreGetKcariFind(value,1);
        this.setState({ dataCariList: this.props.kDamageCompensationStore.getKcariFind })
      }
    } 
  }



  const OnSearchCariAlici = async (value) => {

    if (value) {
      if (value.length > 4) {
        await this.props.kDamageCompensationStore.StoreGetKcariFind(value,1);
        this.setState({ dataCariList: this.props.kDamageCompensationStore.getKcariFind })
      }
    } 
  }



  const OnSearchCariKod = async (value) => {

    if (value) {
      if (value.length > 4) {
        await this.props.kDamageCompensationStore.StoreGetKcariFind(value,2);
        this.setState({ dataCariListKod: this.props.kDamageCompensationStore.getKcariFind })
      }
    } 
  }



  const OnSearchCariKodAlici = async (value) => {

    if (value) {
      if (value.length > 4) {
        await this.props.kDamageCompensationStore.StoreGetKcariFind(value,2);
        this.setState({ dataCariListKod: this.props.kDamageCompensationStore.getKcariFind })
      }
    }
 
  } 
  //#endregion
 
  //#region Cari secme
  const OnSelectCari = (id) => {
     
    var resultData = this.props.kDamageCompensationStore.getKcariFind.filter(x => x.unvan === id);
       this.formRef.current?.setFieldsValue({
      'gonderenKodu':resultData[0].kodu
      });
       
 }

 const OnSelectCariAlici = (id) => {
     
    var resultData = this.props.kDamageCompensationStore.getKcariFind.filter(x => x.unvan === id);
       this.formRef.current?.setFieldsValue({
      'aliciKodu':resultData[0].kodu
      });
       
 }



 const OnSelectCariKod = (id) => {
     
    var resultData = this.props.kDamageCompensationStore.getKcariFind.filter(x => x.kodu === id);
       this.formRef.current?.setFieldsValue({
      'gonderenUnvan':resultData[0].unvan
      });
       
 }


 const OnSelectCariKodAlici = (id) => {
     
    var resultData = this.props.kDamageCompensationStore.getKcariFind.filter(x => x.kodu === id);
   
       this.formRef.current?.setFieldsValue({
      'aliciUnvan':resultData[0].unvan
      });
       
 }


 //#endregion




  //#region  Biliniyor -Bilinmiyor
  const onChangeRadioRadioQuery =(e)=>{
    this.setState({ RadioQuery:e.target.value});
    if(e.target.value ===1){
       this.setState({KnowUnknown:true})  
       this.setState({KnowUnknownQuery:false}) 
       this.formRef.current?.resetFields()
       this.formRefQuery.current?.resetFields()
       this.setState({ sistemInsertTime:'01-01-2020'})
       this.setState({lblQuery:'Kargo Takip No'})
       this.setState({lblEvrakSeriNoAndIrsaliye:'Evrak Seri Sira No'})

 

    }else{
        this.setState({KnowUnknown:false}) 
        this.setState({KnowUnknownQuery:true})   
        this.formRef.current?.resetFields() 
        this.formRefQuery.current?.resetFields()
        this.setState({ sistemInsertTime:'01-01-2020'})
        this.setState({lblQuery:'Kargo Kabul Fis No'})
        this.setState({lblEvrakSeriNoAndIrsaliye:'Sevk Irsaliye No'})


   
    }

  }
  //#endregion


  //#region  Odeme Musteri Tipi Secme 
  const OnchangeOdeneekMusteriTipi =(e)=>{
    if(e=== "1") //biriysel
    {
        this.setState({TcInputdisable:false}) 
        this.setState({VkInputdisable:true}) 
        this.setState({TcInputrequired:true}) 
        this.setState({VkInputrequired:false}) 
    }else{
        this.setState({TcInputdisable:true}) 
        this.setState({VkInputdisable:false}) 
        this.setState({TcInputrequired:false}) 
        this.setState({VkInputrequired:true}) 
    }

  }
    //#endregion



 const OnchangeTakipNo=(e)=>{
    this.setState({ Ktno: e.target.value });
 }



    //#region GETIR CLCIK    
    const  OnclickGetir =()=>{
      


        if(this.state.Ktno !==0 && this.state.Ktno !==undefined){
            this.setState({GetirLoding:true})
           //servisten kargo takip numarasini sorgula 
          GetKargoTakipNo(this.state.Ktno)
        }else{
            notification.open({
                icon: <AlertOutlined style={{ color: 'red' }} />,
                message: L('Uyari'),      
                description:L('Lutfen Kargo Takip Numarasini Kontrol Ediniz.'),
                
              });
             this.setState({GetirLoding:false})

        }


    }

   const GetKargoTakipNo = async (id: number) => {
         
        try{

            await this.props.kDamageCompensationStore.getDamageComppensation({id:id})


           var response=this.props.kDamageCompensationStore.getCreateDamageInput

          if(response !==null && response !==undefined){
                    
            
           if(response.takipNo ==="0"){

               
            ValidateMessage(true,'Uyari',''+this.state.Ktno+' Takip Numarali  '+response.gonderenKodu+' Nolu Bagli Hasar Tazmin Bulunmaktadir.')

            this.setState({GetirLoding:false})
           }else{


            await this.props.kDamageCompensationStore.StoreGetWebSiparis(response.takipNo);
            this.setState({
                webSiparisKodu: this.props.kDamageCompensationStore.getWebSiparisKod.webSiparisKodu !==undefined ? this.props.kDamageCompensationStore.getWebSiparisKod.webSiparisKodu :''
            })
               

            console.log('this.state.webSiparisKodu',this.state.webSiparisKodu)


            setTimeout(() => {
               
                this.setState({
                    sistemInsertTime: moment(
                      this.props.kDamageCompensationStore.getCreateDamageInput.sistem_InsertTime
                    ).format('DD-MM-YYYY'),
                  });
                 
                this.formRef.current?.setFieldsValue({
                  ...this.props.kDamageCompensationStore.getCreateDamageInput,
                'web_siparis_kodu':this.state.webSiparisKodu
                });

        
                
                this.setState({GetirLoding:false})
              }, 1000);

           }     
          }else{          
            notification.open({
                icon: <AlertOutlined style={{ color: 'red' }} />,
                message: L('Uyari'),      
                description:L(id +' Nolu Kargo Takipo Numarasi Bulunamadi.'),
                
              });
              this.setState({GetirLoding:false})


          }

        }
        catch(e){
            notification.open({
                icon: <AlertOutlined style={{ color: 'red' }} />,
                message: L('Uyari'),      
                description:L('Bilinmeyen Hata.'),
                
              });
              this.setState({GetirLoding:false})
        }


      };


    //#endregion    



    //#region TAZMIN KAYDETME
     const onclickSaveDamageCompensation=()=>{

        const form = this.formRef.current;
          
          if(this.state.fileControl ===true){
            ValidateMessage(true,'Dosya Hatasi','Lutfen Dosya Uzantisini Kontrol Ediniz Ve Yeniden Yukleyiniz.')
          }else{
        
        form!.validateFields().then(async(values:any)=>{
        
         values.Sistem_InsertTime=this.state.sistemInsertTime;
         values.FileTazminDilekcesi = JSON.stringify(this.state.filesMultitable);
         values.Durumu=this.state.RadioQuery;
         if(this.state.RadioQuery ===2 ){
            values.KargoKabulFisNo=this.state.Ktno;
         }else{
            values.TakipNo=this.state.Ktno;
         }

                   // farkli cari secili gelirse  
                     //cari obji tazmin musteri unvana set et                          
                     if(this.state.tazminMusteriRadio === '3'){         
                       values.Tazmin_Musteri_Kodu=this.state.differentCariObJ
                      }
                                
                    values.Web_Siparis_Kodu=this.state.webSiparisKodu 
                    values.Web_Siparis_Kodu =values.web_siparis_kodu         
                   await this.props.kDamageCompensationStore.StoreGetWebSiparisKontrol(values.web_siparis_kodu);
                   var text=this.props.kDamageCompensationStore.websipariskontrol;

          //dosya kontrolu
          if(values.FileTazminDilekcesi ==='[]' || values.FileTazminDilekcesi ===undefined ){
                      
                    if(text==="true"){
                        this.setState({pageLoding:true})                         
                        confirm({
                            icon: <ExclamationCircleOutlined />,
                            content:L('Tazmin Belgelerini Bos Biraktiniz. Eksik Evrak Olarak Kaydedilsin mi?'),
                            okText: L('Yeni Form'),
                            cancelText: L('Vazgec'),
                            onOk: () => {  
                            this.setState({pageLoding:true})
                             
                            this.props.kDamageCompensationStore.create(values);
                                            
                            setTimeout(() => {
                            window.location.href='/newindex';
                            }, 300);                                           
                            },
                            onCancel() {
                            console.log(L('Cancel'));
                            },
                        });
                    }else{

                        ValidateMessage(true,'Uyari',''+values.web_siparis_kodu+' web siparis Numarali Tazmin Formu Bulunmaktadir  ')                  
                    }  

          }
          else{

            if(text ==="true"){
                this.setState({pageLoding:true})  

                setTimeout(() => {                   
                    this.props.kDamageCompensationStore.create(values);
                    confirm({
                        icon: <ExclamationCircleOutlined />,
                        content: 'Hasar Tazmin Formu Kaydedilmistir',
                        okText: L('Yeni Form'),
                        cancelText: L('Vazgec'),
                        onOk: () => {   
        
                                                                
                            setTimeout(() => {
                                window.location.href='/newindex';         
                            }, 300);   
                                                
                        },  
                        onCancel: () => {
                            setTimeout(() => {
                                window.location.href='/newindex/deg/'+this.props.LastIdDamageCompensation+'';         
                            }, 300);   
        
                        },
                        });
                }, 5000);
                   
                        

            }
            else{

                var text=this.props.kDamageCompensationStore.websipariskontrol;
                ValidateMessage(true,'Uyari',''+values.web_siparis_kodu+' web siparis Numarali  '+text.split('-')[1]+' Tazmin Formu Bulunmaktadir  ')                  
            }  


         

          }
           

        })
        .catch((err) => console.log(err));

        
        }
     } 
    //#endregion


    //#region BILGILENDIRME MESAJI METOT
    const ValidateMessage=async(typ:boolean ,headerMsg:string,msg:string)=>{

        if(typ ===true){
            notification.open({
                icon: <AlertOutlined style={{ color: 'red' }} />,
                message: L(headerMsg),      
                description:L(msg),
              })
        }else
        {
            notification.open({
                icon: <CheckCircleTwoTone  style={{ color: 'green' }} />,
                message: L(headerMsg),      
                description:L(msg),       
              })
        }       
    }

    //#endregion



    //#region  MULTI FILE DOSYASI
    const OnDoneGetFile=(files)=>{
       var control=false
       for (let index = 0; index < files.length; index++) {
            if (
            files[index].type === '' ||
            files[index].type === undefined ||
            files[index].type === 'application/x-msdownload'
          ) {
             control=true
          }    
       }

       if(control===true){
        ValidateMessage(true,'Dosya Hatasi','Lutfen Dosya Uzantisini Kontrol Ediniz Ve Yeniden Yukleyiniz.')
        this.setState({fileControl:true})
       }else  {
        this.setState({fileControl:false})
        this.setState({filesMultitable:files}) 
       }


    
       
    }
    //#endregion
   
  

   //#region  TAZMIN MUSTERI ONCHANGE
    const OnchangeTazminMusteri=(values)=>{
    

     this.setState({tazminMusteriRadio :values.target.value})

     if(values.target.value==="3"){
        this.setState({differentCari:true})
     }else{
        this.setState({differentCari:false})
     }
    } 

   //#endregion



//#region farkli cari tutma 
const processDiffrentCarObjFunc = (string) => {
    this.setState({ differentCariObJ: string })
  }
  //#endregion 


       
      return (
        <>                      
                    <Spin  spinning={this.state.pageLoding}
                    
                     size='large'>

                    <Divider orientation="left">{L('Tazmin Bilgileri')}</  Divider>
                                

                            <Form labelCol={{ flex: '145px' }} labelAlign="right" wrapperCol={{ flex: 5 }} colon={false} >
                       
                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Tazmin Numarasi')}  className='InputDisable' name="tazminNo" rules={[{ required: true }]} >

                                            {console.log(this.props.LastIdDamageCompensation)}
                                            
                                            <Input
                                            value={this.props.LastIdDamageCompensation} 
                                            defaultValue={this.props.LastIdDamageCompensation} 
                                            disabled={true}   />
                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L('Tazmin Statu')}   rules={[{ required: true }]}>
                                            <Input disabled defaultValue={'Taslak'} />
                                            </Form.Item>
                                        </Col>                                
                                </Row>

                            </Form> 


                            <Divider orientation="left">{L('Sorgulama')}</Divider>

                            <Form  ref={this.formRefQuery}  labelCol={{ flex: '145px' }} labelAlign="right" wrapperCol={{ flex: 1 }} colon={false} >
                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Durumu')}  name="text" rules={[{ required: true }]} >
                                            
                                            <Radio.Group  onChange={onChangeRadioRadioQuery} defaultValue={this.state.RadioQuery}>
                                                <Radio value={1}>{L('Biliniyor')}</Radio>
                                                <Radio value={2}>{L('Bilinmiyor')}</Radio>
                                                
                                            </Radio.Group>
                                            </Form.Item>
                                        </Col>                                                             
                                </Row>   


                                    {
                                        this.state.RadioQuery === 1 ?

                                        <Row>
                                                    
                                                    <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                                        <Form.Item label={L(this.state.lblQuery)}  name="takipNo"    >
                                                        <Input  
                                                        onChange={OnchangeTakipNo}/>
                                                        </Form.Item>
                                                    </Col> 
                                                    
                                                    <Col span={8} xs={{ order: 12 ,offset:1}} sm={{ order: 12 ,offset:1}} md={{ order: 3 ,offset:1}} lg={{ order: 4 ,offset:1}} >                                    
                                                            <Button 
                                                            type="primary"
                                                            icon={<SendOutlined />}
                                                            disabled={this.state.KnowUnknownQuery}
                                                            onClick={OnclickGetir}
                                                            loading={this.state.GetirLoding}
                                                            
                                                            >
                                                            {L('Getir')}
                                                        </Button>
                                                    </Col>

                                     </Row>  : null
                                
                                    }

                            
                            </Form>


                            <Divider orientation="left">{L('Gonderi Bilgileri')}</Divider>



                            <Form    ref={this.formRef} name="wrap" labelCol={{ flex: '145px' }} labelAlign="right" wrapperCol={{ flex: 1 }} colon={false} >
                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Evrak Olusturma Tarihi')}  name="Sistem_InsertTime"  
                                             rules={[{ required: false, message: L('MissingInputEmpty')}]}
                                            >
                                                 
                                                {/* <DatePicker   
                                                    className="formInputDate"
                                                    locale={locale}
                                                    disabledDate={(d) =>
                                                        !d || d.isAfter(todayFinish) || d.isSameOrBefore('2000-01-01')
                                                    }
                                                    format="DD-MM-YYYY"
                                                    
                                                    placeholder={L(this.state.sistemInsertTime)}
                                                    disabled={this.state.KnowUnknown}
                                                    /> */}

                                           

                                            <DatePicker 
                                             placeholder={this.state.sistemInsertTime}
                                             disabled={this.state.KnowUnknown}
                                             className="formInputDate"
                                             locale={locale}                                           
                                             format={dateFormat}
                                             disabledDate={(d) =>
                                                !d || d.isAfter(todayFinish) || d.isSameOrBefore('01-01-2000')
                                            } />


                                                    
                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L(this.state.lblEvrakSeriNoAndIrsaliye)}  name="evrakSeriNo" 
                                          rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                            <Input   disabled={this.state.KnowUnknown} />
                                            </Form.Item>
                                        </Col>                                
                                </Row>   


                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Gonderici Kodu')}  name="gonderenKodu" 
                                             rules={[{ required: true, message: L('MissingInputEmpty')}]} >
                                                <Select
                                                                    allowClear
                                                                    disabled={this.state.KnowUnknown}
                                                                    showSearch
                                                                    placeholder={L('PleaseSelect')}
                                                                    notFoundContent={this.state.fetchingKcari ? <Spin size="small" /> : null}
                                                                    onSearch={OnSearchCariKod}
                                                                    showArrow={false}
                                                                    filterOption={false}
                                                                    defaultActiveFirstOption={false}
                                                                    onSelect={OnSelectCariKod}
                                                                    >
                                                                    {optionsCariListKod}
                                                                    
                                                </Select>

                                        
                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L('Gonderici Unvan')}  name="gonderenUnvan" 
                                         rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                         

                                            <Select
                                                disabled={this.state.KnowUnknown}
                                                                showSearch
                                                                placeholder={L('PleaseSelect')}
                                                                notFoundContent={this.state.fetchingKcari ? <Spin size="small" /> : null}
                                                                onSearch={OnSearchCari}
                                                                showArrow={true}
                                                                filterOption={false}
                                                                defaultActiveFirstOption={false}
                                                                onSelect={OnSelectCari}
                                                                >
                                                                {optionsCariList}
                                                                
                                        </Select>


                                            </Form.Item>
                                        </Col>                                
                                </Row>   

                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Alici Kodu')}  name="aliciKodu" 
                                            rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                        


                                            <Select
                                                                    allowClear
                                                                    disabled={this.state.KnowUnknown}
                                                                    showSearch
                                                                    placeholder={L('PleaseSelect')}
                                                                    notFoundContent={this.state.fetchingKcari ? <Spin size="small" /> : null}
                                                                    onSearch={OnSearchCariKodAlici}
                                                                    showArrow={false}
                                                                    filterOption={false}
                                                                    defaultActiveFirstOption={false}
                                                                    onSelect={OnSelectCariKodAlici}
                                                                    >
                                                                    {optionsCariListKod}
                                                                    
                                                </Select>



                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L('Alici Unvan')}  name="aliciUnvan" 
                                         rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                                <Select
                                                disabled={this.state.KnowUnknown}
                                                                showSearch
                                                                placeholder={L('PleaseSelect')}
                                                                notFoundContent={this.state.fetchingKcari ? <Spin size="small" /> : null}
                                                                onSearch={OnSearchCariAlici}
                                                                showArrow={true}
                                                                filterOption={false}
                                                                defaultActiveFirstOption={false}
                                                                onSelect={OnSelectCariAlici}
                                                                >
                                                                {optionsCariList}
                                                                
                                                  </Select>
                                            </Form.Item>
                                        </Col>                                
                                </Row>

                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Cikis Sube Adi')}  name="cikis_Sube_Unvan" 
                                            rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                       
                                            <Select
                                                disabled={this.state.KnowUnknown}
                                                                showSearch
                                                                placeholder={L('PleaseSelect')}
                                                                notFoundContent={this.state.fetchingKcari ? <Spin size="small" /> : null}
                                                                //onSearch={OnSearchCariAlici}
                                                                showArrow={true}
                                                                filterOption={false}
                                                                defaultActiveFirstOption={false}
                                                                // onSelect={OnSelectCikisSube}
                                                                onClick={OnSelectCikisSube}
                                                                >
                                                                {optionsCikisSube}
                                                                
                                                  </Select>

                                            </Form.Item>
                                        </Col>
                                    


                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L('Varis Sube Adi')}  name="varis_Sube_Unvan" 
                                         rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                            
                                            <Select
                                                disabled={this.state.KnowUnknown}
                                                                showSearch
                                                                placeholder={L('PleaseSelect')}
                                                                notFoundContent={this.state.fetchingKcari ? <Spin size="small" /> : null}
                                                                showArrow={true}
                                                                filterOption={false}
                                                                defaultActiveFirstOption={false}                                                    
                                                                onClick={OnSelectVarisSube}
                                                                >
                                                                {optionsVarisSube}
                                                                
                                                  </Select>



                                            </Form.Item>
                                        </Col>                                
                                </Row>


                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Kargo Tipi')}  name="birimi" 
                                             rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                                
                                                <Select
                                                               disabled={this.state.KnowUnknown}
                                                                showSearch={false}
                                                                placeholder={L('PleaseSelect')}
                                                                notFoundContent={this.state.fetchingKcari ? <Spin size="small" /> : null}
                                                                showArrow={true}
                                                                filterOption={false}
                                                                                                              
                                                                >
                                                   <Option key={'B3120000100000000001'} value={'Mİ'}>{L('Mİ')}</Option>
                                                   <Option key={'B3120000100000000014'} value={'PALET'}>{L('PALET')}</Option>
                                                   <Option key={'B4000100100000000002'} value={'DOSYA'}>{L('DOSYA')}</Option>
                                                   <Option key={'B4000100100000000003'} value={'PAKET'}>{L('PAKET')}</Option>
                                                   <Option key={'B4000100100000000004'} value={'KOLİ'}>{L('KOLİ')}</Option>
                                                           
                                                                
                                                  </Select>

                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L('Parca Adedi')}  name="adet" 
                                        rules={[{ required: true, message: L('MissingInputEmpty')},
                                                { pattern:new RegExp(/\d+/g), message: L('Sadece Sayisal Degerler')} ]}>
                                            <Input  disabled={this.state.KnowUnknown}  maxLength={4}/>
                                            </Form.Item>
                                        </Col>                                
                                </Row>



                                <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                   
                
                                            <Form.Item label={L('Web Siparis Kodu')}  name="web_siparis_kodu"  
                                             rules={[{ required: false, message: L('MissingInputEmpty')}]}>
                                            <Input 
                                              disabled={this.state.KnowUnknown}  
                                            
                                              value={this.state.webSiparisKodu} />
                                           
                                            </Form.Item>
                                        </Col>
                                </Row>
                           

                            <Divider orientation="left">{L('Tazmin Bilgileri')}</Divider>


                            <Row> 
                                        <Col span={8} xs={{ order: 12}} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Tazmin Talep Tarihi')}  name="Tazmin_Talep_Tarihi" 
                                             rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                         

                                            <DatePicker 
                                             className="formInputDate"
                                             locale={locale}
                                             defaultValue={moment(todayFinish, dateFormat)} 
                                             format={dateFormat}
                                             disabledDate={(d) =>
                                                !d || d.isAfter(todayFinishtwo) || d.isSameOrBefore('01-01-2000')
                                            } />




                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L('Tazmin Tipi')}  name="Tazmin_Tipi" 
                                         rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                                <Select className="formInput" placeholder={L('PleaseSelect')} allowClear>
                                                    <Option value="1">{L('Hasar')}</Option>
                                                    <Option value="2">{L('Kayip')}</Option>
                                                    <Option value="3">{L('Gec Teslimat')}</Option>
                                                    <Option value="4">{L('Musteri Memnuniyeti')}</Option>
                                                </Select>
                                         </Form.Item>
                                        </Col>                                
                                </Row>


                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Tazmin Musterisi')}  name="Tazmin_Musteri_Tipi" 
                                             rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                            <Radio.Group defaultValue={this.state.RadioQuery}
                                             onChange={OnchangeTazminMusteri}
                                            >
                                                <Radio value="1">{L('Gonderen')}</Radio>
                                                <Radio value="2">{L('Alici')}</Radio>
                                                <Radio value="3">{L('Farkli Cari')}</Radio>
                                            </Radio.Group>
                                            </Form.Item>                                            
                                        </Col>

                                        
                                        {this.state.differentCari ?                      
                                        <DifferentCari 
                                        
                                        differentCariObJ={processDiffrentCarObjFunc}
                                        kDamageCompensationStore={this.props.kDamageCompensationStore}   /> 
                                        : ''}


                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L('Odenecek Musteri Tipi')}   name="Odeme_Musteri_Tipi" 
                                         rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                                <Select className="formInput" allowClear  placeholder={L('PleaseSelect')}   onChange={OnchangeOdeneekMusteriTipi}  >
                                                    <Option value="1">{L('Bireysel')}</Option>
                                                    <Option value="2">{L('Kurumsal')}</Option>                                                   
                                                </Select>
                                            </Form.Item>
                                        </Col>                                
                                </Row>



                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('TC Kimlik No')}  name="TCK_NO" 
                                             rules={[{ required: this.state.TcInputrequired,
                                             pattern: /^\d*\.?\d{11,11}$/,
                                             message: L('MissingInputEmpty')}]}>
                                            <Input  disabled={this.state.TcInputdisable} maxLength={11} />
                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L('Vergi Kimlik No')}  name="VK_NO" 
                                         rules={[{ required: this.state.VkInputrequired, 
                                         pattern: /^\d*\.?\d{10,12}$/,
                                         message: L('MissingInputEmpty')}]}>
                                            <Input  disabled={this.state.VkInputdisable} maxLength={12} minLength={10} />
                                            </Form.Item>
                                        </Col>                                
                                </Row>



                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Odeme Birimi Bolge')}  name="Odeme_Birimi_Bolge"  
                                             rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                                   <Select className="formInput" placeholder={L('PleaseSelect')} allowClear  >
                                                       {this.props.OdemeBirimiBolgeListe}
                                                    </Select>
                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L('Surec Sahibi Bolge')}  name="Surec_Sahibi_Birim_Bolge" 
                                         rules={[{ required: true, message: L('MissingInputEmpty')}]}>
                                                   <Select className="formInput" placeholder={L('PleaseSelect')} allowClear>
                                                        {this.props.SurecSahiniBolgeListe}                                                  
                                                    </Select>
                                            </Form.Item>
                                        </Col>                                
                                </Row>

                                
                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Talep Edilen Tutar')}  name="Talep_Edilen_Tutar" 
                                             rules={[
                                                 { required: true, message: L('MissingInputEmpty')},
                                                 {
                                                    pattern: /^\$?([0-9]{1,1},([0-9]{1,1},)*[0-9]{1,1}|[0-9]+)(.[0-9][0-9])?$/,
                                                    message: L('MissingNumber'),
                                                  }
                                                ]
                                             }>
                                            <Input />
                                            </Form.Item>
                                        </Col>
                                                      
                                </Row>

                                
                                <Divider orientation="left">{L('Tazmin Bilgilendirme')}</Divider>

                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('SMS')}  name="Telefon" 
                                             rules={[
                                                 { required: false,
                                              message: L('MissingInputEmpty')
                                                 },
                                                 {
                                                    pattern: /^[\d]{10,11}$/,
                                                    message: L('MissingInputPhone'),
                                                  }
                                              ]}>
                                            <Input type='tel' />
                                            </Form.Item>
                                        </Col>
                                    
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                        <Form.Item label={L('Email')}  name="Email" 
                                         rules={[
                                             { required: false, message: L('MissingInputEmpty')},
                                             { type: 'email', message: L('MissingInputEmail') }
                                             ]}>
                                            <Input  type='email'/>
                                            </Form.Item>
                                        </Col>                                
                                </Row>


                                <Divider orientation="left">{L('Tazmin Belgeleri')}</Divider>

                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item label={L('Dosyalar')}  name="FileTazminDilekcesi"  >
                                            <FileBase64 
                                             onDone={OnDoneGetFile.bind(this)} 
                                             multiple={true} />
                                            </Form.Item>
                                        </Col>                                                        
                                </Row>

                                <Row> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >                                    
                                            <Form.Item   label={L('Link')}  name="url"  >
                                            <Input type='text' />
                                            </Form.Item>
                                        </Col>                                                                                             
                                </Row>


                                <Row style={{ float: 'right' }}> 
                                        <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 3 }} >                                    
                                            <Space style={{ width: '100%' }}>
                                                <Button
                                                type="primary"
                                                onClick={onclickSaveDamageCompensation}
                                                icon={<SendOutlined />}
                                                htmlType="submit"
                                                >
                                                {L('Kaydet')}
                                                </Button>
                                            </Space>
                                        </Col>                                                                                             
                                </Row>


                            </Form>

                        </Spin>

                 
        </>);
    }
  }



  export default  CompensationForm

