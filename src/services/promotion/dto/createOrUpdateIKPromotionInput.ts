import { PromotionStatu } from "./promotionStatu";
import { PromotionType } from "./promotionType";

/*eslint-disable*/
export interface CreateOrUpdateIKPromotionInput {
  id:string;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  title: string;
  levelOfEducation: string;
  promotionRequestTitle: string;
  militaryStatus: string;
  department: string;
  departmentObjId:string;
  unit: string;
  unitObjId:string;
  description: string;
  requestDate: Date;
  dateOfStart: Date;
  lastPromotionDate: Date;
  statu : PromotionType;
  hierarchyStatu : PromotionStatu;
}
