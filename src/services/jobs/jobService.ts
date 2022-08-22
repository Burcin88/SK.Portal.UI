/*eslint-disable*/
import http from '../httpService';
import { JobPromoteListDto } from './dto/jobPromoteListDto';
import { JobPromoteRequestDto } from './dto/jobPromoteRequestDto';
import { JobsNameDto } from './dto/jobsNameDto';

class JobService {
  public async getAllPositionForTitle(
    jobPromoteRequestDto: JobPromoteRequestDto
  ): Promise<JobPromoteListDto[]> {
    let result = await http.get('iknorm/SKJobs/GetAllPositionForTitle', {
      params: jobPromoteRequestDto,
    });
    return result.data.result;
  }

  public async getAllPositionForUnit(unitObjId: string): Promise<JobsNameDto[]> {
    let result = await http.get('iknorm/SKJobs/GetAllPositionForUnit?unitObjId=' + unitObjId);
    return result.data.result;
  }
}
export default new JobService();
