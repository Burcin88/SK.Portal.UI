import UserNotificationState from "./userNotificationState";

interface PagedNotificationResultRequestDto {
    userId: number;
    tenantId?: number;
    skipCount?: number;
    takeCount?: number;
    userNotificationState: UserNotificationState; 
}

export default PagedNotificationResultRequestDto;


