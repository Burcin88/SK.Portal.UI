import React from 'react';

import {
  Button,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  notification,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
} from 'antd';

import '../index.less';
import { L } from '../../../../lib/abpUtility';
import { AlertOutlined, CheckCircleTwoTone, DeleteOutlined } from '@ant-design/icons';
import InterruptionFormModal from '../components/interruptionFormModal';
import KDamageCompensationStore from '../../../../stores/kDamageCompensationStore';
import moment from 'moment';


export interface ICProps {
  kDamageCompensationStore: KDamageCompensationStore;
  urlId: number;
  title:string;
  urlStatusPage:string;
}

export interface IState {
  pageLoding: boolean;
  modalVisible: boolean;
  price: string;
  list:any;
  urlStatusPage:string
}







class InterruptionForm extends React.Component<ICProps, IState>  {

  // formRefEvalution = React.createRef<FormInstance>();
  formRef = React.createRef<FormInstance>();
  state = {
    pageLoding: false,
    modalVisible: false,
    price: '0',
    list:[],
    urlStatusPage:''
  };
   




  componentDidMount = async () => {
    
    await this.getAllKesintiListe()
    await this.props.kDamageCompensationStore.StoregetDamageComppensationViewById({ id: this.props.urlId })

    if (this.props.kDamageCompensationStore.damageCompensationViewClass.evaTalep_Edilen_Tutar != null) {
      this.setState({ price: this.props.kDamageCompensationStore.damageCompensationViewClass.evaTalep_Edilen_Tutar })
    }
    else {
      this.setState({ price: this.props.kDamageCompensationStore.damageCompensationViewClass.talep_Edilen_Tutar })
    }
 

  }



  //#region  KesintiLsitesi
  getAllKesintiListe = async () => {
   
    await this.props.kDamageCompensationStore.StoreGetKesintiListesi(this.props.urlId);
  }
  //#endregion


  //#region   
  onConfirmDelete = async (e) => {
    await this.props.kDamageCompensationStore.delete({
      id: e
    }).then(()=>{
      this.setState({ modalVisible: false })      
      this.getAllKesintiListe();
   
    });
  }
  //#endregion


