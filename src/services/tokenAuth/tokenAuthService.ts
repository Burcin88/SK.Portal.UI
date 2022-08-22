import http from '../httpService';
import { AuthenticationModel } from './dto/authenticationModel';
import { AuthenticationResultModel } from './dto/authenticationResultModel';

class TokenAuthService {
  public async authenticate(authenticationInput: AuthenticationModel): Promise<AuthenticationResultModel> {
    let result = await http.post('/iknormtokenauth/TokenAuth/Authenticate', authenticationInput); 
    return result.data.result;
  }
}

export default new TokenAuthService();
