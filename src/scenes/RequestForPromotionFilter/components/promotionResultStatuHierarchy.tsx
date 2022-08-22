/* eslint-disable*/
import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { Modal, Timeline } from 'antd';
import { L } from '../../../lib/abpUtility';
import { PromotionDto } from '../../../services/promotion/dto/promotionDto';
import { PromotionType } from '../../../services/promotion/dto/promotionType';
import { PromotionStatu } from '../../../services/promotion/dto/promotionStatu';

interface HierarchyData {
  departmentManager: string;
  recruitment: string;
  hrManager: string;
}

export interface IPromotionResultStatuHierarchyProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  hierarchyData: PromotionDto;
  hierarchyDataView: HierarchyData;
  formRef: React.RefObject<FormInstance>;
}

const { Item } = Timeline;

class PromotionResultStatuHierarchy extends React.Component<IPromotionResultStatuHierarchyProps> {
  state = {
    confirmDirty: false,
    loopCount: 0,
  };

  render() {
    const { visible, hierarchyData, hierarchyDataView, onCancel } = this.props;
    var modalHeader;
    var firstItem;
    var secondItem;
    var thirdItem;

    if (hierarchyData !== undefined && hierarchyDataView !== null) {
      if (
        Number(hierarchyData.statu) === Number(PromotionType.OnayaGonderildi) ||
        Number(hierarchyData.statu) === Number(PromotionType.None)
      ) {
        switch (Number(hierarchyData.hierarchyStatu)) {
          case Number(PromotionStatu.None): 
            hierarchyDataView.departmentManager !== ''
              ? (firstItem = <Item key={1}>{hierarchyDataView.departmentManager}</Item>)
              : '';
            secondItem = <Item key={2}>{hierarchyDataView.recruitment}</Item>;
            thirdItem = <Item key={3}>{hierarchyDataView.hrManager}</Item>;
            modalHeader = L('promotion.request.header.information.statu.title');
            break;
          case Number(PromotionStatu.Department):
            hierarchyDataView.departmentManager !== ''
              ? (firstItem = (
                  <Item color="green" key={1}>
                    {hierarchyDataView.departmentManager}
                  </Item>
                ))
              : '';
            secondItem = <Item key={2}>{hierarchyDataView.recruitment}</Item>;
            thirdItem = <Item key={3}>{hierarchyDataView.hrManager}</Item>;
            modalHeader = L('promotion.request.header.information.statu.title');
            break;
          case Number(PromotionStatu.IseAlim):
            hierarchyDataView.departmentManager !== ''
              ? (firstItem = (
                  <Item color="green" key={1}>
                    {hierarchyDataView.departmentManager}
                  </Item>
                ))
              : '';
            secondItem = (
              <Item color="green" key={2}>
                {hierarchyDataView.recruitment}
              </Item>
            );
            thirdItem = <Item key={3}>{hierarchyDataView.hrManager}</Item>;
            modalHeader = L('promotion.request.header.information.statu.title');
            break;
          case Number(PromotionStatu.IkMudur):
            hierarchyDataView.departmentManager !== ''
              ? (firstItem = (
                  <Item color="green" key={1}>
                    {hierarchyDataView.departmentManager}
                  </Item>
                ))
              : '';
            secondItem = (
              <Item color="green" key={2}>
                {hierarchyDataView.recruitment}
              </Item>
            );
            thirdItem = (
              <Item color="green" key={3}>
                {hierarchyDataView.hrManager}
              </Item>
            );
            modalHeader = L('promotion.request.header.information.statu.title');
            break;
          default:
            break;
        }
      }
      if (Number(hierarchyData.statu) === Number(PromotionType.Reddedildi)) {
        switch (Number(hierarchyData.hierarchyStatu)) {
          case Number(PromotionStatu.Department):
            firstItem = (
              <Item color="red" key={1}>
                {hierarchyDataView.departmentManager}
              </Item>
            );
            secondItem = <Item key={2}>{hierarchyDataView.recruitment}</Item>;
            thirdItem = <Item key={3}>{hierarchyDataView.hrManager}</Item>;
            modalHeader = 'Oluşturulan terfi formu için süreç reddedilmiştir.';
            break;
          case Number(PromotionStatu.IseAlim):
            firstItem = (
              <Item color="green" key={1}>
                {hierarchyDataView.departmentManager}
              </Item>
            );
            secondItem = (
              <Item color="red" key={2}>
                {hierarchyDataView.recruitment}
              </Item>
            );
            thirdItem = <Item key={3}>{hierarchyDataView.hrManager}</Item>;
            modalHeader = 'Oluşturulan terfi formu için süreç reddedilmiştir.';
            break;
          case Number(PromotionStatu.IkMudur):
            firstItem = (
              <Item color="green" key={1}>
                {hierarchyDataView.departmentManager}
              </Item>
            );
            secondItem = (
              <Item color="green" key={2}>
                {hierarchyDataView.recruitment}
              </Item>
            );
            thirdItem = (
              <Item color="red" key={3}>
                {hierarchyDataView.hrManager}
              </Item>
            );
            modalHeader = 'Oluşturulan terfi formu için süreç reddedilmiştir.';
            break;
          default:
            break;
        }
      }
      if (Number(hierarchyData.statu) === Number(PromotionType.Onaylandi)) {
        switch (Number(hierarchyData.hierarchyStatu)) {
          case Number(PromotionStatu.IkMudur):
            firstItem = (
              <Item color="green" key={1}>
                {hierarchyDataView.departmentManager}
              </Item>
            );
            secondItem = (
              <Item color="green" key={2}>
                {hierarchyDataView.recruitment}
              </Item>
            );
            thirdItem = (
              <Item color="green" key={3}>
                {hierarchyDataView.hrManager}
              </Item>
            );
            modalHeader = 'Oluşturulan terfi formu için süreç onaylanmıştır.';
            break;
        }
      }
    }

    return (
      <Modal
        visible={visible}
        cancelText={L('GiveUp')}
        title={L('AuthoritiesHierarchy')}
        destroyOnClose={true}
        onCancel={onCancel}
        width={'50%'}
      >
        <div>
          <h4>{modalHeader}</h4>
          <span>
            <br></br>
          </span>
        </div>
        <div style={{ margin: '5px' }}>
          <Timeline style={{ margin: '5px' }}>
            {firstItem}
            {secondItem}
            {thirdItem}
          </Timeline>
        </div>
      </Modal>
    );
  }
}
export default PromotionResultStatuHierarchy;
