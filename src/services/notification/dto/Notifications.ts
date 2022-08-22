
export interface Message {
    sourceName: string;
    name: string;
}

export interface Message2 {
    sourceName: string;
    name: string;
}

export interface Properties {
    Message: Message2;
    detail: string;
    url: string;
    footnote: string;
}

export interface Data {
    message: Message;
    type: string;
    properties: Properties;
}

export interface Notification {
    tenantId?: any;
    notificationName: string;
    data: Data;
    entityType?: any;
    entityTypeName?: any;
    entityId?: any;
    severity: number;
    creationTime: Date;
    id: string;
}

export interface RootObject {
    tenantId?: any;
    userId: number;
    state: number;
    notification: Notification;
    id: string;
}

