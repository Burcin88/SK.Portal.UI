/*eslint-disable */
import './index.less'
import { Avatar } from 'antd';
import *  as React from 'react';
import Meta from 'antd/lib/card/Meta';
import { inject, observer } from 'mobx-react';
import Loading from '../../components/Loading';
import Stores from '../../stores/storeIdentifier';
import AccountStore from '../../stores/accountStore';
import SessionStore from '../../stores/sessionStore';
import { AntDesignOutlined } from '@ant-design/icons';
import AppComponentBase from '../../components/AppComponentBase';
import AuthenticationStore from '../../stores/authenticationStore';

export interface IProps {
    sessionStore?: SessionStore;
    accountStore?: AccountStore;
    authenticationStore?: AuthenticationStore;

}
export interface IState {
    name: string;
    title: string;
    surname: string;
    isLoading: boolean;
    emailAddress: string;
}

@inject(
    Stores.SessionStore,
    Stores.AccountStore,
    Stores.AuthenticationStore,
)

@observer
class InformationCart extends AppComponentBase<IProps, IState> {
    state = {
        title: '',
        name: '',
        surname: '',
        emailAddress: '',
        isLoading: true
    }

    componentDidMount() {
        this.props.sessionStore?.getCurrentLoginInformations()
            .then(() => {
                this.setState({
                    name: this.props.sessionStore?.currentLogin.user.name ?? '',
                    surname: this.props.sessionStore?.currentLogin.user.surname ?? '',
                    emailAddress : this.props.sessionStore?.currentLogin.user.emailAddress ?? '',
                    title : this.props.sessionStore?.currentLogin.user.title ?? ''
                });

                this.setState({ isLoading: false })
            })
            .catch((err) => { });
    }

    render() {
        return (
            <>
                {
                    this.state.isLoading ? <Loading /> :
                        <Meta
                            avatar={<Avatar size={100} icon={<AntDesignOutlined />} />}
                            title={<p className={'metaUserName'}>{this.state.name} {this.state.surname}</p>}
                            description={
                                <>
                                    <p>{this.state.title}</p>
                                    <p>{this.state.emailAddress}</p>
                                </>
                            }
                        />
                }
            </>
        );
    }
}

export default InformationCart;
