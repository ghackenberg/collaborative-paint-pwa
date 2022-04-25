// EVENT FUNCTIONS

// Event functions (window)

function handleLoad() {
    if (!location.hash) {
        location.hash = '#' + Math.random().toString(16).substring(2)
    } else {
        qrcode = new QRCode(document.getElementById('div'), {
            text: location.href,
            width: 128,
            height: 128
        })
        initialize()
        connect()
    }
    handleResize()
}
function handleResize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw()
}
function handleHashChange() {
    socket && socket.close()
    if (qrcode) {
        qrcode.clear()
        qrcode.makeCode({
            text: location.href,
            width: 128,
            height: 128
        })
    } else {
        qrcode = new QRCode(document.getElementById('div'), {
            text: location.href,
            width: 128,
            height: 128
        })
    }
    initialize()
    connect()
    draw()
}
window.addEventListener('load', handleLoad)
window.addEventListener('resize', handleResize)
window.addEventListener('hashchange', handleHashChange)

// Event functions (canvas)

function handleMouseDown(event) {
    startLine(event.cientX, event.clientY)
}
function handleMouseMove(event) {
    if (event.buttons > 0) {
        continueLine(event.clientX, event.clientY)
    }
    // Forward
    if (socket && socket.readyState == WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'move', data: { x: event.clientX, y: event.clientY }}))
    }
}
function handleMouseOver(event) {
    if (event.buttons > 0) {
        startLine(event.clientX, event.clientY)
    }
    // Forward
    if (socket && socket.readyState == WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'over', data: { x: event.clientX, y: event.clientY }}))
    }
}
function handleMouseOut(event) {
    if (event.buttons > 0) {
        continueLine(event.clientX, event.clientY)
    }
    // Forward
    if (socket && socket.readyState == WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'out', data: { x: event.clientX, y: event.clientY }}))
    }
}
canvas.addEventListener('mousedown', handleMouseDown)
canvas.addEventListener('mousemove', handleMouseMove)
canvas.addEventListener('mouseover', handleMouseOver)
canvas.addEventListener('mouseout', handleMouseOut)

// Event functions (input)

function handleChange(event) {
    color = event.target.value
    // Forward
    if (socket && socket.readyState == WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'color', data: color}))
    }
}
input.addEventListener('change', handleChange)