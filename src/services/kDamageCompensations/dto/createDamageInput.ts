export interface CreateDamageInput {
  IlkGondericiSube_ObjId: number;
  Cikis_Sube_Unvan: string;
  Varis_Sube_Unvan: string;
  VarisSube_ObjId: number;
  Sistem_InsertTime: Date;
  GonderenUnvan: string;
  GonderenKodu: string;
  Birimi_ObjId: number;
  AliciUnvan: string;
  AliciKodu: string;
  TakipNo: number;
  Birimi: string;
  Adet: number;
  id?: number;

  Durumu:number;
  KargoKabulFisNo:string;

  web_Siparis_Kodu:string;


  //tanzim bilgiler
  Surec_Sahibi_Birim_Bolge: number;
  Tazmin_Musteri_Unvan: string;
  Tazmin_Musteri_Tipi: number;
  Tazmin_Musteri_Kodu: string;
  Odeme_Musteri_Tipi: number;
  Tazmin_Talep_Tarihi: Date;
  Talep_Edilen_Tutar: number;
  Odeme_Birimi_Bolge: number;
  Tazmin_Tipi: number;
  Telefon: string;
  TCK_NO: string;
  Email: string;
  //belgeler
  FileTazminDilekcesi: string;
  FileFatura: string;
  FileSevkirsaliye: string;
  FileTcVkno: string;
}
