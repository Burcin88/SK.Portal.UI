import { L } from '../../lib/abpUtility';

const rules = {
    position: [{ required: true, message: L('ThisFieldIsRequired') }],
    newPosition: [{ required: true, message: L('ThisFieldIsRequired') }],
    requestType: [{ required: true, message: L('ThisFieldIsRequired') }],
    employeeId: [{ required: true, message: L('ThisFieldIsRequired') }],
    description: [{ required: true, message: L('ThisFieldIsRequired') }],
    requestReason: [{ required: true, message: L('ThisFieldIsRequired') }],  
    tip: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
