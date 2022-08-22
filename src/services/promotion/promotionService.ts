/*eslint-disable*/
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateIKPromotionInput } from './dto/createOrUpdateIKPromotionInput';
import { GetAllPromotionOutput } from './dto/getAllPromotionOutput';
import { PagedPromotionResultRequestDto } from './dto/pagedPromotionResultRequestDto';
import { PromotionDto } from './dto/promotionDto';
import { PromotionUseFilterDto } from './dto/promotionUseFilterDto';

class PromotionService {

  public async getAll(
    pagedFilterAndSortedRequest: PagedPromotionResultRequestDto
  ): Promise<PagedResultDto<GetAllPromotionOutput>> {
    let result = await http.get('iknorm/IKPromotion/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }


  public async create(input: CreateOrUpdateIKPromotionInput) {
    let result = await http.post('iknorm/IKPromotion/Create', input);
    return result.data.result;
  }
  public async ToApprove(input: CreateOrUpdateIKPromotionInput) {
    let result = await http.put('iknorm/IKPromotion/ToApprove', input);
    return result.data.result;
  }

  public async getIKPromotionHiearchyStatu(id: string): Promise<PromotionDto> {
    let result = await http.get('iknorm/IKPromotion/GetIKPromotionHiearchyStatu?id=' + id);
    return result.data.result;
  }

  public async isAnyPersonel(registirationNumber: string) {
    let result = await http.get(
      'iknorm/IKPromotion/IsAnyPersonel?registirationNumber=' + registirationNumber
    );
    return result.data.result;
  }

  public async getIKPromotionFilterByDepartment(departmentObjId: string) {
    let result = await http.get(
      'iknorm/IKPromotion/GetKPromotionFilterByDepartment?departmentObjId=' + departmentObjId
    );
    return result.data.result;
  }

  public async getIKPromotionFilterByDepartmentCount(departmentObjId: string) {
    let result = await http.get(
      'iknorm/IKPromotion/GetKPromotionFilterByDepartmentCount?departmentObjId=' + departmentObjId
    );
    return result.data.result;
  }

  public async getIKPromotionFilterByUnit(unitObjId: string) {
    let result = await http.get(
      'iknorm/IKPromotion/GetKPromotionFilterByUnit?unitObjId=' + unitObjId
    );
    return result.data.result;
  }

  public async getIKPromotionFilterByUnitCount(unitObjId: string) {
    let result = await http.get(
      'iknorm/IKPromotion/GetKPromotionFilterByUnitCount?unitObjId=' + unitObjId
    );
    return result.data.result;
  }

  public async getIKPromotionStatus() {
    let result = await http.get('iknorm/IKPromotion/GetIKPromotionStatus');
    return result.data.result;
  }

  public async getIKPromotionTitles() {
    let result = await http.get('iknorm/IKPromotion/GetIKPromotionTitles');
    return result.data.result;
  }

  public async getIKPromotionUnits() {
    let result = await http.get('iknorm/IKPromotion/GetIKPromotionUnits');
    return result.data.result;
  }

  public async getIKPromotionRequestTitles(title: string) {
    let result = await http.get('iknorm/IKPromotion/GetIKPromotionRequestTitles?title=' + title);
    return result.data.result;
  }

  public async getIKPromotionUseFilter(promotionUseFilterDto: PromotionUseFilterDto) {
    let result = await http.get('iknorm/IKPromotion/GetKPromotionFilterData', {
      params: promotionUseFilterDto,
    });
    return result.data.result;
  }

  public async getIKPromotion(id: string) {
    let result = await http.get('iknorm/IKPromotion/Get?Id=' + id);
    return result.data.result;
  }
}
export default new PromotionService();
