export interface GetAllDamageCompensation {


  takipNo: number;
  tazminId: number;
  webSiparisKodu: string;
  tazminTipi: string;
  gelecekTazminStatu: string;
  gelecekTazminStatuNext: number;
  tazminTalepTarihi: Date;
  surecSahibiBolge:string;
  ekleyenKullanici:string;
  
  btnGoruntule:boolean;
  btnDuzenle:boolean;
  btnDegerlendir:boolean;
}
