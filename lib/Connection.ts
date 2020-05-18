import { Listener } from './Listener'

export class Connection {

    es: EventSource

    listener: Listener

    constructor(es: EventSource, listener: Listener) {
        this.es = es
        this.listener = listener

        es.addEventListener('message', listener)
    }

    close(): Promise<void> {
        this.es.removeEventListener('message', this.listener)

        return Promise.resolve()
    }

}
