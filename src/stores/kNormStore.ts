// import { GetKNormCount } from './../services/kNorm/dto/getKNormCount';
import { action, observable } from 'mobx';
import kNormService from '../services/kNorm/kNormService';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { EntityDto } from '../services/dto/entityDto';
import { GetKNormOutput } from '../services/kNorm/dto/getKNormOutput';
import { PagedKNormResultRequestDto } from '../services/kNorm/dto/pagedKNormResultRequestDto';
import { CreateKNormInput } from '../services/kNorm/dto/createKNormInput';
import { GetAllKNormOutput } from '../services/kNorm/dto/getAllKNormOutput';
import TalepTuru from '../services/kNorm/dto/talepTuru';
import NormStatus from '../services/kNorm/dto/normStatus';
//import console, { Console } from 'console';


class KNormStore {

    @observable kNorms!: PagedResultDto<GetAllKNormOutput>;
    @observable editKNorm!: GetKNormOutput;

    @observable getPendingNormFillRequest!: GetAllKNormOutput[];
    @observable getTotalNormFillingRequest!: GetAllKNormOutput[];
    @observable getAcceptedNormFillRequest!: GetAllKNormOutput[];
    @observable getCanceledNormFillRequest!: GetAllKNormOutput[];

    @observable getTotalNormUpdateRequest!: GetAllKNormOutput[];
    @observable getPendingNormUpdateRequest!: GetAllKNormOutput[];
    @observable getAcceptedNormUpdateRequest!: GetAllKNormOutput[];
    @observable getCanceledNormUpdateRequest!: GetAllKNormOutput[];


    @observable getPendingNormFillRequestCountArray!: GetAllKNormOutput[];
    @observable getPendingNormFillRequestCount!: number;
    @observable getTotalNormFillingRequestCount!: number;
    @observable getAcceptedNormFillRequestCount!: number;
    @observable getCanceledNormFillRequestCount!: number;


    @observable getTotalNormUpdateRequestCountArray!: GetAllKNormOutput[];
    @observable getTotalNormUpdateRequestCount!: number;
    @observable getPendingNormUpdateRequestCount!: number;
    @observable getAcceptedNormUpdateRequestCount!: number;
    @observable getCanceledNormUpdateRequestCount!: number;


    @action
    async getMaxAllCount(pagedFilterAndSortedRequest: PagedKNormResultRequestDto) {



        let result: GetAllKNormOutput[];
        if (pagedFilterAndSortedRequest.type === "sube") {
            result = await kNormService.getAllSubeCount(pagedFilterAndSortedRequest);
        }
        else if (pagedFilterAndSortedRequest.type === "subedetail") {
            result = await kNormService.getAllSubeDetailCount(pagedFilterAndSortedRequest);
        }
        else {
            result = await kNormService.getAllBolgeCount(pagedFilterAndSortedRequest);
        }

        this.getPendingNormFillRequestCountArray = result.filter(x => TalepTuru[x.turu] === TalepTuru.Norm_Doldurma);

        this.getTotalNormFillingRequestCount = this.getPendingNormFillRequestCountArray.length;
        this.getPendingNormFillRequestCount = this.getPendingNormFillRequestCountArray.filter(x => NormStatus[x.normStatusValue] === NormStatus.Beklemede).length;
        this.getAcceptedNormFillRequestCount = this.getPendingNormFillRequestCountArray.filter(x => NormStatus[x.normStatusValue] === NormStatus.Onaylandi).length;
        this.getCanceledNormFillRequestCount = this.getPendingNormFillRequestCountArray.filter(x => NormStatus[x.normStatusValue] === NormStatus.Iptal).length;

        this.getTotalNormUpdateRequestCountArray = result.filter(x => TalepTuru[x.turu] === TalepTuru.Norm_Arttir || TalepTuru[x.turu] === TalepTuru.Norm_Kaydir);

        this.getTotalNormUpdateRequestCount = this.getTotalNormUpdateRequestCountArray.length;
        this.getPendingNormUpdateRequestCount = this.getTotalNormUpdateRequestCountArray.filter(x => NormStatus[x.normStatusValue] === NormStatus.Beklemede).length;
        this.getAcceptedNormUpdateRequestCount = this.getTotalNormUpdateRequestCountArray.filter(x => NormStatus[x.normStatusValue] === NormStatus.Onaylandi).length;
        this.getCanceledNormUpdateRequestCount = this.getTotalNormUpdateRequestCountArray.filter(x => NormStatus[x.normStatusValue] === NormStatus.Iptal).length;

    }

