import * as React from 'react';
import { Modal, Button } from 'antd';
import { L } from '../../../lib/abpUtility';
import KBolgeNormForm from './kBolgeNormForm';
import { FormInstance } from 'antd/lib/form';
import KBolgeNormTable from './kBolgeNormTable';
import KSubeNormStore from '../../../stores/kSubeNormStore';
import { EntityDto } from '../../../services/dto/entityDto';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { GetKSubeNormOutput } from '../../../services/kSubeNorm/dto/getKSubeNormOutput';
import { GetKInkaLookUpTableOutput } from '../../../services/kInkaLookUpTable/dto/getKInkaLookUpTableOutput';

export interface Props {
  normList: [];
  visible: boolean;
  modalType: string;
  subeObjId: string;
  onCancel: () => void;
  kSubeNormCreate: () => void;
  kSubeNormStore: KSubeNormStore;
  formRef: React.RefObject<FormInstance>;
  kPosizyonKontrol: (key: string) => void;
  kSubeNorms: PagedResultDto<GetKSubeNormOutput>;
  kSubeNormEdit: (input: EntityDto<string>) => void;
  kSubeNormDelete: (input: EntityDto<string>) => void;
  positionSelect: PagedResultDto<GetKInkaLookUpTableOutput>;
}

export interface State {
  id: string;
  adet: number;
  userId: string;
  pozisyon: string;
  confirmDirty: boolean;
}


class CreateKBolgeNorm extends React.Component<Props, State> {
  state = { id: '0', adet: 0, userId: '0', pozisyon: '', confirmDirty: false, };

  render() {
    const {
      visible,
      formRef,
      onCancel,
      subeObjId,
      kSubeNormEdit,
      positionSelect,
      kSubeNormStore,
      kSubeNormCreate,
      kSubeNormDelete,
      normList
    } = this.props;
    return (
      <>
        <Modal
          footer={
            [
              <Button onClick={onCancel} type="primary" danger key="1" >{L('Close')}</Button>
            ]
          }
          width={'60%'}
          visible={visible}
          title={L('NormInsertOperation')}
          onCancel={onCancel}
          destroyOnClose={true}
        >
          <KBolgeNormForm
            formRef={formRef}
            subeObjId={subeObjId}
            positionSelect={positionSelect}
            kSubeNormStore={kSubeNormStore}
            kSubeNormCreate={kSubeNormCreate}
            kPosizyonKontrol={this.props.kPosizyonKontrol}
          />

          <KBolgeNormTable
            normList={normList}
            kSubeNormEdit={kSubeNormEdit} 
            kSubeNormDelete={kSubeNormDelete} 
          />
        </Modal >
      </>
    );
  }
}

export default CreateKBolgeNorm;
