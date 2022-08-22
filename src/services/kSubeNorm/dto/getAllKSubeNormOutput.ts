export interface GetAllKSubeNormOutput {
  pozisyon: string;
  adet: number;
  subeObjId: string;
  isActive: boolean; 
  lastLoginTime: Date;
  creationTime: Date;   
  id: string; 
  creatorUserId: number;
  lastModificationTime?: Date;
  lastModifierUserId: number; 
}
