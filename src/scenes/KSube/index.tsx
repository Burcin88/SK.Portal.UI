/* eslint-disable */
import './index.less';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import KSubeStore from '../../stores/kSubeStore';
import KNormStore from '../../stores/kNormStore';
import Stores from '../../stores/storeIdentifier';
import KCartList from '../../components/KCartList';
import { SettingOutlined } from '@ant-design/icons';
import { isGranted, L } from '../../lib/abpUtility';
import SessionStore from '../../stores/sessionStore';
import AccountStore from '../../stores/accountStore';
import KSubeNormStore from '../../stores/kSubeNormStore';
import KPersonelStore from '../../stores/kPersonelStore';
import { EntityDto } from '../../services/dto/entityDto';
import CreateKSubeNorm from './components/createKSubeNorm';
import KNormDetailStore from '../../stores/kNormDetailStore';
import AppComponentBase from '../../components/AppComponentBase';
import AuthenticationStore from '../../stores/authenticationStore';
import KInkaLookUpTableStore from '../../stores/kInkaLookUpTableStore';
import { notification, message, Button, Card, Col, Dropdown, Menu, Row, Table, Input, Breadcrumb, PageHeader, Modal } from 'antd';

import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import { dateHelper } from '../../helper/date';

export interface Props {
    kSubeStore: KSubeStore;
    kNormStore: KNormStore;
    sessionStore?: SessionStore;
    accountStore?: AccountStore;
    kSubeNormStore: KSubeNormStore;
    kPersonelStore: KPersonelStore;
    kNormDetailStore: KNormDetailStore;
    authenticationStore?: AuthenticationStore;
    kInkaLookUpTableStore: KInkaLookUpTableStore;

}

export interface State {
    id: string;
    moment: any;
    normId: string;
    subeAdi: string;
    subeObjId: string;
    totalSize: number;
    skipCount: number;
    searchFilter: string;
    cardLoading: boolean;
    modalVisible: boolean;
    maxResultCount: number;
    kPersonelCount: number;
    filter: { offset: number, limit: number, current: number },
    normList: any;
    dateFilter: boolean;
    tableloding:boolean;
}

const confirm = Modal.confirm;
@inject(Stores.KSubeStore)
@inject(Stores.KNormStore)
@inject(Stores.KSubeNormStore)
@inject(Stores.KPersonelStore)
@inject(Stores.KNormDetailStore)
@inject(Stores.KInkaLookUpTableStore)
@inject(Stores.AuthenticationStore, Stores.SessionStore, Stores.AccountStore)
@observer
class KSube extends AppComponentBase<Props, State>{
    formRef = React.createRef<FormInstance>();

    state = {
        id: '0',
        normId: '0',
        subeAdi: '',
        skipCount: 0,
        subeObjId: '0',
        searchFilter: '',
        cardLoading: true,
        maxResultCount: 5,
        kPersonelCount: 0,
        modalVisible: false,
        totalSize: 0,
        filter: { offset: 0, limit: 5, current: 0, },
        moment: [] as any,
        normList: [] as any,
        dateFilter: false,
        tableloding:true
    };

    getNormRequests = async (id: string, start?: any, end?: any) => {

        await this.props.kNormStore.getMaxAll({
            id: '0',
            keyword: '',
            bolgeId: id,
            type: 'sube',
            skipCount: 0,
            maxResultCount: 100000,
            end: end,
            start: start,
        });

    }
    async getKSubeEmployees() {
        await this.props.kPersonelStore.getAll({
            keyword: '',
            skipCount: 0,
            id: this.state.subeObjId,
            maxResultCount: 5,
        });
    }

    getNormRequestCounts = async (id: string, start?: any, end?: any) => {

        await this.props.kNormStore.getMaxAllCount({
            id: '0',
            keyword: '',
            bolgeId: id,
            type: 'sube',
            skipCount: 0,
            maxResultCount: 100000,
            end: end,
            start: start
        });
    }


