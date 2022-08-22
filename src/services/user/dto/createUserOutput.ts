export interface CreateUserOutputItem {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
  lastLoginTime?: any;
  creationTime: Date;
  roleNames: string[];
  id: number; 
  userObjId: string;
  companyObjId: string;
  companyRelationObjId: string;
  sicilNo: number;
  title: string;
  companyCode: string;
}

export interface CreateUserOutput {
  result: CreateUserOutputItem;
}
