import { CreateMail } from "./createMail";
import NormStatus from "./normStatus";
import TalepDurumu from "./talepDurumu";
import TalepNedeni from "./talepNedeni";
import TalepTuru from "./talepTuru";

export interface CreateKNormInput {
    id?: number;
    telepTuru?: TalepTuru;
    pozisyon?: string;
    yeniPozisyon?: string;
    telepNedeni?: TalepNedeni;
    personelId?: number;
    aciklama?: string;
    subeObjId?: number;
    creationTime?: Date;
    talepDurumu?: TalepDurumu;
    normStatus?: NormStatus;
    tip?: string;
    mails?: CreateMail[];
    bagliOlduguSubeObjId?: string;
}

