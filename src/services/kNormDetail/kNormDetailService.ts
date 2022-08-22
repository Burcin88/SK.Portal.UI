import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateKNormDetailInput } from './dto/createKNormDetailInput';
import { GetAllKNormDetailOutput } from './dto/getAllKNormDetailOutput';
import { PagedKNormDetailResultRequestDto } from './dto/PagedKNormDetailResultRequestDto';


class KNormDetailService {
    public async create(createKNormDetailInput: CreateKNormDetailInput) {
        let result = await http.post('iknorm/KNormDetail/Create', createKNormDetailInput);
        return result.data.result;
    }

    public async update(createKNormDetailInput: CreateKNormDetailInput) {
        let result = await http.post('iknorm/KNormDetail/SetStatus', createKNormDetailInput);
        return result.data.result;
    }


    public async getAll(pagedFilterAndSortedRequest: PagedKNormDetailResultRequestDto): Promise<PagedResultDto<GetAllKNormDetailOutput>> {
        let result = await http.get('iknorm/KNormDetail/GetAll', { params: pagedFilterAndSortedRequest });
        return result.data.result;
    }

    public async getDetails(id: number): Promise<GetAllKNormDetailOutput[]> {
        let result = await http.get('iknorm/KNormDetail/GetDetails?Id=' + id);  
        return result.data.result;
    }
}

export default new KNormDetailService();