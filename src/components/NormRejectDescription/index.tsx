import './index.less';
import React from 'react';
import PropTypes from 'prop-types';
import { L } from '../../lib/abpUtility';
import rules from './normReject.validation';
import { Button, Form, Input, Modal } from 'antd';


const { TextArea } = Input;
function NormRejectDescription({ 
    rejectRequestClick,
    reuestId,
    formRef,
    title,
    visible,
    onCancel
}) {

    return (
        <>
            <Modal
                footer={[]}
                title={title}
                centered
                visible={visible}
                onCancel={onCancel}
                width={'50%'}
            >
                <Form ref={formRef}>
                    <Form.Item initialValue={reuestId} name='kNormId' rules={rules.reuestId}>
                        <Input style={{ display: 'none' }} />
                    </Form.Item>
                    <Form.Item
                        className={'ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 ant-col-xxl-24'}
                        label={L('RejectRequestDescriptionLabel')}
                        name='description'
                        rules={rules.description} >
                        <TextArea rows={8} />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ float: "right" }} type="primary" onClick={rejectRequestClick}> {L('Save')} </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

NormRejectDescription.propTypes = {
    rejectRequestClick: PropTypes.func,
    reuestId: PropTypes.number,
    formRef: PropTypes.any,
    title: PropTypes.string,
    visible: PropTypes.bool,
    onCancel: PropTypes.func
};


export default NormRejectDescription;