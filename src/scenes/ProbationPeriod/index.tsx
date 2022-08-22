/* eslint-disable */
import * as React from 'react';
import AppComponentBase from '../../components/AppComponentBase';
import { Button, Card, Col, Dropdown, Input, Menu, Row, Table } from 'antd';
import { L } from '../../lib/abpUtility';
import { SettingOutlined } from '@ant-design/icons';

export interface Props {}

export interface State {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  headerId: number;
  filter: string;
}

const Search = Input.Search;

class ProbationPeriod extends AppComponentBase<Props, State> {
  public render() {
    //Sayfada oluşacak olan tablonun kolon isimlerini belirtir.
    const columns = [
      {
        title: L('RegistrationNumber'),
        dataIndex: 'headerText',
        key: 'headerText',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('FirstName'),
        dataIndex: 'descriptionText',
        key: 'descriptionText',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('LastName'),
        dataIndex: 'buttonOneText',
        key: 'buttonOneText',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Title'),
        dataIndex: 'buttonTwoText',
        key: 'buttonTwoText',
        width: 200,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Actions'),
        width: 100,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item>{L('Edit')}</Menu.Item>
                  <Menu.Item></Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon={<SettingOutlined />}>
                {L('Actions')}
              </Button>
            </Dropdown>
          </div>
        ),
      },
    ];

    return (
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
            <h2 style={{ width: '360px' }}>{L('StaffTimeRubric')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
          ></Col>
        </Row>
        <Row>
          <Col sm={{ span: 10, offset: 0 }}>
            <Search placeholder={this.L('Filter')} />
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
              rowKey={'1'}
              bordered={true}
              columns={columns}
              pagination={{
                pageSize: 10,

                defaultCurrent: 1,
              }}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
export default ProbationPeriod;
