import * as React from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  FormInstance,
  Input,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Upload,
} from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import './index.less';
import DtsStore from '../../../stores/dtsStore';
import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import SessionStore from '../../../stores/sessionStore';
import { L } from '../../../lib/abpUtility'; // import { GetDocumentTypeList } from '../../../services/kDamageCompensations/dto/getDocumentTypeList';
import KPersonelStore from '../../../stores/kPersonelStore';
import { CreateTransferredPersonnelDto } from '../../../services/DTS/dto/createTransferredPersonnelDto';

// import tokenAuthService from '../../../services/tokenAuth/tokenAuthService';

export interface IProps {
  dtsStore: DtsStore;
  sessionStore: SessionStore;
  kPersonelStore: KPersonelStore;
}

export interface IState {
  // gonderiTarihi: Date;
  bilgiHavale: string;
  dosyaNo: string;
  defterNo: string;
  tebligAlan: string;
  konu: string;
  gonderilenYer: string;
  orjinalEvrakNo: string;
  evrakDurumu: boolean;
  evrakTipi: string;
  selectNotFound: boolean;
  personel: string;
  createTransferredPersonnels: CreateTransferredPersonnelDto[];
  createTransferredPersonnel: CreateTransferredPersonnelDto;

  // documentTypeList: any;
}

const { Option } = Select;

@inject(Stores.SessionStore)
@inject(Stores.KPersonelStore)
@inject(Stores.DtsStore)
@observer
class Index extends React.Component<IProps, IState> {
  formRefEvalution = React.createRef<FormInstance>();

  state = {
    // gonderiTarihi: '',
    bilgiHavale: '',
    dosyaNo: '',
    defterNo: '',
    tebligAlan: '',
    konu: '',
    gonderilenYer: '',
    orjinalEvrakNo: '',
    evrakDurumu: false,
    evrakTipi: '',
    selectNotFound: true,
    personel: '',
    createTransferredPersonnels: [],
    // documentTypeList: [],
    createTransferredPersonnel: { personelId: 0, havaleTipi: 0, personelAdiSoyadi: '' },
  };

  componentDidMount = async () => {
    await this.getDocumentTypes();
    await this.getEmployees();
    console.log(this.props.kPersonelStore.getAllEtsDto);
  };

  getDocumentTypes = async () => {
    await this.props.dtsStore.getDocumentTypeList();
  };

  getEmployees = async () => {
    this.props.kPersonelStore && (await this.props.kPersonelStore.getEtsHavalePersonel());
  };

  onClickSaveComingPaper = async () => {
    this.formRefEvalution!.current!.validateFields().then(async (values: any) => {
      this.props.dtsStore.create(values);
    });
  };

  getEmployeeAll = () => {
    this.getEmployees();
  };

