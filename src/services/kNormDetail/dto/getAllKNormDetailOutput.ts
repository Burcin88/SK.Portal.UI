import TalepDurumu from "../../kNorm/dto/talepDurumu";
import Status from "./status";

export interface GetAllKNormDetailOutput {
    id: number;
    kNormId: number;
    userId: number;
    orderNo: number;
    talepDurumu: TalepDurumu;
    description: string;
    status: Status;
    visible: boolean;
}