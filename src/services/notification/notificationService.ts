import http from '../httpService';
import { RootObject } from './dto/Notifications';
import { PagedResultDto } from '../../services/dto/pagedResultDto'; 


class NotificationService {

    public async getAll(id: string)
        : Promise<PagedResultDto<RootObject>> {
        let result = await http.get('iknorm/NotificationService/GetNotification',
            {
                params: id
            });
        return result.data.result;
    }

}

export default new NotificationService();