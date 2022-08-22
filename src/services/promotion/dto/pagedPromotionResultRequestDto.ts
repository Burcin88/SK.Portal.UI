/*eslint-disable*/
import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedPromotionResultRequestDto extends PagedFilterAndSortedRequest {
  keyword: string;
}
