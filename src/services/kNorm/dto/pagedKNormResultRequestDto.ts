import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedKNormResultRequestDto extends PagedFilterAndSortedRequest {
    end?: Date;
    id: string;
    start?: Date;
    type: string;
    keyword: string;
    bolgeId: string; 
}
