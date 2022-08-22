/* eslint-disable */
import http from '../httpService';
import { CreateComingPaperInput } from './dto/createComingPaperInput';


class DtsService {
  // Gelen Evrak İşlemleri
  public async createComingPaper(createComingPaperInput: CreateComingPaperInput) {
    await http.post('iknorm/ComingPaper/create', createComingPaperInput);
  }

  public async getAllDocumentTypeList() {
    let result = await http.get('iknorm/documentType/GetDocumentTypeList');
    return result.data.result.documentTypeList;
  }

}

export default new DtsService();
