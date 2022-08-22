import * as React from 'react';

import './UserLayout.less';


import { Redirect, Route, Switch } from 'react-router-dom';

import { Col, Row } from 'antd';
import DocumentTitle from 'react-document-title';
import Footer from '../Footer';
import LanguageSelect from '../LanguageSelect';
import { userRouter } from '../Router/router.config';
import utils from '../../utils/utils';

class UserLayout extends React.Component<any> {
  render() {
    const {
      location: { pathname },
    } = this.props;

    return (
      <DocumentTitle title={utils.getPageTitle(pathname)}>
        <Col className="container">
          <div style={{ height: 'calc(100vh - 55px)' }}>
            <div className={'lang'}>
              <Row>
                <Col
                  xs={{ offset: 1, span: 22 }}
                  sm={{ offset: 1, span: 22 }}
                  md={{ offset: 1, span: 22 }}
                  lg={{ offset: 1, span: 22 }}
                  xl={{ offset: 1, span: 22 }}
                  xxl={{ offset: 1, span: 22 }} >
                  <LanguageSelect />
                </Col>
              </Row>
            </div>
            <Switch>
              {userRouter
                .filter((item: any) => !item.isLayout)
                .map((item: any, index: number) => (
                  <Route key={index} path={item.path} component={item.component} exact={item.exact} />
                ))}

              <Redirect from="/user" to="/user/login" />
            </Switch>
          </div>
          <Footer />
        </Col>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
