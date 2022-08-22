
import React from 'react';

import {
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    FormInstance,
    Input,
    Radio,
    Row,
    Select,
    Spin,

} from 'antd';

import '../index.less';
import { L } from '../../../../lib/abpUtility';
import FileBase64 from 'react-file-base64';
import { SendOutlined } from '@ant-design/icons';

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
    SurecSahiniBolgeVisable:boolean;
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
    lblEvrakSeriNoAndIrsaliye: string;  
    tazminTalepTarihi: string;
    tazminMusteriTipi
}

class CompensationForm extends React.Component<ICProps, IState>  {



    formRef = React.createRef<FormInstance>();
    formRefQuery = React.createRef<FormInstance>();



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
        TcInputrequired: true,
        VkInputrequired: true,
        KnowUnknownQuery: false,
        lblQuery: 'Kargo Takip No',
        sistemInsertTime: '2000-01-01',
        lblEvrakSeriNoAndIrsaliye: 'Evrak Seri Sira No',
        tazminTalepTarihi:'2000-01-01',
        tazminMusteriTipi:''
    };

    tazminBilgileriGetir = async () => {

        this.props.kDamageCompensationStore
            .StoregetDamageComppensationViewById({ id: this.props.urlId })
            .then(() => { 
                this.setState({ RadioQuery: this.props.kDamageCompensationStore.damageCompensationViewClass.durumu })
                this.setState({ Ktno: this.props.kDamageCompensationStore.damageCompensationViewClass.takipNo })
                this.setState({ tazminStatu: this.props.kDamageCompensationStore.damageCompensationViewClass.tazminStatu })
                this.setState({ tazminTalepTarihi : this.props.kDamageCompensationStore.damageCompensationViewClass.tazmin_Talep_Tarihi})
                this.setState({ sistemInsertTime : this.props.kDamageCompensationStore.damageCompensationViewClass.sistem_InsertTime})
                
                if(this.props.kDamageCompensationStore.damageCompensationViewClass.tazmin_Musteri_Tipi == 'AliciCari'){
                    this.setState({tazminMusteriTipi : '2'})
                }else if(this.props.kDamageCompensationStore.damageCompensationViewClass.tazmin_Musteri_Tipi == 'GonderenCari'){
                    this.setState({tazminMusteriTipi : '1'})
                }else{
                    this.setState({tazminMusteriTipi : '3'})
                }

              
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
                                        {console.log(this.state.Ktno)}
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
                        <Form ref={this.formRef} name="wrap" labelCol={{ flex: '145px' }} labelAlign="right" wrapperCol={{ flex: 1 }} colon={false} >
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
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Gonderici Kodu')} name="gonderenKodu"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]} >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>

                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Gonderici Unvan')} name="gonderenUnvan"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Alici Kodu')} name="aliciKodu"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>

                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Alici Unvan')} name="aliciUnvan"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Cikis Sube Adi')} name="cikis_Sube_Unvan"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>

                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Varis Sube Adi')} name="varis_Sube_Unvan"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Kargo Tipi')} name="birimi"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>

                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Parca Adedi')} name="adet"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider orientation="left">{L('Tazmin Bilgileri')}</Divider>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Tazmin Talep Tarihi')} name="Tazmin_Talep_Tarihi"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <DatePicker
                                            disabled
                                            locale={locale}
                                            
                                            format="YYYY-MM-DD"
                                            defaultPickerValue={moment(this.state.tazminTalepTarihi)}
                                            placeholder={this.state.tazminTalepTarihi}

                                        />                                      
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Tazmin Tipi')} name="tazmin_Tipi"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
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
                                    <Form.Item label={L('Tazmin Musterisi')} name="Tazmin_Musteri_Tipi"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Radio.Group  disabled
                                         value={this.state.tazminMusteriTipi}  
                                        defaultValue={this.state.tazminMusteriTipi}
                                        >
                                            <Radio value="1">{L('Gonderen')}</Radio>
                                            <Radio value="2">{L('Alici')}</Radio>
                                            <Radio value="3">{L('Farkli Cari')}</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Odenecek Musteri Tipi')} name="odeme_Musteri_Tipi"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
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
                                    <Form.Item label={L('Odeme Birimi Bolge')} name="odeme_Birimi_Bolge"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Select disabled className="formInput" placeholder={L('PleaseSelect')} allowClear  >
                                            {this.props.OdemeBirimiBolgeListe}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                            
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} offset={1} >
                                    <Form.Item label={L('Surec Sahibi Bolge')} name="surec_Sahibi_Birim_Bolge"
                                        rules={[{ required: true, message: L('MissingInputEmpty') }]}>
                                        <Select  onChange={  this.props.processOwnerRegionFunc}
                                            className="formInput" placeholder={L('PleaseSelect')} allowClear>
                                            {this.props.SurecSahiniBolgeListe}
                                        </Select>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Talep Edilen Tutar')} name="talep_Edilen_Tutar"
                                        rules={[
                                            { required: true, message: L('MissingInputEmpty') },
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
                                    <Form.Item label={L('Email')} name="email"
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
                                        <FileBase64 disabled
                                            //onDone={OnDoneGetFile.bind(this)} 
                                            onDone={this.props.filesMultitableFunc.bind(this)}
                                            //onDone={OnDoneGetFile.bind(this)} 
                                            multiple={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 4 }} >
                                    <Form.Item label={L('Link')} name="url"  >
                                        <Input disabled type='text' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ float: 'right' }}>
                                {/* <Col span={8} xs={{ order: 12 }} sm={{ order: 12 }} md={{ order: 3 }} lg={{ order: 3 }} >
                                    <Space style={{ width: '100%' }}>
                                        <Button
                                            disabled
                                            type="primary"
                                            //onClick={onclickSaveDamageCompensation}
                                            icon={<SendOutlined />}
                                            htmlType="submit"
                                        >
                                            {L('Kaydet')}
                                        </Button>
                                    </Space>
                                </Col> */}
                            </Row>
                        </Form>
                    </Spin>
                </>);
    }
}

export default CompensationForm;


