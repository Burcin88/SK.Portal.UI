
 import { L } from '../../../lib/abpUtility';

const rules = {
  takipNo:                    [{ required: true, message:  L('MissingInputEmpty')  }],
  sistem_InsertTime:          [{ required: true, message:  L('MissingInputEmpty')  }], 
  evrakSeriNo:                [{ required: true, message:  L('MissingInputEmpty')  }],
  gonderenKodu:               [{ required: true, message:  L('MissingInputEmpty')  }],
  gonderenUnvan:              [{ required: true, message:  L('MissingInputEmpty')  }],
  aliciKodu:                  [{ required: true, message:  L('MissingInputEmpty')  }],
  aliciUnvan:                 [{ required: true, message:  L('MissingInputEmpty')  }],
  cikis_Sube_Unvan:           [{ required: true, message:  L('MissingInputEmpty')  }],
  varis_Sube_Unvan:           [{ required: true, message:  L('MissingInputEmpty')  }],
  birimi:                     [{ required: true, message:  L('MissingInputEmpty')  }],
  adet:                       [{ required: true, message:  L('MissingInputEmpty')  }],
  kargoKabulFisNo:           [{ required: true,  message:  L('MissingInputEmpty')  }],  Tazmin_Talep_Tarihi:       [{ required: true,  message:  L('MissingInputEmpty')  }],
  Tazmin_Tipi:               [{ required: true,  message:  L('MissingInputEmpty')  }],
  Tazmin_Musteri_Tipi:       [{ required: true,  message:  L('MissingInputEmpty')  }],
  Tazmin_Musteri_Kodu:       [{ required: false, message:  L('MissingInputEmpty')  }],
  Tazmin_Musteri_Unvan:      [{ required: false, message:  L('MissingInputEmpty')  }],
  Odeme_Musteri_Tipi:        [{ required: true,  message:  L('MissingInputEmpty')  }],
  TCK_NO:                    [{ required: true,  message:  L('MissingInputEmpty')  }],
  VK_NO:                     [{ required: true,  message:  L('MissingInputEmpty')  }],
  Odeme_Birimi_Bolge:        [{ required: true,  message:  L('MissingInputEmpty')  }],
  Talep_Edilen_Tutar:        [{ required: true,  message:  L('MissingInputEmpty')  }],
  Surec_Sahibi_Birim_Bolge:  [{ required: true,  message:  L('MissingInputEmpty')  }],
  Telefon:                   [{ required: false, message:  L('MissingInputEmpty')  }],
  Email:                     [{ required: false, message:  L('MissingInputEmpty')  }],
};

export default rules;
