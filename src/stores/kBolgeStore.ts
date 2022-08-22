import { action, observable } from 'mobx';
import kBolgeService from '../services/kBolge/kBolgeService';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedKBolgeResultRequestDto } from '../services/kBolge/dto/PagedBolgeResultRequestDto';
import { GetKBolgeOutput } from '../services/kBolge/dto/getKBolgeOutput'
import { CreateOrUpdateKBolgeInput } from '../services/kBolge/dto/createOrUpdateKBolgeInput'
import { EntityDto } from '../services/dto/entityDto';

class KBolgeStore {
  @observable kBolge!: PagedResultDto<GetKBolgeOutput>;
  @observable editKBolge!: CreateOrUpdateKBolgeInput;
  @observable branchname!: string;

  @action
  async getAll(pagedFilterAndSortedRequest: PagedKBolgeResultRequestDto) {
    let result = await kBolgeService.getAll(pagedFilterAndSortedRequest);
    this.kBolge = result;
  }

  @action
  async get(entityDto: EntityDto<string>) {
    let result = await kBolgeService.get(entityDto);
    this.editKBolge = result;
  }

 
  @action
  async branchName(entityDto: EntityDto<string>) {
    let result = await kBolgeService.get(entityDto);   
    this.branchname = result.adi;
  }
}

export default KBolgeStore;