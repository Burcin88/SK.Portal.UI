/*eslint-disable*/
import './index.less';
import { Row } from 'antd';
import KCart from '../KCart';
import PropTypes from 'prop-types';
import KNormDateFilter from '../KNormDateFilter';
import React, { useState, useEffect } from 'react';
import { isGranted, L } from '../../lib/abpUtility';
import NormRequestListTableModal from '../NormRequestListTableModal';

interface KCartListProps {
    dateFilter: boolean;
    moment?: any;
    type;
    bolgeId;
    subeObjId;
    normCount;
    kNormStore;
    kPersonelStore;
    kSubeNormStore;
    cardLoading;
    onDateFilter;
    kPersonelCount;
    kNormDetailStore;
    getTotalNormUpdateRequestCount: number;
    getPendingNormFillRequestCount: number;
    getTotalNormFillingRequestCount: number;
    getAcceptedNormFillRequestCount: number;
    getCanceledNormFillRequestCount: number;
    getPendingNormUpdateRequestCount: number;
    getAcceptedNormUpdateRequestCount: number;
    getCanceledNormUpdateRequestCount: number;
    getTotalNormUpdateRequestPermission: boolean;
    getPendingNormFillRequestPermission: boolean;
    getTotalNormFillingRequestPermission: boolean;
    getAcceptedNormFillRequestPermission: boolean;
    getCanceledNormFillRequestPermission: boolean;
    getPendingNormUpdateRequestPermission: boolean;
    getAcceptedNormUpdateRequestPermission: boolean;
    getCanceledNormUpdateRequestPermission: boolean;
}


