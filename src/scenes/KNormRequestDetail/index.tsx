/*eslint-disable */
import './index.less'
import * as React from 'react';
// import { L } from '../../lib/abpUtility'; 
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import AppComponentBase from '../../components/AppComponentBase';
import KNormStore from '../../stores/kNormStore';
import { Comment, Avatar, Card, Col, Row } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';



export interface INormDetailProps {
    kNormStore: KNormStore;
}

export interface INormDetailState {
}

@inject(Stores.KNormStore)
@observer
class Detail extends AppComponentBase<INormDetailProps, INormDetailState>{


    render() {
        let data = ["detail-success", "detail-waiting", "detail-waiting", "detail-waiting", "detail-waiting", "detail-waiting", "detail-cancel", "detail-cancel", "detail-cancel"]

        return (
            <>
                <QueueAnim delay={300} className="queue-simple">
                    {
                        data.map((x, y) => <div key={y}>

                            <Row>
                                <Col className={'detail-col'}
                                    xs={{ span: 2, offset: 2 }}
                                    sm={{ span: 2, offset: 2 }}
                                    md={{ span: 2, offset: 2 }}
                                    lg={{ span: 2, offset: 2 }}
                                    xl={{ span: 2, offset: 2 }}
                                    xxl={{ span: 2, offset: 2 }}
                                >

                                    <div className={'detail-container'}>
                                        <HistoryOutlined className={'detail-icon'} />
                                        <p className={'detail-text'}>
                                            12:55
                                        </p>
                                    </div>
                                </Col>
                                <Col
                                    xs={{ span: 16, offset: 0 }}
                                    sm={{ span: 16, offset: 0 }}
                                    md={{ span: 16, offset: 0 }}
                                    lg={{ span: 16, offset: 0 }}
                                    xl={{ span: 16, offset: 0 }}
                                    xxl={{ span: 16, offset: 0 }}
                                >
                                    <Card hoverable className={'comment-card ' + x}>
                                        <Comment
                                            author={<a>Murat Vuranok</a>}
                                            avatar={
                                                <Avatar
                                                    size={60}
                                                    className={'detail-avatar'}>
                                                    {"Murat"[0]}{"Vuranok"[0]}
                                                </Avatar>
                                            }
                                            content={
                                                <p>
                                                    Onay Bildirimi
                                                    12.12.2021 Tarihinde Saat 12:00'da onaylanmıştır
                                                </p>
                                            }
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        )}
                </QueueAnim>

            </>
        );

    }
};
export default Detail;