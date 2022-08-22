/*eslint-disable */
import { action, observable } from 'mobx'; 
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetKInkaLookUpTableOutput } from '../services/kInkaLookUpTable/dto/getKInkaLookUpTableOutput';
import { PagedKInkaLookUpTableResultRequestDto } from '../services/kInkaLookUpTable/dto/PagedKInkaLookUpTableResultRequestDto';
import kInkaLookUpTableService from '../services/kInkaLookUpTable/kInkaLookUpTableServise'; 


class KInkaLookUpTableStore {
    @observable positions!: PagedResultDto<GetKInkaLookUpTableOutput>; 
    @action
    async getAll(pagedFilterAndSortedRequest: PagedKInkaLookUpTableResultRequestDto) {
        let result = await kInkaLookUpTableService.getAll(pagedFilterAndSortedRequest);

        console.log('result', result)
        this.positions = result
    } 
}

export default KInkaLookUpTableStore;
