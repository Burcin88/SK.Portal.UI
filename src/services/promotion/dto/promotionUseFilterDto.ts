/*eslint-disable*/
import { PromotionType } from './promotionType';

export interface PromotionUseFilterDto {
  statu: PromotionType;
  title: string;
  promotionRequestTitle: string;
  firstRequestDate: Date | undefined;
  secondRequestDate: Date | undefined;
  departmentObjId: string;
  unitObjId: string;
}
