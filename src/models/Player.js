import { Resource } from '@triframe/core'
import { include, Model, string, boolean, integer, belongsTo,} from '@triframe/scribe'

export class Player extends Resource {
    @include(Model)

    @belongsTo
    user

    @belongsTo
    game

    @boolean
    buzzerIsEnabled = false

    @boolean
    isJudge = false
   

}