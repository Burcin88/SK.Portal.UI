/* eslint-disable */
import './index.less';
import React from 'react';
import ListSort from '../../../lib/ListSort';
import { inject, observer } from 'mobx-react';
import { VerticalAlignMiddleOutlined } from '@ant-design/icons';
import Stores from '../../../stores/storeIdentifier';
import KHierarchyStore from '../../../stores/kHierarchyStore';
import AppComponentBase from '../../../components/AppComponentBase';
import { Button } from 'antd';
import { L } from '../../../lib/abpUtility';
import { HierarchyDrawer } from './HierarchyDrawer';

export interface IState {
  dataArray: any;
  visible: boolean;
  nodeKey: number;
  node: any;
}

export interface IProps {
  keys: string[];
  kHierarchyStore?: KHierarchyStore;
  selectedKeys: string[];
}

@inject(Stores.KHierarchyStore)
@observer
export default class HiearchySortable extends AppComponentBase<IProps, IState> {
  state = {
    dataArray: [] as any,
    nodeKey: 0,
    visible: false,
    node: {} as Node,
  };

  getNodes = () => {
    this.props.kHierarchyStore
      ?.getNodesForKeyValues({
        keys: this.props.selectedKeys,
        skipCount: 0,
        maxResultCount: 1000000,
      })
      .then(() => {
        this.setState({ dataArray: this.props.kHierarchyStore?.nodeKeyValues });
      });
  };

  componentDidMount = () => {
    this.getNodes();
  };

  onChange = (values) => {
    this.getNodes();
    let ids = values.map((item) => item.key);
    this.props.kHierarchyStore?.updateOrderNodes(ids);
  };

  // Drawer Methods

  onSwitchChange = async (data: any) => {
    this.props.kHierarchyStore?.update(data);
  };

  onPassive = async (position: string) => {
    this.props.kHierarchyStore?.updateToPassive({ positionId: position });
  };

  drawerOnClose = () => {
    this.setState({ visible: false });
  };

  drawerOnOpen = (id: number) => {
    let node = this.state.dataArray.find((n) => n.id === id);
    this.setState({
      visible: true,
      node: node,
      nodeKey: node.id,
    });
  };
 

  render() {
    const childrenToRender = this.state.dataArray.map((item, i) => {
      const { title, id } = item;
      return (
        <div key={id} className={`list-sort-list`}>
          <div className={`list-sort-icon`}>
            <VerticalAlignMiddleOutlined />
          </div>
          <div className={`list-sort-text`}>
            <h1 style={{ width: '320px' }}>{title}</h1>
          </div>
          <div className={`list-sort-settings`}>
            <Button type="text" onClick={() => this.drawerOnOpen(id)}>
              {L('Operations')}
            </Button>
          </div>
        </div>
      );
    });

    return (
      <>
        <div className={`list-sort-wrapper`}>
          <div className={'list-sort'}>
            <ListSort

              onChange={this.onChange}
              // onEventChange={this.onEventChange}
              dragClassName="list-drag-selected"
              appearAnim={{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}
            >
              {childrenToRender}
            </ListSort>
          </div>
        </div>
        <HierarchyDrawer
          node={this.state.node}
          key={this.state.nodeKey}
          visible={this.state.visible}
          onClose={this.drawerOnClose}
          onSwitchChange={this.onSwitchChange}
        />
      </>
    );
  }
}
