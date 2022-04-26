// CONSTANTS

const version = '0.0.1'

const files = [
    '../index.html',
    '../manifest.json',
    '../images/icon.png',
    '../styles/main.css',
    '../scripts/functions/data.js',
    '../scripts/functions/draw.js',
    '../scripts/functions/event.js',
    '../scripts/functions/socket.js',
    '../scripts/constants.js',
    '../scripts/variables.js',
    '../scripts/executions.js'
]

// FUNCTIONS

// Clean up

function cleanUp() {
    return caches.keys().then(deleteCaches)
}
function deleteCaches(keys) {
    return Promise.all(keys.map(deleteCache))
}
function deleteCache(key) {
    return caches.delete(key)
}

// Set up

function setUp() {
    return caches.open(version).then(cache => cache.addAll(files))
}

// EXECUTIONS

// Event listeners

self.addEventListener('install', (event) => {
    event.waitUntil(cleanUp().then(setUp))
})