import * as React from 'react';
import { Button, Card, Col, Divider, Form, Input, Row, Select, Upload } from 'antd';
import { SwapOutlined, UploadOutlined } from '@ant-design/icons';
import DocumentAttachment from './components/documentAttachment';
import './index.less'

interface IState {}
interface IProps {}

class Index extends React.Component<IProps, IState> {
  state = {
    modalVisible: false,
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  documentAttachmentModalOpen = async () => {
    console.log('Click');
    this.Modal();
  };

  render() {
    return (
      <>
        <React.Fragment>
          <Card>
          <Divider orientation="left">Giden Evrak Kayıt</Divider>
            <Form>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} md={{ span: 11 }}>
                  <Form.Item
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Dosya No
                      </label>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 11, offset: 1 }}>
                  <Form.Item
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
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Gönderim Şekli
                      </label>
                    }
                  >
                    <Select allowClear></Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 11, offset: 1 }}>
                  <Form.Item
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
              <Divider orientation="left">Gönderilecek Kurumlar Yükleme</Divider>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} md={{ span: 11 }}>
                  <Form.Item
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Gönderilecek Yer
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
                        Yüklenecek Dosya
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
              <Row gutter={16}>
                <Col xs={{ span: 24 }} md={{ span: 11 }}>
                  <Form.Item
                    label={
                      <label style={{ maxWidth: 150, minWidth: 150, textAlign: 'start' }}>
                        Personel
                      </label>
                    }
                  >
                    <Select></Select>
                  </Form.Item>
                </Col>
              </Row>
              <Divider orientation="left">İlişkili Evraklar</Divider>
              <Row gutter={16}>
                <Col style={{ marginBottom: '30px' }} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Col offset={4}>
                    <Button
                      className="page-btn"
                      onClick={() => this.documentAttachmentModalOpen()}
                      type="primary"
                      icon={<SwapOutlined />}
                    >
                      Evrak İlişki Ekle
                    </Button>
                  </Col>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{span:6}} lg={{ span: 4 }} xl={{ span: 3 }}>
                      <Button className="page-btn" style={{ maxWidth: 150, minWidth: 150}} type="primary">Temizle</Button>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{span:6}} lg={{ span: 4 }} xl={{ span: 3 }}>
                      <Button className="page-btn" style={{ maxWidth: 150, minWidth: 150}} type="primary">Kaydet</Button>
                </Col>
              </Row>
            </Form>

            <DocumentAttachment
              onCancel={() => {
                this.setState({
                  modalVisible: false,
                });
              }}
              visible={this.state.modalVisible}
            />
          </Card>
        </React.Fragment>
      </>
    );
  }
}

export default Index;
