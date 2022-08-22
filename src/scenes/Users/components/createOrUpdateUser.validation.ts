
import { L } from '../../../lib/abpUtility';

const rules = {
  name:                    [{ required: true, message: L('ThisFieldIsRequired') }],
  surname:                 [{ required: true, message: L('ThisFieldIsRequired') }],
  userName:                [{ required: true, message: L('ThisFieldIsRequired') }], 
  title:                   [{ required: true, message: L('ThisFieldIsRequired') }],  
  emailAddress:            [
    { required: true, message: L('ThisFieldIsRequired') },
    {
      type: 'email',
      message: L('TheInputIsNotValidEMail'),
    },
  ],

};

export default rules;
