export interface UpdateKSubeNormInput {
  id: string; 
  pozisyon: string;
  adet: number; 
  subeObjId: string;
  isActive: boolean;   
  lastModificationTime?: Date;
  lastModifierUserId: number; 
}
