import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { GetAllKSubeOutput } from './dto/getAllKSubeOutput';
import { CreateOrUpdateKSubeInput } from './dto/createOrUpdateKSubeInput';
import { PagedKSubeResultRequestDto } from './dto/PagedKSubeResultRequestDto';

class KSubeService {

    public async getAll(pagedFilterAndSortedRequest: PagedKSubeResultRequestDto): Promise<PagedResultDto<GetAllKSubeOutput>> {
        let result = await http.get('iknorm/KSube/GetAll', { params: pagedFilterAndSortedRequest });
        return result.data.result;
    }

    public async get(entityDto: EntityDto<string>): Promise<CreateOrUpdateKSubeInput> { 
        let result = await http.get('iknorm/KSube/Get', { params: entityDto });
        return result.data.result;
    }

    public async getNormCount(id: string): Promise<number> {
        let result = await http.get('iknorm/KSube/GetNormCountById?id=' + id);
        return result.data.result;
    }


}

export default new KSubeService();