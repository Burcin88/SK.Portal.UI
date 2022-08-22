/* eslint-disable  @typescript-eslint/no-unused-expressions*/
import React from 'react';
import { L } from '../../lib/abpUtility';
import { Drawer, Space } from 'antd';
import Stores from '../../stores/storeIdentifier';
import { inject, observer } from 'mobx-react';
import SessionStore from '../../stores/sessionStore';
import AccountStore from '../../stores/accountStore';
import AuthenticationStore from '../../stores/authenticationStore';
// import NotificationStore from '../../stores/notificationStore';

export interface INotificationProps {
    visible: boolean;
    notificationCount: number;
    showOrHideDrawer: () => void;
    sessionStore: SessionStore;
    accountStore: AccountStore;
    // notificationStore: NotificationStore;
    authenticationStore: AuthenticationStore;
}


// @inject(Stores.NotificationStore)
@inject(Stores.AuthenticationStore, Stores.SessionStore, Stores.AccountStore)
@observer
class NotificationDrawer extends React.Component<INotificationProps>  {

    getNotifications = async () => {
        // await this.props.notificationStore.getAll("8");
    }


    componentDidMount = async () => {
        await this.getNotifications();
    }

    content = () => {
        return <>
            <Space style={{ width: '100%' }} direction="vertical">
                <div>{L('d')}</div>
            </Space>
        </>
    }

    render() {

        const { visible, showOrHideDrawer } = this.props;
        return (
            <Drawer width={500}
                // footer={     }
                title={L('Notifications')}
                visible={visible}
                onClose={showOrHideDrawer}
                destroyOnClose={true}>
                {this.content()}
            </Drawer>
        )
    }
}

export default NotificationDrawer;

