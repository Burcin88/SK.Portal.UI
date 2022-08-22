import { L } from '../../../lib/abpUtility';

const rules = {
  pozisyon:  [{ required: true, message: L('ThisFieldIsRequired') }],
  adet:      [{ required: true, message: L('ThisFieldIsRequired') }],
  subeObjId: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
