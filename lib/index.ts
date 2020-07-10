import axios from '@nextcloud/axios'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { generateOcsUrl } from '@nextcloud/router'
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

async function validateAccess(appId: string, topic: string): Promise<ConnectionDetails> {
    const resp = await axios.put(generateOcsUrl('core/push/access', 2).replace(/\/$/, ''), {
        appId,
        topic
    });
    const {jwt, endpoint} = resp.data.ocs.data

    return new ConnectionDetails(endpoint, jwt)
}

export async function connect(appId: string, topic: string, uid: string, listener: Listener): Promise<Connection> {
    const details = await validateAccess(appId, topic)

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
