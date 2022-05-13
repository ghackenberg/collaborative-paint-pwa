import { ClientObject, PointObject } from 'paintwall-common'

export class ClientModel implements ClientObject {

    clientId: string
    name: string
    color: string
    width: number
    alpha: number
    position: PointObject

    constructor(clientId: string, name: string, color: string, width: number, alpha: number, position: PointObject) {
        this.clientId = clientId
        this.name = name
        this.color = color
        this.width = width
        this.alpha = alpha
        this.position = position
    }

}