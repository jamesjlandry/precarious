import { Resource } from '@triframe/core'
import { include, Model, string } from '@triframe/scribe'
import { belongsTo, boolean, integer, session, stream } from '@triframe/scribe/dist/decorators'

export class Game extends Resource {
    @include(Model)

    @hasMany
    players

    @string
    name = ''

    @integer
    rounds = 5

    @string
    question = ''

    @boolean
    isOpen = false

    static async createGame(currentUser, name, rounds, isOpen) {
        const newGame = await Game.create(
            name, 
            rounds, 
            isOpen
        )
        const judge = await Player.create({user_id: currentUser.id, isJudge: true, game_id: newGame.id})
        
        return newGame
    }

    static async invitePlayers(username)

}