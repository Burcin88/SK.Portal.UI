/*eslint-disable */
import './index.less';
import moment from 'moment';
import * as React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { dateHelper } from '../../helper/date';
import KNormStore from '../../stores/kNormStore';
import KLineChart from './components/KLineChart';
import Stores from '../../stores/storeIdentifier';
import KCartList from '../../components/KCartList';
import { isGranted, L } from '../../lib/abpUtility';
import AccountStore from '../../stores/accountStore';
import SessionStore from '../../stores/sessionStore';
import KPersonelStore from '../../stores/kPersonelStore';
import KSubeNormStore from '../../stores/kSubeNormStore';
import KNormDetailStore from '../../stores/kNormDetailStore';
import KLineChartModel from '../../models/KLineChart/kLineChart';
import AuthenticationStore from '../../stores/authenticationStore';
import KLineChartModelEN from '../../models/KLineChart/kLineChartEn';
import { GetAllKNormOutput } from '../../services/kNorm/dto/getAllKNormOutput';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

declare var abp: any;

export interface Props {
  kNormStore: KNormStore;
  sessionStore?: SessionStore;
  accountStore?: AccountStore;
  kPersonelStore: KPersonelStore;
  kSubeNormStore: KSubeNormStore;
  kNormDetailStore: KNormDetailStore;
  authenticationStore?: AuthenticationStore;
}


export interface State {
  totalFill: any[];
  totalUpdate: any[];
  cardLoading: boolean;
  lineFillLoading: boolean;
  barChartLoading: boolean;
  pieChartLoading: boolean;
  lineUpdateLoading: boolean;
  moment: any;
  lineChartView: boolean;
  dateFilter: boolean;
}
declare var abp: any;

@inject(Stores.KNormStore)
@inject(Stores.KPersonelStore)
@inject(Stores.KSubeNormStore)
@inject(Stores.KNormDetailStore)
@inject(Stores.AuthenticationStore, Stores.SessionStore, Stores.AccountStore)
@observer
export class Dashboard extends React.Component<Props, State> {

  state = {
    cardLoading: true,
    barChartLoading: true,
    lineFillLoading: true,
    pieChartLoading: true,
    totalFill: [] as any[],
    lineUpdateLoading: true,
    totalUpdate: [] as any[],
    moment: [] as any,
    lineChartView: false,
    dateFilter: false
  }
 


  
  getEmployeeCount = async () => await this.props.kPersonelStore.getEmployeeCount();
  getNormCount = async () => await this.props.kSubeNormStore.getNormCount();

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

