/*eslint-disable */
import './index.less';
import React, { useState } from 'react';
//import uuid from 'react-uuid';
import DateCart from '../DateCart';
import PropTypes from 'prop-types';
import { L } from '../../lib/abpUtility';
//import Status from '../../services/kNormDetail/dto/status';
import NormStatus from '../../services/kNorm/dto/normStatus';
import TalepDurumu from '../../services/kNorm/dto/talepDurumu';
import { Col, Descriptions, Modal, Row, Spin, Table, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, StopOutlined } from '@ant-design/icons';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

//const { Step } = Steps;

const NormDetailTimeLine = ({
  visible,
  onCancel,
  title,
  data,
  groupData,
  norm,
  personCount,
  normCount,
  normShortfall,
  cargoDetail,
  cargoAvgVisible,
}) => {
  const [spin] = useState(false);

  for (let index = 0; index < groupData.length; index++) {
    personCount = groupData[index].employeeCount + personCount;
    normCount = groupData[index].nomrCount + normCount;
    normShortfall = groupData[index].norm + normShortfall;
  }

  const columns = [
    {
      title: L('Gorev'),
      dataIndex: 'gorev',
      key: 'gorev',
      responsive: ['sm'] as Breakpoint[],
    },

    {
      title: L('Personel Sayisi'),
      dataIndex: 'employeeCount',
      key: 'employeeCount',
      responsive: ['sm'] as Breakpoint[],
    },

    {
      title: L('Norm Sayisi'),
      dataIndex: 'nomrCount',
      key: 'nomrCount',
      responsive: ['sm'] as Breakpoint[],
    },

    {
      title: L('Norm'),
      dataIndex: 'norm',
      key: 'norm',
      responsive: ['sm'] as Breakpoint[],
    },
  ];

  if (cargoDetail !== undefined) {
    var incomingMonthOne = cargoDetail.incomingMonthOne;
    var incomingMonthOneAverage = cargoDetail.incomingMonthOneAverage;

    var incomingMonthTwo = cargoDetail.incomingMonthTwo;
    var incomingMonthTwoAverage = cargoDetail.incomingMonthTwoAverage;

    var incomingMonthThree = cargoDetail.incomingMonthThree;
    var incomingMonthThreeAverage = cargoDetail.incomingMonthThreeAverage;

    var outcomingMonthOne = cargoDetail.outcomingMonthOne;
    var outcomingMonthOneAverage = cargoDetail.outcomingMonthOneAverage;

    var outcomingMonthTwo = cargoDetail.outcomingMonthTwo;
    var outcomingMonthTwoAverage = cargoDetail.outcomingMonthTwoAverage;

    var outcomingMonthThree = cargoDetail.outcomingMonthThree;
    var outcomingMonthThreeAverage = cargoDetail.outcomingMonthThreeAverage;
  }

  return (
    <>
      <Modal title={title} centered visible={visible} onCancel={onCancel} width={'80%'} footer={[]}>
        <>
          <Row gutter={0}>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 8, offset: 0 }}>
              <Descriptions column={1} size={'small'} title={L('RequestDetail')} bordered={true}>
                {norm !== undefined && (
                  <>
                    <Descriptions.Item
                      key={'area_name' + norm.id}
                      label={L('table.norm.area.name')}
                    >
                      {norm.bolgeAdi}
                    </Descriptions.Item>
                    <Descriptions.Item
                      key={'branch_name' + norm.id}
                      label={L('table.norm.branch.name')}
                    >
                      {norm.subeAdi}
                    </Descriptions.Item>
                    {/* <Descriptions.Item key={uuid()} label={L("table.norm.creator.user.name")}> {norm.user.firstName} {norm.user.lastName}  </Descriptions.Item> */}
                    <Descriptions.Item
                      key={'norm_position' + norm.id}
                      label={L('table.norm.position')}
                    >
                      {norm.pozisyon}
                    </Descriptions.Item>
                    {norm.yeniPozisyon !== null && (
                      <Descriptions.Item
                        key={'norm_newpositon' + norm.id}
                        label={L('table.norm.newposition')}
                      >
                        {norm.yeniPozisyon}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item
                      key={'norm_description' + norm.id}
                      label={L('table.norm.description')}
                    >
                      {norm.aciklama}
                    </Descriptions.Item>
                    {norm.personelId > 0 && (
                      <Descriptions.Item
                        key={'leavin_staff' + norm.id}
                        label={L('table.norm.leaving.staff')}
                      >
                        {norm.personelAdi}
                      </Descriptions.Item>
                    )}
                    {norm.nedeni !== '' && (
                      <Descriptions.Item
                        key={'norm_requestreason' + norm.id}
                        label={L('table.norm.requestreason')}
                      >
                        {' '}
                        {L(norm.nedeni)}{' '}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item
                      key={'norm_requesttyp' + norm.id}
                      label={L('table.norm.requesttype')}
                    >
                      {L(norm.turu)}
                    </Descriptions.Item>
                    <Descriptions.Item
                      key={'norm_requsestdate' + norm.id}
                      label={L('table.norm.requestdate')}
                    >
                      {<DateCart date={norm.creationTime} />}
                    </Descriptions.Item>
                    <Descriptions.Item
                      key={'norm_requeststatus' + norm.id}
                      label={L('table.norm.requeststatus')}
                    >
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
                          <Tag
                            color={'rgb(250, 84, 28)'}
                            icon={<StopOutlined />}
                            className={'requeststatus'}
                          >
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
                    </Descriptions.Item>
                  </>
                )}
              </Descriptions>
            </Col>
            <Col xs={{ span: 23, offset: 1 }} sm={{ span: 15, offset: 1 }}>
              <Descriptions column={1} size={'small'} title={L('Norm Bilgisi')} bordered={true}>
                <Descriptions.Item key={'norm_description'}>
                  <Table
                    loading={groupData.length >= 0 ? false : true}
                    columns={columns}
                    dataSource={groupData}
                    locale={{ emptyText: L('NoData'), sortTitle: 'test' }}
                    pagination={{ defaultPageSize: 4 }}
                    summary={() => (
                      <Table.Summary fixed>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0}>{L('Toplam')}</Table.Summary.Cell>
                          <Table.Summary.Cell index={1}>{personCount}</Table.Summary.Cell>
                          <Table.Summary.Cell index={2}>{normCount}</Table.Summary.Cell>
                          <Table.Summary.Cell index={3}>{normShortfall}</Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    )}
                  />
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>

          {cargoAvgVisible === true ? (
            <Spin spinning={spin}>
              <Row>
                <Col
                  xs={{ span: 6, offset: 9 }}
                  sm={{ span: 6, offset: 9 }}
                  md={{ span: 6, offset: 9 }}
                  lg={{ span: 6, offset: 9 }}
                  xl={{ span: 6, offset: 9 }}
                  xxl={{ span: 6, offset: 9 }}
                >
                  <Descriptions title="Son 3 Ay Gelen Kargo Ortalaması" bordered>
                    <Descriptions.Item>{incomingMonthOne}</Descriptions.Item>
                    <Descriptions.Item>{incomingMonthTwo}</Descriptions.Item>
                    <Descriptions.Item>{incomingMonthThree}</Descriptions.Item>
                    <Descriptions.Item>{incomingMonthOneAverage}</Descriptions.Item>
                    <Descriptions.Item>{incomingMonthTwoAverage}</Descriptions.Item>
                    <Descriptions.Item>{incomingMonthThreeAverage}</Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col
                  xs={{ span: 6, offset: 1 }}
                  sm={{ span: 6, offset: 1 }}
                  md={{ span: 6, offset: 1 }}
                  lg={{ span: 6, offset: 1 }}
                  xl={{ span: 6, offset: 1 }}
                  xxl={{ span: 6, offset: 1 }}
                >
                  <Descriptions title="Son 3 Ay Giden Kargo Ortalaması" bordered>
                    <Descriptions.Item>{outcomingMonthOne}</Descriptions.Item>
                    <Descriptions.Item>{outcomingMonthTwo}</Descriptions.Item>
                    <Descriptions.Item>{outcomingMonthThree}</Descriptions.Item>
                    <Descriptions.Item>{outcomingMonthOneAverage}</Descriptions.Item>
                    <Descriptions.Item>{outcomingMonthTwoAverage}</Descriptions.Item>
                    <Descriptions.Item>{outcomingMonthThreeAverage}</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Spin>
          ) : (
            ''
          )}
        </>
      </Modal>
    </>
  );
};

NormDetailTimeLine.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

export default NormDetailTimeLine;