function KCartList({
    dateFilter,
    moment,
    type,
    bolgeId,
    subeObjId,
    normCount,
    kNormStore,
    kPersonelStore,
    kSubeNormStore,
    cardLoading,
    onDateFilter,
    kPersonelCount,
    kNormDetailStore,
    getTotalNormUpdateRequestCount,
    getPendingNormFillRequestCount,
    getTotalNormFillingRequestCount,
    getAcceptedNormFillRequestCount,
    getCanceledNormFillRequestCount,
    getPendingNormUpdateRequestCount,
    getAcceptedNormUpdateRequestCount,
    getCanceledNormUpdateRequestCount,
    getTotalNormUpdateRequestPermission,
    getPendingNormFillRequestPermission,
    getTotalNormFillingRequestPermission,
    getAcceptedNormFillRequestPermission,
    getCanceledNormFillRequestPermission,
    getPendingNormUpdateRequestPermission,
    getAcceptedNormUpdateRequestPermission,
    getCanceledNormUpdateRequestPermission
}: KCartListProps) {

    const [key, setKey] = useState(0)
    const [table, setTable] = useState('')
    const [visible, setVisible] = useState(false)


    const [totalNormUpdateRequest, setTotalNormUpdateRequest] = useState(0)
    const [pendingNormFillRequest, setPendingNormFillRequest] = useState(0)
    const [canceledNormFillRequest, setCanceledNormFillRequest] = useState(0)
    const [acceptedNormFillRequest, setAcceptedNormFillRequest] = useState(0)
    const [totalNormFillingRequest, setTotalNormFillingRequest] = useState(0)
    const [pendingNormUpdateRequest, setPendingNormUpdateRequest] = useState(0)
    const [acceptedNormUpdateRequest, setAcceptedNormUpdateRequest] = useState(0)
    const [canceledNormUpdateRequest, setCanceledNormUpdateRequest] = useState(0)

    const onOpenModal = (card: string) => {
        setVisible(!visible);
        setTable(card);
    }

    const setDefault = (key: string) => { }

    const onCancelModal = () => {
        setVisible(!visible);
    }

    useEffect(() => { setKey(key + 1) }, [visible]);

    setTimeout(() => {
       


        if (getTotalNormUpdateRequestPermission)  { setTotalNormUpdateRequest(getTotalNormUpdateRequestCount) }
        if (getPendingNormFillRequestPermission)  { setPendingNormFillRequest(getPendingNormFillRequestCount) }
        if (getTotalNormFillingRequestPermission) { setTotalNormFillingRequest(getTotalNormFillingRequestCount) }
        if (getAcceptedNormFillRequestPermission) { setAcceptedNormFillRequest(getAcceptedNormFillRequestCount) }
        if (getCanceledNormFillRequestPermission) { setCanceledNormFillRequest(getCanceledNormFillRequestCount) }
        if (getPendingNormUpdateRequestPermission) { setPendingNormUpdateRequest(getPendingNormUpdateRequestCount) }
        if (getAcceptedNormUpdateRequestPermission) { setAcceptedNormUpdateRequest(getAcceptedNormUpdateRequestCount) }
        if (getCanceledNormUpdateRequestPermission) { setCanceledNormUpdateRequest(getCanceledNormUpdateRequestCount) }

 
    }, 500)


    return (
        <>
            <Row gutter={16}>
                {isGranted('subitems.dashboard.infobox.norm.count') &&
                    <KCart cursor={'context-menu'} onClick={() => setDefault('')} cardLoading={cardLoading} color='rgb(64, 169, 255)' title={L('NormCount')} icon='UsergroupAddOutlined' number={normCount} />
                }
                {
                    isGranted('subitems.dashboard.infobox.emplooye.count') &&
                    <KCart cursor={'context-menu'} onClick={() => setDefault('')} cardLoading={cardLoading} color='rgb(64, 169, 255)' title={L('EmployeeCount')} icon='UserAddOutlined' number={kPersonelCount} />
                }

            </Row>

            {
                dateFilter && <Row gutter={16}>
                    <KNormDateFilter cursor={'context-menu'} onChange={onDateFilter} cardLoading={cardLoading} />
                </Row>
            }
          
           

            <Row gutter={16}>
                {


                    getTotalNormFillingRequestPermission && <KCart onClick={() => onOpenModal('getTotalNormFillingRequest')}

                        cardLoading={cardLoading}
                        color='rgb(83, 29, 171)'
                        title={L('TotalNormFillingRequest')}
                        icon='FileDoneOutlined'
                        number={totalNormFillingRequest} />
                }
                {
                    getPendingNormFillRequestPermission && <KCart onClick={() => onOpenModal('getPendingNormFillRequest')}
                        cardLoading={cardLoading} color='rgb(250, 173, 20)'
                        title={L('PendingNormFillRequest')} icon='ClockCircleOutlined'
                        number={pendingNormFillRequest} />
                }
                {
                    getAcceptedNormFillRequestPermission && <KCart onClick={() => onOpenModal('getAcceptedNormFillRequest')}
                        cardLoading={cardLoading} color='#1DA57A'
                        title={L('AcceptedNormFillRequest')} icon='CheckCircleOutlined'
                        number={acceptedNormFillRequest} />
                }
                {
                    getCanceledNormFillRequestPermission && <KCart onClick={() => onOpenModal('getCanceledNormFillRequest')}
                        cardLoading={cardLoading} color='#fa541c'
                        title={L('CanceledNormFillRequest')} icon='StopOutlined'
                        number={canceledNormFillRequest} />
                }
            </Row>

            <Row gutter={16}>
                {
                    getTotalNormUpdateRequestPermission && <KCart onClick={() => onOpenModal('getTotalNormUpdateRequest')}
                        cardLoading={cardLoading} color='rgb(83, 29, 171)'
                        title={L('TotalNormUpdateRequest')} icon='FileDoneOutlined'
                        number={totalNormUpdateRequest} />
                }
                {
                    getPendingNormUpdateRequestPermission && <KCart onClick={() => onOpenModal('getPendingNormUpdateRequest')}
                        cardLoading={cardLoading} color='rgb(250, 173, 20)'
                        title={L('PendingNormUpdateRequest')} icon='ClockCircleOutlined'
                        number={pendingNormUpdateRequest} />
                }
                {
                    getAcceptedNormUpdateRequestPermission && <KCart onClick={() => onOpenModal('getAcceptedNormUpdateRequest')}
                        cardLoading={cardLoading} color='#1DA57A'
                        title={L('AcceptedNormUpdateRequest')} icon='CheckCircleOutlined'
                        number={acceptedNormUpdateRequest} />
                }
                {
                    getCanceledNormUpdateRequestPermission && <KCart onClick={() => onOpenModal('getCanceledNormUpdateRequest')}
                        cardLoading={cardLoading} color='#fa541c'
                        title={L('CanceledNormUpdateRequest')} icon='StopOutlined'
                        number={canceledNormUpdateRequest} />
                }

            </Row>
          
            <NormRequestListTableModal
                key={key}
                type={type}
                table={table}
                moment={moment}
                bolgeId={bolgeId}
                visible={visible}
                subeObjId={subeObjId}
                kNormStore={kNormStore}
                kPersonelStore={kPersonelStore}
                kSubeNormStore={kSubeNormStore}
                onCancel={onCancelModal}
                title={table.replace('get', '')}
                kNormDetailStore={kNormDetailStore}
            />
        </>
    );
}

KCartList.propTypes = {
    visible: PropTypes.bool,
    cardLoading: PropTypes.bool,
    normCount: PropTypes.number,
    kNormStore: PropTypes.object,
    kPersonelCount: PropTypes.number,
    kPersonelStore :PropTypes.object,
    kSubeNormStore:PropTypes.object,
};

export default KCartList;
