/*eslint-disable */
import * as React from 'react';
import './AppLayout.less';
import { Layout } from 'antd';
import utils from '../../utils/utils';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import DocumentTitle from 'react-document-title';
import SiderMenu from '../../components/SiderMenu';
import NotFoundRoute from '../Router/NotFoundRoute';
import { appRouters } from '../Router/router.config';
import { Redirect, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../../components/Router/ProtectedRoute';
import Stores from '../../stores/storeIdentifier';
import { inject, observer } from 'mobx-react';

const { Content } = Layout;

// @inject(Stores.NotificationStore)
@inject(Stores.AuthenticationStore, Stores.SessionStore, Stores.AccountStore)
@observer
class AppLayout extends React.Component<any> {

  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  hideDrawer = async () => {
    this.setState({ drawerVisible: false });
  }
  render() {
    const {
      history,
      location: { pathname },
    } = this.props;

    const { path } = this.props.match;
    const { collapsed } = this.state;

    const layout = (
      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu path={path} onCollapse={this.onCollapse} history={history} collapsed={collapsed} />
        <Layout>
          <Layout.Header style={{ background: '#fff', minHeight: 52, padding: 0 }}>
            <Header  
            // notificationStore={this.props.notificationStore}
              sessionStore={this.props.sessionStore}
              accountStore={this.props.accountStore}
              authenticationStore={this.props.authenticationStore}
              collapsed={this.state.collapsed}
              toggle={this.toggle} />
          </Layout.Header>
          <Content style={{ margin: 16 }}>
            <Switch>
              {pathname === '/' && <Redirect from="/" to="/home" />}
              {appRouters
                .filter((item: any) => !item.isLayout)
                .map((route: any, index: any) => (
                  <Route
                    exact
                    key={index}
                    path={route.path}
                    render={(props) => <ProtectedRoute component={route.component} permission={route.permission} />}
                  />
                ))}
              {pathname !== '/' && <NotFoundRoute />}
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );

    return <DocumentTitle title={utils.getPageTitle(pathname)}>{layout}</DocumentTitle>;
  }
}

export default AppLayout;
 