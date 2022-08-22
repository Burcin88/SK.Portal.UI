import React from 'react';
import './index.less';
import { Card, Col, ConfigProvider, DatePicker, Space } from 'antd';
import trTR from 'antd/lib/locale/tr_TR';
import en_US from 'antd/lib/locale/en_US';
const { RangePicker } = DatePicker;

declare var abp: any;

function KNormDateFilter({ cardLoading, cursor = '', onChange }) {
    return (
        <>
            <Col className={'dashboardCard'}
                xs={{ offset: 1, span: 22 }}
                sm={{ offset: 1, span: 22 }}
                md={{ offset: 1, span: 22 }}
                lg={{ offset: 1, span: 22 }}
                xl={{ offset: 0, span: 24 }}
                xxl={{ offset: 0, span: 24 }} >

                <Card
                    className={'kcard-date-picker'}
                    hoverable
                    style={{ cursor: cursor }}
                    bodyStyle={{ padding: 10 }}
                    loading={cardLoading}
                    bordered={false}>

                    <Col span={24}>
                        <Space direction="vertical" size={24}>
                            <ConfigProvider locale={abp.localization.currentLanguage.name === 'tr' ? trTR : en_US}>
                                <RangePicker
                                    format={"DD MM YYYY"}
                                    size={'large'}
                                    className={'range-picker'} 
                                    onCalendarChange={onChange}
                                    dateRender={current => {
                                        const style = { border: '', borderRadius: '' };
                                        if (current.date() === 1) {
                                            style.border = '1px solid #1890ff';
                                            style.borderRadius = '50%';
                                        }
                                        return (
                                            <div className="ant-picker-cell-inner" style={style}>
                                                {current.date()}
                                            </div>
                                        );
                                    }}
                                />
                            </ConfigProvider>
                        </Space>
                    </Col>
                </Card>
            </Col>
        </>
    )
}

export default KNormDateFilter;