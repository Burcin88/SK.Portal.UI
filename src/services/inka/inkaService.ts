/*eslint-disable*/
import { IKGenelPersonelListReponseDto } from './dto/iKGenelPersonelListReponseDto';
import http from '../httpService';

class InkaService {
  public async getAllInkaEmployeesByUnit(unitId: string): Promise<IKGenelPersonelListReponseDto[]> {
    let result = await http.get(
      'inka/getinkaemployeesbychief/' + unitId
    );
   
    return result.data;
  }
  
  public async getAllIKPersonelByTitle(titleObjId: string): Promise<IKGenelPersonelListReponseDto[]> {
    let result = await http.get(
      'inka/getallinkaemployeesbytitle/' + titleObjId
    );
   
    return result.data;
  }

  public async getInkaEmployeeByTcNo(tcNo: string): Promise<IKGenelPersonelListReponseDto> {
    let result = await http.get(
      'inka/getinkaemployeesbytcno/' + tcNo
    );
    return result.data;
  }

  public async getInkaEmployeeByChief(chiefId: string): Promise<IKGenelPersonelListReponseDto> {
    let result = await http.get(
      'inka/getinkaemployeesbychief/' + chiefId
    );
    return result.data;
  }

  public async getInkaEmployeeByPersonelNo(personelNo: string): Promise<IKGenelPersonelListReponseDto> {
    let result = await http.get(
      'inka/getinkaemployeesbypersonelno/' + personelNo
    );
    return result.data;
  }
  


}

export default new InkaService();
