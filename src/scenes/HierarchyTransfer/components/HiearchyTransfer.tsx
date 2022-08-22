/* eslint-disable */
import './index.less';
import { L } from '../../../lib/abpUtility';
import { TransferItem } from 'antd/lib/transfer';
import React, { useState, useEffect } from 'react';
import KHierarchyStore from '../../../stores/kHierarchyStore';
import { Col, Form, FormInstance, Row, Select, Transfer } from 'antd';
import { PositionOutput } from '../../../services/kHierarchy/dto/getAllHierarchyOutput';

export interface IProps {
  kHierarchyStore: KHierarchyStore;
  sourceTitle: string;
  targetTitle: string;
  setSeletedItems: Function;
  setSeletedKeyValues: Function;
}

export default function HiearchyTransfer(props: IProps) {
  const [positionId, setPositionId] = useState(String);
  const [unitsItems, setUnitsItems] = useState([] as any);
  const [targetKeys, setTargetKeys] = useState([] as any);
  const [selectedKeys, setSelectedKeys] = useState([] as any);
  const [nodesItems, setNodesItems] = useState<TransferItem[]>([]);
  const [positionsItems, setPositionsItems] = useState<PositionOutput[]>([]);

  const formRef = React.createRef<FormInstance>();
  const { kHierarchyStore, sourceTitle, targetTitle } = props;
  const { Option } = Select;

  useEffect(() => {
    getUnits();
  }, []);

  async function getUnits() {
    let result = await kHierarchyStore.getUnit();
    let items = result.items.map((item) => (
      <Option key={`unit_${item.id}`} value={item.id}>
        {item.name}
      </Option>
    ));

    setUnitsItems(items);
    return result;
  }

  const setItemsSelected = async (keys) => {
    kHierarchyStore
      .updateSetFalse(positionId)
      .then(() => {
        kHierarchyStore.updateSetTrue({
          ids: keys,
        });
      })
      .catch((err) => console.log(err));
  };

  function onUnitChange(value) {
    props.setSeletedItems([]); 
    setNodesItems([]);
    formRef.current?.resetFields(['position']);
    let positions = kHierarchyStore.units.items.find((item) => item.id === value)?.positions;
    setPositionsItems(positions || []);
  }

  function onPositionChange(value) {
    props.setSeletedItems([]);
    setPositionId(value);
    let nodes = positionsItems.find((item) => item.id === value)?.nodes;

    if (nodes !== undefined) {
      let nodeList = nodes.map<TransferItem>((item) => ({
        key: `${item.id}`,
        title: item.title,
        description: 'Sample Description 5',
        selected: item.selected,
      }));
      setNodesItems(nodeList || []);

      let seletedKeys = nodeList.filter((item) => item.selected).map((item) => item.key);
      setTargetKeys(seletedKeys);
      props.setSeletedKeyValues(seletedKeys);
    }
  }

  function onBlur(result) {}
  function onFocus(result) {}
  function onSearch(result) {}

  function onChange(keys) {
    setTargetKeys(keys);
    setItemsSelected(keys);
    props.setSeletedItems(keys);
    props.setSeletedKeyValues(keys);
  }

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={formRef}
      >
        <Row  >
          <Col
            xs={{ span: 12, offset: 0 }}
            sm={{ span: 12, offset: 0 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 12, offset: 0 }}
            xxl={{ span: 12, offset: 0 }}
          >
            <Form.Item name="unit">
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder={L('PleaseSelect')}
                optionFilterProp="children"
                onChange={onUnitChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
              >
                {unitsItems}
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 12, offset: 0 }}
            sm={{ span: 12, offset: 0 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
            xl={{ span: 12, offset: 0 }}
            xxl={{ span: 12, offset: 0 }}
          >
            {' '}
            <Form.Item name="position">
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder={L('PleaseSelect')}
                optionFilterProp="children"
                onChange={onPositionChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
              >
                {positionsItems !== undefined &&
                  positionsItems.map((item) => (
                    <Option key={`position_${item.id}`} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row >
          <Col span={24}> 
              <Transfer 
                // locale={{  L('NoData') }}
                style={{ width: '100%' }}
                dataSource={nodesItems}
                titles={[sourceTitle, targetTitle]}
                render={(item) => `${item.title}`}
                selectedKeys={selectedKeys}
                targetKeys={targetKeys}
                onChange={onChange}
                onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
                  setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
                }}
              /> 
          </Col>
        </Row>
      </Form>
    </>
  );
}
