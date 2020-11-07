import { Model, string, include } from '@triframe/scribe'
import { Resource } from '@triframe/core'

export class Message extends Resource {

    @include(Model)

    @string
    content = ""

}