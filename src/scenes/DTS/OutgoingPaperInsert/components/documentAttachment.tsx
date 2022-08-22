import * as React from 'react';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Table } from 'antd';
import layout from 'antd/lib/layout';
import { L } from '../../../../lib/abpUtility';
import locale from 'antd/es/date-picker/locale/tr_TR';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

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

class DocumentAttachment extends React.Component<IProps> {
  state = {
    modalVisible: false,
  };

  validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };
  editOrViewIncomingModalOpen = async () => { 
    this.Modal();
  };
  // editOrViewIncomingModalOpen(){

  // }

  onFinish = async () => {};

  onChange = async () => {};

  render() {
    const { visible, onCancel } = this.props;

    const columns = [
      {
        title: L('AreaInformations sm'),
        render: (record) => (
          <React.Fragment>
            <span className={'responsive-title'}>{L('table.area.type')}</span> : {record.name}
            <br />
            <span className={'responsive-title'}>{L('table.area.employeecount')} </span> :{' '}
            {record.age}
            <br />
            <span className={'responsive-title'}>{L('table.area.normcount')}</span> :{' '}
            {record.address}
            <br />
            <span className={'responsive-title'}> {L('table.area.normgap')}</span> :{' '}
            {record.duzenle}
          </React.Fragment>
        ),
        responsive: ['xs'] as Breakpoint[],
      },
      {
        title: 'Seç',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, item: any) => (
          <div>
            <Checkbox></Checkbox>
          </div>
        ),
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
      {
        title: 'Gönderi Tarihi',
        dataIndex: 'gonderiTarihi',
        key: 'gonderiTarihi',
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
      {
        title: 'Gelen/Giden',
        dataIndex: 'gelenGiden',
        key: 'gelenGiden',
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
      {
        title: 'Bilgi/Havale',
        dataIndex: 'bilgiHavele',
        key: 'bilgiHavele',
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
      {
        title: 'Dosya No',
        dataIndex: 'dosyaNo',
        key: 'dosyaNo',
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
      {
        title: 'Defter No',
        dataIndex: 'defterNo',
        key: 'defterNo',
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
      {
        title: 'Tebliğ Alan',
        dataIndex: 'tebligAlan',
        key: 'tebligAlan',
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
      {
        title: 'Konu',
        dataIndex: 'konu',
        key: 'konu',
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
      {
        title: 'Gönderilen Yer',
        dataIndex: 'gonderilenYer',
        key: 'gonderilenYer',
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
      {
        title: 'Orjinal Evrak No',
        dataIndex: 'orjEvrakNo',
        key: 'orjEvrakNo',
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
      {
        title: 'Evrak Durumu',
        dataIndex: 'evrakDurumu',
        key: 'evrakDurumu',
        responsive: ['sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
      },
    ];
    const data = [
      {
        key: '1',
        gonderiTarihi: '07.12.2021 09:43:08',
        gelenGiden: 'Gelen Evrak',
        bilgiHavele: 'Bilgi',
        dosyaNo: 'MAHK-2021',
        defterNo: '65165',
        tebligAlan: 'Personel Personel',
        konu: 'SÜRAT KARGO - TEKİT',
        gonderilenYer: 'T.C. ÇORUM HUKUK İK. MAHK.',
        orjEvrakNo: '202000003491',
        evrakDurumu: 'Açık',
      },
      {
        key: '2',
        gonderiTarihi: '07.12.2021 09:43:08',
        gelenGiden: 'Gelen Evrak',
        bilgiHavele: 'Bilgi',
        dosyaNo: 'MAHK-2021',
        defterNo: '65165',
        tebligAlan: 'Personel Personel',
        konu: 'SÜRAT KARGO - TEKİT',
        gonderilenYer: 'T.C. ÇORUM HUKUK İK. MAHK.',
        orjEvrakNo: '202000003491',
        evrakDurumu: 'Açık',
      },
      {
        key: '3',
        gonderiTarihi: '07.12.2021 09:43:08',
        gelenGiden: 'Gelen Evrak',
        bilgiHavele: 'Bilgi',
        dosyaNo: 'MAHK-2021',
        defterNo: '65165',
        tebligAlan: 'Personel Personel',
        konu: 'SÜRAT KARGO - TEKİT',
        gonderilenYer: 'T.C. ÇORUM HUKUK İK. MAHK.',
        orjEvrakNo: '202000003491',
        evrakDurumu: 'Açık',
      },
      {
        key: '4',
        gonderiTarihi: '07.12.2021 09:43:08',
        gelenGiden: 'Gelen Evrak',
        bilgiHavele: 'Bilgi',
        dosyaNo: 'MAHK-2021',
        defterNo: '65165',
        tebligAlan: 'Personel Personel',
        konu: 'SÜRAT KARGO - TEKİT',
        gonderilenYer: 'T.C. ÇORUM HUKUK İK. MAHK.',
        orjEvrakNo: '202000003491',
        evrakDurumu: 'Açık',
      },
    ];

    return (
      <Modal
        footer={[
          <Button style={{ maxWidth: 150, minWidth: 150 }} className="footer-btn"  type="primary">
            Geri
          </Button>,
          <Button style={{ maxWidth: 150, minWidth: 150 }} className="footer-btn"  type="primary">
            Kaydet
          </Button>,
        ]}
        width={'80%'}
        visible={visible}
        onCancel={onCancel}
      >
        <Card>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={this.onFinish}
            validateMessages={this.validateMessages}
          >
            <Row gutter={16}>
              <Col
                xs={{ offset: 0, span: 24 }}
                sm={{ offset: 0, span: 24 }}
                md={{ offset: 0, span: 24 }}
                lg={{ offset: 0, span: 8 }}
                xl={{ offset: 0, span: 8 }}
                xxl={{ offset: 0, span: 8 }}
              >
                <Form.Item
                  name={['user', 'name']}
                  label={
                    <label style={{ maxWidth: 150, minWidth: 150 }}>{L('DTSPaperStartDate')}</label>
                  }
                >
                  <DatePicker locale={locale} onChange={this.onChange} style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col
                xs={{ offset: 0, span: 24 }}
                sm={{ offset: 0, span: 24 }}
                md={{ offset: 0, span: 24 }}
                lg={{ offset: 0, span: 8 }}
                xl={{ offset: 0, span: 8 }}
                xxl={{ offset: 0, span: 8 }}
              >
                <Form.Item
                  name={['user', 'email']}
                  label={<label style={{ maxWidth: 150, minWidth: 150 }}>{L('DTSFileNo')}</label>}
                  rules={[{ type: 'email' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col
                xs={{ offset: 0, span: 24 }}
                sm={{ offset: 0, span: 24 }}
                md={{ offset: 0, span: 24 }}
                lg={{ offset: 0, span: 8 }}
                xl={{ offset: 0, span: 8 }}
                xxl={{ offset: 0, span: 8 }}
              >
                <Form.Item
                  name={['user', 'email']}
                  label={
                    <label style={{ maxWidth: 150, minWidth: 150 }}>
                      {L('DTSFilePaperSubject')}
                    </label>
                  }
                  rules={[{ type: 'email' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col
                xs={{ offset: 0, span: 24 }}
                sm={{ offset: 0, span: 24 }}
                md={{ offset: 0, span: 24 }}
                lg={{ offset: 0, span: 8 }}
                xl={{ offset: 0, span: 8 }}
                xxl={{ offset: 0, span: 8 }}
              >
                <Form.Item
                  name={['user', 'name']}
                  label={
                    <label style={{ maxWidth: 150, minWidth: 150 }}>{L('DTSPaperEndDate')}</label>
                  }
                >
                  <DatePicker locale={locale} onChange={this.onChange} style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col
                xs={{ offset: 0, span: 24 }}
                sm={{ offset: 0, span: 24 }}
                md={{ offset: 0, span: 24 }}
                lg={{ offset: 0, span: 8 }}
                xl={{ offset: 0, span: 8 }}
                xxl={{ offset: 0, span: 8 }}
              >
                <Form.Item
                  name={['user', 'email']}
                  label={
                    <label style={{ maxWidth: 150, minWidth: 150 }}>{L('DTSNotebookNo')}</label>
                  }
                  rules={[{ type: 'email' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Row className="button-row" gutter={16}>
            <Col
              sm={{ span: 24 }}
              md={{ span: 16 }}
              lg={{ span: 18 }}
              xl={{ span: 20 }}
              xxl={{ span: 20 }}
            >
              <Button className="page-btn" type="primary" >
                Evrak İlişki Ekle
              </Button>
            </Col>

            <Col
              sm={{ span: 24 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              xl={{ offset: 1, span: 3 }}
              xxl={{ offset: 1, span: 3 }}
            >
              <Button
                style={{ maxWidth: 150, minWidth: 150 }}
                className="page-btn"
                type="primary"
                
              >
                Bul
              </Button>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: 20 }}>
          <Row>
            <Col>
              <Table columns={columns} dataSource={data}></Table>
            </Col>
          </Row>
        </Card>
      </Modal>
    );
  }
}

export default DocumentAttachment;
