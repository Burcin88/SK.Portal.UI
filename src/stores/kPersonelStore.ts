/*eslint-disable*/
import { action, observable } from 'mobx';
import { GetKPersonelOutput } from '../services/kPersonel/dto/getKPersonelOutput';
import kPersonelService from '../services/kPersonel/kPersonelService';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedKPersonelResultRequestDto } from '../services/kPersonel/dto/PagedKPersonelResultRequestDto';
import { KPersonelGetDto } from '../services/kPersonel/dto/kPersonelGetDto';
import { GetAllEtsDto } from '../services/kPersonel/dto/getAllEtsDto';

class KPersonelStore {
  @observable kPersonels!: PagedResultDto<GetKPersonelOutput>;
  @observable kAllPersonels!: PagedResultDto<GetKPersonelOutput>;
  @observable kPersonelCount!: number;
  @observable kPersonel!: KPersonelGetDto;
  @observable getAllEtsDto!:GetAllEtsDto[];

  @action
  async getAll(pagedFilterAndSortedRequest: PagedKPersonelResultRequestDto) {
    let result = await kPersonelService.getAll(pagedFilterAndSortedRequest);
    this.kPersonels = result;
  }

  @action
  async getAllEmployees(pagedFilterAndSortedRequest: PagedKPersonelResultRequestDto) {
    let result = await kPersonelService.getAll(pagedFilterAndSortedRequest);
    this.kAllPersonels = result;
  }

  @action
  async getEmployeeCountById(id: string) {
    let result = await kPersonelService.getEmployeeCountById(id);
    this.kPersonelCount = result;
  }

  @action
  async getEmployeeCount() {
    let result = await kPersonelService.getEmployeeCount();
    this.kPersonelCount = result;
  }

  @action
  async getEmployeesCount() {
    let result = await kPersonelService.getEmployeesCount();
    this.kPersonelCount = result;
  }

  @action
  async getByObjId(id: number) {
    let result = await kPersonelService.getByObjId(id);
    this.kPersonel = result;
  }

  @action
  public async getEtsHavalePersonel() {
    let result = await kPersonelService.getEtsHavalePersonel();
    this.getAllEtsDto = result;
  }
  public async getByTcNo(tcNo: string) {
    let result = await kPersonelService.getByTcNo(tcNo);
    this.kPersonel = result;
  }


}

export default KPersonelStore;
