/*eslint-disable*/
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { GetAllKPersonelOutput } from './dto/getAllKPersonelOutput';
import { KPersonelGetDto } from './dto/kPersonelGetDto';
import { PagedKPersonelResultRequestDto } from './dto/PagedKPersonelResultRequestDto';

class KPersonelService {
  public async getAll(
    pagedFilterAndSortedRequest: PagedKPersonelResultRequestDto
  ): Promise<PagedResultDto<GetAllKPersonelOutput>> {
    let result = await http.get('iknorm/KPersonel/GetAll', {
      params: pagedFilterAndSortedRequest,
    });
    return result.data.result;
  }

  public async getAllEmployees(
    pagedFilterAndSortedRequest: PagedKPersonelResultRequestDto
  ): Promise<PagedResultDto<GetAllKPersonelOutput>> {
    let result = await http.get('iknorm/KPersonel/GetAll', {
      params: pagedFilterAndSortedRequest,
    });
    return result.data.result;
  }

  public async getEmployeeCountById(id: string): Promise<number> {
    let result = await http.get('iknorm/KPersonel/GetTotalEmployeeCountById?id=' + id, {
      params: id,
    });
    return result.data.result;
  }

  public async getEmployeeCount(): Promise<number> {
    let result = await http.get('iknorm/KPersonel/GetTotalEmployeeCount');
    return result.data.result;
  }

  public async getEmployeesCount(): Promise<number> {
    let result = await http.get('iknorm/KPersonel/GetEmployeesCount');
    return result.data.result;
  }

  public async getByObjId(id: number): Promise<KPersonelGetDto> {
    let result = await http.get('iknorm/KPersonel/GetByObjId/?id=' + id);
    return result.data.result;
  }

  public async getEtsHavalePersonel() {
    let result = await http.get('iknorm/ets/KPersonel/GetAllPersonnel');
    return result.data.result;
  }
  public async getByTcNo(tcNo: string): Promise<KPersonelGetDto> {
    let result = await http.get('personel/getbytcno/' + tcNo);
    return result.data;
  }



  
}

export default new KPersonelService();
