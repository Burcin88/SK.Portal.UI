/*eslint-disable*/

import { action, observable } from 'mobx';
import { DepartmentDto } from '../services/departments/dto/departmentsDto';
import departmantService from '../services/departments/departmentService';

class DeparmentStore {
  @observable departmantDtoByManager!: DepartmentDto[];

  @action
  async getManagerObjId(departmentObjId: string) {
    let result = await departmantService.getManagerObjId(departmentObjId);
    this.departmantDtoByManager = result;
  }
}
export default DeparmentStore;
