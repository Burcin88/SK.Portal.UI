/*eslint-disable */
import './index.less';
import * as React from 'react';
import { L } from '../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import UserStore from '../../stores/userStore';
import Stores from '../../stores/storeIdentifier';
import { EntityDto } from '../../services/dto/entityDto';
import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateUser from './components/createOrUpdateUser';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Dropdown, Input, Menu, Modal, PageHeader, Row, Table, Tag } from 'antd';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import { Link } from 'react-router-dom';



export interface IUserProps {
  userStore: UserStore;
}

export interface IUserState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  userId: number;
  filter: string;
  drawerVisible: boolean;
  totalSizeTable: number,
  filterTable: { offset: number, limit: number, current: number },
  tableloding:boolean
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.UserStore)
@observer
class User extends AppComponentBase<IUserProps, IUserState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10000,
    skipCount: 0,
    userId: 0,
    filter: '',
    drawerVisible: false,
    totalSizeTable: 0,
    filterTable: { offset: 0, limit: 5, current: 0, },
    tableloding:true
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.userStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      keyword: this.state.filter
    });

    setTimeout(() => this.setState({ tableloding: false }), 500);

  }

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };


  async createOrUpdateModalOpen(entityDto: EntityDto) {

    if (entityDto.id === 0) {
      await this.props.userStore.createUser();
      await this.props.userStore.getRoles();
    } else {
      await this.props.userStore.get(entityDto);
      await this.props.userStore.getRoles();
    }

    this.setState({ userId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.userStore.editUser });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      okText: L('Yes'),
      cancelText: L('No'),
      title: L('ConfirmDelete'),
      onOk() {
        self.props.userStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = async () => {

    const form = this.formRef.current;
    form!.validateFields().then(async (values: any) => { 
      if (this.state.userId === 0) {
        try { 
          await this.props.userStore.create(values); 
        } catch (e) {
          console.log('ERROR : ', e)
        }
      } else { 
          
        try {
          await this.props.userStore.update({ ...values, id: this.state.userId });
        }catch(e){
          console.log('UPDATERERROR : ', e)
        }
      } 
      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();

    }).catch((err) => console.log('CreateError : ', err)); 
  };

  handleSearch = (value: string) => {

    this.setState({tableloding :true})
    this.setState({ filter: value }, async () => await this.getAll());
    

  };



  handlePaginationTable = pagination => {
    const { filterTable } = this.state;
    const { pageSize, current } = pagination;
    this.setState({
      filterTable: { ...filterTable, current, limit: pageSize }
    });
  };

  public render() {
    const { users } = this.props.userStore;

    const { filterTable, totalSizeTable } = this.state;

    const tablePaginationTable = {
      pageSize: filterTable.limit,
      current: filterTable.current || 1,
      total: totalSizeTable,
      locale: { items_per_page: L('page') },
      pageSizeOptions: ["5", "10", "20", "30", "50", "100"],
      showSizeChanger: true,
    };


    const columns = [

      {
        title: L('UserInformations xs'),
        render: (record) => (
          <React.Fragment>
            <span className={'responsive-title'}>{L('table.user.username')}</span> : {record.userName}
            <br />
            <span className={'responsive-title'}>{L('table.user.name')}</span>  : {record.name}
            <br />
            <span className={'responsive-title'}>{L('table.user.surname')} </span> : {record.surname}
            <br />
            <span className={'responsive-title'}>{L('table.user.duty')}</span>  : {record.title}
            <br />
            <span className={'responsive-title'}> {L('table.user.email')}</span>  : {record.emailAddress}
            <br />
            <span className={'responsive-title'}> {L('table.user.status')} </span> : {(record.isActive === true ? <Tag color="#2db7f5">{L('Active')}</Tag> : <Tag color="red">{L('Passive')}</Tag>)}
          </React.Fragment>
        ),
        responsive: ['xs'] as Breakpoint[]
      },


      { title: L('table.user.username'), dataIndex: 'userName', key: 'userName', width: 100, render: (text: string) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
      { title: L('table.user.name'), dataIndex: 'name', key: 'name', width: 100, render: (text: string) => <div className={"firstname"}>{text}</div>, responsive: ['sm'] as Breakpoint[] },
      { title: L('table.user.surname'), dataIndex: 'surname', key: 'surname', width: 100, render: (text: string) => <div className={"surname"}>{text}</div>, responsive: ['sm'] as Breakpoint[] },
      { title: L('table.user.duty'), dataIndex: 'title', key: 'title', width: 150, render: (text: string) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
      { title: L('table.user.email'), dataIndex: 'emailAddress', key: 'emailAddress', width: 150, render: (text: string) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
      {
        title: L('table.user.status'),
        dataIndex: 'isActive',
        key: 'isActive',
        width: 50,
        render: (text: boolean) => (text === true ? <Tag color="#2db7f5">{L('Active')}</Tag> : <Tag color="red">{L('Passive')}</Tag>), responsive: ['sm'] as Breakpoint[]
      },
      {
        title: L('table.user.transactions'),
        width: 100,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>{L('Edit')}</Menu.Item>
                  <Menu.Item onClick={() => this.delete({ id: item.id })}>{L('Delete')}</Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon={<SettingOutlined />}>
                {L('Actions')}
              </Button>
            </Dropdown>
          </div>
        ), responsive: ['sm'] as Breakpoint[]
      },
    ];

    return (
      <>


        <Card style={{ marginBottom: 20 }}>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={
              <Breadcrumb>
                <Breadcrumb.Item>{this.isGranted('items.dashboard.view') ? <Link to="/dashboard">{L('Dashboard')}</Link> : <Link to="/home">{L('Dashboard')}</Link>}  </Breadcrumb.Item>
                <Breadcrumb.Item> {L('pages.user')} </Breadcrumb.Item>
              </Breadcrumb>
            }  >
          </PageHeader>
        </Card>


        <Card>
          <Row>
            <Col
              xs={{ span: 2, offset: 0 }}
              sm={{ span: 2, offset: 0 }}
              md={{ span: 2, offset: 0 }}
              lg={{ span: 2, offset: 0 }}
              xl={{ span: 2, offset: 0 }}
              xxl={{ span: 2, offset: 0 }}
            >
              {' '}
              <h2>{L('Users')}</h2>
            </Col>
            <Col
              xs={{ span: 1, offset: 21 }}
              sm={{ span: 1, offset: 21 }}
              md={{ span: 1, offset: 21 }}
              lg={{ span: 1, offset: 21 }}
              xl={{ span: 1, offset: 21 }}
              xxl={{ span: 1, offset: 21 }}
            >
              <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 10, offset: 0 }}>
              <Search placeholder={L('Filter')}  onSearch={this.handleSearch} />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              lg={{ span: 24, offset: 0 }}
              xl={{ span: 24, offset: 0 }}
              xxl={{ span: 24, offset: 0 }}
            >
              <Table
                locale={{ emptyText: L('NoData') }}
                rowKey={(record) => record.id.toString()}
                columns={columns}
                //loading={users === undefined ? true : false}
                 loading={this.state.tableloding}
                dataSource={users === undefined ? [] : users.items}
                onChange={this.handlePaginationTable}
                pagination={tablePaginationTable} 
              />
            </Col>
          </Row> 
          <CreateOrUpdateUser
            formRef={this.formRef}
            visible={this.state.modalVisible}
            onCancel={() => {
              this.setState({
                modalVisible: false,
              });
              this.formRef.current?.resetFields();
            }}
            modalType={this.state.userId === 0 ? 'edit' : 'create'}
            onCreate={this.handleCreate}
            roles={this.props.userStore.roles}
          />
        </Card>

      </>
    );
  }
}

export default User;
