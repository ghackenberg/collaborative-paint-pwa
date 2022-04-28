// CONSTANTS

const browseScreen = new BrowseScreen()
const paintScreen = new PaintScreen()

// FUNCTIONS

function handleLoad() {
    if (!location.hash.startsWith('#browse')) {
        const hash = location.hash
        history.replaceState(null, undefined, '#browse')
        history.pushState(null, undefined, hash)
    }
    route()
}

function handleHashChange() {
    route()
}

function route() {
    if (location.hash.startsWith('#browse')) {
        browseScreen.show()
    } else if (location.hash.startsWith('#paint')) {
        paintScreen.show()
    } else {
        location.hash = 'browse'
    }
}

// CALLS

// Service workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./scripts/services/cache.js', { scope: './' })
}

// Event listeners
window.addEventListener('load', handleLoad)
window.addEventListener('hashchange', handleHashChange)