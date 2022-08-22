/*eslint-disable*/
import { PromotionStatu } from './promotionStatu';
import { PromotionType } from './promotionType';

export interface PromotionFilterDto {
  registrationNumber: string;
  firstName: string;
  lastName: string;
  title: string;
  promotionRequestTitle: string;
  description: string;
  requestDate: Date;
  statu: PromotionType;
  hierarchyStatu: PromotionStatu;
  id: number;
}
