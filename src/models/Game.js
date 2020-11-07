import { Resource } from "@triframe/core";
import {
  belongsTo,
  boolean,
  hasMany,
  include,
  integer,
  Model,
  string,
} from "@triframe/scribe";
import { session, stream } from "@triframe/scribe/dist/decorators";

export class Game extends Resource {
  @include(Model)
  @hasMany
  players;

  @string
  name = "";

  @integer
  rounds = 5;

  @string
  question = "";

  @boolean
  isOpen = false;

    @boolean
    isActive = false

    static async createGame(currentUser, name, rounds, isActive) {
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
