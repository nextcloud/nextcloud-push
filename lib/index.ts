import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { Listener } from './Listener'
import { Connection } from './Connection'

const EventSourceImplementation = NativeEventSource || EventSourcePolyfill

class ConnectionDetails {

    url: string

    jwt: string

    constructor(url: string, jwt: string) {
        this.url = url
        this.jwt = jwt
    }
}

async function validateAccess(appId: string, topic: string, uid: string): Promise<ConnectionDetails> {
    return new ConnectionDetails('mercure.url', '123abcd')
}

export async function connect(appId: string, topic: string, uid: string, listener: Listener): Promise<Connection> {
    const details = await validateAccess(appId, topic, uid)

    return new Connection(
        new EventSourceImplementation(details.url, {
            headers: {
                authorization: details.jwt,
            },
            withCredentials: false
        }),
        listener
    )
}
