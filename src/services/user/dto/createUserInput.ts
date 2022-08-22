export interface CreateUserInput {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  roleNames: string[];
  password: string; 
  userObjId: string;
  companyObjId: string;
  companyRelationObjId: string;
  sicilNo: number;
  title: string;
  companyCode: string;
}
