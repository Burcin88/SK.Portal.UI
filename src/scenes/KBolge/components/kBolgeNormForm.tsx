import React from 'react';
import { Button } from 'antd';
import { Form, Input, Select, InputNumber } from 'antd';
import { L } from '../../../lib/abpUtility';
import rules from './createNorm.validation';
import { FormInstance } from 'antd/lib/form';
import KSubeNormStore from '../../../stores/kSubeNormStore';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { GetKInkaLookUpTableOutput } from '../../../services/kInkaLookUpTable/dto/getKInkaLookUpTableOutput';


export interface IKBolgeNorFormProps {
    subeObjId: string;
    kSubeNormCreate: () => void;
    kSubeNormStore: KSubeNormStore;
    formRef: React.RefObject<FormInstance>;
    kPosizyonKontrol: (key: string) => void;
    positionSelect: PagedResultDto<GetKInkaLookUpTableOutput>;
}


class KBolgeNormForm extends React.Component<IKBolgeNorFormProps> {
 
    render() {
        const formItemLayout = {
            labelCol: { xs: { span: 4 }, sm: { span: 4 }, md: { span: 4 }, lg: { span: 4 }, xl: { span: 4 }, xxl: { span: 4 }, },
            wrapperCol: { xs: { span: 20 }, sm: { span: 20 }, md: { span: 20 }, lg: { span: 20 }, xl: { span: 20 }, xxl: { span: 20 }, },
        };
        const { Option } = Select;
        const { kSubeNormCreate, kPosizyonKontrol, subeObjId, formRef, positionSelect } = this.props;

        return (
            <>
                <Form ref={formRef}>
                    <Form.Item initialValue={subeObjId} name='subeObjId' rules={rules.subeObjId}>
                        <Input style={{ display: 'none' }} />
                    </Form.Item>
                    <Form.Item label={L('Position')} {...formItemLayout} name={'pozisyon'} rules={rules.pozisyon}>
                        <Select onSelect={kPosizyonKontrol} >
                            {
                                positionSelect === undefined
                                    ? []
                                    : positionSelect.items.map(
                                        (key) => <Option key={key.adi} value={key.adi}> {key.adi} </Option>
                                    )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label={L("NormCount")} {...formItemLayout} name={'adet'} rules={rules.adet}>
                        <InputNumber min={1} style={{ minWidth: '100%' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ float: "right" }} type="primary" onClick={kSubeNormCreate}> {L('Save')} </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}
export default KBolgeNormForm;