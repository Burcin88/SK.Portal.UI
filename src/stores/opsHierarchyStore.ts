/* eslint-disable */
import { action, observable } from 'mobx';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import {
  GetAllHierarchyOutput,
  UnitOutput,
  ChangeStatus,
  GenerateHierarchyDto,
  ChangeToPassiveStatus,
  ChangeSelectedTrueDto,
} from '../services/opsHierarchy/dto/getAllHierarchyOutput';
import { NodeDto, NodeKeyValueDto } from '../services/opsHierarchy/dto/nodeDto';
import { PagedNodeResultRequestDto } from '../services/opsHierarchy/dto/PagedOpsHierarchyResultRequestDto';
import OpsHierarchyService from '../services/opsHierarchy/opsHierarchyService';


class OpsHierarchyStore {
  @observable status!: boolean;
  @observable nodes!: NodeDto[];
  @observable nodeKeyValues!: NodeKeyValueDto[];
  @observable units!: PagedResultDto<UnitOutput>;
  @observable opsHierarchies!: GetAllHierarchyOutput[];
  @observable btnStatus!:boolean;
  @observable opsrolecode!:number;

  @action
  async getAll(tip: string, id: string) {
    let result = await OpsHierarchyService.getAll(tip, id);
    this.opsHierarchies = result;
  }

  @action
  async getUnit() {
    let result = await OpsHierarchyService.getUnits();
    this.units = result;
    return result;
  }

  @action
  async update(changeStatus: ChangeStatus) {
    let result = await OpsHierarchyService.update(changeStatus);
    this.status = result;
  }

  @action
  async updateToPassive(changeToPassiveStatus: ChangeToPassiveStatus) {
    let result = await OpsHierarchyService.updateToPassive(changeToPassiveStatus);
    this.status = result;
  }

  @action
  async generateHierarchy(generateHierarchyDto: GenerateHierarchyDto) {
    let result = await OpsHierarchyService.generateHierarchy(generateHierarchyDto);
    this.opsHierarchies = result;
  }

  @action
  async updateOrderNodes(ids: any) {  
    let result = await OpsHierarchyService.updateOrderNodes(ids);
    this.status = result;
  }

  @action
  async updateSetFalse(id: string) {
    let result = await OpsHierarchyService.updateSetFalse(id);
    this.status = result;
  }

  @action
  async updateSetTrue(changeSelected: ChangeSelectedTrueDto) {
    let result = await OpsHierarchyService.updateSetTrue(changeSelected);
    this.status = result;
  }

  @action
  async getNodesForKeys(pagedNodeResultRequestDto: PagedNodeResultRequestDto) {
    let result = await OpsHierarchyService.getNodesForKeys(pagedNodeResultRequestDto);
    this.nodes = result;
  }

  @action
  async getNodesForKeyValues(pagedNodeResultRequestDto: PagedNodeResultRequestDto) {
    let result = await OpsHierarchyService.getNodesForKeyValues(pagedNodeResultRequestDto);  
    this.nodeKeyValues = result;
  }

  @action
  async getNodes(id: string) {
    let result = await OpsHierarchyService.getNodes(id);
    this.nodes = result;
  }


  @action
  async GetCompensationStatusCheck() {
    let result = await OpsHierarchyService.GetCompensationStatusCheck();
    this.btnStatus = result;
    return this.btnStatus;
  }


  @action
  async GetOpsNodesCode() {
    let result = await OpsHierarchyService.GetServiceOpsNodesCode();
    this.opsrolecode = result;
    return this.opsrolecode;
  }



}

export default OpsHierarchyStore;