    await this.getNormRequests(startDate, endDate);
    await this.getNormRequestCounts(startDate, endDate);
    this.setState({ moment: [startDate, endDate] })

  }

  getNormRequests = async (start?: any, end?: any) => {
    await this.props.kNormStore.getMaxAll({
      id: '0',
      type: '',
      end: end,
      keyword: '',
      start: start,
      bolgeId: '0',
      skipCount: 0,
      maxResultCount: 100000,
    });
  }

  getNormRequestCounts = async (start?: any, end?: any) => {
    await this.props.kNormStore.getMaxAllCount({
      id: '0',
      type: '',
      end: end,
      keyword: '',
      start: start,
      skipCount: 0,
      bolgeId: '0',
      maxResultCount: 100000,
    });
  }

  componentDidMount = async () => {


    setTimeout(() => this.setState({ cardLoading: false }), 2000);
    setTimeout(() => this.setState({ barChartLoading: false }), 2000);
    setTimeout(() => this.setState({ pieChartLoading: false }), 1000);
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
      isGranted('subitems.dashboard.infobox.getcancelednormupdaterequest')

    ) {

      this.setState({ dateFilter: true })
      await this.getNormRequests(startOfMonth, currentDate);
      await this.getNormRequestCounts(startOfMonth, currentDate);

    }

    await this.getEmployeeCount();
    await this.getNormCount();

    let resultFill = await this.lineChartModel(this.props.kNormStore.getTotalNormFillingRequest);
    let resultUpdate = await this.lineChartModel(this.props.kNormStore.getTotalNormUpdateRequest);

    this.setState({
      totalFill: resultFill,
      lineFillLoading: false,
      totalUpdate: resultUpdate,
      lineUpdateLoading: false,
      moment: [startOfMonth, currentDate]
    })
  }

  lineChartModel = async (data: GetAllKNormOutput[]): Promise<any[]> => {
    let week: Date[] = []
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('isoWeek');

    for (var i = 0; i <= 6; i++) {
      week.push(moment(moment(weekStart).add(i, 'days')).toDate());
    }

    const startDateOfWeek = moment().startOf('isoWeek').toDate();
    const endDateOfWeek = moment().endOf('isoWeek').toDate();

    if (data === undefined) data = [];

    let result = data.filter((item: GetAllKNormOutput) =>
      moment(item.creationTime).toDate().getTime() >= startDateOfWeek.getTime() &&
      moment(item.creationTime).toDate().getTime() <= endDateOfWeek.getTime()
    );

    let retVal = result.reduce((result, currentValue) => {
      (result[currentValue['normStatusValue']] = result[currentValue['normStatusValue']] || [])
        .push(
          currentValue
        );
      return result;
    }, {});


    let iptalWeek1 = 0;
    let iptalWeek2 = 0;
    let iptalWeek3 = 0;
    let iptalWeek4 = 0;
    let iptalWeek5 = 0;
    let iptalWeek6 = 0;
    let iptalWeek7 = 0;
    let iptal = retVal['Iptal'] as GetAllKNormOutput[];
    if (iptal !== undefined) {

      iptalWeek1 = iptal.filter(x => moment(x.creationTime).toDate().getDate() === week[0].getDate()).length
      iptalWeek2 = iptal.filter(x => moment(x.creationTime).toDate().getDate() === week[1].getDate()).length
      iptalWeek3 = iptal.filter(x => moment(x.creationTime).toDate().getDate() === week[2].getDate()).length
      iptalWeek4 = iptal.filter(x => moment(x.creationTime).toDate().getDate() === week[3].getDate()).length
      iptalWeek5 = iptal.filter(x => moment(x.creationTime).toDate().getDate() === week[4].getDate()).length
      iptalWeek6 = iptal.filter(x => moment(x.creationTime).toDate().getDate() === week[5].getDate()).length
      iptalWeek7 = iptal.filter(x => moment(x.creationTime).toDate().getDate() === week[6].getDate()).length
    }

    let onaylandi = retVal['Onaylandi'] as GetAllKNormOutput[];
    let onaylandiWeek1 = 0;
    let onaylandiWeek2 = 0;
    let onaylandiWeek3 = 0;
    let onaylandiWeek4 = 0;
    let onaylandiWeek5 = 0;
    let onaylandiWeek6 = 0;
    let onaylandiWeek7 = 0;

    if (onaylandi !== undefined) {
      onaylandiWeek1 = onaylandi.filter(x => moment(x.creationTime).toDate().getDate() === week[0].getDate()).length
      onaylandiWeek2 = onaylandi.filter(x => moment(x.creationTime).toDate().getDate() === week[1].getDate()).length
      onaylandiWeek3 = onaylandi.filter(x => moment(x.creationTime).toDate().getDate() === week[2].getDate()).length
      onaylandiWeek4 = onaylandi.filter(x => moment(x.creationTime).toDate().getDate() === week[3].getDate()).length
      onaylandiWeek5 = onaylandi.filter(x => moment(x.creationTime).toDate().getDate() === week[4].getDate()).length
      onaylandiWeek6 = onaylandi.filter(x => moment(x.creationTime).toDate().getDate() === week[5].getDate()).length
      onaylandiWeek7 = onaylandi.filter(x => moment(x.creationTime).toDate().getDate() === week[6].getDate()).length
    }


    let beklemede = retVal['Beklemede'] as GetAllKNormOutput[];
    let beklemedeWeek1 = 0;
    let beklemedeWeek2 = 0;
    let beklemedeWeek3 = 0;
    let beklemedeWeek4 = 0;
    let beklemedeWeek5 = 0;
    let beklemedeWeek6 = 0;
    let beklemedeWeek7 = 0;

    if (beklemede !== undefined) {

      beklemedeWeek1 = beklemede.filter(x => moment(x.creationTime).toDate().getDate() === week[0].getDate()).length
      beklemedeWeek2 = beklemede.filter(x => moment(x.creationTime).toDate().getDate() === week[1].getDate()).length
      beklemedeWeek3 = beklemede.filter(x => moment(x.creationTime).toDate().getDate() === week[2].getDate()).length
      beklemedeWeek4 = beklemede.filter(x => moment(x.creationTime).toDate().getDate() === week[3].getDate()).length
      beklemedeWeek5 = beklemede.filter(x => moment(x.creationTime).toDate().getDate() === week[4].getDate()).length
      beklemedeWeek6 = beklemede.filter(x => moment(x.creationTime).toDate().getDate() === week[5].getDate()).length
      beklemedeWeek7 = beklemede.filter(x => moment(x.creationTime).toDate().getDate() === week[6].getDate()).length
    }


    let toplamWeek1 = 0;
    let toplamWeek2 = 0;
    let toplamWeek3 = 0;
    let toplamWeek4 = 0;
    let toplamWeek5 = 0;
    let toplamWeek6 = 0;
    let toplamWeek7 = 0;

    if (beklemede !== undefined) {
      toplamWeek1 = data.filter(x => moment(x.creationTime).toDate().getDate() === week[0].getDate()).length
      toplamWeek2 = data.filter(x => moment(x.creationTime).toDate().getDate() === week[1].getDate()).length
      toplamWeek3 = data.filter(x => moment(x.creationTime).toDate().getDate() === week[2].getDate()).length
      toplamWeek4 = data.filter(x => moment(x.creationTime).toDate().getDate() === week[3].getDate()).length
      toplamWeek5 = data.filter(x => moment(x.creationTime).toDate().getDate() === week[4].getDate()).length
      toplamWeek6 = data.filter(x => moment(x.creationTime).toDate().getDate() === week[5].getDate()).length
      toplamWeek7 = data.filter(x => moment(x.creationTime).toDate().getDate() === week[6].getDate()).length
    }

    if (abp.localization.currentLanguage.name === "tr") {
      let model: KLineChartModel[] = [

        { name: L('Monday'), talep: toplamWeek1, bekleyen: beklemedeWeek1, amt: 0, onaylanan: onaylandiWeek1, iptal: iptalWeek1 },
        { name: L('Tuesday'), talep: toplamWeek2, bekleyen: beklemedeWeek2, amt: 0, onaylanan: onaylandiWeek2, iptal: iptalWeek2 },
        { name: L('Wednesday'), talep: toplamWeek3, bekleyen: beklemedeWeek3, amt: 0, onaylanan: onaylandiWeek3, iptal: iptalWeek3 },
        { name: L('Thursday'), talep: toplamWeek4, bekleyen: beklemedeWeek4, amt: 0, onaylanan: onaylandiWeek4, iptal: iptalWeek4 },
        { name: L('Friday'), talep: toplamWeek5, bekleyen: beklemedeWeek5, amt: 0, onaylanan: onaylandiWeek5, iptal: iptalWeek5 },
        { name: L('Saturday'), talep: toplamWeek6, bekleyen: beklemedeWeek6, amt: 0, onaylanan: onaylandiWeek6, iptal: iptalWeek6 },
        { name: L('Sunday'), talep: toplamWeek7, bekleyen: beklemedeWeek7, amt: 0, onaylanan: onaylandiWeek7, iptal: iptalWeek7 }
      ]
      return model;
    }
    else {

      let model: KLineChartModelEN[] = [
        { name: L('Monday'), request: toplamWeek1, waiting: beklemedeWeek1, amt: 0, approved: onaylandiWeek1, cancel: iptalWeek1 },
        { name: L('Tuesday'), request: toplamWeek2, waiting: beklemedeWeek2, amt: 0, approved: onaylandiWeek2, cancel: iptalWeek2 },
        { name: L('Wednesday'), request: toplamWeek3, waiting: beklemedeWeek3, amt: 0, approved: onaylandiWeek3, cancel: iptalWeek3 },
        { name: L('Thursday'), request: toplamWeek4, waiting: beklemedeWeek4, amt: 0, approved: onaylandiWeek4, cancel: iptalWeek4 },
        { name: L('Friday'), request: toplamWeek5, waiting: beklemedeWeek5, amt: 0, approved: onaylandiWeek5, cancel: iptalWeek5 },
        { name: L('Saturday'), request: toplamWeek6, waiting: beklemedeWeek6, amt: 0, approved: onaylandiWeek6, cancel: iptalWeek6 },
        { name: L('Sunday'), request: toplamWeek7, waiting: beklemedeWeek7, amt: 0, approved: onaylandiWeek7, cancel: iptalWeek7 }
      ]
      return model;
    }
  }

  changeLineViewHandler = async () => {
    this.setState({ lineChartView: !this.state.lineChartView })
  }

  render() {

    const { cardLoading, lineFillLoading, lineUpdateLoading, moment, lineChartView, dateFilter } = this.state;
    const { kPersonelCount } = this.props.kPersonelStore;
    const { normCount } = this.props.kSubeNormStore;
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

    const lineChartLayout = {
      onePiece: {
        xs: { offset: 1, span: 22 },
        sm: { offset: 1, span: 22 },
        md: { offset: 1, span: 22 },
        lg: { offset: 1, span: 22 },
        xl: { offset: 0, span: 24 },
        xxl: { offset: 0, span: 24 }
      },
      twoPiece: {
        xs: { offset: 1, span: 23 },
        sm: { offset: 1, span: 23 },
        md: { offset: 1, span: 23 },
        lg: { offset: 1, span: 23 },
        xl: { offset: 0, span: 12 },
        xxl: { offset: 0, span: 12 }
      },
    };



    return (
      <React.Fragment>
        <KCartList
          dateFilter={dateFilter}
          moment={moment}
          type={""}
          bolgeId={0}
          subeObjId={0}
          normCount={normCount}
          cardLoading={cardLoading}
          kPersonelCount={kPersonelCount}
          onDateFilter={this.onDateFilter}
          kNormStore={this.props.kNormStore}
          kSubeNormStore={this.props.kSubeNormStore}
          kPersonelStore={this.props.kPersonelStore}
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
 
        <Row gutter={16}>
          <Col {...(lineChartView ? lineChartLayout.onePiece : lineChartLayout.twoPiece)}>
            {
              isGranted('items.dashboard.view.total.norm.fill.requests.weekly.statistics') &&

              <Card extra={<Button onClick={this.changeLineViewHandler} icon={(lineChartView ? <FullscreenExitOutlined /> : <FullscreenOutlined />)} />} hoverable className={'dashboardBox'} title={L('TotalNormFillingRequestWeeklyStatistics')} loading={lineFillLoading} bordered={false}>
                <KLineChart data={this.state.totalFill} />
              </Card>
            }
          </Col>

          <Col {...(lineChartView ? lineChartLayout.onePiece : lineChartLayout.twoPiece)}>
            {
              isGranted('items.dashboard.view.total.norm.update.requests.weekly.statistics') &&
              <Card extra={<Button onClick={this.changeLineViewHandler} icon={(lineChartView ? <FullscreenExitOutlined /> : <FullscreenOutlined />)} />} hoverable className={'dashboardBox'} title={L('TotalNormUpdateRequestWeeklyStatistics')} loading={lineUpdateLoading} bordered={false}>
                <KLineChart data={this.state.totalUpdate} />
              </Card>
            }

          </Col>


        </Row>
      </React.Fragment>
    );
  }
}

export default Dashboard;
