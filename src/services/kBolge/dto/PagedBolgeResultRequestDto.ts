import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedKBolgeResultRequestDto extends PagedFilterAndSortedRequest {
    keyword: string; 
}
