function onMessageListener(message, sender) {
    console.log(message);
}

browser.runtime.onMessage.addListener(onMessageListener);