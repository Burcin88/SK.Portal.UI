/* eslint-disable */
import './index.less';
import React from 'react';
import 'moment/locale/tr';
import { Link } from 'react-router-dom';
import { L } from '../../../lib/abpUtility';
import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import { EntityDto } from '../../../services/dto/entityDto';
import AppComponentBase from '../../../components/AppComponentBase';
import KDamageCompensationStore from '../../../stores/kDamageCompensationStore';
import OpsHierarchyStore from '../../../stores/opsHierarchyStore';
import {  FilterOutlined, OrderedListOutlined, SettingOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Form,
  FormInstance,
  Input,
  Menu,
  PageHeader,
  Radio,
  Row,
  Space,
  Table,
  Tag,
} from 'antd'
import { GetAllDamageCompensation } from '../../../services/kDamageCompensations/dto/GetAllDamageCompensation'
import CompensationStatus from  '../../../services/kDamageCompensations/dto/compensationStatus'
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import moment from 'moment';

export interface IProps {
  kDamageCompensationStore: KDamageCompensationStore;
  opsHierarchyStore:OpsHierarchyStore
}

export interface IState {
  listdata: GetAllDamageCompensation[];
  modalVisible: boolean;
  tazminid: number;
  control:boolean;
}

@inject(Stores.OpsHierarchyStore)
@inject(Stores.KDamageCompensationStore)
@observer
class DamageCompensationList extends AppComponentBase<IProps, IState> {
  formRef = React.createRef<FormInstance>();
  formReffilter = React.createRef<FormInstance>();

  state = {
    listdata: this.props.kDamageCompensationStore.getAllDamageCompensationStoreClass,
    modalVisible: false,
    tazminid: 0,
    control:false
  };

  //tazmin listesi
  getalldamagecompensaation = async () => {
    try {
      await this.props.kDamageCompensationStore.StoregetAllDamageCompansation(129);
      this.setState({
        listdata: this.props.kDamageCompensationStore.getAllDamageCompensationStoreClass,
      });    

    } catch (e) {
      console.log('ERROR', e);
    }
  };

  //tazmin listesi Filtre
  getFilterdamagecompensaation = async () => {
    const form = this.formReffilter.current;
    form!.validateFields().then(async (values: any) => {

      if (values.start === undefined) {
        values.start = '';
      }
      if (values.finish === undefined) {
        values.finish = '';
      }

      let tazminno = false;
      let tazminid = false;
      if (values.raidocheck === 2) {
        tazminno = true;
      }
      if (values.raidocheck === 1) {
        tazminid = true;
      }

      if (values.searchtxt == undefined) {
        values.searchtxt = '';
      }

      await this.props.kDamageCompensationStore.StoregetFilterDamageCompansation({
        checktakipNo: tazminno,
        checktazminId: tazminid,
        search: values.searchtxt,
        start: values.start,
        finish: values.finish,
      });
      this.setState({
        listdata: this.props.kDamageCompensationStore.getAllDamageCompensationStoreClass,
      });
      form!.resetFields();
    });
  };

  //tazmin tum listesi Filtre
  getFilterdamagecompensaationAll = async () => {
    const form = this.formReffilter.current;
    form!.validateFields().then(async (values: any) => {
      values.start = '';
      values.finish = '';

      let tazminno = false;
      let tazminid = false;
      values.searchtxt = '';

      await this.props.kDamageCompensationStore.StoregetFilterDamageCompansation({
        checktakipNo: tazminno,
        checktazminId: tazminid,
        search: values.searchtxt,
        start: values.start,
        finish: values.finish,
      });
      this.setState({
        listdata: this.props.kDamageCompensationStore.getAllDamageCompensationStoreClass,
      });
      form!.resetFields();
    });
  };



  getCompensationStatusCheck=async()=>{
    this.setState({control:await this.props.opsHierarchyStore.GetCompensationStatusCheck()})  
  }