  render() {

    const { interruptionList } = this.props.kDamageCompensationStore;

    //#region  SATIR EKLE ONCLICK
    const closeModal = () => {
      this.setState({ modalVisible: false })        
       this.getAllKesintiListe().then(()=>{
        this.setState({ modalVisible: false })      
        this.getAllKesintiListe();
       });

    }

    const OnClickAdd = () => {
      var kesintioraniSum = (this.props.kDamageCompensationStore.interruptionList.items.reduce((a, v) => a = a + v.kesintiorani, 0))
      if (kesintioraniSum >= 100) {
        ValidateMessage(true, 'Bilgilendirme', 'Kesinti Orani %100 Gecmektedir.')
      } else {
        this.setState({ modalVisible: true })  
        this.getAllKesintiListe();
      }
    }

    //#endregion


    //#region BILGILENDIRME MESAJI METOT
    const ValidateMessage = async (typ: boolean, headerMsg: string, msg: string) => {

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



    //#region OnClickOnayaGonder
    const OnClickOnayaGonder=()=>{

      this.props.kDamageCompensationStore.StoreUpdateDamageStatus({
        tazminId: this.props.urlId,
        surecsahibibolge: '',
        unvan: this.props.title,
        file: ''
      }).then(()=>{      
        setTimeout(() => {
          this.setState({pageLoding :true}) 
          window.location.href='/hasartazminsorgulama'; 
        }, 1000);
 
      });
      
    }
    //#endregion




    //#region OnClickOnayla
    const OnClickOnaylaGonder=()=>{

      this.props.kDamageCompensationStore.StoreUpdateDamageStatus({
        tazminId: this.props.urlId,
        surecsahibibolge: '',
        unvan: this.props.title,
        file: ''
      }).then(()=>{
        setTimeout(() => {
          this.setState({pageLoding :true}) 
          window.location.href='/hasartazminsorgulama'; 
        }, 1000);
      });
    }
    //#endregion

    




    const columnsTable = [
      {
        title: 'Islem',
        dataIndex: 'id',
        width: '3%',
        render: (_, record) =>
          interruptionList.items.length >= 1 ? (
            <Popconfirm okText='Evet' cancelText='Hayir'  title="Silinsin mi?" onConfirm={() => this.onConfirmDelete(record.id)}>
              <DeleteOutlined />
            </Popconfirm>
          ) : null,
      },

      {
        title: 'Kesinti Birimi',
        dataIndex: 'kesintibirimi',
        width: '10%',

      },
      {
        title: 'Kesinti Birim Kodu',
        dataIndex: 'kesintibirimkodu',
        width: '10%',


      },
      {
        title: 'Kesinti Yapilacak Sube',
        dataIndex: 'kesintiyapilacakunvan',
        width: '10%',

      },

      {
        title: 'Calisma Baslangic Tarihi',
        dataIndex: 'calismabaslangictarihi',
        width: '10%',
        render: (text) => moment(text).format('DD-MM-YYYY')
      },

      {
        title: 'Calisma Bitis Tarihi',
        dataIndex: 'calismabitistarihi',
        width: '10%',
        render: (text) => moment(text).format('DD-MM-YYYY')

      },
      {
        title: 'Kesinti Orani',
        dataIndex: 'kesintiorani',
        width: '10%',

      },
      {
        title: 'Kesinti Tutari',
        dataIndex: 'tutar',
        width: '10%',

      }
    ];

    return (
      <>
        <Spin spinning={this.state.pageLoding}
          tip='Isleminiz Tamamlaniyor.Havuza Yonlendiriliyorsunuz.'
          size='large'>
          <Divider orientation="left">{L('Odeme Bilgisi')}</  Divider>
          <Form labelCol={{ flex: '145px' }} labelAlign="right" wrapperCol={{ flex: 5 }} colon={false}>
            <Row>
              <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                <Form.Item label={L('Odenecek Tutar')} name="odenecek_tutar"> 
                  <Input disabled value={this.state.price} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider orientation="left">{L('Kesinti Tablosu')}</  Divider>

          <Table 
            loading={interruptionList === undefined ? true : false}
            columns={columnsTable}
            dataSource={interruptionList === undefined ? [] : interruptionList.items}
          />


    < InterruptionFormModal
                closeModal={closeModal}
                visible={this.state.modalVisible}
                // formRef={this.formRef} 
                kDamageCompensationStore={this.props.kDamageCompensationStore}
                tutar={this.state.price}
                urlId={1}
              />

           


          <Space style={{ width: '100%' }}>
            
              <Button 
               disabled ={this.props.urlStatusPage === 'view' ? true : false}
                onClick={OnClickAdd}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
              >
                Satir Ekle
              </Button>
          </Space>
         
          <Row style={{ float: 'right' }}>
          <Space style={{ width: '100%'  ,float:'right'}}>
                  
                  {
                    this.props.title === 'Hasar Tazmin Uzman Yrd.'  ?              
                         <Button
                         disabled ={this.props.urlStatusPage === 'view' ? true : false}
                         onClick={OnClickOnayaGonder}
                         type="default"
                         style={{
                           marginBottom: 16,
                         }}
                       >
                       Onaya Gonder
                     </Button> : null
       
                  }
       
       
                 {
                    this.props.title === 'Hasar Tazmin Uzmanı' ?              
                         <Button
                         disabled ={this.props.urlStatusPage === 'view' ? true : false}
                         onClick={OnClickOnayaGonder}
                         type="default"
                         style={{
                           marginBottom: 16,
                         }}
                       >
                       Onaya Gonder
                     </Button> : null
       
                  }
       
          
                  
                 {
                    this.props.title === 'Hasar Tazmin Müdür Yrd.' ?              
                         <Button
                         disabled ={this.props.urlStatusPage === 'view' ? true : false}
                         onClick={OnClickOnayaGonder}
                         type="default"
                         style={{
                           marginBottom: 16,
                         }}
                       >
                       Onaya Gonder
                     </Button> : null
       
                  }
       
       
       
        
                   {
                   this.props.title ===  'Genel Müdür Yrd.'
                     ?             
                         <Button
                         disabled ={this.props.urlStatusPage === 'view' ? true : false}
                         onClick={OnClickOnaylaGonder}
                         type="default"
                         style={{
                           marginBottom: 16,
                         }}
                       >
                       Onayla
                     </Button> :
                     null          
                   }
       
       
       
                   
                 {
                   this.props.title ===  'Müşteri Deneyimi Müdürü'
                     ?             
                         <Button
                         disabled ={this.props.urlStatusPage === 'view' ? true : false}
                         onClick={OnClickOnaylaGonder}
                         type="default"
                         style={{
                           marginBottom: 16,
                         }}
                       >
                       Onayla
                     </Button> :
                     null
                   
                   }
                        
                 {
                   this.props.title ===  'Satış Müdürü'
                     ?             
                         <Button
                         disabled ={this.props.urlStatusPage === 'view' ? true : false}
                         onClick={OnClickOnaylaGonder}
                         type="default"
                         style={{
                           marginBottom: 16,
                         }}
                       >
                       Onayla
                     </Button> :
                     null
                   
                   }
                 </Space>
            
          </Row>
              


        </Spin>
      </>);
  }
}



export default InterruptionForm
