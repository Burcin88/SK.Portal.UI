import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedKPersonelResultRequestDto extends PagedFilterAndSortedRequest {
    keyword: string,
    id: string
}
