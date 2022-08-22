/* eslint-disable */
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import {
  GetAllHierarchyOutput,
  UnitOutput,
  ChangeStatus,
  GenerateHierarchyDto,
  ChangeToPassiveStatus,
  ChangeSelectedTrueDto,
} from './dto/getAllHierarchyOutput';
import { NodeDto, NodeKeyValueDto } from './dto/nodeDto';
import { PagedNodeResultRequestDto } from './dto/PagedOpsHierarchyResultRequestDto';

class OpsHierarchyService {
  public async getAll(tip: string, id: string): Promise<GetAllHierarchyOutput[]> {
    let result = await http.get('iknorm/OpsHierarchy/GetKHierarcies?tip=' + tip + '&id=' + id);
    return result.data.result;
  }

  public async getUnits(): Promise<PagedResultDto<UnitOutput>> {
    let result = await http.get('iknorm/OpsUnit/GetAll');
    return result.data.result;
  }

  public async update(changeStatus: ChangeStatus): Promise<boolean> {
    let result = await http.put('iknorm/OpsNode/UpdateStatus', changeStatus);
    return result.data.result;
  }

  public async updateToPassive(changeToPassiveStatus: ChangeToPassiveStatus): Promise<boolean> {
    let result = await http.put('iknorm/OpsNode/UpdateStatuToPassive', changeToPassiveStatus);
    return result.data.result;
  }

  public async generateHierarchy(
    generateHierarchyDto: GenerateHierarchyDto
  ): Promise<GetAllHierarchyOutput[]> {
    let result = await http.get('iknorm/OpsHierarchy/GetHierarchy', {
      params: generateHierarchyDto,
    });
    return result.data.result;
  }

  public async updateOrderNodes(ids: any): Promise<boolean> {
    let result = await http.put('iknorm/OpsNode/UpdateOrderNodes', ids);
    return result.data.result;
  }

  public async updateSetFalse(id: string): Promise<boolean> {
    let result = await http.put('iknorm/OpsNode/UpdateSetFalse?id=' + id);
    return result.data.result;
  }

  public async updateSetTrue(changeSelected: ChangeSelectedTrueDto): Promise<boolean> {
    let result = await http.put('iknorm/OpsNode/UpdateSetTrue', changeSelected);
    return result.data.result;
  }

  public async getNodesForKeys(pagedNodeResultRequestDto: PagedNodeResultRequestDto): Promise<NodeDto[]> {
    let result = await http.get('iknorm/OpsNode/GetNodesForKeys', {
      params: pagedNodeResultRequestDto,
    });
    return result.data.result;
  }  
  
  public async getNodesForKeyValues(pagedNodeResultRequestDto: PagedNodeResultRequestDto): Promise<NodeKeyValueDto[]> {

    let result = await http.get('iknorm/OpsNode/GetNodesForKeyValues', {
      params: pagedNodeResultRequestDto,
    });
    return result.data.result;
  }
  
  public async getNodes(id: string): Promise<NodeDto[]> {
    let result = await http.get('iknorm/OpsNode/GetNodes?id' + id);
    return result.data.result;
  }

  public async GetCompensationStatusCheck() {
    let result = await http.get('iknorm/OpsNode/GetCompensationStatusCheck');
    return result.data.result;
  }



  public async GetServiceOpsNodesCode() {
    let result = await http.get('iknorm/OpsNode/GetOpsNodesCode');
    return result.data.result;
  }


}

export default new OpsHierarchyService();
