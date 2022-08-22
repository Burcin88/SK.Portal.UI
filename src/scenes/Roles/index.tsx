/*eslint-disable */
import * as React from 'react';

import { Breadcrumb, Button, Card, Col, Dropdown, Input, Menu, Modal, PageHeader, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateRole from './components/createOrUpdateRole';
import { EntityDto } from '../../services/dto/entityDto';
import { isGranted, L } from '../../lib/abpUtility';
import RoleStore from '../../stores/roleStore';
import Stores from '../../stores/storeIdentifier';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import RoleDetailDrawer from '../../components/RoleDetailDrawer';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import { Link } from 'react-router-dom';

export interface IRoleProps {
  roleStore: RoleStore;
}

export interface IRoleState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  roleId: number;
  filter: string;
  drawerVisible: boolean;
  totalSizeTable: number,
  filterTable: { offset: number, limit: number, current: number }
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.RoleStore)
@observer
class Role extends AppComponentBase<IRoleProps, IRoleState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 100000,
    skipCount: 0,
    roleId: 0,
    filter: '',
    drawerVisible: false,
    totalSizeTable: 0,
    filterTable: { offset: 0, limit: 5, current: 0, }
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.roleStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
  }

  // handleTableChange = (pagination: any) => {
  //   this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  // };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      this.props.roleStore.createRole();
      await this.props.roleStore.getAllPermissions();
    } else {
      await this.props.roleStore.getRoleForEdit(entityDto);
      await this.props.roleStore.getAllPermissions();
    }

    this.setState({ roleId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({
        ...this.props.roleStore.roleEdit.role,
        grantedPermissions: this.props.roleStore.roleEdit.grantedPermissionNames,
      });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      okText: L('Yes'),
      cancelText: L('No'),
      title: L('ConfirmDelete'),
      onOk() {
        self.props.roleStore.delete(input);
      },
      onCancel() { },
    });
  }

  handleCreate = () => {


    const form = this.formRef.current;
    form!.validateFields().then(async (values: any) => {
      if (this.state.roleId === 0) {
        await this.props.roleStore.create(values);
      } else {
        await this.props.roleStore.update({ id: this.state.roleId, ...values });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };


  showDrawer = async (entityDto: EntityDto) => {
 
    await this.props.roleStore.getRoleForEdit(entityDto);
    await this.props.roleStore.getAllPermissions();
    this.setState({ drawerVisible: true, roleId: entityDto.id });
  }

  hideDrawer = async (entityDto: EntityDto) => {
    this.setState({ drawerVisible: false });
  }

  handlePaginationTable = pagination => {
    const { filterTable } = this.state;
    const { pageSize, current } = pagination;
    this.setState({
      filterTable: { ...filterTable, current, limit: pageSize }
    });
  };

  public render() {
    const { drawerVisible } = this.state;
    const { allPermissions, roles } = this.props.roleStore;

    const { filterTable, totalSizeTable } = this.state;

    const tablePaginationTable = {
      pageSize: filterTable.limit,
      current: filterTable.current || 1,
      total: totalSizeTable,
      locale: { items_per_page: L('page') },
      pageSizeOptions: ["5", "10", "20", "30", "50", "100"],
      showSizeChanger: true,
    };

    const columns =
      [

        {
          title: L('UserInformations xs'),
          render: (record) => (
            <React.Fragment>
              <span className={'responsive-title'}>{L('table.role.rolename')}</span> : {record.name}
              <br />
              <span className={'responsive-title'}>{L('table.role.displayname')}</span>  : {record.displayName}
              <br />
              <span className={'responsive-title'}>{L('table.role.description')} </span> : {record.description}
              <br />
              <span className={'responsive-title'}>{L('table.role.transactions')}</span>  : {record.transactions}
            </React.Fragment>
          ),
          responsive: ['xs'] as Breakpoint[]
        },

        { title: L('table.role.rolename'), dataIndex: 'name', key: 'name', width: 150, render: (text: string) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
        { title: L('table.role.displayname'), dataIndex: 'displayName', key: 'displayName', width: 150, render: (text: string) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
        { title: L('table.role.description'), dataIndex: 'description', key: 'description', width: 150, render: (text: string) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
        {
          title: L('table.role.transactions'),
          width: 150,
          render: (text: string, item: any) => (
            <div>
              

              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu>
                    {
                      isGranted('subitems.role.table.create') && <Menu.Item key={0} onClick={() => this.showDrawer({ id: item.id })}>{L('AddRole')}</Menu.Item>
                    }
                    {
                      isGranted('subitems.role.table.edit') && <Menu.Item key={1} onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>{L('Edit')}</Menu.Item>
                    }
                    {
                      isGranted('subitems.role.table.delete') && <Menu.Item key={2} onClick={() => this.delete({ id: item.id })}>{L('Delete')}</Menu.Item>
                    }
                  </Menu>
                }
                placement="bottomLeft"
              >
                <Button type="primary" icon={<SettingOutlined />}> {L('Actions')} </Button>
              </Dropdown>
            </div>
          ),
          responsive: ['sm'] as Breakpoint[]
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
                                <Breadcrumb.Item>{isGranted('items.dashboard.view') ? <Link to="/dashboard">{L('Dashboard')}</Link> : <Link to="/home">{L('Dashboard')}</Link>}  </Breadcrumb.Item>
                                <Breadcrumb.Item> {L('pages.role.new')} </Breadcrumb.Item>
                            </Breadcrumb>
                        }  >
                    </PageHeader>
                </Card>


        <Card>
          <Row>
            <Col
              xs={{ span: 4, offset: 0 }}
              sm={{ span: 4, offset: 0 }}
              md={{ span: 4, offset: 0 }}
              lg={{ span: 2, offset: 0 }}
              xl={{ span: 2, offset: 0 }}
              xxl={{ span: 2, offset: 0 }}
            >
              <h2>{L('Roles')}</h2>
            </Col>
            <Col
              xs={{ span: 14, offset: 0 }}
              sm={{ span: 15, offset: 0 }}
              md={{ span: 15, offset: 0 }}
              lg={{ span: 1, offset: 21 }}
              xl={{ span: 1, offset: 21 }}
              xxl={{ span: 1, offset: 21 }}
            >
              {
               isGranted('items.role.table.role.new.create') &&
               <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
               }
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 10, offset: 0 }}>
              <Search placeholder={L('Filter')} onSearch={this.handleSearch} />
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
                rowKey="id"
                pagination={tablePaginationTable}
                columns={columns}
                loading={roles === undefined ? true : false}
                dataSource={roles === undefined ? [] : roles.items}
                onChange={this.handlePaginationTable}
              />
            </Col>
          </Row>

          <CreateOrUpdateRole
            visible={this.state.modalVisible}
            onCancel={() =>
              this.setState({
                modalVisible: false,
              })
            }
            modalType={this.state.roleId === 0 ? 'edit' : 'create'}
            onOk={this.handleCreate}
            permissions={allPermissions}
            roleStore={this.props.roleStore}
            formRef={this.formRef}
          />
        </Card>

        <RoleDetailDrawer
          visible={drawerVisible}
          showOrHideDrawer={this.hideDrawer}
          permissions={allPermissions}
          roleStore={this.props.roleStore} />

      </>
    );
  }
}

export default Role;
