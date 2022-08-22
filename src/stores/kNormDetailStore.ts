import { action, observable } from 'mobx';
import { CreateKNormDetailInput } from '../services/kNormDetail/dto/createKNormDetailInput';
import kNormDetailService from '../services/kNormDetail/kNormDetailService';
import { GetAllKNormDetailOutput } from '../services/kNormDetail/dto/getAllKNormDetailOutput';
import { PagedKNormDetailResultRequestDto } from '../services/kNormDetail/dto/PagedKNormDetailResultRequestDto';
import { PagedResultDto } from '../services/dto/pagedResultDto';

class KNormDetailStore {

    @observable kNormDetails!: PagedResultDto<GetAllKNormDetailOutput>;
    @observable kNormAllDetails!: GetAllKNormDetailOutput[];
    @observable kNormDetail!: GetAllKNormDetailOutput;

    @action
    async create(createKNormDetailInput: CreateKNormDetailInput) {
        await kNormDetailService.create(createKNormDetailInput);
    }

    @action
    async update(createKNormDetailInput: CreateKNormDetailInput) { 
        await kNormDetailService.update(createKNormDetailInput);
    }

    @action
    async getAll(pagedFilterAndSortedRequest: PagedKNormDetailResultRequestDto) {
        let result = await kNormDetailService.getAll(pagedFilterAndSortedRequest);
        this.kNormDetails = result;
    }

    @action
    async getDetails(id: number) {
        let result = await kNormDetailService.getDetails(id); 
        this.kNormAllDetails = result;  
    }

}

export default KNormDetailStore;