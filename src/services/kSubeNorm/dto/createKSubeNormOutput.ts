export interface CreateKSubeNormOutputItem {
  pozisyon: string;
  adet: number;
  subeObjId: string;
  isActive: boolean; 
  lastLoginTime: Date;
  creationTime: Date;   
  id: number; 
  creatorUserId: number;
  lastModificationTime?: Date;
  lastModifierUserId: number; 
}

export interface CreateKSubeNormOutput {
  result: CreateKSubeNormOutputItem;
}
