import * as React from 'react';
import { Modal, Button } from 'antd';
import { L } from '../../../lib/abpUtility';
import KSubeNormForm from './kSubeNormForm';
import { FormInstance } from 'antd/lib/form';
import KSubeNormTable from './kSubeNormTable';
import KSubeNormStore from '../../../stores/kSubeNormStore';
import { EntityDto } from '../../../services/dto/entityDto';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { GetKSubeNormOutput } from '../../../services/kSubeNorm/dto/getKSubeNormOutput';
import { GetKInkaLookUpTableOutput } from '../../../services/kInkaLookUpTable/dto/getKInkaLookUpTableOutput';


export interface ICreateNormProps {
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
  subeAdi: string;
  bolgeAdi: string;
  normList: []
}


class CreateKSubeNorm extends React.Component<ICreateNormProps> {
  state = {
    id: '0',
    adet: 0,
    userId: '0',
    pozisyon: '',
    confirmDirty: false,
  };

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
      kPosizyonKontrol,
      subeAdi,
      bolgeAdi
    } = this.props;
    return (
      <>
        <Modal
          footer={
            [
              <Button onClick={onCancel} type="primary" danger key="1" >{L('Close')}</Button>
            ]
          }
          width={'50%'}
          visible={visible}
          title={bolgeAdi + ' / ' + subeAdi + ' / ' + L('NormInsertOperation')}
          onCancel={onCancel}
          destroyOnClose={true}
        >
          <KSubeNormForm
            formRef={formRef}
            subeObjId={subeObjId}
            positionSelect={positionSelect}
            kSubeNormStore={kSubeNormStore}
            kSubeNormCreate={kSubeNormCreate}
            kPosizyonKontrol={kPosizyonKontrol}
          />

          <KSubeNormTable
            normList={this.props.normList}
            kSubeNormEdit={kSubeNormEdit}
            kSubeNormStore={kSubeNormStore}
            kSubeNormDelete={kSubeNormDelete}
            kSubeNorms={this.props.kSubeNorms}
          />
        </Modal >
      </>
    );
  }
}

export default CreateKSubeNorm;
