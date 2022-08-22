/* eslint-disable */
import './index.less';
import React from 'react';
import uuid from 'react-uuid';
import { Breadcrumb, Button, Card, PageHeader } from 'antd';
import 'react-sortable-tree/style.css';
import { L } from '../../lib/abpUtility';
import { inject, observer } from 'mobx-react';
import SortableTree from 'react-sortable-tree';
import Stores from '../../stores/storeIdentifier';
import KHierarchyStore from '../../stores/kHierarchyStore';
import { HierarchyDrawer } from './components/hierarchyDrawer';
import AppComponentBase from '../../components/AppComponentBase';
import { Link } from 'react-router-dom';



export interface Node {
  id: number;
  title: string;
  expanded: boolean;
  subtitle: string;
  children: [];
}

export interface IProps {
  kHierarchyStore: KHierarchyStore;
}

export interface IState {
  node: any;
  treeData: any;
  nodeKey: number;
  visible: boolean;
}

@inject(Stores.KHierarchyStore)
@observer
class Hierarchy extends AppComponentBase<IProps, IState> {
  state = {
    nodeKey: 0,
    visible: false,
    node: {} as Node,
    treeData: [] as Node[],

  };

  onDragStateChanged = async (data) => {
    // console.log('onDragStateChanged => ', data)
  }

  onMoveNode = async (data) => {
    //  if(data.nextParentNode === null || )
    if (data.nextParentNode !== null) {
      let ids = data.nextParentNode.children.map((x) => x.id);
      this.props.kHierarchyStore.updateOrderNodes(ids);
    }
  }


  componentDidMount = async () => {

    await this.props.kHierarchyStore.getUnit();

    setTimeout(() => {
      this.setState({
        treeData: this.props.kHierarchyStore.units.items.map((x) => ({
          id: x.id,
          title: x.name,
          expanded: false,
          subtitle: 'unit',
          children: x.positions.map((p) => ({
            id: p.id,
            title: p.name,
            subtitle: 'position',
            children: p.nodes.map((n) => ({
              id: n.id,
              title: n.title,
              subtitle: 'title',
              mail: n.mail,
              mailStatusChange: n.mailStatusChange,
              pushNotificationWeb: n.pushNotificationWeb,
              pushNotificationWebStatusChange: n.pushNotificationWebStatusChange,
              pushNotificationPhone: n.pushNotificationPhone,
              pushNotificationPhoneStatusChange: n.pushNotificationPhoneStatusChange,
              active: n.active,
              canTerminate: n.canTerminate,
              positionId: n.positionId,
            })),
          })),
        })),
      });
    }, 500);
  };

  onSwitchChange = async (data: any) => {  
    this.props.kHierarchyStore.update(data);

  };

  onPassive = async (position: string) => {
    this.props.kHierarchyStore.updateToPassive({ positionId: position });
  };

  drawerOnClose = () => {
    this.setState({ visible: false });
  };

  drawerOnOpen = (node: any) => {
    this.setState({
      visible: true,
      node: node,
      nodeKey: node.id,
    }); 
  };


  render() {
    return (
      <>

        <Card style={{ marginBottom: 20 }}>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={
              <Breadcrumb>
                <Breadcrumb.Item>{this.isGranted('items.dashboard.view') ? <Link to="/dashboard">{L('Dashboard')}</Link> : <Link to="/home">{L('Dashboard')}</Link>}  </Breadcrumb.Item>
                <Breadcrumb.Item> {L('pages.hierarchy')} </Breadcrumb.Item>
              </Breadcrumb>
            }  >
          </PageHeader>
        </Card>


        <div style={{ height: 700 }}>
          <SortableTree
            onMoveNode={this.onMoveNode}
            onDragStateChanged={this.onDragStateChanged}
            key={uuid()}
            onChange={(treeData) => this.setState({ treeData })}
            treeData={this.state.treeData}
            generateNodeProps={({ node, path }) => ({
              canDrag: node.subtitle === 'unit' ? false : node.subtitle === 'position' ? false : true, 
              buttons:
                node.subtitle === 'title'
                  ? [<Button onClick={() => this.drawerOnOpen(node)}>{L('Operations')}</Button>]
                  : [],
            })}
          />
          <HierarchyDrawer
            node={this.state.node}
            key={this.state.nodeKey}
            visible={this.state.visible}
            onClose={this.drawerOnClose}
            onSwitchChange={this.onSwitchChange} 
            kHierarchyStore={this.props.kHierarchyStore}
          />
        </div>

      </>
    );
  }
}

export default Hierarchy;
