import { throwNotificationError, throwNotificationSuccess } from './notifications';


/** 
 * Opens the user interface in a new tab or switches to the tab with the user interface if it is already open.
 */
const openUI = () => {
    return new Promise((onCreated, onError) => {
        browser.tabs.query({}).then(
            (tabs = []) => {
                const url = browser.runtime.getURL("index.html");
                const addonTab = tabs.find(tab => tab.url === url)
                if (addonTab && addonTab.id)
                    browser.tabs.update(addonTab.id, { active: true }).then(onCreated, onError);
                else
                    browser.tabs.create({ url }).then(onCreated, onError);
            }
        );
    });
}



/** 
 * Handles the click event on the toolbar icon.
 */
const handleClick = () => {
    openUI().then(
        (tabID) => {
            throwNotificationSuccess({
                id: 'tab_created',
                title: "Tab created",
                message: "Tab was created sucessfully"
            });
        },
        (error) => {
            throwNotificationError({
                id: 'tab_not_created',
                title: "Tab couldn't be created",
                message: "An error occurred while creating the tab"
            });
        }
    );

}

browser.browserAction.onClicked.addListener(handleClick);


