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
import { Player } from "./Player";

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
  isActive = false;

  @integer
  buzzedInPlayerId


    static async createGame(currentUser, name, rounds) {
        const newGame = await Game.create({
            name: name, 
            rounds: rounds, 
            isActive: true
        })
        const judge = await Player.create({user_id: currentUser.id, isJudge: true, game_id: newGame.id})
        
        return newGame
    }

    static async invitePlayers(currentGameId, userId) {

        return Player.create({
            isJudge: false,
            score: 0,
            game_id: currentGameId,
            user_id: userId
        })

    }

    static async buzzIn(currentGameId, userId) {
        let buzzedInPlayer = await Player.read(userId)
        let players = await Player.where({game_id: currentGameId})

        console.log(players)
        console.log(buzzedInPlayer)
    }




}
