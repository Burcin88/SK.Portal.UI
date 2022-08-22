import TalepDurumu from '../../kNorm/dto/talepTuru'
import TalepTuru from "../../kNorm/dto/talepTuru";
import Status from './status';


export interface CreateKNormDetailInput {
    talepDurumu?: TalepDurumu;
    description?: string;
    talepTuru?: TalepTuru;
    status?: Status;
    kNormId: number;
    userId?: number;
    id?: number;
}