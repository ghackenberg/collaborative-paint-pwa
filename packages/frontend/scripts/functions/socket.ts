import { CLIENT_ID } from '../constants/client'

// CONSTANTS

const socketProtocol = location.protocol == 'http:' ? 'ws:' : 'wss:'
const socketHost = location.host

// FUNCTIONS

export function makeSocketURL(path: string) {
    return socketProtocol + '//' + socketHost + path + CLIENT_ID
}