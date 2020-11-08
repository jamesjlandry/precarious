 import { Resource } from '@triframe/core'
import { include, Model, boolean, integer, belongsTo,} from '@triframe/scribe'
import { Game } from './Game'

export class Player extends Resource {
    @include(Model)

    @belongsTo
    user

    @belongsTo
    game

    @integer
    score = 0

    @boolean
    buzzerIsEnabled = false

    @boolean
    isJudge = false
   
    
    async buzzIn(currentGameId) {
        
        if(this.buzzerIsEnabled === true) {
            const players = await Player.where({game_id: currentGameId})

            players = players.map(player => player.buzzerIsEnabled = false)

            const game = await Game.read(currentGameId)

            game.buzzedInPlayerId = this.id

            return ( players )
        }

    }

}