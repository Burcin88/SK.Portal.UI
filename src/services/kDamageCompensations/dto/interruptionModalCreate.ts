export interface InterruptionModalCreate {
  id?: number;
  kesintibirimi: string;
  kesintibirimkodu: string;
  kesintiyapilacakunvan: string;
  calismabaslangictarihi: Date;
  calismabitistarihi: Date;
  kesintiorani: number;
  tutar: string;
  tazminId: number;
}
