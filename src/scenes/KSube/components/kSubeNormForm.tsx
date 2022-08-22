import React from 'react';
import { Button } from 'antd';
import { Form, Input, Select, InputNumber } from 'antd';
import { isGranted, L } from '../../../lib/abpUtility';
import rules from './createNorm.validation';
import { FormInstance } from 'antd/lib/form';
import KSubeNormStore from '../../../stores/kSubeNormStore';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { GetKInkaLookUpTableOutput } from '../../../services/kInkaLookUpTable/dto/getKInkaLookUpTableOutput';


export interface IKSubeNorFormProps {
    subeObjId: string;
    kSubeNormCreate: () => void;
    kSubeNormStore: KSubeNormStore;
    kPosizyonKontrol: (key: string) => void;
    formRef: React.RefObject<FormInstance>;
    positionSelect: PagedResultDto<GetKInkaLookUpTableOutput>;
} 
class KSubeNormForm extends React.Component<IKSubeNorFormProps> {
    render() {
        const formItemLayout = {
            labelCol: { xs: { span: 4 }, sm: { span: 4 }, md: { span: 4 }, lg: { span: 4 }, xl: { span: 4 }, xxl: { span: 4 }, },
            wrapperCol: { xs: { span: 20 }, sm: { span: 20 }, md: { span: 20 }, lg: { span: 20 }, xl: { span: 20 }, xxl: { span: 20 }, },
        };
        const { Option } = Select;
        const { kSubeNormCreate, kPosizyonKontrol, subeObjId, formRef, positionSelect } = this.props;
        return (
            <> 
                {
                    (isGranted('items.knorm.ksubenorm.create') || isGranted('items.knorm.ksubenorm.edit')) && <Form ref={formRef}>
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
                            <InputNumber style={{ minWidth: '100%' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ float: "right" }} type="primary" onClick={kSubeNormCreate}> {L('Save')} </Button>
                        </Form.Item>
                    </Form>
                }

            </>
        )
    }
}
export default KSubeNormForm;