function shouldAddQueueButton(saveButton) {
    if (saveButton.parentElement.querySelector('.queue-edit-button')) {
        // already have one
        return false;
    }

    let node = saveButton.parentElement;
    while (node) {
        if (node.classList.contains('postcell')) {
            // exclude answers and comments, see https://github.com/RootAccessOrg/TrickleEdit/issues/2
            // answers are answercell while comments aren't in a cell
            return true;
        }
        node = node.parentElement;
    }
    
    return false;
}

function addQueueButton() {
    let saveButtons = document.querySelectorAll('[value="Save Edits"]');
    saveButtons.forEach(button => {
        if (shouldAddQueueButton(button)) {
            let queueButton = document.createElement('input');
            queueButton.type = 'button';
            queueButton.value = 'Queue Edits';
            queueButton.classList.add('queue-edit-button');
            button.parentNode.insertBefore(queueButton, button.nextSibling);
            button.parentNode.insertBefore(document.createTextNode(" "), queueButton);

            queueButton.addEventListener('click', function(event) {
                addEditToQueue(new FormData(this.form));
            });
        }
    });
}

function addEditToQueue(formData) {
    let data = {};
    for (let pair of formData) {
        data[pair[0]] = pair[1];
    }
    browser.runtime.sendMessage({
        action: "enqueue",
        data: data
    });
}

let observer = new MutationObserver((mutations, observer) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(addQueueButton);
    });
});

observer.observe(document, {
    subtree: true,
    childList: true
});