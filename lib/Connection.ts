import { Listener } from './Listener'

export class Connection {

    es: EventSource

    listener: Listener

    constructor(es: EventSource, listener: Listener) {
        this.es = es
        this.listener = listener

        es.addEventListener('message', this.onMessage.bind(this))
    }

    onMessage(event: MessageEvent) {
        const parsedData = JSON.parse(event.data)

        this.listener.call(undefined, parsedData)
    }

    close(): Promise<void> {
        this.es.close()

        return Promise.resolve()
    }

}
