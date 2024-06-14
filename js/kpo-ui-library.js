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
    const htmlOverlay = `
        <div class="kpo-popup-overlay kpo-popup-overlay-${randomHash}"></div>
    `;
    const htmlPopup = `
        <div class="kpo-popup kpo-popup-${randomHash}" style="height: ${params['height'] || ''}; width: ${params['width'] || ''};">
            <div class="kpo-popup-title">${params['title'] || ''}</div>
            <div class="kpo-popup-content">${params['content'] || ''}</div>
        </div>
    `;

    $('body').append(htmlOverlay);
    $('body').append(htmlPopup);

    const overlayElement = $(`.kpo-popup-overlay-${randomHash}`);
    const popupElement = $(`.kpo-popup-${randomHash}`);

    overlayElement.fadeIn(250);
    popupElement.fadeIn(250)

    $(document).on('mouseup', (e) => {
        if (!popupElement.is(e.target) && popupElement.has(e.target).length === 0) {
            popupElement.fadeOut(250)
            overlayElement.fadeOut(250);
        }
    })
}

function displayLoadingCircle() {
    const randomHash = generateRandomHash();
    const htmlOverlay = `
        <div class="kpo-loading-circle-overlay kpo-loading-circle-overlay-${randomHash}"></div>
    `;
    const htmlCircle = `
        <div class="kpo-loading-circle-wrapper kpo-loading-circle-wrapper-${randomHash}">
            <div class="kpo-loading-circle kpo-loading-circle-${randomHash}"></div>
        </div>
    `;

    $('body').append(htmlOverlay);
    $('body').append(htmlCircle);

    const overlayElement = $(`.kpo-loading-circle-overlay-${randomHash}`);
    const circleElement = $(`.kpo-loading-circle-${randomHash}`);

    overlayElement.fadeIn(250);
    circleElement.fadeIn(250);
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