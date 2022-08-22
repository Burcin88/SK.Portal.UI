import http from '../httpService';
import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import { GetAllKNormOutput } from './dto/getAllKNormOutput';
import { CreateKNormInput } from './dto/createKNormInput';
import { PagedKNormResultRequestDto } from './dto/pagedKNormResultRequestDto';
import { GetKNormOutput } from './dto/getKNormOutput';

class KNormService {

    public async create(createKNormInput: CreateKNormInput) {
        let result = await http.post('iknorm/KNorm/Create', createKNormInput);
        return result.data.result;
    }

    public async get(entityDto: EntityDto): Promise<GetKNormOutput> {
        let result = await http.get('iknorm/KNorm/Get', { params: entityDto });
        return result.data.result;
    }

    public async getById(entityDto: EntityDto): Promise<GetKNormOutput> {
        let result = await http.get('iknorm/KNorm/GetById', { params: entityDto });
        return result.data.result;
    }


    public async getAllBolge(pagedFilterAndSortedRequest: PagedKNormResultRequestDto): Promise<PagedResultDto<GetAllKNormOutput>> {
        let result = await http.get('iknorm/KNorm/GetBolgeNorms', { params: pagedFilterAndSortedRequest });
        return result.data.result;
    }


    public async getAllBolgeCount(pagedFilterAndSortedRequest: PagedKNormResultRequestDto): Promise<GetAllKNormOutput[]> {
        let result = await http.get('iknorm/KNorm/GetBolgeNormsCount', { params: pagedFilterAndSortedRequest });
        return result.data.result;
    }


    public async getAllSube(pagedFilterAndSortedRequest: PagedKNormResultRequestDto): Promise<PagedResultDto<GetAllKNormOutput>> {
        let result = await http.get('iknorm/KNorm/GetSubeNorms', { params: pagedFilterAndSortedRequest });
        return result.data.result;
    }

    public async getAllSubeCount(pagedFilterAndSortedRequest: PagedKNormResultRequestDto): Promise<GetAllKNormOutput[]> {
        let result = await http.get('iknorm/KNorm/GetSubeNormsCount', { params: pagedFilterAndSortedRequest });
        return result.data.result;
    }

    public async getAllSubeDetail(pagedFilterAndSortedRequest: PagedKNormResultRequestDto): Promise<PagedResultDto<GetAllKNormOutput>> {
        let result = await http.get('iknorm/KNorm/GetSubeDetailNorms', { params: pagedFilterAndSortedRequest });
        return result.data.result;
    }

    public async getAllSubeDetailCount(pagedFilterAndSortedRequest: PagedKNormResultRequestDto): Promise<GetAllKNormOutput[]> {
        let result = await http.get('iknorm/KNorm/GetSubeDetailNormsCount', { params: pagedFilterAndSortedRequest });
        return result.data.result;
    }

    public async setStatusAsync(createKNormInput: CreateKNormInput) {
        let result = await http.post('iknorm/KNorm/SetStatus', createKNormInput);
        return result.data.result;
    }

}

export default new KNormService();