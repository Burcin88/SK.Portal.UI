
import TalepDurumu from "./talepDurumu";
import TalepNedeni from "./talepNedeni";
import TalepTuru from "./talepTuru";

export interface GetKNormOutput {
    id: number;
    turu: string;
    durumu: string;
    kNormId: number;
    nedeni: string;
    subeAdi: string;
    aciklama: string;
    bolgeAdi: string;
    pozisyon: string;
    subeObjId: number;
    personelId: number;
    creationTime: Date;
    personelAdi: string;
    telepTuru: TalepTuru;
    yeniPozisyon: string;
    telepNedeni: TalepNedeni;
    talepDurumu: TalepDurumu;
    bagliOlduguSubeObjId?: string;
    creatorUserId: string;
}