    @action
    async getMaxAll(pagedFilterAndSortedRequest: PagedKNormResultRequestDto) {

        let result: PagedResultDto<GetAllKNormOutput>;
        if (pagedFilterAndSortedRequest.type === "sube") {

            result = await kNormService.getAllSube(pagedFilterAndSortedRequest);
        }
        else if (pagedFilterAndSortedRequest.type === "subedetail") {
            result = await kNormService.getAllSubeDetail(pagedFilterAndSortedRequest);
        }
        else {
            result = await kNormService.getAllBolge(pagedFilterAndSortedRequest);
        }

        this.getTotalNormFillingRequest = result.items.filter(x => TalepTuru[x.turu] === TalepTuru.Norm_Doldurma);
        this.getPendingNormFillRequest = this.getTotalNormFillingRequest.filter(x => NormStatus[x.normStatusValue] === NormStatus.Beklemede);
        this.getAcceptedNormFillRequest = this.getTotalNormFillingRequest.filter(x => NormStatus[x.normStatusValue] === NormStatus.Onaylandi);
        this.getCanceledNormFillRequest = this.getTotalNormFillingRequest.filter(x => NormStatus[x.normStatusValue] === NormStatus.Iptal);

        this.getTotalNormUpdateRequest = result.items.filter(x => TalepTuru[x.turu] === TalepTuru.Norm_Arttir || TalepTuru[x.turu] === TalepTuru.Norm_Kaydir);
        this.getPendingNormUpdateRequest = this.getTotalNormUpdateRequest.filter(x => NormStatus[x.normStatusValue] === NormStatus.Beklemede);
        this.getAcceptedNormUpdateRequest = this.getTotalNormUpdateRequest.filter(x => NormStatus[x.normStatusValue] === NormStatus.Onaylandi);
        this.getCanceledNormUpdateRequest = this.getTotalNormUpdateRequest.filter(x => NormStatus[x.normStatusValue] === NormStatus.Iptal);
    }

    @action
    async getAll(pagedFilterAndSortedRequest: PagedKNormResultRequestDto) {
   
        let result: PagedResultDto<GetAllKNormOutput>;
        if (pagedFilterAndSortedRequest.type === "sube") {
            result = await kNormService.getAllSube(pagedFilterAndSortedRequest);
        }
        else if (pagedFilterAndSortedRequest.type === "subedetail") {
            result = await kNormService.getAllSubeDetail(pagedFilterAndSortedRequest);
        }
        else {
            result = await kNormService.getAllBolge(pagedFilterAndSortedRequest);
        } 
        this.kNorms = result;  
    }

    @action
    async get(entityDto: EntityDto) {
        let result = await kNormService.get(entityDto);
        this.editKNorm = result;
    }

    @action
    async getById(entityDto: EntityDto) {
        let result = await kNormService.getById(entityDto);
        this.editKNorm = result;
    }

    @action
    async create(createKNormInput: CreateKNormInput) {
        let result = await kNormService.create(createKNormInput);
        this.kNorms.items.push(result);
    }

    @action
    async setStatusAsync(createKNormInput: CreateKNormInput) {
        await kNormService.setStatusAsync(createKNormInput);
    }
}

export default KNormStore;