    onDateFilter = async (date) => {
        let startDate: any;
        let endDate: any;
        if (date === null) {
            startDate = dateHelper.getMonthFirstDate('tr');
            endDate = dateHelper.getTodayDate('tr');
        }
        else {
            startDate = dateHelper.getMonthWidthFirstDate(date[0], 'tr');
            endDate = dateHelper.getTodayWidthDate(date[1], 'tr');
        }
        await this.getNormRequests(this.state.id, startDate, endDate);
        await this.getNormRequestCounts(this.state.id, startDate, endDate);
        this.setState({ moment: [startDate, endDate] })
    }


    // Şubeye ait norm listesini getirir
    async getKSubeNorms() {
        await this.props.kSubeNormStore.getAllNorms({
            keyword: '',
            skipCount: 0,
            maxResultCount: 5,
            id: this.state.subeObjId,
        });
    }

    async getNormCount(id: string) {
        await this.props.kSubeNormStore.getNormCountById(id);
    }

    kPosizyonKontrol = (key: string) => {
        this.getKSubeNorms();
        const form = this.formRef.current;
        if (this.props.kSubeNormStore.norms.items.filter((x) => x.pozisyon === key).length > 0) {

            message.error({
                content: L('UniqSelect'),
                style: {
                    marginTop: '12vh',
                },
            })
            form!.resetFields();
        }
    }

    openNotificationWithIcon = type => {
        notification[type]({
            message: type === "success" ? L('NormCreateNotificationMessageTitle') : L('NormRejectNotificationMessageTitle'),
            description: type === "success" ? L('NormCreateNotificationMessageDescription') : L('NormCreateNotificationMessageDescription'),
            duration: 3
        });
    };

    permissionNotification = type => {
        notification[type]({
            message: L('YouAreNotAuthorizedToAddRecordsTitle'),
            description: L('YouAreNotAuthorizedToAddRecordsDescription'),
            duration: 3
        });
    };

    // Şube için Norm Oluşturma Metodu
    kSubeNormCreate = () => {
        const form = this.formRef.current;
        form!.validateFields().then(async (values: any) => {

            if (this.state.normId === '0') {

                if (isGranted('items.knorm.ksubenorm.create')) {
                    await this.props.kSubeNormStore.create(values);
                    this.openNotificationWithIcon('success')
                } else {
                    this.permissionNotification('warning');
                }
            }

            else {
                if (isGranted('items.knorm.ksubenorm.edit')) {
                    await this.props.kSubeNormStore.update({ ...values, id: this.state.normId });
                } else {
                    this.permissionNotification('warning');
                }
            }
            form!.resetFields();
            await this.getKSubeNorms();
            await this.getKSubeEmployees();
            await this.mergeArray()
        });
    };

    kSubeNormEdit = (input: EntityDto<string>) => {
        this.props.kSubeNormStore.get(input);
        const form = this.formRef.current;
        this.setState({ normId: input.id })

        setTimeout(() => {
            form!.setFieldsValue({ ...this.props.kSubeNormStore.editNorm });
        }, 200);

    }

