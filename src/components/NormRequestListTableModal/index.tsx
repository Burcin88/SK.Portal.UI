/*eslint-disable */
import './index.less';
import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import NormRequestListTable from '../NormRequestListTable';


function NormRequestListTableModal({ title, table, onCancel, kNormStore, subeObjId, visible, kNormDetailStore,kPersonelStore,kSubeNormStore,type, bolgeId, moment }) {
    return (
        <> 
            <Modal
                centered
                title={''}
                footer={[]}
                width={'100%'}
                visible={visible}
                onCancel={onCancel} >
               
                <NormRequestListTable                
                    moment={moment}
                    bolgeId={bolgeId}
                    type={type}
                    kNormDetailStore={kNormDetailStore}
                    kPersonelStore={kPersonelStore}
                    kSubeNormStore={kSubeNormStore}
                    isConfirmOrCancel={true}
                    kNormStore={kNormStore}
                    subeObjId={subeObjId}
                    isHoverable={false}
                    tableTitle={title}
                    isModal={true}
                    table={table} 
                    />
            </Modal>
        </>
    )
}

NormRequestListTableModal.propTypes = {
    title: PropTypes.string,
    table: PropTypes.string,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    kNormStore: PropTypes.any,
    kPersonelStore:PropTypes.any,
    kSubeNormStore:PropTypes.any,
};

export default NormRequestListTableModal;