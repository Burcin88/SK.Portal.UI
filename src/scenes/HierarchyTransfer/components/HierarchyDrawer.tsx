/* eslint-disable */
import React, { useState } from 'react';
import { Alert, Checkbox, Col, Drawer, Row, Space } from 'antd';
import './index.less';


export interface Props {
  onClose: () => void;
  onSwitchChange: (node) => void;
  visible: boolean;
  node: any;
}

export function HierarchyDrawer(props: Props) {
  
  const [defaultVisiblePushNotificationPhoneStatusChange, setDefaultVisiblePushNotificationPhoneStatusChange] = useState(props.node.pushNotificationPhoneStatusChange);
  const [defaultVisiblePushNotificationWebStatusChange, setDefaultVisiblePushNotificationWebStatusChange] = useState(props.node.pushNotificationWebStatusChange);
  const [defaultVisiblePushNotificationPhone, setDefaultVisiblePushNotificationPhone] = useState(props.node.pushNotificationPhone);
  const [defaultVisiblePushNotificationWeb, setDefaultVisiblePushNotificationWeb] = useState(props.node.pushNotificationWeb);
  const [defaultVisibleCanTerminate, setDefaultVisibleCanTerminate] = useState(props.node.canTerminate);
  const [defaultVisibleMailStatusChange, setDefaultVisibleMailStatusChange] = useState(props.node.mailStatusChange);
  const [defaultVisibleMail, setDefaultVisibleMail] = useState(props.node.mail);

  return (
    <>
      <Drawer
        title={`Norm Bildirim Paneli`}
        placement="right"
        width={600}
        onClose={props.onClose}
        visible={props.visible}
      >
        <Row gutter={16} justify="start" align="middle">
          <Col
            xs={{ offset: 0, span: 24 }}
            sm={{ offset: 0, span: 24 }}
            md={{ offset: 0, span: 24 }}
            lg={{ offset: 0, span: 24 }}
            xl={{ offset: 0, span: 24 }}
            xxl={{ offset: 0, span: 24 }}
          >

            <div style={{ marginBottom: '10px' }}>
              <Alert
                message=" Mail Bildirimi"
                description="Yeni Bir Norm Talebi Geldiğinde, Kullanıcıya Mail Olarak Bildirim Gider"
                type={defaultVisibleMail ? 'info' : 'error'}
                closable={false}
                action={
                  <Space direction="vertical">
                    <Checkbox
                      defaultChecked={props.node.mail}
                      disabled={false}
                      onChange={(e) => {
                        props.onSwitchChange({ id: props.node.id, status: e.target.checked, type: 'Mail' })
                        setDefaultVisibleMail(!defaultVisibleMail)
                      }}

                    >
                      Bildirim
                    </Checkbox>
                  </Space>
                }
              />
            </div>
          </Col>
        </Row>



        <Row gutter={16} justify="start" align="middle">
          <Col
            xs={{ offset: 0, span: 24 }}
            sm={{ offset: 0, span: 24 }}
            md={{ offset: 0, span: 24 }}
            lg={{ offset: 0, span: 24 }}
            xl={{ offset: 0, span: 24 }}
            xxl={{ offset: 0, span: 24 }}
          >
            <div style={{ marginBottom: '10px' }}>
              <Alert
                message="Mail Bildirimi - Durum Değişikliği"
                description="Var Olan Norm Üzerinde Bir Değişiklik Olduğunda, Kullanıcıya Bildirim Maili Gider"

                type={defaultVisibleMailStatusChange ? 'info' : 'error'}
                closable={false}
                action={
                  <Space direction="vertical">
                    <Checkbox
                      defaultChecked={props.node.mailStatusChange}
                      disabled={false}
                      onChange={(e) => {
                        props.onSwitchChange({ id: props.node.id, status: e.target.checked, type: 'MailStatusChange' })
                        setDefaultVisibleMailStatusChange(!defaultVisibleMailStatusChange)
                      }} > Bildirim
                    </Checkbox>
                  </Space>
                }
              />
            </div>
          </Col>
        </Row>

        <Row gutter={16} justify="start" align="middle">
          <Col
            xs={{ offset: 0, span: 24 }}
            sm={{ offset: 0, span: 24 }}
            md={{ offset: 0, span: 24 }}
            lg={{ offset: 0, span: 24 }}
            xl={{ offset: 0, span: 24 }}
            xxl={{ offset: 0, span: 24 }}
          >
            <div style={{ marginBottom: '10px' }}>
              <Alert
                message="Cep Telefonu Bildirimi"
                description="Yeni Bir Norm Talebi Geldiğinde, Kullanıcının Cep Telefonuna Bildirim Gider"
                type={defaultVisiblePushNotificationPhone ? 'info' : 'error'}
                closable={false}
                action={
                  <Space direction="vertical">
                    <Checkbox
                      defaultChecked={props.node.pushNotificationPhone}
                      disabled={false}
                      onChange={(e) => {
                        props.onSwitchChange({ id: props.node.id, status: e.target.checked, type: 'PushNotificationPhone' })
                        setDefaultVisiblePushNotificationPhone(!defaultVisiblePushNotificationPhone)
                      }} > Bildirim
                    </Checkbox>
                  </Space>
                }
              />
            </div>
          </Col>
          <Col
            xs={{ offset: 0, span: 24 }}
            sm={{ offset: 0, span: 24 }}
            md={{ offset: 0, span: 24 }}
            lg={{ offset: 0, span: 24 }}
            xl={{ offset: 0, span: 24 }}
            xxl={{ offset: 0, span: 24 }}
          >
            <div style={{ marginBottom: '10px' }}>
              <Alert
                message="Cep Telefonu Bildirimi - Durum Değişikliği"
                description="Var Olan Norm Üzerinde Bir Değişiklik Olduğunda, Kullanıcının Cep Telefonuna Bildirim Gider"
                type={defaultVisiblePushNotificationPhoneStatusChange ? 'info' : 'error'}
                closable={false}
                action={
                  <Space direction="vertical">
                    <Checkbox
                      defaultChecked={props.node.pushNotificationPhoneStatusChange}
                      disabled={false}
                      onChange={(e) => {
                        props.onSwitchChange({ id: props.node.id, status: e.target.checked, type: 'PushNotificationPhoneStatusChange' })
                        setDefaultVisiblePushNotificationPhoneStatusChange(!defaultVisiblePushNotificationPhoneStatusChange)
                      }}>  Bildirim
                    </Checkbox>
                  </Space>
                }
              />
            </div>
          </Col>
        </Row>

        <Row gutter={16} justify="start" align="middle">
          <Col
            xs={{ offset: 0, span: 24 }}
            sm={{ offset: 0, span: 24 }}
            md={{ offset: 0, span: 24 }}
            lg={{ offset: 0, span: 24 }}
            xl={{ offset: 0, span: 24 }}
            xxl={{ offset: 0, span: 24 }}
          >
            <div style={{ marginBottom: '10px' }}>
              <Alert
                message="Browser Bildirimi"
                description="Yeni Bir Norm Talebi Geldiğinde, Kullanıcıya Browser Üzerinden Bildirim Gider"
                type={defaultVisiblePushNotificationWeb ? 'info' : 'error'}
                closable={false}
                action={
                  <Space direction="vertical">
                    <Checkbox
                      defaultChecked={props.node.pushNotificationWeb}
                      disabled={false}
                      onChange={(e) => {
                        props.onSwitchChange({ id: props.node.id, status: e.target.checked, type: 'PushNotificationWeb' })

                        setDefaultVisiblePushNotificationWeb(!defaultVisiblePushNotificationWeb)
                      }}  >
                      Bildirim
                    </Checkbox>
                  </Space>
                }
              />
            </div>
          </Col>
          <Col
            xs={{ offset: 0, span: 24 }}
            sm={{ offset: 0, span: 24 }}
            md={{ offset: 0, span: 24 }}
            lg={{ offset: 0, span: 24 }}
            xl={{ offset: 0, span: 24 }}
            xxl={{ offset: 0, span: 24 }}
          >
            <div style={{ marginBottom: '10px' }}>
              <Alert
                message="Browser Bildirimi - Durum Değişikliği"
                description="Var Olan Norm Üzerinde Bir Değişiklik Olduğunda, Kullanıcıya Browser Üzerinden Bildirim Gider"
                type={defaultVisiblePushNotificationWebStatusChange ? 'info' : 'error'}
                closable={false}
                action={
                  <Space direction="vertical">
                    <Checkbox
                      defaultChecked={props.node.pushNotificationWebStatusChange}
                      disabled={false}
                      onChange={(e) => {
                        props.onSwitchChange({ id: props.node.id, status: e.target.checked, type: 'PushNotificationWebStatusChange' })

                        setDefaultVisiblePushNotificationWebStatusChange(!defaultVisiblePushNotificationWebStatusChange)
                      }}  >
                      Bildirim
                    </Checkbox>
                  </Space>
                }
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16} justify="start" align="middle">
          <Col
            xs={{ offset: 0, span: 24 }}
            sm={{ offset: 0, span: 24 }}
            md={{ offset: 0, span: 24 }}
            lg={{ offset: 0, span: 24 }}
            xl={{ offset: 0, span: 24 }}
            xxl={{ offset: 0, span: 24 }}
          >
            <div style={{ marginBottom: '10px' }}>
              <Alert
                message="Sonlandır"
                description="Yeni Bir Norm Talebi Geldiğinde veya Var Olan Norm Üzerinde Bir Değişiklik Olduğunda Onay Akışını Sonlardırma"
                type={defaultVisibleCanTerminate ? 'info' : 'error'}
                closable={false}
                action={
                  <Space direction="vertical">
                    <Checkbox
                      defaultChecked={props.node.canTerminate}
                      disabled={false}
                      onChange={(e) => {
                        props.onSwitchChange({ id: props.node.id, status: e.target.checked, type: 'CanTerminate' })

                        setDefaultVisibleCanTerminate(!defaultVisibleCanTerminate)
                      }} > Bildirim
                    </Checkbox>
                  </Space>
                }
              />
            </div>
          </Col>
        </Row>
      </Drawer>
    </>
  );
}
