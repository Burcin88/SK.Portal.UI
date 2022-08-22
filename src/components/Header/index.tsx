/*eslint-disable */
import './index.less';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { L } from '../../lib/abpUtility';
import LanguageSelect from '../LanguageSelect';
import profilePicture from '../../images/user.png';
import { Avatar, Badge, Col, Dropdown, Menu, Row, Space } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
// import NotificationDrawer from '../../components/NotificationDrawer';
import SessionStore from '../../stores/sessionStore';
import AccountStore from '../../stores/accountStore';
import AuthenticationStore from '../../stores/authenticationStore';
import Title from 'antd/lib/typography/Title';

// import NotificationStore from '../../stores/notificationStore';

export interface IHeaderProps {
  collapsed?: any;
  toggle?: any;
  sessionStore: SessionStore;
  accountStore: AccountStore;
  // notificationStore: NotificationStore;
  authenticationStore: AuthenticationStore;
}

const userDropdownMenu = (
  <Menu>
    <Menu.Item key="2">
      <Link to="/logout">
        <LogoutOutlined />
        <span> {L('Logout')}</span>
      </Link>
    </Menu.Item>
  </Menu>
);

export class Header extends React.Component<IHeaderProps> {
  state = {
    visible: false,
    notificationCount: 0,
    name: '',
    surname: '',
  };

  onNotificationHandler = () => {
    this.setState({ visible: !this.state.visible });
  };

  hideDrawer = async () => {
    this.setState({ visible: false });
  };

  async componentDidMount() {
    await this.props.sessionStore.getCurrentLoginInformations();

    this.props.sessionStore == undefined
      ? ''
      : this.setState({
          name: this.props.sessionStore.currentLogin.user.name,
          surname: this.props.sessionStore.currentLogin.user.surname,
        });
  }

  render() {
    const {
      // visible,
      notificationCount,
      name,
      surname,
    } = this.state;

    //const surname=this.props.sessionStore === undefined ?
    // '':this.props.sessionStore?.currentLogin.user.surname

    return (
      <Row className={'header-container'}>
        <Col style={{ textAlign: 'left' }} span={12}>
          {this.props.collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={this.props.toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={this.props.toggle} />
          )}
        </Col>

        <Col style={{ padding: '0px 15px 0px 15px', textAlign: 'right' }} span={12}>
          <Space>
            <Title level={5} style={{ marginRight: '15px' }}>
              {name}&nbsp;
              {surname}
            </Title>
          </Space>
          <Space>
            <Badge count={notificationCount}>
              <Avatar
                size="small"
                shape="circle"
                alt={'profile'}
                icon={<BellOutlined onClick={this.onNotificationHandler} />}
              />
            </Badge>
            <LanguageSelect />
            <Dropdown className={'header-drop'} overlay={userDropdownMenu} trigger={['click']}>
              <Avatar size="small" shape="circle" alt={'profile'} src={profilePicture} />
            </Dropdown>

            {/* <NotificationDrawer notificationStore={this.props.notificationStore} sessionStore={this.props.sessionStore} accountStore= {this.props.accountStore} authenticationStore={this.props.authenticationStore} visible={visible} showOrHideDrawer={this.hideDrawer} notificationCount={notificationCount} />*/}
          </Space>
        </Col>
      </Row>
    );
  }
}

export default Header;