    kSubeNormDelete = (input: EntityDto<string>) => {
        const self = this;
        confirm({
            okText: L('Yes'),
            cancelText: L('No'),
            title: L('ConfirmDelete'),
            onOk() {

                self.props.kSubeNormStore.delete(input).then(() => {

                    self.getKSubeNorms();
                    self.getKSubeEmployees();
                    self.mergeArray();

                }).catch((err) => console.log(err))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    async getAll() {
 

        await this.props.kSubeStore.getAll({
            isActive: true,
            isActivity: true,
            id: this.state.id,
            keyword: this.state.searchFilter,
            skipCount: this.state.skipCount,
            maxResultCount: this.state.maxResultCount
        });
        await this.props.kSubeStore.getNormCount(this.state.id);
        this.setState({ cardLoading: false })
        this.setState({tableloding:false})
    }

    async get(entityDto: EntityDto<string>) {
        await this.props.kSubeStore.get(entityDto);
    }

    async getPosition(key: string) {
        await this.props.kInkaLookUpTableStore
            .getAll(
                {
                    maxResultCount: 1000,
                    keyword: key,
                    skipCount: 0
                }
            );
    }

    async createOrUpdateModalOpen(tip: string, id: string, subeAdi: string) {

        this.formRef.current?.resetFields();

        await this.setState({ subeObjId: id, subeAdi: subeAdi })
        await this.getPosition(tip);

        if (isGranted('items.knorm.ksubenorm.view')) {
            await this.getKSubeNorms();
            await this.getKSubeEmployees();
            await this.mergeArray();
        }

        this.setState({ modalVisible: !this.state.modalVisible });
    }

    async getEmployeeCount(id: string) {

        await this.props.kPersonelStore.getEmployeeCountById(id);
    }

    async setPageState() {

        this.setState({ id: this.props["match"].params["id"] });
    }

    async componentDidMount() {

        let currentDate = dateHelper.getTodayDate('tr');
        let startOfMonth = dateHelper.getMonthFirstDate('tr');
        if (
            isGranted('subitems.dashboard.infobox.gettotalnormfillingrequest') ||
            isGranted('subitems.dashboard.infobox.getpendingnormfillrequest') ||
            isGranted('subitems.dashboard.infobox.getacceptednormfillrequest') ||
            isGranted('subitems.dashboard.infobox.getcancelednormfillrequest') ||
            isGranted('subitems.dashboard.infobox.gettotalnormupdaterequest') ||
            isGranted('subitems.dashboard.infobox.getpendingnormupdaterequest') ||
            isGranted('subitems.dashboard.infobox.getacceptednormupdaterequest') ||
            isGranted('subitems.dashboard.infobox.getcancelednormupdaterequest')) {
            this.setState({ dateFilter: true })
            await this.getNormRequests(this.state.id, startOfMonth, currentDate)
            await this.getNormRequestCounts(this.state.id, startOfMonth, currentDate)

        }

        await this.setPageState();
        await this.getAll();
        await this.get({ id: this.state.id });
        await this.getEmployeeCount(this.state.id);
        await this.getNormCount(this.state.id);

    }

    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
    };

    handleSearch = (value: string) => {
       this.setState({tableloding:true});
        this.setState({ searchFilter: value }, async () => await this.getAll());
    };

    handlePagination = pagination => {
        const { filter } = this.state;
        const { pageSize, current } = pagination;

        this.setState({
            filter: {
                ...filter,
                current,
                limit: pageSize
            }
        });
    };


    mergeArray = async () => {

        let normList = this.props.kSubeNormStore.norms.items.map((record, index) => Object.assign({
            id: record.id,
            position: record.pozisyon,
            creationTime: record.creationTime,
            normCount: this.props.kSubeNormStore.norms.items.filter(x => x.pozisyon === record.pozisyon)[0].adet,
            employeeCount: this.props.kPersonelStore.kPersonels.items.filter(x => x.gorevi === record.pozisyon).length
        }))

        this.setState({ normList: normList });
    }

    public render() {

        const { filter, totalSize, dateFilter } = this.state;
        const tablePagination = {
            pageSize: filter.limit,
            current: filter.current || 1,
            total: totalSize,
            pageSizeOptions: ["5", "10", "20", "30", "50", "100"],
            showSizeChanger: true,
            locale: { items_per_page: L('page') },
            // showTotal: total => L('Total') + ` : ${total}   `
        };

        const Search = Input.Search;
        const { cardLoading, moment } = this.state;
        const { kPersonelCount } = this.props.kPersonelStore;
        const { positions } = this.props.kInkaLookUpTableStore;
        const { kSubes, editKSube, normCount } = this.props.kSubeStore;

        const {
            getTotalNormUpdateRequestCount,
            getPendingNormFillRequestCount,
            getTotalNormFillingRequestCount,
            getAcceptedNormFillRequestCount,
            getCanceledNormFillRequestCount,
            getPendingNormUpdateRequestCount,
            getAcceptedNormUpdateRequestCount,
            getCanceledNormUpdateRequestCount
        } = this.props.kNormStore;

        const columns = [


            {
                title: L('BranchInformations xs'),
                render: (record) => (
                    <React.Fragment>
                        <span className={'responsive-title'}>{L('Area')}</span> : {record.adi}
                        <br />
                        <span className={'responsive-title'}>{L('table.branch.name')}</span>  : {record.adi}
                        <br />
                        <span className={'responsive-title'}>{L('table.branch.type')} </span> : {record.tip}
                        <br />
                        <span className={'responsive-title'}>{L('table.branch.employeecount')}</span>  : {record.personelSayisi}
                        <br />
                        <span className={'responsive-title'}> {L('table.branch.normcount')}</span>  : {record.normSayisi}
                        <br />
                        <span className={'responsive-title'}> {L('table.branch.normgap')}</span>  : {record.normEksigi}
                        <br />
                        <span className={'responsive-title'}> {L('table.branch.transactions')}</span>  : {record.text}
                    </React.Fragment>
                ),
                responsive: ['xs'] as Breakpoint[]

            },


            { title: L('Area'), dataIndex: 'adi', key: 'adi', width: 150, render: (text: string) => <div>{editKSube === undefined ? '' : editKSube.adi}</div>, responsive: ['sm'] as Breakpoint[] },
            { title: L('table.branch.name'), dataIndex: 'adi', key: 'adi', width: 150, render: (text: string) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
            { title: L('table.branch.type'), dataIndex: 'tip', key: 'tip', width: 150, render: (text: string) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
            { title: L('table.branch.employeecount'), dataIndex: 'personelSayisi', key: 'personelSayisi', width: 150, render: (text: string) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
            { title: L('table.branch.normcount'), dataIndex: 'normSayisi', key: 'normSayisi', width: 150, render: (text: string) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
            { title: L('table.branch.normgap'), dataIndex: 'normEksigi', key: 'normEksigi', width: 150, render: (text: number) => <div>{text}</div>, responsive: ['sm'] as Breakpoint[] },
            {
                title: L('table.branch.transactions'),
                width: 150,
                render: (text: string, item: any) => (
                    <div>
                        <Dropdown
                            trigger={['click']}
                            overlay={
                                <Menu>
                                       {  isGranted('items.branch.list.view.detail.btn') &&
                                    <Menu.Item >
                         
                                   
                                        <Link to={

                                            {
                                                pathname: `/ksubedetay/${item.objId}`
                                            }

                                        }> {L('Detail')} </Link>
                                    </Menu.Item>
                                    }
                                    {
                                        this.isGranted('items.knorm.ksubenorm.operation') && <Menu.Item > <Link to={'#'} onClick={() => this.createOrUpdateModalOpen(item.tip, item.objId, item.adi)} > {L('NormCreate')} </Link> </Menu.Item>
                                    }
                                </Menu>
                            }
                            placement="bottomLeft">
                            <Button type="primary" icon={<SettingOutlined />}>
                                {L('Actions')}
                            </Button>
                        </Dropdown>
                    </div >
                ),
                responsive: ['sm'] as Breakpoint[]
            },
        ];
        return (
            <>  <React.Fragment>
                <Card style={{ marginBottom: 20 }}>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to="/home">{L('Dashboard')}</Link>   </Breadcrumb.Item>
                                <Breadcrumb.Item> <Link to="/bolgemudurluk">{L('RegionalOffices')}</Link>  </Breadcrumb.Item>
                                <Breadcrumb.Item> {editKSube === undefined ? '' : editKSube.adi} </Breadcrumb.Item>
                            </Breadcrumb>
                        }  >
                    </PageHeader>
                </Card>

                <KCartList
                    dateFilter={dateFilter}
                    moment={moment}
                    type="sube"
                    bolgeId={this.state.id}
                    normCount={normCount}
                    subeObjId={this.state.id}
                    cardLoading={cardLoading}
                    kPersonelCount={kPersonelCount}
                    onDateFilter={this.onDateFilter}
                    kNormStore={this.props.kNormStore}
                    kNormDetailStore={this.props.kNormDetailStore}
                    getTotalNormUpdateRequestCount={getTotalNormUpdateRequestCount}
                    getPendingNormFillRequestCount={getPendingNormFillRequestCount}
                    getTotalNormFillingRequestCount={getTotalNormFillingRequestCount}
                    getAcceptedNormFillRequestCount={getAcceptedNormFillRequestCount}
                    getCanceledNormFillRequestCount={getCanceledNormFillRequestCount}
                    getPendingNormUpdateRequestCount={getPendingNormUpdateRequestCount}
                    getAcceptedNormUpdateRequestCount={getAcceptedNormUpdateRequestCount}
                    getCanceledNormUpdateRequestCount={getCanceledNormUpdateRequestCount}
                    getTotalNormUpdateRequestPermission={isGranted('subitems.dashboard.infobox.gettotalnormupdaterequest')}
                    getPendingNormFillRequestPermission={isGranted('subitems.dashboard.infobox.getpendingnormfillrequest')}
                    getTotalNormFillingRequestPermission={isGranted('subitems.dashboard.infobox.gettotalnormfillingrequest')}
                    getAcceptedNormFillRequestPermission={isGranted('subitems.dashboard.infobox.getacceptednormfillrequest')}
                    getCanceledNormFillRequestPermission={isGranted('subitems.dashboard.infobox.getcancelednormfillrequest')}
                    getPendingNormUpdateRequestPermission={isGranted('subitems.dashboard.infobox.getpendingnormupdaterequest')}
                    getAcceptedNormUpdateRequestPermission={isGranted('subitems.dashboard.infobox.getacceptednormupdaterequest')} 
                    getCanceledNormUpdateRequestPermission={isGranted('subitems.dashboard.infobox.getcancelednormupdaterequest')}  
 
                />
             { isGranted('items.branch.list.view') &&
                <Card hoverable>
                    <Row>
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 24, offset: 0 }}
                            md={{ span: 24, offset: 0 }}
                            lg={{ span: 22, offset: 0 }}
                            xl={{ span: 22, offset: 0 }}
                            xxl={{ span: 22, offset: 0 }}
                        >
                            <h2>{L('KSube')}</h2>
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
                                bordered={false}
                                columns={columns}
                                pagination={tablePagination}
                                onChange={this.handlePagination}
                                locale={{ emptyText: L('NoData') }}
                                rowKey={(record) => record.objId.toString()}
                                //loading={kSubes === undefined ? true : false}
                                loading={this.state.tableloding}
                                dataSource={kSubes === undefined ? [] : kSubes.items}
                            />
                        </Col>
                    </Row>
                    

                </Card>

                }
                <CreateKSubeNorm
                    modalType={'create'}
                    normList={this.state.normList}
                    formRef={this.formRef}
                    positionSelect={positions}
                    subeAdi={this.state.subeAdi}
                    subeObjId={this.state.subeObjId}
                    visible={this.state.modalVisible}
                    kSubeNormEdit={this.kSubeNormEdit}
                    kSubeNormCreate={this.kSubeNormCreate}
                    kSubeNormDelete={this.kSubeNormDelete}
                    kPosizyonKontrol={this.kPosizyonKontrol}
                    kSubeNormStore={this.props.kSubeNormStore}
                    kSubeNorms={this.props.kSubeNormStore.norms}
                    onCancel={() => { this.setState({ modalVisible: false, }); }}
                    bolgeAdi={this.props.kSubeStore.editKSube !== undefined ? this.props.kSubeStore.editKSube.adi : ''}
                />
            </React.Fragment >
            </>
        )
    }
}

export default KSube;