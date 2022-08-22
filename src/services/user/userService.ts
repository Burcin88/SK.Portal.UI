/*eslint-disable*/
import { ChangeLanguagaInput } from './dto/changeLanguageInput';
import { CreateOrUpdateUserInput } from './dto/createOrUpdateUserInput';
import { EntityDto } from '../../services/dto/entityDto';
import { GetAllUserOutput } from './dto/getAllUserOutput';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { PagedUserResultRequestDto } from './dto/PagedUserResultRequestDto';
import { UpdateUserInput } from './dto/updateUserInput';
import http from '../httpService';
import { GetUserOutput } from './dto/getUserOutput';

class UserService {
  public async create(createUserInput: CreateOrUpdateUserInput) {
    let result = await http.post('iknorm/User/Create', createUserInput);
    return result.data.result;
  }

  public async update(updateUserInput: UpdateUserInput) {
    let result = await http.put('iknorm/User/Update', updateUserInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('iknorm/User/Delete', { params: entityDto });
    return result.data;
  }

  public async getRoles() {
    let result = await http.get('iknorm/User/GetRoles');
    return result.data.result.items;
  }

  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    let result = await http.post('iknorm/User/ChangeLanguage', changeLanguageInput);
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateUserInput> {
    let result = await http.get('iknorm/User/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(
    pagedFilterAndSortedRequest: PagedUserResultRequestDto
  ): Promise<PagedResultDto<GetAllUserOutput>> {
    let result = await http.get('iknorm/User/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }

  public async getById(id: string):Promise<GetUserOutput> {
    let result = await http.get('iknorm/User/GetById/?id='+ id);
    return result.data.result;
  }
}

export default new UserService();
