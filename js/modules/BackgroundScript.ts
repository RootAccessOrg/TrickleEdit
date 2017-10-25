import EnqueueHandler from './actions/EnqueueHandler';

let actions = {
    enqueue: new EnqueueHandler()
}

function onMessageListener(message, sender) {
    if (!(message.action in actions)) {
        throw 'Action ' + message.action + ' does not have a handler';
    }

    actions[message.action].handle(message.data);
}

declare var browser;
browser.runtime.onMessage.addListener(onMessageListener);