import { ClientObject, ClientObjectMap, LineObject, LineObjectMap, PointObject } from 'paintwall-common'

export function draw(canvas: HTMLCanvasElement, center: PointObject, zoom: number, lines: LineObjectMap, clients: ClientObjectMap) {
    // Context
    const context = canvas.getContext('2d')

    // Clear
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Draw
    drawGrid(canvas, context, center, zoom)
    drawLines(canvas, context, center, zoom, lines)
    drawClients(canvas, context, center, zoom, clients)
}

function drawGrid(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, center: PointObject, zoom: number) {
    // Delta parameter
    var delta = 1
    while (delta * zoom > 15) {
        delta /= 5
    }
    while (delta * zoom < 15) {
        delta *= 5
    }

    // Other parameters
    const width = canvas.width / zoom
    const height = canvas.height / zoom
    const x0 = center.x - width / 2
    const y0 = center.y - height / 2
    const sx = Math.floor(x0 / delta) * delta
    const sy = Math.floor(y0 / delta) * delta
    const stepsX = width / delta
    const stepsY = height / delta

    // Vertical lines
    for (var stepX = 0; stepX < stepsX + 1; stepX += 1) {
        // Project
        const x = projectX(canvas, center, zoom, sx + stepX * delta)

        // Path
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, canvas.height)

        // Style
        context.globalAlpha = (sx + stepX * delta) % (delta * 5) ? 0.1 : 0.2
        context.strokeStyle = 'gray'
        context.lineWidth = 1

        // Stroke
        context.stroke()
    }

    // Horizontal lines
    for (var stepY = 0; stepY < stepsY + 1; stepY += 1) {
        // Project
        const y = projectY(canvas, center, zoom, sy + stepY * delta)

        // Path
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(canvas.width, y)

        // Style
        context.globalAlpha = (sy + stepY * delta) % (delta * 5) ? 0.1 : 0.2
        context.strokeStyle = 'gray'
        context.lineWidth = 1

        // Stroke
        context.stroke()
    }
}

function drawLines(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, center: PointObject, zoom: number, lines: LineObjectMap) {
    for (const line of Object.values(lines)) {
        drawLine(canvas, context, center, zoom, line)
    }
}

function drawLine(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, center: PointObject, zoom: number, line: LineObject) {
    // Extract
    const points = line.points
    const color = line.color
    const width = line.width
    const alpha = line.alpha

    // Check
    if (points.length == 1) {
        // Path
        context.beginPath()
        const first = points[0]
        context.arc(projectX(canvas, center, zoom, first.x), projectY(canvas, center, zoom, first.y), Math.max(width * zoom, 1) / 2, 0, Math.PI * 2)

        // Style
        context.globalAlpha = alpha
        context.fillStyle = color
        context.fill()
    } else if (points.length > 1) {
        // Path
        context.beginPath()
        const first = points[0]
        context.moveTo(projectX(canvas, center, zoom, first.x), projectY(canvas, center, zoom, first.y))
        for (var innerIndex = 1; innerIndex < points.length; innerIndex++) {
            const next = points[innerIndex]
            context.lineTo(projectX(canvas, center, zoom, next.x), projectY(canvas, center, zoom, next.y))
        }

        // Style
        context.globalAlpha = alpha
        context.strokeStyle = color
        context.lineWidth = Math.max(width * zoom, 1)
        context.lineCap = 'round'

        // Stroke
        context.stroke()
    }
}

function drawClients(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, center: PointObject, zoom: number, clients: ClientObjectMap) {
    for (const client of Object.values(clients)) {
        drawClient(canvas, context, center, zoom, client)
    }
}

function drawClient(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, center: PointObject, zoom: number, client: ClientObject) {
    // Extract
    const name = client.name
    const color = client.color
    const width = client.width
    const alpha = client.alpha
    const position = client.position

    // Check
    if (position) {
        // Circle
        context.beginPath()
        context.arc(projectX(canvas, center, zoom, position.x), projectY(canvas, center, zoom, position.y), 10 * zoom, 0, Math.PI * 2)
        context.globalAlpha = 0.25
        context.fillStyle = color
        context.fill()

        // Text
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.globalAlpha = 0.75
        context.fillStyle = 'black'
        context.fillText(name, projectX(canvas, center, zoom, position.x), projectY(canvas, center, zoom, position.y))
    }
}

function projectX(canvas: HTMLCanvasElement, center: PointObject, zoom: number, x: number) {
    // Prepare
    const cx = canvas.width / 2
    const dx = x - center.x
    // Return
    return cx + dx * zoom
}

function projectY(canvas: HTMLCanvasElement, center: PointObject, zoom: number, y: number) {
    // Prepare
    const cy = canvas.height / 2
    const dy = y - center.y
    // Return
    return cy + dy * zoom
}

export function unprojectX(canvas: HTMLCanvasElement, center: PointObject, zoom: number, x: number) {
    return (x - canvas.width / 2) / zoom + center.x
}

export function unprojectY(canvas: HTMLCanvasElement, center: PointObject, zoom: number, y: number) {
    return (y - canvas.height / 2) / zoom + center.y
}