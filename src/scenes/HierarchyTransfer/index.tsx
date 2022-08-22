/* eslint-disable */
import React from 'react';
import Row from 'antd/lib/row';
import { Link } from 'react-router-dom';
import { L } from '../../lib/abpUtility';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import { Col, Card, PageHeader, Breadcrumb } from 'antd';
import KHierarchyStore from '../../stores/kHierarchyStore';
import HiearchyTransfer from './components/HiearchyTransfer';
import HiearchySortable from './components/HiearchySortable';
import AppComponentBase from '../../components/AppComponentBase';


import uuid from 'react-uuid';
export interface IProps {
  kHierarchyStore: KHierarchyStore;
}

export interface IState {

  keys: string[]; 
  selectedKeys: string[];
}

@inject(Stores.KHierarchyStore)
@observer
class Transfer extends AppComponentBase<IProps, IState> {
  state = {
    keys: [], 
    selectedKeys: [], 
  };

  setSeletedItems = (keys) => {
    this.setState({ keys: keys });
  };

  setSeletedKeyValues = (keys) => {
    this.setState({ selectedKeys: keys });
  };



  render() {
    return (
      <React.Fragment>
        <Card style={{ marginBottom: 20 }}>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={
              <Breadcrumb>
                <Breadcrumb.Item>
                  {this.isGranted('items.dashboard.view') ? (
                    <Link to="/dashboard">{L('Dashboard')}</Link>
                  ) : (
                    <Link to="/home">{L('Dashboard')}</Link>
                  )}{' '}
                </Breadcrumb.Item>
                <Breadcrumb.Item> {L('pages.hierarchy')} </Breadcrumb.Item>
              </Breadcrumb>
            }
          ></PageHeader>
        </Card>

        <Card hoverable>
          <Row gutter={[16, 16]}>
            <Col
              xs={{ span: 12, offset: 0 }}
              sm={{ span: 12, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 12, offset: 0 }}
              xl={{ span: 12, offset: 0 }}
              xxl={{ span: 12, offset: 0 }}
            >
              <HiearchyTransfer
                sourceTitle={L('Positions')}
                targetTitle={L('SelectedPositions')}
                setSeletedItems={this.setSeletedItems}
                kHierarchyStore={this.props.kHierarchyStore}
                setSeletedKeyValues={this.setSeletedKeyValues}
              />
            </Col>
            <Col
              xs={{ span: 12, offset: 0 }}
              sm={{ span: 12, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 12, offset: 0 }}
              xl={{ span: 12, offset: 0 }}
              xxl={{ span: 12, offset: 0 }}
            >
              <HiearchySortable 
                key={uuid()}
                keys={this.state.keys}
                selectedKeys={this.state.selectedKeys}
              />
            </Col>
          </Row>
        </Card>


      </React.Fragment>
    );
  }
}
export default Transfer;
