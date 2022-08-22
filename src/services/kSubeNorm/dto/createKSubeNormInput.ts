export interface CreateKSubeNormInput {
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
