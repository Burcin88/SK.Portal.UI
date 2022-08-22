
import React from 'react';

import {
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    FormInstance,
    Input,
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
import { AlertOutlined, CheckCircleTwoTone, SendOutlined } from '@ant-design/icons';

import moment from 'moment';
import 'moment/locale/tr';
import locale from 'antd/es/date-picker/locale/tr_TR';
import KDamageCompensationStore from '../../../../stores/kDamageCompensationStore';




export interface ICProps {
    kDamageCompensationStore: KDamageCompensationStore;
    OdemeBirimiBolgeListe: any;
    SurecSahiniBolgeListe: any;
    LastIdDamageCompensation: number;
    urlId: number;
    processOwnerRegionFunc: (string) => void;
    filesMultitableFunc:([])=>void;
}


export interface IState {
    Ktno: string;
    lblQuery: string,
    RadioQuery: string;
    isLoading: boolean;
    tazminStatu: string,
    pageLoding: boolean,
    KnowUnknown: boolean,
    GetirLoding: boolean,
    fileControl: boolean,
    filesMultitable: any,
    TcInputdisable: boolean,
    VkInputdisable: boolean,
    TcInputrequired: boolean,
    VkInputrequired: boolean,
    KnowUnknownQuery: boolean,
    sistemInsertTime: string,
    lblEvrakSeriNoAndIrsaliye: string,
}

class CompensationFormUpdate extends React.Component<ICProps, IState>  {



    formRef = React.createRef<FormInstance>();
    formRefQuery = React.createRef<FormInstance>();
    formFileRef = React.createRef<FormInstance>();


    state = {
        Ktno: '0',
        RadioQuery: '1',
        tazminStatu: '',
        isLoading: true,
        pageLoding: false,
        KnowUnknown: true,
        GetirLoding: false,
        fileControl: false,
        filesMultitable: [],
        TcInputdisable: true,
        VkInputdisable: true,
        TcInputrequired: false,
        VkInputrequired: false,
        KnowUnknownQuery: false,
        lblQuery: 'Kargo Takip No',
        sistemInsertTime: '2022-01-01',
        lblEvrakSeriNoAndIrsaliye: 'Evrak Seri Sira No',
    };



    tazminBilgileriGetir = async () => {

        this.props.kDamageCompensationStore
            .StoregetDamageComppensationViewById({ id: this.props.urlId })
            .then(() => { 
                this.setState({ RadioQuery: this.props.kDamageCompensationStore.damageCompensationViewClass.durumu })
                this.setState({ Ktno: this.props.kDamageCompensationStore.damageCompensationViewClass.takipNo })
                this.setState({ tazminStatu: this.props.kDamageCompensationStore.damageCompensationViewClass.tazminStatu })
            }).then(() => {

                this.setState({ isLoading: false });
                this.formRef.current?.setFieldsValue({
                    ...this.props.kDamageCompensationStore.damageCompensationViewClass
                })
            });
    }

    componentDidMount = async () => {
        await this.tazminBilgileriGetir();
    }




    //#region  GUNCELLEME 
    onclickUpdate =async()=>{

        if(this.state.fileControl ===true){
            this.ValidateMessage(true,'Dosya Hatasi','Lutfen Dosya Uzantisini Kontrol Ediniz Ve Yeniden Yukleyiniz.')
        }
        else
        {
            const form = this.formFileRef.current;  
            form!.validateFields().then(async (values: any) => {
               
              values.FileTazminDilekcesi = JSON.stringify(this.state.filesMultitable);
              values.TazminId=this.props.urlId;
               await this.props.kDamageCompensationStore.StoregetFileUpdateDamageCompansation(values).then(()=>{
                    this.props.kDamageCompensationStore.StorePostUpdateFileAfter(this.props.urlId).then(()=>{
                        this.ValidateMessage(false,'Basarili','Dosyalariniz Guncellendi')
                    });
               });

              

       
          }).catch((err) => console.log(err))

        }

      
        

    };

    //#endregion 
       //#region  MULTI FILE DOSYASI
        OnDoneGetFile=(files)=>{ 
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
         this.ValidateMessage(true,'Dosya Hatasi','Lutfen Dosya Uzantisini Kontrol Ediniz Ve Yeniden Yukleyiniz.')
         this.setState({fileControl:true})
        }else  {
         this.setState({fileControl:false})
         this.setState({filesMultitable:files})
         console.log('JSON=>', JSON.stringify(this.state.filesMultitable));
        }  
     }
     //#endregion


    //#region BILGILENDIRME MESAJI METOT
     ValidateMessage=async(typ:boolean ,headerMsg:string,msg:string)=>{

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




    render() {

        const dateFormat = 'YYYY-MM-DD';
        var today = new Date();
        const todayFinish = moment(today).format(dateFormat);

        return (

            this.state.isLoading ? <></> :
                <>
                    <Spin spinning={this.state.pageLoding}
                        tip='Isleminiz Tamamlaniyor.Listeleme Sayfasina Yonlendiriliyorsunuz.'
                        size='large'>
                        <Divider orientation="left">{L('Tazmin Bilgileri')}</  Divider>
                        <Form
                            initialValues={{
                                tazminStatu: this.state.tazminStatu,
                                tazminNo: this.props.urlId
                            }}

                            labelCol={{ flex: '145px' }} labelAlign="right" wrapperCol={{ flex: 5 }} colon={false} >
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Tazmin Numarasi')} className='InputDisable' name="tazminNo" rules={[{ required: true }]} >
                                        <Input
                                            disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Tazmin Statu')} name='tazminStatu' rules={[{ required: true }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Divider orientation="left">{L('Sorgulama')}</Divider>
                        <Form
                            initialValues={{
                                RadioQuery: this.state.RadioQuery
                            }}
                            ref={this.formRefQuery} labelCol={{ flex: '145px' }} labelAlign="right" wrapperCol={{ flex: 1 }} colon={false} >
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Durumu')} name="RadioQuery" rules={[{ required: true }]} >

                                        <Radio.Group disabled
                                        //onChange={onChangeRadioRadioQuery}
                                        >
                                            <Radio value={'1'}>{L('Biliniyor')}</Radio>
                                            <Radio value={'2'}>{L('Bilinmiyor')}</Radio>

                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L(this.state.lblQuery)} name="takipNo" > 
                                        <Input
                                            value={this.state.Ktno}
                                            disabled
                                        // onChange={OnchangeTakipNo}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={{ order: 12, offset: 1 }} sm={{ order: 12, offset: 1 }} md={{ order: 3, offset: 1 }} lg={{ order: 4, offset: 1 }} >
                                    <Button
                                        type="primary"
                                        icon={<SendOutlined />}
                                        disabled
                                        // onClick={OnclickGetir}
                                        loading={this.state.GetirLoding}

                                    >
                                        {L('Getir')}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Divider orientation="left">{L('Gonderi Bilgileri')}</Divider>
                        <Form ref={this.formFileRef} name="wrap" labelCol={{ flex: '145px' }} labelAlign="right" wrapperCol={{ flex: 1 }} colon={false} >
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Evrak Olusturma Tarihi')} name="Sistem_InsertTime"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}
                                    >
                                        <DatePicker
                                            className="formInputDate"
                                            locale={locale}
                                            disabledDate={(d) =>
                                                !d || d.isAfter(todayFinish) || d.isSameOrBefore('2000-01-01')
                                            }
                                            format="YYYY-MM-DD"

                                            placeholder={L(this.state.sistemInsertTime)}
                                            disabled
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L(this.state.lblEvrakSeriNoAndIrsaliye)} name="evrakSeriNo"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Gonderici Kodu')} name="gonderenKodu"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]} >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>

                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Gonderici Unvan')} name="gonderenUnvan"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Alici Kodu')} name="aliciKodu"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>

                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Alici Unvan')} name="aliciUnvan"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Cikis Sube Adi')} name="cikis_Sube_Unvan"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>

                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Varis Sube Adi')} name="varis_Sube_Unvan"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Kargo Tipi')} name="birimi"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>

                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Parca Adedi')} name="adet"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider orientation="left">{L('Tazmin Bilgileri')}</Divider>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Tazmin Talep Tarihi')} name="Tazmin_Talep_Tarihi"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <DatePicker
                                            disabled
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
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Tazmin Tipi')} name="Tazmin_Tipi"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Select disabled className="formInput" placeholder={L('PleaseSelect')} allowClear>
                                            <Select.Option value="1">{L('Hasar')}</Select.Option>
                                            <Select.Option value="2">{L('Kayip')}</Select.Option>
                                            <Select.Option value="3">{L('Gec Teslimat')}</Select.Option>
                                            <Select.Option value="4">{L('Musteri Memnuniyeti')}</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Tazmin Musterisi')} name="tazmin_Musteri_Tipi"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Radio.Group disabled defaultValue={this.state.RadioQuery}
                                        >
                                            <Radio value="1">{L('Gonderen')}</Radio>
                                            <Radio value="2">{L('Alici')}</Radio>
                                            <Radio value="3">{L('Farkli Cari')}</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Odenecek Musteri Tipi')} name="Odeme_Musteri_Tipi"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Select disabled className="formInput" allowClear placeholder={L('PleaseSelect')}
                                        //onChange={OnchangeOdeneekMusteriTipi} 
                                        >
                                            <Select.Option value="1">{L('Bireysel')}</Select.Option>
                                            <Select.Option value="2">{L('Kurumsal')}</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('TC Kimlik No')} name="tcK_NO"
                                        rules={[{ required: this.state.TcInputrequired, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Vergi Kimlik No')} name="vK_NO"
                                        rules={[{ required: this.state.VkInputrequired, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Odeme Birimi Bolge')} name="Odeme_Birimi_Bolge"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Select disabled className="formInput" placeholder={L('PleaseSelect')} allowClear  >
                                            {this.props.OdemeBirimiBolgeListe}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Surec Sahibi Bolge')} name="Surec_Sahibi_Birim_Bolge"
                                        rules={[{ required: false, message: L('MissingInputEmpty') }]}>
                                        <Select disabled onChange={  this.props.processOwnerRegionFunc}
                                            className="formInput" placeholder={L('PleaseSelect')} allowClear>
                                            {this.props.SurecSahiniBolgeListe}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Talep Edilen Tutar')} name="Talep_Edilen_Tutar"
                                        rules={[
                                            { required: false, message: L('MissingInputEmpty') },
                                            {
                                                pattern: /^\$?([0-9]{1,1},([0-9]{1,1},)*[0-9]{1,1}|[0-9]+)(.[0-9][0-9])?$/,
                                                message: L('MissingNumber'),
                                            }
                                        ]
                                        }>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider orientation="left">{L('Tazmin Bilgilendirme')}</Divider>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('SMS')} name="telefon"
                                        rules={[
                                            {
                                                required: false,
                                                message: L('MissingInputEmpty')
                                            },
                                            {
                                                pattern: /^[\d]{10,11}$/,
                                                message: L('MissingInputPhone'),
                                            }
                                        ]}>
                                        <Input disabled type='tel' />
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Email')} name="Email"
                                        rules={[
                                            { required: false, message: L('MissingInputEmpty') },
                                            { type: 'email', message: L('MissingInputEmail') }
                                        ]}>
                                        <Input disabled type='email' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider orientation="left">{L('Tazmin Belgeleri')}</Divider>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Dosyalar')} name="FileTazminDilekcesi"  >
                                        <FileBase64 
                                            //onDone={OnDoneGetFile.bind(this)} 
                                           // onDone={this.props.filesMultitableFunc.bind(this)}
                                            //onDone={OnDoneGetFile.bind(this)} 
                                            onDone={this.OnDoneGetFile.bind(this)} 
                                            multiple={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Link')} name="url"  >
                                        <Input  type='text' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ float: 'right' }}>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 3 }} >
                                    <Space style={{ width: '100%' }}>
                                        <Button                                           
                                            type="primary"
                                            onClick={this.onclickUpdate}
                                            icon={<SendOutlined />}
                                            htmlType="button"
                                        >
                                            {L('Guncelle')}
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Spin>
                </>);
    }
}

export default CompensationFormUpdate;


