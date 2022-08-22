/*eslint-disable*/
import { action, observable } from 'mobx';
import { JobPromoteListDto } from '../services/jobs/dto/jobPromoteListDto';
import { JobPromoteRequestDto } from '../services/jobs/dto/jobPromoteRequestDto';
import { JobsNameDto } from '../services/jobs/dto/jobsNameDto';
import skJobService from '../services/jobs/jobService';

class JobStore {
  @observable jobPositions!: JobPromoteListDto[];
  @observable jobNames!: JobsNameDto[];

  @action
  async getAllPositionForTitlee(jobPromoteRequestDto: JobPromoteRequestDto) {
    let result = await skJobService.getAllPositionForTitle(jobPromoteRequestDto);
    var value = result.sort(function (x, y) {
      return x.durum - y.durum;
    });
    this.jobPositions = value;
  }

  @action
  async getAllPositionForUnit(unitObjId: string) {
    let result = await skJobService.getAllPositionForUnit(unitObjId);
    this.jobNames = result;
  }
}
export default JobStore;
