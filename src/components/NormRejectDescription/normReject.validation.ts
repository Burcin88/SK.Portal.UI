import { L } from '../../lib/abpUtility';

const rules = {
  reuestId:  [{ required: true, message: L('ThisFieldIsRequired') }],
  description: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
