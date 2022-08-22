import { Checkbox, Col, DatePicker, Form, FormInstance, Input, Modal, notification, Row, Select, Spin, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { L } from '../../../../lib/abpUtility';
import Stores from '../../../../stores/storeIdentifier';
import KDamageCompensationStore from '../../../../stores/kDamageCompensationStore';
//import uuid from 'react-uuid'
import locale from 'antd/es/date-picker/locale/tr_TR';
import moment from 'moment';
import { AlertOutlined, CheckCircleTwoTone } from '@ant-design/icons';


export interface ICProps {
    visible: boolean
    closeModal: () => void; 
    //formRef: React.RefObject<FormInstance>;
    kDamageCompensationStore:KDamageCompensationStore,
    tutar:string
    urlId:number;
    
}

export interface IState {
    selectNotFound:boolean;
    datakesintibirim:any;
    kesintibirimkodu?:string;
    kesintiyapilacakunvan:string;
    tutar:string;
    calismabaslangictarihi:string;
    calismabitisctarihi:string;
    kesintitxt:string;
    kesintiorani:boolean;
    check:boolean;
}

//const { Option } = Select;
const TabPane = Tabs.TabPane;

const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';
//var today = new Date();
//const todayFinish = moment(today).format(dateFormat);

@inject(Stores.KDamageCompensationStore)

@observer
class InterruptionFormModal extends React.Component<ICProps, IState> { 

    formRef = React.createRef<FormInstance>();

    state = {
        selectNotFound:true,
        datakesintibirim:this.props.kDamageCompensationStore.getSubeListDamage,
        kesintibirimkodu:'',
        kesintiyapilacakunvan:'',
        tutar:'0',
        calismabaslangictarihi:'',
        calismabitisctarihi:'',
        kesintitxt:'Evet',
        kesintiorani:false,
        check:true
    }; 



     //#region Sube ve aktarma listesi
     OnSelectKesintiBirim = async ()=>{
         setTimeout(() => {
             this.props.kDamageCompensationStore.getSubeAktarmaListDamageComppensation();
             this.setState({selectNotFound:false})
         }, 3000);
      
    }

    //#endregion  



//#region   
OnselectKesintiBirim =(e)=>{
    
 
    var unvan=this.props.kDamageCompensationStore.getSubeListDamage.find(x=>x.adi ===e)?.adi
    var kodu=this.props.kDamageCompensationStore.getSubeListDamage.find(x=>x.adi ===e)?.kodu
     var baslangictarihi=this.props.kDamageCompensationStore.getSubeListDamage.find(x=>x.adi ===e)?.sistem_InsertTime
    var bitistarihi=this.props.kDamageCompensationStore.getSubeListDamage.find(x=>x.adi ===e)?.kapatilmaTarihi

    var calismabaslangictarihi=  moment(baslangictarihi).format(dateFormat);
     var calismabitistarihi=  moment(bitistarihi).format(dateFormat);
             

        this.setState({calismabaslangictarihi:calismabaslangictarihi})
        this.setState({calismabitisctarihi:calismabitistarihi})
      this.setState({kesintibirimkodu:unvan})
       this.formRef.current?.setFieldsValue({
        'kesintibirimkodu':kodu,
         'kesintiyapilacakunvan':unvan !==undefined ? unvan.includes('AKTARMA') ? 'AKTARMA':'Sube' :'',
    
        });
}
 //#endregion


 async componentDidMount() {
    await this.OnSelectKesintiBirim();
  }




  //#region  keyup oran     
  OnkeyupOran =(e)=>{  

     if(e.target.value >100){
        
        this.formRef.current?.setFieldsValue({
           'tutar':0,      
           });

     }else{
        var result=(Number.parseFloat(this.props.tutar) * e.target.value)/100;     
        this.formRef.current?.setFieldsValue({
           'tutar':result,      
           });

     }
    


  } 
  //#endregion


  
//#region KAYDET
  
onCreate=()=>{ 
    

    var kesintioraniSum = (this.props.kDamageCompensationStore.interruptionList.items.reduce((a, v) => a = a + v.kesintiorani, 0))
    this.formRef!.current!.validateFields().then(async(values:any)=>{  
        
         var gelenoran=values.kesintiorani
         var sum=parseInt(kesintioraniSum.toString())+ parseInt(gelenoran)
         if(sum > 100){
            this.ValidateMessage(true,'Uyari',' Toplam Kesinti Orani %100 Gecemez.')
         }else{

            values.tazminId=this.props.urlId; 
            values.kesintibirimi=this.state.kesintibirimkodu;
            values.calismabaslangictarihi=this.state.calismabaslangictarihi;
            values.calismabitistarihi=this.state.calismabitisctarihi;
            await this.props.kDamageCompensationStore.StorePostKesintiModalCreate(values); 
            this.props.closeModal();
         }
   
       
       
    })


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


  onSearch=(val)=>{

  }

  onChange = e => {
  
    if(e.target.checked == true){
        this.setState({kesintiorani:false})
        this.setState({kesintitxt:'Evet'})
        this.setState({check:true})
    }else{
        this.setState({kesintitxt:'Hayır'})
        this.setState({kesintiorani:true})
        this.setState({check:false})
        this.formRef.current?.setFieldsValue({
            'kesintiorani':0,
             'tutar':0
        
            });

    }
  };



    render() {

  
        const formItemLayout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 10 },
                md: { span: 10 },
                lg: { span: 10 },
                xl: { span: 10 },
                xxl: { span: 10 },
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
                    width={'50%'}
                    visible={this.props.visible}
                    cancelText={L('GiveUp')}
                    okText={L('Save')}
                    onCancel={() => this.props.closeModal() }
                    onOk={this.onCreate}
                    destroyOnClose={true}
                >
                    <Form ref={this.formRef}>
                        <Tabs defaultActiveKey={'1'} size={'large'}>
                            <TabPane tab={L('Kesinti Form')} key={'1'}>
                                <Row >
                                    <Col
                                        xs={{ span: 24, offset: 0 }}
                                        sm={{ span: 24, offset: 0 }}
                                        md={{ span: 15, offset: 0 }}
                                        lg={{ span: 15, offset: 2 }}
                                        xl={{ span: 15, offset: 2 }}
                                        xxl={{ span: 15, offset: 2 }}
                                    >
                                        <Form.Item label={L('Kesinti Birimi')} {...formItemLayout} name={'kesintibirimi'}
                                            rules={[
                                                { required: true, message: L('MissingInputEmpty') },
                                            ]}
                                        >
                                              <Select          
                                                              filterOption={(input, option) =>
                                                                (option?.children &&
                                                                  option?.children?.toString().toLocaleUpperCase().indexOf(input.toLocaleUpperCase()) >=
                                                                    0) ||
                                                                option?.props.value.toString().toLocaleUpperCase().indexOf(input.toLocaleUpperCase()) >= 0
                                                              }

                                                                showSearch
                                                                placeholder={L('PleaseSelect')}
                                                                notFoundContent={this.state.selectNotFound ? <Spin size="small" /> : null}
                                                                showArrow={true}
                                                                //filterOption={true}
                                                         defaultActiveFirstOption={false}                                                                                 //onClick={this.OnSelectKesintiBirim}
                                                         onSelect={this.OnselectKesintiBirim}   
                                                         onSearch={this.onSearch}                    
                                                                >
                                                 
                                                                {
                                                                     this.props.kDamageCompensationStore.getSubeListDamage === undefined
                                                                     ? []
                                                                     : this.props.kDamageCompensationStore.getSubeListDamage.map(
                                                                         (d) => <Option key={d.kodu} value={d.adi} > {d.adi} </Option>
                                                                     )
                                                                }
                                                                
                                                  </Select>
                                        </Form.Item>

                                        <Form.Item label={L('Kesinti Birim Kodu')}  {...formItemLayout} name={'kesintibirimkodu'}
                                            rules={[
                                                { required: true, message: L('MissingInputEmpty') },
                                            ]}>
                                            <Input disabled  />
                                        </Form.Item>

                                        <Form.Item label={L('Kesinti Yapilacak Unvan')} {...formItemLayout} name={'kesintiyapilacakunvan'}
                                            rules={[
                                                { required: true, message: L('MissingInputEmpty') },
                                            ]}>
                                            <Input disabled />
                                        </Form.Item>

                                        <Form.Item label={L('Calisma Baslangic Tarihi')}  {...formItemLayout} name={'calismabaslangictarihi'}
                                            rules={[
                                                { required: false, message: L('MissingInputEmpty') },
                                            ]}>
                                            <DatePicker 
                                            disabled
                                             placeholder={this.state.calismabaslangictarihi}
                                             className="formInputDate"
                                             locale={locale}                                           
                                             format={dateFormat}
                                            //  disabledDate={(d) =>
                                            //     !d || d.isAfter(todayFinish) || d.isSameOrBefore('01-01-2000')
                                            // } 
                                            />

                                        </Form.Item>

                                        <Form.Item label={L('Calisma Bitis Tarihi')}  {...formItemLayout} name={'calismabitistarihi'}  >
                                        <DatePicker 
                                             disabled
                                             placeholder={this.state.calismabitisctarihi.toString()}                                          
                                             className="formInputDate"
                                             locale={locale}                                           
                                             format={dateFormat}
                                            //  disabledDate={(d) =>
                                            //     !d || d.isAfter(todayFinish) || d.isSameOrBefore('01-01-2000')
                                            //   } 
                                            />
                                        </Form.Item>

                                        <Form.Item label={L('Kesinti Durumu')}  {...formItemLayout} name={'kesintidurumu'}  >
                                        
                                            <Checkbox onChange={this.onChange} checked={this.state.check}>{this.state.kesintitxt}</Checkbox>
                                        </Form.Item>



                                        <Form.Item label={L('Kesinti Orani')}  {...formItemLayout} name={'kesintiorani'}
                                            rules={[{ required: true, message: L('MissingInputEmpty')},
                                            { pattern:new RegExp("^[0-9][0-9]?$|^100$"), message: L('En Fazla 100 oran girilebilir')} ]}>
                                            <Input  disabled={this.state.kesintiorani}  type={'number'} maxLength={3}  onKeyUp={this.OnkeyupOran} />
                                        </Form.Item>

                                        <Form.Item label={L('Kesinti Tutari')}  {...formItemLayout} name={'tutar'}
                                            rules={[
                                                { required: true, message: L('MissingInputEmpty') },
                                            ]}>
                                            <Input disabled  />
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



export default InterruptionFormModal

