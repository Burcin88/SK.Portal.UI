
import http from '../httpService';
import { EntityDto } from '../../services/dto/entityDto';
import { UpdateKSubeNormInput } from './dto/updateKSubeNormInput';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { GetAllKSubeNormOutput } from './dto/getAllKSubeNormOutput';
import { CreateOrUpdateKSubeNormInput } from './dto/createOrUpdateKSubeNormInput';
import { PagedKSubeNormResultRequestDto } from './dto/PagedKSubeNormResultRequestDto';

class KSubeNormService {
  public async create(createKSubeNormInput: CreateOrUpdateKSubeNormInput) {
    let result = await http.post('iknorm/KSubeNorm/Create', createKSubeNormInput);
    return result.data.result;
  }

  public async update(updateKSubeNormInput: UpdateKSubeNormInput) {
    let result = await http.put('iknorm/KSubeNorm/Update', updateKSubeNormInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto<string>) {
    let result = await http.delete('iknorm/KSubeNorm/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto<string>): Promise<CreateOrUpdateKSubeNormInput> {
    let result = await http.get('iknorm/KSubeNorm/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAllNorms(pagedFilterAndSortedRequest: PagedKSubeNormResultRequestDto): Promise<PagedResultDto<GetAllKSubeNormOutput>> {
    let result = await http.get('iknorm/KSubeNorm/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }

  public async getNormCount(): Promise<number> {
    let result = await http.get('iknorm/KSubeNorm/GetNormCount');
    return result.data.result;
  }
  public async getNormsCount(): Promise<number> {
    let result = await http.get('iknorm/KSubeNorm/GetNormsCount');
    return result.data.result;
  }
  public async getNormCountById(id: string): Promise<number> {
    let result = await http.get('iknorm/KSubeNorm/GetNormCountById?id=' + id);
    return result.data.result;
  }


     
//gelen giden kargo 
public async GetComeOutCargo(id:string){
  let result= await http.get('/cargoAvg/'+id+'');
  return result.data
}

}

export default new KSubeNormService();
