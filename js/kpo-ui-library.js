function displayNotification(params) {
    const randomHash = generateRandomHash();
    const html = `
        <div class="kpo-notification kpo-notification-${params['type']} kpo-notification-${randomHash}">
            <p class="kpo-notification-text">${params['text']}</p>
        </div>
    `;

    $('body').append(html);

    const element = $(`.kpo-notification-${randomHash}`);

    element.fadeIn(250);

    setTimeout(() => {
        element.fadeOut(250, () => {
            element.remove();
        });
    }, params['displayTime'])
}

function displayPopup(params) {
    const randomHash = generateRandomHash();
}

function generateRandomHash() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);

    let hash = '';
    for (let i = 0; i < array.length; i++) {
        hash += array[i].toString(16).padStart(2, '0');
    }

    return hash;
}