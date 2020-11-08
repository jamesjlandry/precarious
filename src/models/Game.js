import { Resource } from "@triframe/core";
import {
  array,
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
import { User } from "./User";

export class Game extends Resource {
  @include(Model)
  @hasMany
  players = [];

  @string
  name = "";

  @integer
  rounds = 5;

  @integer
  currentRound = 0;

  @integer
  buzzedInPlayerId = null

  @string
  question = "";

  @boolean
  isActive = false;

    static async createGame(currentUserId, name, rounds) {
        const newGame = await Game.create({
            name: name, 
            rounds: rounds, 
            isActive: true,
            currentRound: 0
        })
        const judge = await Player.create({user_id: currentUserId, isJudge: true, game_id: newGame.id})
        
        return ({ 
            newGame,
            judge
        })
    }

    static async invitePlayers(currentGameId, userId) {

        const player = await Player.create({
            isJudge: false,
            score: 0,
            gameId: currentGameId,
            userId: userId
        })

        let selectedPlayer = await User.read(userId)

        selectedPlayer.isAvailable = false

        return(
            Player.read(player.id, `
                *, 
                game {
                    *
                }
            `)
        )

    let currentUser = await User.read(userId);

    }

  static async enableBuzzer(currentUser, currentGameId) {
    const players = await Player.where({ game_id: currentGameId });
    if (currentUser.isJudge === true) {
      players = players.map((player) => (player.buzzerIsEnabled = true));
    }
    return players;
  }

    static async assignPoints(pointWinnerId, points, currentGameId) {
        const pointWinner = await Player.read(pointWinnerId)
        pointWinner.score = pointWinner.score + points
        const currentGame = Game.read(currentGameId)
        currentGame.currentRound ++
        return pointWinner
    }

  static async declareWinner(currentGameId) {
        let game = await Game.read(currentGameId);
        return game.players.sort((a, b) => a.score - b.score);
    }

}