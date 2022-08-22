import http from './httpService';

class AbpUserConfigurationService {
  public async getAll() {
    const result = await http.get('/iknormconfiguration/AbpUserConfiguration/GetAll');
    return result;
  }
}

export default new AbpUserConfigurationService();
