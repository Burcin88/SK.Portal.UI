import { Button, Card, Col, Row } from 'antd';
import moment from 'moment';
import * as React from 'react';
import KCart from '../../../components/KCart';
import { L } from '../../../lib/abpUtility';
import KLineChartModel from '../../../models/KLineChart/kLineChart';
import KLineChartModelEN from '../../../models/KLineChart/kLineChartEn';
import { GetAllKNormOutput } from '../../../services/kNorm/dto/getAllKNormOutput';
import KLineChart from '../../Dashboard/components/KLineChart';

interface IState {}
interface IProps {}

class Index extends React.Component<IProps, IState> {
  lineChartModel = async (data: GetAllKNormOutput[]): Promise<any[]> => {
    let week: Date[] = [];
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('isoWeek');

    for (var i = 0; i <= 6; i++) {
      week.push(moment(moment(weekStart).add(i, 'days')).toDate());
    }

    const startDateOfWeek = moment().startOf('isoWeek').toDate();
    const endDateOfWeek = moment().endOf('isoWeek').toDate();

    if (data === undefined) data = [];

    let result = data.filter(
      (item: GetAllKNormOutput) =>
        moment(item.creationTime).toDate().getTime() >= startDateOfWeek.getTime() &&
        moment(item.creationTime).toDate().getTime() <= endDateOfWeek.getTime()
    );

    let retVal = result.reduce((result, currentValue) => {
      (result[currentValue['normStatusValue']] =
        result[currentValue['normStatusValue']] || []).push(currentValue);
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
      iptalWeek1 = iptal.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[0].getDate()
      ).length;
      iptalWeek2 = iptal.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[1].getDate()
      ).length;
      iptalWeek3 = iptal.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[2].getDate()
      ).length;
      iptalWeek4 = iptal.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[3].getDate()
      ).length;
      iptalWeek5 = iptal.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[4].getDate()
      ).length;
      iptalWeek6 = iptal.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[5].getDate()
      ).length;
      iptalWeek7 = iptal.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[6].getDate()
      ).length;
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
      onaylandiWeek1 = onaylandi.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[0].getDate()
      ).length;
      onaylandiWeek2 = onaylandi.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[1].getDate()
      ).length;
      onaylandiWeek3 = onaylandi.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[2].getDate()
      ).length;
      onaylandiWeek4 = onaylandi.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[3].getDate()
      ).length;
      onaylandiWeek5 = onaylandi.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[4].getDate()
      ).length;
      onaylandiWeek6 = onaylandi.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[5].getDate()
      ).length;
      onaylandiWeek7 = onaylandi.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[6].getDate()
      ).length;
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
      beklemedeWeek1 = beklemede.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[0].getDate()
      ).length;
      beklemedeWeek2 = beklemede.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[1].getDate()
      ).length;
      beklemedeWeek3 = beklemede.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[2].getDate()
      ).length;
      beklemedeWeek4 = beklemede.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[3].getDate()
      ).length;
      beklemedeWeek5 = beklemede.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[4].getDate()
      ).length;
      beklemedeWeek6 = beklemede.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[5].getDate()
      ).length;
      beklemedeWeek7 = beklemede.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[6].getDate()
      ).length;
    }

    let toplamWeek1 = 0;
    let toplamWeek2 = 0;
    let toplamWeek3 = 0;
    let toplamWeek4 = 0;
    let toplamWeek5 = 0;
    let toplamWeek6 = 0;
    let toplamWeek7 = 0;

    if (beklemede !== undefined) {
      toplamWeek1 = data.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[0].getDate()
      ).length;
      toplamWeek2 = data.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[1].getDate()
      ).length;
      toplamWeek3 = data.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[2].getDate()
      ).length;
      toplamWeek4 = data.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[3].getDate()
      ).length;
      toplamWeek5 = data.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[4].getDate()
      ).length;
      toplamWeek6 = data.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[5].getDate()
      ).length;
      toplamWeek7 = data.filter(
        (x) => moment(x.creationTime).toDate().getDate() === week[6].getDate()
      ).length;
    }

    if (abp.localization.currentLanguage.name === 'tr') {
      let model: KLineChartModel[] = [
        {
          name: L('Monday'),
          talep: toplamWeek1,
          bekleyen: beklemedeWeek1,
          amt: 0,
          onaylanan: onaylandiWeek1,
          iptal: iptalWeek1,
        },
        {
          name: L('Tuesday'),
          talep: toplamWeek2,
          bekleyen: beklemedeWeek2,
          amt: 0,
          onaylanan: onaylandiWeek2,
          iptal: iptalWeek2,
        },
        {
          name: L('Wednesday'),
          talep: toplamWeek3,
          bekleyen: beklemedeWeek3,
          amt: 0,
          onaylanan: onaylandiWeek3,
          iptal: iptalWeek3,
        },
        {
          name: L('Thursday'),
          talep: toplamWeek4,
          bekleyen: beklemedeWeek4,
          amt: 0,
          onaylanan: onaylandiWeek4,
          iptal: iptalWeek4,
        },
        {
          name: L('Friday'),
          talep: toplamWeek5,
          bekleyen: beklemedeWeek5,
          amt: 0,
          onaylanan: onaylandiWeek5,
          iptal: iptalWeek5,
        },
        {
          name: L('Saturday'),
          talep: toplamWeek6,
          bekleyen: beklemedeWeek6,
          amt: 0,
          onaylanan: onaylandiWeek6,
          iptal: iptalWeek6,
        },
        {
          name: L('Sunday'),
          talep: toplamWeek7,
          bekleyen: beklemedeWeek7,
          amt: 0,
          onaylanan: onaylandiWeek7,
          iptal: iptalWeek7,
        },
      ];
      return model;
    } else {
      let model: KLineChartModelEN[] = [
        {
          name: L('Monday'),
          request: toplamWeek1,
          waiting: beklemedeWeek1,
          amt: 0,
          approved: onaylandiWeek1,
          cancel: iptalWeek1,
        },
        {
          name: L('Tuesday'),
          request: toplamWeek2,
          waiting: beklemedeWeek2,
          amt: 0,
          approved: onaylandiWeek2,
          cancel: iptalWeek2,
        },
        {
          name: L('Wednesday'),
          request: toplamWeek3,
          waiting: beklemedeWeek3,
          amt: 0,
          approved: onaylandiWeek3,
          cancel: iptalWeek3,
        },
        {
          name: L('Thursday'),
          request: toplamWeek4,
          waiting: beklemedeWeek4,
          amt: 0,
          approved: onaylandiWeek4,
          cancel: iptalWeek4,
        },
        {
          name: L('Friday'),
          request: toplamWeek5,
          waiting: beklemedeWeek5,
          amt: 0,
          approved: onaylandiWeek5,
          cancel: iptalWeek5,
        },
        {
          name: L('Saturday'),
          request: toplamWeek6,
          waiting: beklemedeWeek6,
          amt: 0,
          approved: onaylandiWeek6,
          cancel: iptalWeek6,
        },
        {
          name: L('Sunday'),
          request: toplamWeek7,
          waiting: beklemedeWeek7,
          amt: 0,
          approved: onaylandiWeek7,
          cancel: iptalWeek7,
        },
      ];
      return model;
    }
  };

  setDefault = async (param: string) => {};

  render() {
    return (
      <>
        <React.Fragment>
          <Row gutter={16}>
            <KCart
              cursor={'context-menu'}
              onClick={() => this.setDefault('')}
              cardLoading={false}
              color="rgb(29, 165, 122)"
              title='Giden Evrak'
              icon="FileDoneOutlined"
              number={100}
            />

            <KCart
              cursor={'context-menu'}
              onClick={() => this.setDefault('')}
              cardLoading={false}
              color="rgb(250, 173, 20)"
              title='İlişkilendirilen Evrak'
              icon="FileDoneOutlined"
              number={100}
            />

            <KCart
              cursor={'context-menu'}
              onClick={() => this.setDefault('')}
              cardLoading={false}
              color="rgb(250, 84, 28)"
              title='Giden Evrak'
              icon="FileDoneOutlined"
              number={100}
            />
          </Row>

          <Row gutter={16}>
            <Col xs={{ span: 24 }}>
              <Card
                extra={
                  <Button
                  // onClick={this.changeLineViewHandler}
                  // icon={lineChartView ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                  />
                }
                hoverable
                className={'dashboardBox'}
                title={L('TotalPaperCountStatistics')}
                loading={false}
                bordered={false}
              >
                <KLineChart data={[1, 2, 3, 4, 5, 6, 7]} />
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      </>
    );
  }
}

export default Index;
