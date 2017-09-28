console.log('loaded');

function addQueueButton() {
    let saveButtons = document.querySelectorAll('[value="Save Edits"]');
    saveButtons.forEach(button => {
        if (!button.parentNode.querySelector('.queue-edit-button')) {
            let queueButton = document.createElement('input');
            queueButton.type = 'button';
            queueButton.value = 'Queue Edits';
            queueButton.classList.add('queue-edit-button');
            button.parentNode.insertBefore(queueButton, button.nextSibling);
            button.parentNode.insertBefore(document.createTextNode(" "), queueButton);
        }
    });
}

let observer = new MutationObserver((mutations, observer) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(addQueueButton);
    });
});

observer.observe(document, {
    subtree: true,
    childList: true,
    characterData: true
});