  render() {
    const onChange = (value) => {
      const date = new Date();
      var dosyaNo1;
      var year = date.getFullYear();
      dosyaNo1 = `${value} - ${year}`;
      this.formRefEvalution.current?.setFieldsValue({
        dosyaNo: dosyaNo1,
      });
    };

    const onChangePersonel = (value, item) => { 

      this.state.createTransferredPersonnel.personelId = value;
      this.state.createTransferredPersonnel.personelAdiSoyadi = item.children.toString();
      this.state.createTransferredPersonnel.havaleTipi = 1;

      this.setState({
        createTransferredPersonnel: {
          personelId: value,
          personelAdiSoyadi: item.children.toString(),
          havaleTipi: 1,
        },
      });

      this.setState((prevState) => ({
        createTransferredPersonnels: prevState.createTransferredPersonnels.map(
          (obj) => (
            Object.assign(obj, {personelId: value ,havaleTipi:1,personelAdiSoyadi: item.children.toString()})
          )
        ),
      }));

      console.log('State', this.state.createTransferredPersonnels);
    };

    const { getDocumentTypes } = this.props.dtsStore;
    const { getAllEtsDto } = this.props.kPersonelStore;

    const columns = [
      {
        title: 'Sil',
        key: 'action',
        width: '12%',
        render: (text, record) => (
          <Space size="middle">
            <Popconfirm
              okText="Evet"
              cancelText="Hayir"
              title="Silinsin mi?"
              // onConfirm={() => this.onConfirmDelete(record.id)}
            >
              <CloseOutlined />
            </Popconfirm>
          </Space>
        ),
      },
      {
        title: 'Havale Tipi',
        dataIndex: 'havaleTipi',
        key: 'havaleTipi',
        width: '12%',
        render: (text, record) => (
          <Radio.Group
          // onChange={onChange}
          >
            <Radio value={1}>Bilgi</Radio>
            <Radio value={2}>Gereği</Radio>
          </Radio.Group>
        ),
      },
      {
        title: 'Ad Soyad',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
      },
    ];

    return (
      <>
        <React.Fragment>
          <Card>
            <Divider orientation="left">Gelen Evrak Kayıt</Divider>
            <Form ref={this.formRefEvalution}>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} md={{ span: 11 }}>
                  <Form.Item
                    name="evrakTipi"
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Evrak Tipi
                      </label>
                    }
                  >
                    <Select
                      placeholder={L('PleaseSelect')}
                      filterOption={(input, option) =>
                        (option?.children &&
                          option?.children
                            ?.toString()
                            .toLocaleUpperCase()
                            .indexOf(input.toLocaleUpperCase()) >= 0) ||
                        option?.props.value
                          .toString()
                          .toLocaleUpperCase()
                          .indexOf(input.toLocaleUpperCase()) >= 0
                      }
                      onChange={onChange}
                      allowClear
                      showSearch
                      notFoundContent={this.state.selectNotFound ? <Spin size="small" /> : null}
                      showArrow={true}
                      defaultActiveFirstOption={false}
                    >
                      {getDocumentTypes !== undefined
                        ? getDocumentTypes.map(
                            (
                              item,
                              index //getDocumentTypes &&  hazır olduğunda devam et yada (getDocumentTypes==!undefined?map():'')
                            ) => (
                              <Option value={item.shortName} key={index}>
                                {item.name}
                              </Option>
                            )
                          )
                        : ''}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 11, offset: 1 }}>
                  <Form.Item
                    name="tebligAlan"
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Tebliğ Alan
                      </label>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} md={{ span: 11 }}>
                  <Form.Item
                    name="dosyaNo"
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Dosya No
                      </label>
                    }
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 11, offset: 1 }}>
                  <Form.Item
                    name="orjinalEvrakNo"
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Orjinal Evrak No
                      </label>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} md={{ span: 11 }}>
                  <Form.Item
                    // name="gonderiTarihi"
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Tebliğ Tarihi
                      </label>
                    }
                  >
                    <DatePicker placeholder="Tarih Seçiniz" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 11, offset: 1 }}>
                  <Form.Item
                    name="gonderilenYer"
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Geldiği Yer
                      </label>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} md={{ span: 11 }}>
                  <Form.Item
                    name="konu"
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Konu
                      </label>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Divider orientation="left">Evrak Yükleme</Divider>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} md={{ span: 11 }}>
                  <Form.Item
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Dosya Seç
                      </label>
                    }
                  >
                    <Upload style={{ width: '100%' }}>
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Divider orientation="left">Havale Yapılacak Personel</Divider>
              <Row>
                <Col xs={{ span: 24 }} md={{ span: 11 }}>
                  <Row gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <Form.Item
                        name="personel"
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                            Personel
                          </label>
                        }
                      >
                        <Select
                          filterOption={(input, option) =>
                            (option?.children &&
                              option?.children
                                ?.toString()
                                .toLocaleUpperCase()
                                .indexOf(input.toLocaleUpperCase()) >= 0) ||
                            option?.props.value
                              .toString()
                              .toLocaleUpperCase()
                              .indexOf(input.toLocaleUpperCase()) >= 0
                          }
                          showSearch
                          placeholder={L('PleaseSelect')}
                          notFoundContent={this.state.selectNotFound ? <Spin size="small" /> : null}
                          showArrow={true}
                          defaultActiveFirstOption={false}
                          onChange={onChangePersonel}
                        >
                          {getAllEtsDto !== undefined
                            ? getAllEtsDto.map(
                                (
                                  item,
                                  index //getDocumentTypes &&  hazır olduğunda devam et yada (getDocumentTypes==!undefined?map():'')
                                ) => (
                                  <Option value={item.objId} key={index}>
                                    {`${item.ad} ${item.soyad}`}
                                  </Option>
                                )
                              )
                            : ''}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <Form.Item
                        label={
                          <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                            Evrak Bitiş Süresi
                          </label>
                        }
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 11, offset: 1 }}>
                  <Table columns={columns} dataSource={data} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 6 }}
                  lg={{ span: 4 }}
                  xl={{ span: 3 }}
                >
                  <Button
                    className="page-btn"
                    style={{ maxWidth: 150, minWidth: 150 }}
                    type="primary"
                  >
                    Temizle
                  </Button>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 6 }}
                  lg={{ span: 4 }}
                  xl={{ span: 3 }}
                >
                  <Button
                    className="page-btn"
                    style={{ maxWidth: 150, minWidth: 150 }}
                    type="primary"
                    onClick={this.onClickSaveComingPaper}
                    htmlType="submit"
                  >
                    Kaydet
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </React.Fragment>
      </>
    );
  }
}

export default Index;
