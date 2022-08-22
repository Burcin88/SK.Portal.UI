/*eslint-disable */

import * as React from 'react';

import { Breadcrumb, Card, Col, PageHeader, Row } from 'antd';
import Stores from '../../stores/storeIdentifier';
import { inject, observer } from 'mobx-react';
import AuthenticationStore from '../../stores/authenticationStore';
import SessionStore from '../../stores/sessionStore';
import AccountStore from '../../stores/accountStore';
// import NotificationStore from '../../stores/notificationStore';
import InformationCart from '../../components/InformationCard';
import { isGranted, L } from '../../lib/abpUtility';
import { Link } from 'react-router-dom';



interface IHomeProps {
  sessionStore?: SessionStore;
  accountStore?: AccountStore;
  // notificationStore: NotificationStore;
  authenticationStore?: AuthenticationStore;
}

interface IHomeState { } 

declare var abp: any;

// @inject(Stores.NotificationStore)
@inject(Stores.AuthenticationStore, Stores.SessionStore, Stores.AccountStore)
@observer
export class Home extends React.Component<IHomeProps, IHomeState> {



  render() {
    abp.event.on('knorm_added', function (userNotification) { 
      alert(userNotification)
    })
    
    return (
      <>
        <Card style={{ marginBottom: 20 }}>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={
              <Breadcrumb>
                <Breadcrumb.Item>{isGranted('items.dashboard.view') ? <Link to="/dashboard">{L('Dashboard')}</Link> : <Link to="/home">{L('Dashboard')}</Link>}  </Breadcrumb.Item>
                <Breadcrumb.Item> {L('pages.home')} </Breadcrumb.Item>
              </Breadcrumb>
            }  >
          </PageHeader>
        </Card>
        <Row gutter={16} >

          <Col
            xs={{ span: 10, offset: 0 }}
            sm={{ span: 10, offset: 0 }}
            md={{ span: 10, offset: 0 }}
            lg={{ span: 10, offset: 0 }}
            xl={{ span: 10, offset: 0 }}
            xxl={{ span: 10, offset: 0 }}>
            <Card hoverable>
              <InformationCart />
            </Card>
          </Col>

          {/* <Col
          xs={{ span: 14, offset: 0 }}
          sm={{ span: 14, offset: 0 }}
          md={{ span: 14, offset: 0 }}
          lg={{ span: 14, offset: 0 }}
          xl={{ span: 14, offset: 0 }}
          xxl={{ span: 14, offset: 0 }}>
          <Card hoverable>

          </Card>
        </Col> */}
        </Row>
      </>
    );
  }
}
export default Home;
