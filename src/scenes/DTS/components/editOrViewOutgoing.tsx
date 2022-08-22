import {
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    List,
    Modal,
    Row,
    Select,
    Table,
    Typography,
  } from 'antd';
  import TextArea from 'antd/lib/input/TextArea';
  import * as React from 'react';
  import { L } from '../../../lib/abpUtility';
  import ComingPaperTableType from '../../../services/DTS/dto/comingPaperTableEnum';
  import './index.less';
  
  export interface IProps {
    visible: boolean;
    onCancel: () => void;
  }
  export interface IState {
    tableloding: boolean;
    confirmDirty: boolean;
    filterTable: { offset: number; limit: number; current: number };
    totalSizeTable: number;
  }
  
  const Search = Input.Search;
  
  class EditOrViewIncoming extends React.Component<IProps> {
    state = {
      confirmDirty: false,
      tableloding: false,
      filterTable: { offset: 0, limit: 3, current: 0 },
      totalSizeTable: 0,
    };
  
    handlePaginationTable = (pagination) => {
      const { filterTable } = this.state;
      const { pageSize, current } = pagination;
      this.setState({
        filterTable: { ...filterTable, current, limit: pageSize },
      });
    };
  
    handleSearch = (value: string) => {
      this.setState({ tableloding: true });
      // this.setState({ filter: value }, async () => await this.getAll());
    };
    render() {
      const { filterTable, totalSizeTable } = this.state;
  
      const tablePaginationTable = {
        pageSize: filterTable.limit,
        current: filterTable.current || 1,
        total: totalSizeTable,
        locale: { items_per_page: L('page') },
        pageSizeOptions: ['3', '5', '10', '20', '30', '50', '100'],
        showSizeChanger: true,
      };
  
      const columns = [
        {
          title: 'Gönderen',
          dataIndex: 'gonderen',
          key: 'gonderen',
        },
        {
          title: 'Havale Tipi',
          dataIndex: 'havaleTipi',
          key: 'havaleTipi',
        },
        {
          title: 'Alıcı',
          dataIndex: 'alici',
          key: 'alici',
        },
      ];
      const data = [
        {
          key: '1',
          gonderen: 'Ad Soyad',
          havaleTipi: 'Gereği',
          alici: 'Ad Soyad',
        },
        {
          key: '2',
          gonderen: 'Ad Soyad',
          havaleTipi: 'Gereği',
          alici: 'Ad Soyad',
        },
        {
          key: '3',
          gonderen: 'Ad Soyad',
          havaleTipi: 'Gereği',
          alici: 'Ad Soyad',
        },
        {
          key: '4',
          gonderen: 'Ad Soyad',
          havaleTipi: 'Gereği',
          alici: 'Ad Soyad',
        },
        {
          key: '5',
          gonderen: 'Ad Soyad',
          havaleTipi: 'Gereği',
          alici: 'Ad Soyad',
        },
        {
          key: '6',
          gonderen: 'Ad Soyad',
          havaleTipi: 'Gereği',
          alici: 'Ad Soyad',
        },
      ];
  
      const dataList = {
        evrakAkisi: 'Giden Evrak',
        evrakDurumu: 'Açık',
        defterNo: 'HUK - 2016/56',
        defterKTarihi: '11.11.2020 12:12:12',
        orjinalNo: '12222312321-1213',
        evrakOrjTarih: '11.11.2020 12:12:12',
        gelenGiden: 'Gelen Evrak',
        evrakTipi: 'Hukuk Koordinatorlüğü',
        dosyaNo: 'HUIK - 2020',
        konu: 'Şikayet',
        tebliğAlan: 'Ahmet Haşim',
        girisYapan: 'Akış',
        dosyaAdı: '123123_3123.pdf',
        dosyaBoyutu: '48kb',
        yuklemeTarihi: '11.11.2020 12:12:12',
      } as any;
  
      const { visible, onCancel } = this.props;
  
      function handleChange(value) {
        console.log(`selected ${value}`);
      }
      return (
        <Modal
          footer={[
            <Button style={{ maxWidth: 150, minWidth: 100 }}   className='footer-btn' type="primary">Havale</Button>,
            <Button style={{ maxWidth: 150, minWidth: 100 }}   className='footer-btn' type="primary">Evrak Kapat</Button>,
            <Button style={{ maxWidth: 150, minWidth: 100 }}   className='footer-btn' type="primary">Geri Gönder</Button>,
          ]}
          width={'80%'}
          visible={visible}
          onCancel={onCancel}
        >
          <Row gutter={16}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{span: 8}} style={{ marginTop: 30 }}>
              <List
                size="small"
                bordered
                dataSource={Object.keys(dataList)}
                renderItem={(item) => (
                  <List.Item>
                    <Row style={{ width: '100%' }} gutter={16}>
                      <Col xs={{ span: 9 }}>
                        <Typography.Text strong> {ComingPaperTableType[item]} </Typography.Text>{' '}
                      </Col>
                      <Col span={1}>:</Col>
                      <Col xs={{ span: 12 }}>{dataList[item]}</Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{span: 16}}>
              <Row gutter={16}>
                <Col span={24}>
                  <Divider orientation="left">Havale Bilgileri</Divider>
                  <Search placeholder={L('Filter')} onSearch={this.handleSearch} />
                  <Table
                    locale={{ emptyText: L('NoData') }}
                    rowKey={(record) => record.key.toString()}
                    columns={columns}
                    loading={this.state.tableloding}
                    onChange={this.handlePaginationTable}
                    pagination={tablePaginationTable}
                    dataSource={data}
                  ></Table>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} md={{span: 12}}>
                  <Divider orientation="left">Evrak Ekler</Divider>
                  <Form.Item
                    label={<label style={{ maxWidth: 150, minWidth: 100 }}>Açıklama </label>}
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{span: 12}}>
                  {' '}
                  <Divider orientation="left">İlişkili Evraklar</Divider>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} md={{span: 12}}>
                  <Divider orientation="left">Havale Edilecek Personel</Divider>
  
                  <Form.Item
                    label={<label style={{ maxWidth: 150, minWidth: 100 }}>Personel </label>}
                  >
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Tags Mode"
                      onChange={handleChange}
                    >
                      <Select.OptGroup> Test </Select.OptGroup>
                    </Select>
                  </Form.Item>
  
                  <Form.Item
                    label={
                      <label style={{ maxWidth: 150, minWidth: 100 }}>Evrak Bitiş Süresi </label>
                    }
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{span: 12}}>
                  <Divider orientation="left">Havale Edilecek Personel Listesi</Divider>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
      );
    }
  }
  
  export default EditOrViewIncoming;
  