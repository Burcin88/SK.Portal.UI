import { GetDocumentTypeList } from './../services/kDamageCompensations/dto/getDocumentTypeList';
import { action, observable } from 'mobx';
// import { EntityDto } from '../services/dto/entityDto';
// import { PagedResultDto } from '../services/dto/pagedResultDto';
import { CreateComingPaperInput } from '../services/DTS/dto/createComingPaperInput';
import DtsService from '../services/DTS/dtsService';

class DtsStore {
  @observable comingPaper!: CreateComingPaperInput;
  @observable getDocumentTypes!: GetDocumentTypeList[];

  @action
  async create(createDamage: CreateComingPaperInput) {
    await DtsService.createComingPaper(createDamage);
  }

  @action
  async getDocumentTypeList() {
    let result = await DtsService.getAllDocumentTypeList();
    this.getDocumentTypes = result;
  }
}

export default DtsStore;
