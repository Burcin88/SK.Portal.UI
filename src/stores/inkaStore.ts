/*eslint-disable*/
import { action, observable } from 'mobx';
import { IKGenelPersonelListReponseDto } from '../services/inka/dto/iKGenelPersonelListReponseDto';
import inkaService from '../services/inka/inkaService';

class InkaStore {
  @observable inkaUser!: IKGenelPersonelListReponseDto;
  @observable inkaUserByChief!: IKGenelPersonelListReponseDto;
  @observable inkaUsersByUnit!: IKGenelPersonelListReponseDto[];
  @observable inkaUsersByTitle!: IKGenelPersonelListReponseDto[];
  @observable inkaUserByPersonelNo!: IKGenelPersonelListReponseDto;



  @action
  async getAllInkaEmployeesByUnit(id: string) {
    let result = await inkaService.getAllInkaEmployeesByUnit(id);
    this.inkaUsersByUnit = result;
  }
  @action
  async getAllIKPersonelByTitle(titleObjId: string) {
    let result = await inkaService.getAllIKPersonelByTitle(titleObjId);
    this.inkaUsersByTitle = result;
  }

  @action
  async getInkaEmployeeByTcNo(tcNo: string) {
    let result = await inkaService.getInkaEmployeeByTcNo(tcNo);
    this.inkaUser = result;
  }

  @action
  async getInkaEmployeeByChief(chiefId: string) {
    let result = await inkaService.getInkaEmployeeByChief(chiefId);
    this.inkaUserByChief = result;
  }


  @action
  async getInkaEmployeeByPersonelNo(personelNo: string) {
    let result = await inkaService.getInkaEmployeeByPersonelNo(personelNo);
    this.inkaUserByPersonelNo = result;
  }


}
export default InkaStore;
