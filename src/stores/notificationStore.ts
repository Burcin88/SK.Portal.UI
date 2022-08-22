 
import { action, observable } from 'mobx';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { RootObject } from '../services/notification/dto/Notifications';
import notificationService from '../services/notification/notificationService';


class NotificationStore {
    @observable notifications!: PagedResultDto<RootObject>;

    @action
    async getAll(id: string) {
        let result = await notificationService.getAll(id); 
        this.notifications = result;
    }
}

export default NotificationStore;