  async componentDidMount() {
    await this.getalldamagecompensaation();
    await this.getCompensationStatusCheck();
  }

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async UpdateModalOpen(entityDto: EntityDto) {

    this.setState({ tazminid: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({
        ...this.props.kDamageCompensationStore.getCreateDamageInput,
      });
    }, 100);
  }

  public render() {
    const { getAllDamageCompensationStoreClass } = this.props.kDamageCompensationStore;
    const columns = [
      {
        title: L('CompensationNumber') ,
        dataIndex: 'tazminId',
        key: 'tazminId',
        width: '5%',
        sorter: (a, b) => a.tazminNo - b.tazminNo,
        responsive: ['sm'] as Breakpoint[]
  
      },

      {
        title: L('CargoTrackingNumber'),
        dataIndex: 'takipNo',
        key: 'takipNo',
        width: '15%',
        sorter: (a, b) => a.takipNo - b.takipNo,
        responsive: ['sm'] as Breakpoint[]
      },

      {
        title: L('Web Siparis Kodu'),
        dataIndex: 'webSiparisKodu',
        key: 'webSiparisKodu',
        width: '15%',
        sorter: (a, b) => a.webSiparisKodu - b.webSiparisKodu,
        responsive: ['sm'] as Breakpoint[]
      },
      {
        title: L('CompensationType'),
        dataIndex: 'tazminTipi',
        key: 'tazminTipi',
        filters: [
          { text: 'Hasar', value: 'Hasar' },
          { text: 'Kayıp', value: 'Kayıp' },
          { text: 'Geç Teslimat', value: 'Geç Teslimat' },
          { text: 'Müşteri Memnuniyeti', value: 'Müşteri Memnuniyeti' },
        ],
        onFilter: (value, record) => record.tazminTipi.includes(value),
        ellipsis: true,
        responsive: ['sm'] as Breakpoint[]
      },

      {
        title: L('CompensationStatus'),
        dataIndex: 'gelecekTazminStatu',
        key: 'gelecekTazminStatu',
        responsive: ['sm'] as Breakpoint[],
        width: '20%',
        render: (text : string) =>
          
          text === "Taslak" ? (           
            <Tag style={{ padding: 5 }} color="#fa541c">
             {CompensationStatus.Taslak}   
            </Tag> ) : 
            text =="TazminEksikEvrak" ?(
            <Tag style={{ padding: '2px 5px' }} color="#fa541c">
               { CompensationStatus.TazminEksikEvrak}
             </Tag>
            ) :
            text =="TazminOlusturuldu" ?(
              <Tag style={{ padding: '2px 5px' }} color="#1da57a">
                 {CompensationStatus.TazminOlusturuldu}
               </Tag>
              ) :
              <Tag style={{ padding: '2px 5px' }} color="#faad14"> 
                    {text} 
                 {/* { CompensationStatus[text] } */}
               </Tag>
 
            
      },
      {
        title: L('CompensationRequestDate'),
        dataIndex: 'tazminTarihi',
        key: 'tazminTarihi',
        responsive: ['sm'] as Breakpoint[],
        render: (text) => moment(text).format('DD-MM-YYYY')
      },
      {
        title: L('ProcessOwnerRegion'),
        dataIndex: 'surecSahibiBolge',
        key: 'surecSahibiBolge',
        filters: [
          { text: 'Konya Bölge Md.', value: 'Konya Bölge Md.' },
          { text: 'Erzurum Bölge Md.', value: 'Erzurum Bölge Md.' },
          { text: 'Antalya Bölge Md.', value: 'Antalya Bölge Md.' },
          { text: 'Eskişehir Bölge Md.', value: 'Eskişehir Bölge Md.' },
          { text: 'Bursa Bölge Md.', value: 'Bursa Bölge Md.' },
          { text: 'Batı Karadeniz Bölge Md.', value: 'Batı Karadeniz Bölge Md.' },
          { text: 'Kayseri Bölge Md.', value: 'Kayseri Bölge Md.' },
          { text: 'Denizli Bölge Md.', value: 'Denizli Bölge Md.' },
          { text: 'İst. Surdışı Bölge Md.', value: 'İst. Surdışı Bölge Md.' },
          { text: 'Trakya Bölge Md.', value: 'Trakya Bölge Md.' },
          { text: 'İst. Boğaziçi Bölge Md.', value: 'İst. Boğaziçi Bölge Md.' },
          { text: 'İzmir Bölge Md.', value: 'İzmir Bölge Md.' },
          { text: 'Ankara Bölge Md.', value: 'Ankara Bölge Md.' },
          { text: 'Karadeniz Bölge Md.', value: 'Karadeniz Bölge Md.' },
          { text: 'Gaziantep Bölge Md.', value: 'Gaziantep Bölge Md.' },
          { text: 'Diyarbakır Bölge Md.', value: 'Diyarbakır Bölge Md.' },
          { text: 'Çukurova Bölge Md.', value: 'Çukurova Bölge Md.' },
          { text: 'İst. Anadolu (1) Bölge Md.', value: 'İst. Anadolu (1) Bölge Md.' },
          { text: 'İst. Anadolu (2) Bölge Md.', value: 'İst. Anadolu (2) Bölge Md.' },
          { text: 'Merkez', value: 'Merkez' },
        ],
        onFilter: (value, record) => record.surecSahibiBolge.includes(value),
        ellipsis: true,
        responsive: ['sm'] as Breakpoint[]
      },

      {
        title: L('AddedUser'),
        dataIndex: 'ekleyenKullanici',
        key: 'ekleyenKullanici',
        
        responsive: ['sm'] as Breakpoint[]
      },

      {
        title: L('Operations'),
        key: 'islemler',
        render: (text: string, item: any) => (
          <div>
                                                   
            <Dropdown

              trigger={['click']}
              overlay=
              {            
                <Menu>
                  {  item.btnDuzenle ?
                    <Menu.Item>
                    <Link to={{ pathname:`/newindex/up/${item.tazminNo}` }}>{L('DamageCompensationEdit')}</Link>
                    </Menu.Item> : ''
                  }
                                   
                  {
                    item.btnDegerlendir ?
                    <Menu.Item>
                    <Link to={{ pathname: `/newindex/deg/${item.tazminNo}` }}>{L('DamageCompensationEvalution')}</Link>
                  </Menu.Item> :''
                    
                  }
                
                  {
                    item.btnGoruntule ? 
                    <Menu.Item  >
                    <Link to={{ pathname: `/newindex/view/${item.tazminNo}` }}>{L('DamageCompensationView')}</Link>
                  </Menu.Item> :''

                  }
                 

                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon={<SettingOutlined />}>
               {L('Operations')}
              </Button>
            </Dropdown>
          </div>
        ),
        responsive: ['sm'] as Breakpoint[]
      },
    ];

    return (
      <>
        <React.Fragment>
          <Space direction="vertical"> 
            <Card hoverable>
              <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      {this.isGranted('items.dashboard.view') ? (
                        <Link to="/dashboard">{L('Dashboard')}</Link>
                      ) : (
                        <Link to="/home">{L('Dashboard')}</Link>
                      )}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item> {L('DamageCompensation')} </Breadcrumb.Item>
                    <Breadcrumb.Item>{L('DamageCompensationList')} </Breadcrumb.Item>
                  </Breadcrumb>
                }
              ></PageHeader>
            </Card>

            <Card hoverable>
              <Form ref={this.formReffilter} initialValues={{ remember: false }}>

                <Row >

                 <Col xs={{ span: 6, offset: 0 }}
                    sm={{ span: 6, offset: 0 }}
                    md={{ span: 6, offset: 0 }}
                    lg={{ span: 6, offset: 0 }}
                    xl={{ span: 6, offset: 0 }}
                    xxl={{ span: 6, offset: 0 }}
                    
                    >
                 <Form.Item label={<label>Seçim</label>} name="raidocheck">
                      <Radio.Group>
                        <Space direction="horizontal">
                          <Radio value={1}>{L('CompensationNumber')}</Radio>
                          <Radio value={2}>{L('CargoTrackingNumber')}</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                 </Col>  


                 <Col xs={{ span: 6, offset: 0 }}
                    sm={{ span: 6, offset: 0 }}
                    md={{ span: 6, offset: 0 }}
                    lg={{ span: 6, offset: 0 }}
                    xl={{ span: 6, offset: 0 }}
                    xxl={{ span: 6, offset: 0 }}>

                <Form.Item
                       label={<label>{L('Filter')} </label>}
                      rules={[
                        {
                          pattern: /^(?:\d*)$/,
                          message: 'Sadece sayısal değerler girilebilir',
                        },
                      ]}
                      name="searchtxt"
                    >
                      <Input className="formInput formInputSearch"  />
                    </Form.Item>
                 </Col>
               
                  


                </Row>



                <Row gutter={[8, 8]}>

                <Col
                        xs={{ span: 6, offset: 0 }}
                        sm={{ span: 6, offset: 0 }}
                        md={{ span: 6, offset: 0 }}
                        lg={{ span: 6, offset: 0 }}
                        xl={{ span: 6, offset: 0 }}
                        xxl={{ span: 6, offset: 0 }}
                       
                      >
                        <Form.Item name="start" label={<label>{L('StartDate')}</label>}>
                          <Input type="date" className="formInput" style={{ float: 'left' }} />
                        </Form.Item>
                      </Col>

                      <Col
                        xs={{ span: 6, offset: 0 }}
                        sm={{ span: 6, offset: 0 }}
                        md={{ span: 6, offset: 0 }}
                        lg={{ span: 6, offset: 0 }}
                        xl={{ span: 6, offset: 0 }}
                        xxl={{ span: 6, offset: 0 }}
                  
                      >
                        <Form.Item name="finish" label={<label> {L('FinishDate')}  </label>}>
                          <Input type="date" className="formInput" style={{ float: 'left' }} />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={{ span: 3, offset: 0 }}
                        sm={{ span: 3, offset: 0 }}
                        md={{ span: 3, offset: 0 }}
                        lg={{ span: 3, offset: 0 }}
                        xl={{ span: 3, offset: 0 }}
                        xxl={{ span: 3, offset: 0 }}
                      >
                        <Button
                          type="primary"
                          icon={<FilterOutlined />}
                          onClick={this.getFilterdamagecompensaation}
                          htmlType="submit"
                      
                        >
                          Filtrele
                        </Button>
                      </Col>


                      <Col
                    xs={{ span: 1, offset: 0 }}
                    sm={{ span: 1, offset: 0 }}
                    md={{ span: 1, offset: 0 }}
                    lg={{ span: 1, offset: 0 }}
                    xl={{ span: 1, offset: 0 }}
                    xxl={{ span: 1, offset: 0 }}
                  >
                    <Button
                 
                      type="primary"
                      icon={<OrderedListOutlined />}
                      onClick={this.getFilterdamagecompensaation}
                      htmlType="submit"
                    >
                      {L('AllList')}
                    </Button>
                  </Col>

                </Row>


                <Divider />
                <Row>
                 
                </Row>
              </Form>
            </Card>

            <Card hoverable title={L('Hasar Tazmin Listesi')}>
              <Table
                loading={getAllDamageCompensationStoreClass === undefined ? true : false}
                columns={columns}
                dataSource={getAllDamageCompensationStoreClass}
                locale={{ emptyText: L('NoData'), sortTitle: 'test' }}
              />
            </Card>
          </Space>
        </React.Fragment>
      </>
    );
  }
}

export default DamageCompensationList;
