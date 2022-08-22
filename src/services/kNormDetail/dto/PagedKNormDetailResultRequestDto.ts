import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedKNormDetailResultRequestDto extends PagedFilterAndSortedRequest {
    keyword: string,
    id: number
}
