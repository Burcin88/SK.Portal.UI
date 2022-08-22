import { GMYType } from './gMYType';

export interface GetAllHierarchyOutput {
  mail: string;
  title: string;
  orderNo: number;
  gMYType: GMYType;
  lastName: string;
  firstName: string;
  normalizedTitle: string;
}
export interface ChangeStatus {
  id: string;
  type: string;
  result: boolean;
}

export interface ChangeToPassiveStatus {
  positionId: string;
}

export interface NodeOutput {
  id: number;
  code?: any;

  title: string;
  active: boolean;
  orderNo: number;
  subTitle: string;
  expanded: boolean;
  creationTime: Date;
  positionId: number;
  creatorUserId: number;
  canTerminate: boolean;
  lastModificationTime: Date;
  lastModifierUserId: number;

  mail: boolean;
  mailStatusChange: boolean;

  pushNotificationWeb: boolean;
  pushNotificationWebStatusChange: boolean;

  pushNotificationPhoneStatusChange: boolean;
  pushNotificationPhone: boolean;
  selected: boolean;
}

export interface PositionOutput {
  id: number;
  name: string;
  code: string;
  unitId: number;
  creationTime: Date;
  nodes: NodeOutput[];
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
}

export interface UnitOutput {
  id: number;
  name: string;
  code: string;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  positions: PositionOutput[];
}

export interface GenerateHierarchyDto {
  subeId: string;
  bolgeId: string;
  tip: string;
  pozisyon: string;
}

 

export interface ChangeSelectedTrueDto {
  ids: string[];
}