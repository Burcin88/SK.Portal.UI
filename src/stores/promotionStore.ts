/*eslint-disable*/
import { action, observable } from 'mobx';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { CreateOrUpdateIKPromotionInput } from '../services/promotion/dto/createOrUpdateIKPromotionInput';
import { GetAllPromotionOutput } from '../services/promotion/dto/getAllPromotionOutput';
import { PagedPromotionResultRequestDto } from '../services/promotion/dto/pagedPromotionResultRequestDto';
import { PromotionDto } from '../services/promotion/dto/promotionDto';
import { PromotionFilterDto } from '../services/promotion/dto/promotionFilterDto';
import { PromotionRequestTitleDto } from '../services/promotion/dto/promotionRequestTitleDto';
import { PromotionStatuDto } from '../services/promotion/dto/promotionStatuDto';
import { PromotionTitleDto } from '../services/promotion/dto/promotionTitleDto';
import { PromotionUnitDto } from '../services/promotion/dto/promotionUnitDto';
import { PromotionUseFilterDto } from '../services/promotion/dto/promotionUseFilterDto';
import promotionService from '../services/promotion/promotionService';

class PromotionStore {
  @observable promotions!: PagedResultDto<GetAllPromotionOutput>;
  @observable isAnyPersonelResult!: boolean;
  @observable filterPromotion!: PromotionFilterDto[];
  @observable filterPromotionCount!: number;
  @observable promotionStatus!: PromotionStatuDto;
  @observable promotionTitles!: PromotionTitleDto;
  @observable promotionUnits!: PromotionUnitDto;
  @observable promotionRequestTitles!: PromotionRequestTitleDto;
  @observable promotion!: PromotionDto;
  @observable getPromotion!: PromotionDto;


  @action
  async getAll(pagedFilterAndSortedRequest: PagedPromotionResultRequestDto) {
    let result = await promotionService.getAll(pagedFilterAndSortedRequest);
    this.promotions = result;
  }
  @action
  async create(createPromotionInput: CreateOrUpdateIKPromotionInput) {
    await promotionService.create(createPromotionInput);
  }
  @action
  async ToApprove(createPromotionInput: CreateOrUpdateIKPromotionInput) {
    await promotionService.ToApprove(createPromotionInput);
  }
  @action
  async isAnyPersonel(registirationNumber: string) {
    let result = await promotionService.isAnyPersonel(registirationNumber);
    this.isAnyPersonelResult = result;
  }

  @action
  public async getIKPromotionFilterByDepartment(departmentObjId: string) {
    let result = await promotionService.getIKPromotionFilterByDepartment(departmentObjId);
    this.filterPromotion = result;
  }

  @action
  public async getIKPromotionFilterByDepartmentCount(departmentObjId: string) {
    let result = await promotionService.getIKPromotionFilterByDepartmentCount(departmentObjId);
    this.filterPromotionCount = result;
  }

  @action
  public async getIKPromotionFilterByUnit(unitObjId: string) {
    let result = await promotionService.getIKPromotionFilterByUnit(unitObjId);
    this.filterPromotion = result;
  }

  public async getIKPromotionFilterByUnitCount(unitObjId: string) {
    let result = await promotionService.getIKPromotionFilterByUnitCount(unitObjId);
    this.filterPromotionCount = result;
  }
  @action
  public async getIKPromotionStatus() {
    let result = await promotionService.getIKPromotionStatus();
    this.promotionStatus = result;
  }

  @action
  public async getIKPromotionTitles() {
    let result = await promotionService.getIKPromotionTitles();
    this.promotionTitles = result;
  }

  @action
  public async getIKPromotionUnits() {
    let result = await promotionService.getIKPromotionUnits();
    this.promotionUnits = result;
  }

  @action
  public async getIKPromotionRequestTitles(title: string) {
    let result = await promotionService.getIKPromotionRequestTitles(title);
    this.promotionRequestTitles = result;
  }

  @action
  public async getIKPromotionUseFilter(promotionUseFilterDto: PromotionUseFilterDto) {
    let result = await promotionService.getIKPromotionUseFilter(promotionUseFilterDto);
    this.filterPromotion = result;
  }

  @action
  public async getIKPromotionHiearchyStatu(id: string) {
    let result = await promotionService.getIKPromotionHiearchyStatu(id);
    this.promotion = result;
  }

  @action
  public async getIKPromotion(id: string) {
    let result = await promotionService.getIKPromotion(id);
    this.getPromotion = result;
  }
}
export default PromotionStore;
