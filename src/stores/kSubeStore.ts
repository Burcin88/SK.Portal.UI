/*eslint-disable*/
import { action, observable } from 'mobx';
import { GetKSubeOutput } from '../services/ksube/dto/getKSubeOutput';
import kSubeService from '../services/ksube/kSubeService';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedKSubeResultRequestDto } from '../services/ksube/dto/PagedKSubeResultRequestDto';
import { EntityDto } from '../services/dto/entityDto';
import { CreateOrUpdateKSubeInput } from '../services/ksube/dto/createOrUpdateKSubeInput';

class KSubeStore {
  @observable kSubes!: PagedResultDto<GetKSubeOutput>;
  @observable editKSube!: CreateOrUpdateKSubeInput;
  @observable normCount!: number;

  @action
  async getAll(pagedFilterAndSortedRequest: PagedKSubeResultRequestDto) {
    let result = await kSubeService.getAll(pagedFilterAndSortedRequest);
    this.kSubes = result;
  }

  @action
  async get(entityDto: EntityDto<string>) {
    let result = await kSubeService.get(entityDto);
    this.editKSube = result;
  }

  @action
  async getNormCount(id: string) {
    let result = await kSubeService.getNormCount(id);
    this.normCount = result;
  }
}

export default KSubeStore;
