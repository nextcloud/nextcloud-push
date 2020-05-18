import { Message } from './Message'

export interface Listener {
    (message: Message): void
}
