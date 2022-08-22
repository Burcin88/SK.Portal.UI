import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedKSubeNormResultRequestDto extends PagedFilterAndSortedRequest {
    keyword: string,
    id: string
}
