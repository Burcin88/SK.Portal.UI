/*eslint-disable */
import './index.less';
import uuid from 'react-uuid';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormInstance } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import KSubeStore from '../../stores/kSubeStore';
import KNormStore from '../../stores/kNormStore';
import Stores from '../../stores/storeIdentifier';
import KBolgeStore from '../../stores/kBolgeStore';
import { isGranted, L } from '../../lib/abpUtility';
import AccountStore from '../../stores/accountStore';
import SessionStore from '../../stores/sessionStore';
import { EntityDto } from '../../services/dto/entityDto';
import KSubeNormStore from '../../stores/kSubeNormStore';
import KPersonelStore from '../../stores/kPersonelStore';
import KHierarchyStore from '../../stores/kHierarchyStore';
import TalepTuru from '../../services/kNorm/dto/talepTuru';
import CreateNormForm from '../../components/CreateNormForm';
import KNormDetailStore from '../../stores/kNormDetailStore';
import NormStatus from '../../services/kNorm/dto/normStatus';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import TalepNedeni from '../../services/kNorm/dto/talepNedeni';
import TalepDurumu from '../../services/kNorm/dto/talepDurumu';
import AppComponentBase from '../../components/AppComponentBase';
import AuthenticationStore from '../../stores/authenticationStore';
import NormDetailTimeLine from '../../components/NormDetailTimeLine';
import KInkaLookUpTableStore from '../../stores/kInkaLookUpTableStore';
import InkaStore from '../../stores/inkaStore';
import JobStore from '../../stores/jobStore';
import {
  notification,
  Card,
  Col,
  Row,
  Table,
  Input,
  Button,
  Breadcrumb,
  PageHeader,
  Tooltip,
  Tag,
} from 'antd';
import {
  //AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileSearchOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons';


export interface IKsubeDatayProps {
  kSubeStore: KSubeStore;
  kNormStore: KNormStore;
  kBolgeStore: KBolgeStore;
  sessionStore?: SessionStore;
  accountStore?: AccountStore;
  kPersonelStore: KPersonelStore;
  kSubeNormStore: KSubeNormStore;
  kHierarchyStore: KHierarchyStore;
  kNormDetailStore: KNormDetailStore;
  authenticationStore?: AuthenticationStore;
  kInkaLookUpTableStore: KInkaLookUpTableStore;
  inkaStore: InkaStore;
  jobStore: JobStore;
}

export interface State {
  id: string;
  tip: string;
  groupNorm: {};
  userId: number;
  groupData: any[];
  groupEmployee: {};
  skipCount: number;
  normFilter: string;
  createFormState: {};
  cardLoading: boolean;
  searchFilter: string;
  modalVisible: boolean;
  skipNormCount: number;
  maxResultCount: number;
  totalSizeTable1: number;
  totalSizeTable2: number;
  totalSizeTable3: number;
  breadcrumbSubeAdi: string;
  bagliOlduguSubeId: string;
  breadcrumbBolgeAdi: string;
  maxNormResultCount: number;
  detaillModalVisible: boolean;
  filterTable1: { offset: number; limit: number; current: number };
  filterTable2: { offset: number; limit: number; current: number };
  filterTable3: { offset: number; limit: number; current: number };
  tablelodingPerson: boolean;
  tablelodingNorm: boolean;
  titleStringArray: string[];
  //credentialsList: any[];

}

const Search = Input.Search;


@inject(Stores.JobStore)
@inject(Stores.InkaStore)
@inject(Stores.KSubeStore)
@inject(Stores.KBolgeStore)
@inject(Stores.KNormStore)
@inject(Stores.KPersonelStore)
@inject(Stores.KSubeNormStore)
@inject(Stores.KHierarchyStore)
@inject(Stores.KNormDetailStore)
@inject(Stores.KInkaLookUpTableStore)
@inject(Stores.AuthenticationStore, Stores.SessionStore, Stores.AccountStore)
@observer
class KSubeDetay extends AppComponentBase<IKsubeDatayProps, State> {
  formRef = React.createRef<FormInstance>();

  state = {
    detaillModalVisible: false,
    maxNormResultCount: 20000,
    modalVisible: false,
    cardLoading: true,
    groupEmployee: {},
    maxResultCount: 20000,
    skipNormCount: 0,
    normFilter: '',
    groupNorm: {},
    skipCount: 0,
    userId: 0,
    tip: '',
    id: '0',
    groupData: [
      {
        id: 0,
        norm: 0,
        gorev: '',
        normCount: 0,
        employeeCount: 0,
      },
    ],
    bagliOlduguSubeId: '',
    createFormState: {
      name: 'Next',
      visible: false,
      pane: 'PositionSelect',
    },
    breadcrumbSubeAdi: '',
    breadcrumbBolgeAdi: '',
    filterTable1: { offset: 0, limit: 5, current: 0 },
    filterTable2: { offset: 0, limit: 5, current: 0 },
    filterTable3: { offset: 0, limit: 5, current: 0 },
    totalSizeTable1: 0,
    totalSizeTable2: 0,
    totalSizeTable3: 0,
    searchFilter: '',
    tablelodingPerson: true,
    tablelodingNorm: true,
    titleStringArray: []
  };



  async getPosition(key: string) {
    await this.props.kInkaLookUpTableStore.getAll({
      maxResultCount: 20000,
      keyword: key,
      skipCount: 0,
    });
  }

  async getNormRequests() {
    this.props.kNormStore.getAll({
      id: this.state.id,
      keyword: this.state.normFilter,
      maxResultCount: this.state.maxNormResultCount,
      skipCount: this.state.skipNormCount,
      bolgeId: '0',
      type: 'subedetail',
    });

    this.setState({ tablelodingNorm: false })

  }

  async getAllSubeNormForGroupBy() {
    await this.props.kSubeNormStore.getAllNorms({
      maxResultCount: 20000,
      skipCount: 0,
      keyword: '',
      id: this.state.id,
    });
  }

  async setAllSubeNormGroupBy() {
    let groupNorm = this.props.kSubeNormStore.norms.items.reduce((result, currentValue) => {
      (result[currentValue['pozisyon']] = result[currentValue['pozisyon']] || []).push(
        currentValue
      );
      return result;
    }, {});
    this.setState({ groupNorm, cardLoading: false });
  }

  async getAllEmployeesForGroupBy() {
    await this.props.kPersonelStore.getAllEmployees({
      maxResultCount: 10000,
      skipCount: 0,
      keyword: '',
      id: this.state.id,
    });
  }

  async setAllEmployeesGroupBy() {
    let groupEmployee = this.props.kPersonelStore.kAllPersonels.items.reduce(
      (result, currentValue) => {
        (result[currentValue['gorevi']] = result[currentValue['gorevi']] || []).push(currentValue);
        return result;
      },
      {}
    );
    this.setState({ groupEmployee, cardLoading: false });
  }

  async getAllEmployees() {
    await this.props.kPersonelStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      keyword: this.state.searchFilter,
      id: this.state.id,
    });

    this.setState({ tablelodingPerson: false })

  }


  checkEmployeeNormStatus = async (id: any) => {
    
    let result = await this.props.kNormStore.kNorms && await this.props.kNormStore.kNorms.items.filter((x) => x.personelId === id).length > 0
    if(result == true)
    notification.info({
      message: `Norm Talebi`,
      description: 'Belirtmiş olduğunuz personel için onaylanmamış olan norm süreci mevcuttur.',
      duration: 3,
    });
  
  }

  getKHierarchy = async () => {
    await this.props.kHierarchyStore.getAll(this.state.tip, this.state.bagliOlduguSubeId);
  };

  pageSettings = async () => {

    let tur = this.props.kSubeStore.editKSube.tur;
    if (tur === 'Acente') {
      this.setState({ tip: tur });
    } else {
      this.setState({ tip: this.props.kSubeStore.editKSube.tip });
    }

    this.setState({
      bagliOlduguSubeId: this.props.kSubeStore.editKSube.bagliOlduguSube_ObjId,
    });

    if (isGranted('items.kareas.menu.view')) {
      await this.props.kSubeStore.get({ id: this.props['match'].params['id'] });
      await this.props.kBolgeStore.get({ id: this.props.kSubeStore.editKSube.bagliOlduguSube_ObjId });
      this.setState({
        breadcrumbBolgeAdi: this.props.kBolgeStore.editKBolge.adi,
        breadcrumbSubeAdi: this.props.kSubeStore.editKSube.adi

      });
    }

  };

  setPageState = async () => {
    this.setState({ id: this.props['match'].params['id'] });
    this.props.kSubeStore.get({ id: this.props['match'].params['id'] }).then(() => {
      this.pageSettings();
    });
  };

  componentDidMount = async () => {
    await this.getNormRequests();
    await this.setPageState();

    if (isGranted('subitems.branch.detail.total.table.view')) {
      await this.getAllEmployees();
    }

    if (isGranted('subitems.branch.detail.employee.table.view')) {
      await this.getNormRequests();
      await this.getAllEmployees();
    }

    if (isGranted('subitems.branch.detail.norm.request.table.view')) {
      await this.getAllEmployeesForGroupBy();
      await this.getAllSubeNormForGroupBy();
      await this.setAllEmployeesGroupBy();
      await this.setAllSubeNormGroupBy();
      await this.mergeArray();
    }
  };

  handleSearch = (value: string) => {
    this.setState({ tablelodingPerson: true })
    this.setState({ searchFilter: value }, async () => await this.getAllEmployees());
  };

  handleNormSearch = (value: string) => {
    this.setState({ tablelodingNorm: true })

    this.setState({ normFilter: value }, async () => await this.getNormRequests());
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    this.setState({ modalVisible: !this.state.modalVisible });
    this.getPosition(this.state.tip);
  }

  async detailModalOpen(id: number) {

    await this.props.kNormStore.getById({ id: id });
    await this.props.kNormDetailStore.getDetails(id);


    await this.props.kSubeNormStore.StoreGetComeOutCargo('3120000100000000297')

    this.mergeArrayTwo(this.props.kNormStore.editKNorm.pozisyon)
    this.setState({ detaillModalVisible: !this.state.detaillModalVisible });

  }

  openNotificationWithIcon = (type) => {
    notification[type]({
      message:
        type === 'success'
          ? L('NormCreateNotificationMessageTitle')
          : L('NormRejectNotificationMessageTitle'),
      description:
        type === 'success'
          ? L('NormCreateNotificationMessageDescription')
          : L('NormCreateNotificationMessageDescription'),
      duration: 3,
    });
  };

  createNorm = () => {
    const form = this.formRef.current;
    form!.validateFields().then(async (values: any) => {
      values.mails = this.props.kHierarchyStore.kHierarchies;
      await this.props.kNormStore.create(values);
      this.openNotificationWithIcon('success');
      form!.resetFields();
      this.setState({ modalVisible: false });
      await this.getNormRequests();
    });
  };

  mergeArray = async () => {

    let employees = Object.keys(this.state.groupEmployee).map((y, i) => ({
      id: i,
      gorev: y,
      employeeCount: [...this.state.groupEmployee[y]].length,
      normCount: 0,
    }));

    let norms = Object.keys(this.state.groupNorm).map((y, i) => ({
      id: i,
      gorev: y,
      employeeCount: 0,
      normCount: [...this.state.groupNorm[y]].length,
    }));

    let result = [...employees, ...norms];
    let names = result.map((x) => x.gorev);
    let set = new Set(names);




    let groupData = [...set].map((x, i) => {
      let gorev = x;
      let employee = employees.find((x) => x.gorev === gorev)?.employeeCount;
      let norm = norms.find((x) => x.gorev === gorev)?.normCount;


      return Object.assign({
        id: i,
        gorev: x,
        employeeCount: employee !== undefined ? employee : 0,
        nomrCount: norm !== undefined ? norm : 0,
        norm: (norm !== undefined ? norm : 0) - (employee !== undefined ? employee : 0),
      });
    });

    this.setState({ groupData: groupData });
  };



  mergeArrayTwo = async (poz: string) => {
    const asArray = Object.entries(this.state.groupEmployee);
    const Sonuc = asArray.filter(([key, value]) => key === poz);
    const doubled = Array(Sonuc.map((x) => x[1]));

    var lastArray = doubled.map(function (item) {
      return item[0];
    });

    let sicilNo = "";
    lastArray.forEach(myFunction);

    function myFunction(item) {
      sicilNo = item[0].sicilNo;
    }

    await this.props.inkaStore.getInkaEmployeeByPersonelNo(sicilNo);
    var birimObjId = this.props.inkaStore.inkaUserByPersonelNo.birimObjId
    await this.props.jobStore.getAllPositionForUnit(birimObjId)
    var titles = this.props.jobStore.jobNames
    var stringTitleList = new Array("");


    for (let index = 0; index < titles.length; index++) {
      const element = titles[index];
      stringTitleList.push(element.adi);
    }

    let employees = Object.keys(this.state.groupEmployee).map((y, i) => ({
      id: i,
      gorev: y,
      employeeCount: [...this.state.groupEmployee[y]].length,
      normCount: 0,
    }));


    let norms = Object.keys(this.state.groupNorm).map((y, i) => ({
      id: i,
      gorev: y,
      employeeCount: 0,
      normCount: [...this.state.groupNorm[y]].length,
    }));


    let result = [...employees, ...norms];
    let names = result.map((x) => x.gorev);

    let set = names.filter(name => stringTitleList.includes(name));


    let groupData = [...set].map((x, i) => {
      let gorev = x;
      let employee = employees.find((x) => x.gorev === gorev)?.employeeCount;
      let norm = norms.find((x) => x.gorev === gorev)?.normCount;


      return Object.assign({
        id: i,
        gorev: x,
        employeeCount: employee !== undefined ? employee : 0,
        nomrCount: norm !== undefined ? norm : 0,
        norm: (norm !== undefined ? norm : 0) - (employee !== undefined ? employee : 0),
      });
    });

    this.setState({ groupData: groupData });
  };



  getHierarchy = async (subeId: string, bolgeId: string, tip: string, pozisyon: string) => {
    await this.props.kHierarchyStore.generateHierarchy({
      subeId,
      bolgeId,
      tip,
      pozisyon,
    });
  };

  handlePaginationTable1 = (pagination) => {
    const { filterTable1 } = this.state;
    const { pageSize, current } = pagination;
    this.setState({
      filterTable1: { ...filterTable1, current, limit: pageSize },
    });
  };

  handlePaginationTable2 = (pagination) => {
    const { filterTable2 } = this.state;
    const { pageSize, current } = pagination;
    this.setState({
      filterTable2: { ...filterTable2, current, limit: pageSize },
    });
  };

  handlePaginationTable3 = (pagination) => {
    const { filterTable3 } = this.state;
    const { pageSize, current } = pagination;
    this.setState({
      filterTable3: { ...filterTable3, current, limit: pageSize },
    });
  };

  public render() {
    const { kNorms, editKNorm } = this.props.kNormStore;
    const { norms } = this.props.kSubeNormStore;
    const { kPersonels } = this.props.kPersonelStore!;
    const { kHierarchies } = this.props.kHierarchyStore;
    const { kNormAllDetails } = this.props.kNormDetailStore;
    const {
      breadcrumbBolgeAdi,
      breadcrumbSubeAdi,
      detaillModalVisible,
      groupData,
      createFormState,
      modalVisible,
      tip,
      id,
      bagliOlduguSubeId,
    } = this.state;
    const {
      filterTable1,
      filterTable2,
      filterTable3,
      totalSizeTable1,
      totalSizeTable2,
      totalSizeTable3,
    } = this.state;

    const tablePaginationTable1 = {
      pageSize: filterTable1.limit,
      current: filterTable1.current || 1,
      total: totalSizeTable1,
      locale: { items_per_page: L('TableRecord') },
      pageSizeOptions: ['5', '10', '20', '30', '50', '100'],
      showSizeChanger: true,
    };

    const tablePaginationTable2 = {
      pageSize: filterTable2.limit,
      current: filterTable2.current || 1,
      total: totalSizeTable2,
      locale: { items_per_page: L('TableRecord') },
      pageSizeOptions: ['5', '10', '20', '30', '50', '100'],
      showSizeChanger: true,
    };

    const tablePaginationTable3 = {
      pageSize: filterTable3.limit,
      current: filterTable3.current || 1,
      total: totalSizeTable3,
      locale: { items_per_page: L('TableRecord') },
      pageSizeOptions: ['5', '10', '20', '30', '50', '100'],
      showSizeChanger: true,
    };
    const normEmployeeCoumns = [
      {
        title: L('NormEmployeeInformations'),
        render: (record) => (
          <React.Fragment>
            <span className={'responsive-title'}>{L('table.branch.duty')}</span> : {record.gorev}
            <br />
            <span className={'responsive-title'}>{L('table.branch.employeecount')}</span> :{' '}
            {record.employeeCount}
            <br />
            <span className={'responsive-title'}>{L('table.branch.normcount')} </span> :{' '}
            {record.nomrCount}
            <br />
            <span className={'responsive-title'}>{L('table.branch.normgap')}</span> : {record.norm}
            <br />
          </React.Fragment>
        ),
        responsive: ['xs'] as Breakpoint[],
      },

      {
        title: L('table.branch.duty'),
        dataIndex: 'gorev',
        key: 'gorev',
        width: 150,
        render: (key, value) => <div key={'gorev-' + key}>{value.gorev}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.branch.employeecount'),
        dataIndex: 'employeeCount',
        key: 'employeeCount',
        width: 150,
        render: (key, value) => <div key={'employeeCount-' + key}>{value.employeeCount}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.branch.normcount'),
        dataIndex: 'nomrCount',
        key: 'nomrCount',
        width: 150,
        render: (key, value) => <div key={'nomrCount-' + key}>{value.nomrCount}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.branch.normgap'),
        dataIndex: 'norm',
        key: 'norm',
        width: 150,
        render: (key, value) => <div key={'norm-' + key}>{value.norm}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
    ];

    const columns = [
      {
        title: L('NormDetailPanel'),
        render: (record) => (
          <React.Fragment>
            <span className={'responsive-title'}>{L('table.employee.name')}</span> : {record.ad}
            <br />
            <span className={'responsive-title'}>{L('table.employee.surname')}</span> :{' '}
            {record.soyad}
            <br />
            <span className={'responsive-title'}>{L('table.employee.duty')} </span> :{' '}
            {record.gorevi}
            <br />
            <span className={'responsive-title'}>
              {L('table.employee.registrationnumber')}
            </span> : {record.sicilNo}
            <br />
          </React.Fragment>
        ),
        responsive: ['xs'] as Breakpoint[],
      },

      {
        title: L('table.employee.name'),
        dataIndex: 'ad',
        key: 'ad',
        width: 150,
        render: (text: string) => <div>{text}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.employee.surname'),
        dataIndex: 'soyad',
        key: 'soyad',
        width: 150,
        render: (text: string) => <div>{text}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.employee.duty'),
        dataIndex: 'gorevi',
        key: 'gorevi',
        width: 150,
        render: (text: string) => <div>{text}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.employee.registrationnumber'),
        dataIndex: 'sicilNo',
        key: 'sicilNo',
        width: 150,
        render: (text: string) => <div>{text}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
    ];

    const columnsNorm = [
      {
        title: L('NormDetailPanel'),
        render: (record) => (
          <React.Fragment>
            <span className={'responsive-title'}>{L('table.norm.requestdate')}</span> :{' '}
            {record.creationTime}
            <br />
            <span className={'responsive-title'}>{L('table.norm.requeststatus')}</span> :{' '}
            {record.durumu}
            <br />
            <span className={'responsive-title'}>{L('table.norm.area.name')} </span> :{' '}
            {record.bolgeAdi}
            <br />
            <span className={'responsive-title'}>{L('table.norm.branch.name')}</span> :{' '}
            {record.subeAdi}
            <br />
            <span className={'responsive-title'}>{L('table.norm.position')}</span> :{' '}
            {record.pozisyon}
            <br />
            <span className={'responsive-title'}>{L('table.norm.requestreason')}</span> :{' '}
            {record.nedeni}
            <br />
            <span className={'responsive-title'}>{L('table.norm.requesttype')}</span> :{' '}
            {record.turu}
          </React.Fragment>
        ),
        responsive: ['xs'] as Breakpoint[],
      },

      {
        title: L('table.norm.requestdate'),
        dataIndex: 'creationTime',
        key: 'creationTime',
        width: 100,
        render: (text: string) => (
          <div>
            {new Date(text).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        ),
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.norm.requeststatus'),
        dataIndex: 'durumu',
        key: uuid(),
        width: 200,
        render: (text, norm) => (
          <>
            {NormStatus[norm.normStatusValue] === NormStatus.Beklemede ? (
              <Tooltip placement="topLeft" title={L('Waiting')}>
                {' '}
                <Tag
                  color={'rgb(250, 173, 20)'}
                  icon={<ClockCircleOutlined />}
                  className={'requeststatus'}
                >
                  {' '}
                  {TalepDurumu[norm.durumu]}{' '}
                </Tag>
              </Tooltip>
            ) : NormStatus[norm.normStatusValue] === NormStatus.Iptal ? (
              <Tooltip placement="topLeft" title={L('Reject')}>
                {' '}
                <Tag color={'rgb(250, 84, 28)'} icon={<StopOutlined />} className={'requeststatus'}>
                  {' '}
                  {TalepDurumu[norm.durumu]}{' '}
                </Tag>
              </Tooltip>
            ) : (
              <Tooltip placement="topLeft" title={L('Approved')}>
                {' '}
                <Tag
                  color={'rgb(29, 165, 122)'}
                  icon={<CheckCircleOutlined />}
                  className={'requeststatus'}
                >
                  {' '}
                  {TalepDurumu[norm.durumu]}{' '}
                </Tag>
              </Tooltip>
            )}
          </>
        ),
        responsive: ['sm'] as Breakpoint[],
      },

      {
        title: L('table.norm.area.name'),
        dataIndex: 'bolgeAdi',
        key: 'bolgeAdi',
        width: 100,
        render: (text: string) => <div>{text}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.norm.branch.name'),
        dataIndex: 'subeAdi',
        key: 'subeAdi',
        width: 100,
        render: (text: string) => <div>{text}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.norm.position'),
        dataIndex: 'pozisyon',
        key: 'pozisyon',
        width: 100,
        render: (text: string) => <div>{text}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.norm.requestreason'),
        dataIndex: 'nedeni',
        key: 'nedeni',
        width: 150,
        render: (text: TalepNedeni) => <div>{TalepNedeni[text]}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.norm.requesttype'),
        dataIndex: 'turu',
        key: 'turu',
        width: 150,
        render: (text: TalepTuru) => <div>{TalepTuru[text]}</div>,
        responsive: ['sm'] as Breakpoint[],
      },
      {
        title: L('table.norm.transactions'),
        dataIndex: 'id',
        key: 'id',
        width: 50,
        render: (text: number) => (
          <Button
            className={'info'}
            onClick={() => this.detailModalOpen(text)}
            icon={<FileSearchOutlined />}
            type="primary"
          ></Button>
        ),
        responsive: ['sm'] as Breakpoint[],
      },
    ];
    return (
      <React.Fragment>
        <Card style={{ marginBottom: 20 }} hoverable>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={
              <Breadcrumb>
                <Breadcrumb.Item>

                  {
                    isGranted('items_dashboard_menu_view') ? <Link to="/dashboard">{L('Dashboard')}</Link> : <Link to="/home">{L('Home')}</Link>
                  }

                </Breadcrumb.Item>
                {
                  isGranted('items_branch_menu_view') && <Breadcrumb.Item> <Link to="/bolgemudurluk">{L('RegionalOffices')}</Link> </Breadcrumb.Item>
                }

                {

                  breadcrumbBolgeAdi !== '' && <Breadcrumb.Item> {breadcrumbBolgeAdi} </Breadcrumb.Item>
                }
                {
                  breadcrumbSubeAdi !== '' && <Breadcrumb.Item> {breadcrumbSubeAdi} </Breadcrumb.Item>
                }
              </Breadcrumb>
            }  >
          </PageHeader>
        </Card>

        {

          isGranted('subitems.branch.detail.total.table.view') && <Card style={{ marginBottom: 20 }} hoverable>
            <Row style={{ marginTop: 20 }}>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} xl={{ span: 24, offset: 0 }} xxl={{ span: 24, offset: 0 }}   >
                <Table
                  bordered={false}
                  onChange={this.handlePaginationTable1}
                  columns={normEmployeeCoumns}
                  rowKey={(record) => record.id}
                  locale={{ emptyText: L('NoData') }}
                  loading={groupData.length == 1 ? true : false}
                  dataSource={groupData === undefined ? [] : groupData}
                  pagination={tablePaginationTable1}
                />
              </Col>
            </Row>
          </Card>
        }

        {
          isGranted('subitems.branch.detail.employee.table.view') && <Card hoverable>
            <Row>
              <Col xs={{ span: 24, offset: 0 }} sm={{ span: 23, offset: 0 }} md={{ span: 23, offset: 0 }} lg={{ span: 23, offset: 0 }} xl={{ span: 23, offset: 0 }} xxl={{ span: 23, offset: 0 }}  >
                {' '}
                <h2>{L('EmployeesList')}</h2>
              </Col>
              <Col
                xs={{ span: 14, offset: 0 }}
                sm={{ span: 15, offset: 0 }}
                md={{ span: 15, offset: 0 }}
                lg={{ span: 1, offset: 21 }}
                xl={{ span: 1, offset: 21 }}
                xxl={{ span: 1, offset: 21 }} >
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 10, offset: 0 }}>
                <Search placeholder={L('Filter')} onSearch={this.handleSearch} />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} xl={{ span: 24, offset: 0 }} xxl={{ span: 24, offset: 0 }}   >
                <Table
                  locale={{ emptyText: L('NoData') }}
                  bordered={false}
                  columns={columns}
                  onChange={this.handlePaginationTable2}
                  rowKey={(record) => record.objId.toString()}
                  //loading={kPersonels === undefined ? true : false}
                  loading={this.state.tablelodingPerson}
                  dataSource={kPersonels === undefined ? [] : kPersonels.items}
                  pagination={tablePaginationTable2}
                />
              </Col>
            </Row>
          </Card>
        }

        {isGranted('subitems.branch.detail.norm.request.table.view') && (
          <Card hoverable style={{ marginTop: 15 }}>
            <Row>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 23, offset: 0 }}
                lg={{ span: 23, offset: 0 }}
                xl={{ span: 23, offset: 0 }}
                xxl={{ span: 23, offset: 0 }}
              >
                {' '}
                <h2>{L('NormDetailPanel')}</h2>
              </Col>
              <Col
                xs={{ span: 14, offset: 0 }}
                sm={{ span: 15, offset: 0 }}
                md={{ span: 15, offset: 0 }}
                lg={{ span: 1, offset: 21 }}
                xl={{ span: 1, offset: 21 }}
                xxl={{ span: 1, offset: 21 }}
              >
                {isGranted('subitems.branch.detail.norm.request.table.view') && (
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => this.createOrUpdateModalOpen({ id: 0 })}
                  >
                    {' '}
                    {L('NormOperations')}{' '}
                  </Button>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 10, offset: 0 }}>
                <Search placeholder={L('Filter')} onSearch={this.handleNormSearch} />
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
                  columns={columnsNorm}
                  locale={{ emptyText: L('NoData') }}
                  onChange={this.handlePaginationTable3}
                  rowKey={(record) => record.id}
                  //loading={kNorms === undefined ? true : false}
                  loading={this.state.tablelodingNorm}
                  dataSource={kNorms === undefined ? [] : kNorms.items}
                  pagination={tablePaginationTable3}
                />
              </Col>
            </Row>
          </Card>
        )}

        <CreateNormForm
          checkEmployeeNormStatus={this.checkEmployeeNormStatus}
          tip={tip}
          subeId={id}
          modalWidth={'60%'}
          modalType={'create'}
          formRef={this.formRef}
          employees={kPersonels}
          visible={modalVisible}
          hierarchy={kHierarchies}
          onCreateNorm={this.createNorm}
          getHierarchy={this.getHierarchy}
          createFormState={createFormState}
          bagliOlduguSubeId={bagliOlduguSubeId}
          position={
            this.props.kInkaLookUpTableStore.positions
          }
          normCount={norms !== undefined ? norms.items.length : 0}
          onCancel={() => {
            const form = this.formRef.current;
            this.setState({
              modalVisible: false,
            });
            form!.resetFields();
          }} />

        <NormDetailTimeLine
          norm={editKNorm}
          data={kNormAllDetails}
          title={breadcrumbSubeAdi}
          visible={detaillModalVisible}
          onCancel={() => {
            this.setState({
              detaillModalVisible: false,
            });
          }}
          groupData={groupData === undefined ? [] : groupData}
          personCount={0}
          normCount={0}
          normShortfall={0}
          cargoDetail={this.props.kSubeNormStore.kkargo}
          cargoAvgVisible={true}
        />
      </React.Fragment>
    );
  }
}

export default KSubeDetay;
