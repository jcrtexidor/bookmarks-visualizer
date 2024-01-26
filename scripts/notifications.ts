import { Subject, delay } from 'rxjs';

type INotification = browser.notifications.CreateNotificationOptions & { id: string };

const notificationQueue = new Subject<INotification>();

notificationQueue
    .pipe(delay(5000))
    .subscribe({
        next: ({ id, ...options }) => browser.notifications.create(id, options)
    })

const throwNotification = (notification: INotification) => {
    notificationQueue.next(notification);

}

export const throwNotificationError = ({ id = 'error_message', title = 'Error', message = 'An error occurred during the operation' }) => {
    const iconUrl = browser.runtime.getURL("icons/bookmark-red.svg")
    throwNotification({ id, type: 'basic', title, message, iconUrl });
}

export const throwNotificationSuccess = ({ id = 'success_message', title = "Success", message = "The operation was executed successfully" }) => {
    const iconUrl = browser.runtime.getURL("icons/bookmark-green.svg");
    throwNotification({ id, type: 'basic', title, message, iconUrl });
}