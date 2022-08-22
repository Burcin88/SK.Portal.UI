import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedKSubeResultRequestDto extends PagedFilterAndSortedRequest {
    id: string; 
    keyword: string;
    isActive: boolean;
    isActivity: boolean;
}
