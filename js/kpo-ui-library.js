/**
 * Displays a notification in the bottom right corner
 * @param {String} type
 * @param {String} text
 * @param {Number} displayTime
 */
function displayNotification({ type, text, displayTime }) {

    const randomHash = generateRandomHash();
    const notificationClass = `kpo-notification-${randomHash}`;
    const html = `
        <div class="kpo-notification kpo-notification-${type} ${notificationClass}">
            <p class="kpo-notification-text">${text}</p>
        </div>
    `;

    $('body').append(html);

    const element = $(`.${notificationClass}`);

    element.fadeIn(250);

    setTimeout(() => {
        element.fadeOut(250, () => {
            element.remove();
        });
    }, displayTime);
}

/**
 * Displays a rotating loading circle and also an overlay that
 * blocks all elements on the side
 * @returns {String}
 */
function displayLoadingCircle() {
    const randomHash = generateRandomHash();
    const overlayClass = `kpo-loading-circle-overlay-${randomHash}`;
    const wrapperClass = `kpo-loading-circle-wrapper-${randomHash}`;
    const circleClass = `kpo-loading-circle-${randomHash}`;

    const html = `
        <div class="kpo-loading-circle-overlay ${overlayClass}">
            <div class="kpo-loading-circle-wrapper ${wrapperClass}">
                <div class="kpo-loading-circle ${circleClass}"></div>
            </div>
        </div>
    `;

    $('body').append(html);

    const element = $(`.${overlayClass}`);

    element.fadeIn(250);

    return randomHash;
}

/**
 * Removes an existing loading circle
 * @param {String} randomHash
 */
function hideLoadingCircle(randomHash) {
    const element = $(`.kpo-loading-circle-overlay-${randomHash}`);

    element.fadeOut(250, () => {
        element.remove();
    });
}

/**
 * Displays a popup window
 * @param {String} height
 * @param {String} width
 * @param {String} title
 * @param {String} content
 */
function displayPopup({ height, width, title = '', content = ''}) {
    const randomHash = generateRandomHash();
    const html = `
        <div class="kpo-popup-overlay kpo-popup-overlay-${randomHash}">
            <div class="kpo-popup kpo-popup-${randomHash}" style="height: ${height || ''}; width: ${width || ''};">
                <div class="kpo-popup-title">
                    ${title || ''}
                    <a href="javascript:void(0)" class="kpo-popup-close">
                        <i class="fa-regular fa-circle-xmark"></i>
                    </a>
                </div>
                <div class="kpo-popup-content">${content || ''}</div>
            </div>
        </div>
    `;

    $('body').append(html);

    const element = $(`.kpo-popup-overlay-${randomHash}`);
    const popup = $(`.kpo-popup-${randomHash}`);

    element.fadeIn(250);

    $(document).on('mouseup', (e) => {
        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
            element.fadeOut(250, () => {
                element.remove()
            });
        }
    });

    $('.kpo-popup-close').on('click', (e) => {
        element.fadeOut(250, () => {
            element.remove();
        });
    })
}

/**
 * Generates and returns a random hash
 * @returns {string}
 */
function generateRandomHash() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);

    let hash = '';
    for (let i = 0; i < array.length; i++) {
        hash += array[i].toString(16).padStart(2, '0');
    }

    return hash;
}