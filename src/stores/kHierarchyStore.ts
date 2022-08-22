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
} from '../services/kHierarchy/dto/getAllHierarchyOutput';
import { NodeDto, NodeKeyValueDto } from '../services/kHierarchy/dto/nodeDto';
import { PagedNodeResultRequestDto } from '../services/kHierarchy/dto/PagedKHierarchyResultRequestDto';
import kHierarchyService from '../services/kHierarchy/kHierarchyService';


class KHierarchyStore {
  @observable status!: boolean;
  @observable nodes!: NodeDto[];
  @observable nodeKeyValues!: NodeKeyValueDto[];
  @observable units!: PagedResultDto<UnitOutput>;
  @observable kHierarchies!: GetAllHierarchyOutput[];

  @action
  async getAll(tip: string, id: string) {
    let result = await kHierarchyService.getAll(tip, id);
    this.kHierarchies = result;
  }

  @action
  async getUnit() {
    let result = await kHierarchyService.getUnits();
    this.units = result;
    return result;
  }

  @action
  async update(changeStatus: ChangeStatus) {
    let result = await kHierarchyService.update(changeStatus);
    this.status = result;
  }

  @action
  async updateToPassive(changeToPassiveStatus: ChangeToPassiveStatus) {
    let result = await kHierarchyService.updateToPassive(changeToPassiveStatus);
    this.status = result;
  }

  @action
  async generateHierarchy(generateHierarchyDto: GenerateHierarchyDto) {
    let result = await kHierarchyService.generateHierarchy(generateHierarchyDto);
    this.kHierarchies = result;
  }

  @action
  async updateOrderNodes(ids: any) {  
    let result = await kHierarchyService.updateOrderNodes(ids);
    this.status = result;
  }

  @action
  async updateSetFalse(id: string) {
    let result = await kHierarchyService.updateSetFalse(id);
    this.status = result;
  }

  @action
  async updateSetTrue(changeSelected: ChangeSelectedTrueDto) {
    let result = await kHierarchyService.updateSetTrue(changeSelected);
    this.status = result;
  }

  @action
  async getNodesForKeys(pagedNodeResultRequestDto: PagedNodeResultRequestDto) {
    let result = await kHierarchyService.getNodesForKeys(pagedNodeResultRequestDto);
    this.nodes = result;
  }

  @action
  async getNodesForKeyValues(pagedNodeResultRequestDto: PagedNodeResultRequestDto) {
    let result = await kHierarchyService.getNodesForKeyValues(pagedNodeResultRequestDto);  
    this.nodeKeyValues = result;
  }

  @action
  async getNodes(id: string) {
    let result = await kHierarchyService.getNodes(id);
    this.nodes = result;
  }
}

export default KHierarchyStore;
