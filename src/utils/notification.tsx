import { notification } from 'antd';

export type TNotification = 'success' | 'info' | 'warning' | 'error'

const Notification = (message: string, type?: TNotification, description?: string) => {

    if (!type)
        type = 'info'

    notification[type]({
        message: message,
        description: description
    })
}

export default Notification