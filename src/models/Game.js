import { Resource } from '@triframe/core'
import { include, Model, string, boolean, integer, hasMany } from '@triframe/scribe'

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
    isActive = false

    static async createGame(currentUser, name, rounds, isOpen) {
        const newGame = await Game.create({
            name: name, 
            rounds: rounds, 
            isActive: true
        })
        const judge = await Player.create({user_id: currentUser.id, isJudge: true, game_id: newGame.id})
        
        return newGame
    }

    static async invitePlayers(currentGameId, usernameId) {

        return Player.create({
            isJudge: false,
            score: 0,
            game_id: currentGameId,
            user_id: usernameId
        })

    }


}