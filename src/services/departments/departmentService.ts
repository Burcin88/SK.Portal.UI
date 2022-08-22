/*eslint-disable*/

import http from "../httpService";
import { DepartmentDto } from "./dto/departmentsDto";

class DepartmentService {
    public async getManagerObjId(departmentObjId: string): Promise<DepartmentDto[]> {
        let result = await http.get('iknorm/SKDepartments/GetManagerObjId?departmentObjId=' + departmentObjId);
        return result.data.result;
      }
}

export default new DepartmentService();
