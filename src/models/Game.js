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

  @string
  question = "";

  @boolean
  isActive = false;

  @integer
  buzzedInPlayerId;

  static async createGame(currentUserId, name, rounds) {
    const newGame = await Game.create({
      name: name,
      rounds: rounds,
      isActive: true,
    });
    const judge = await Player.create({
      user_id: currentUserId,
      isJudge: true,
      game_id: newGame.id,
    });

    return {
      newGame,
      judge,
    };
  }

  static async invitePlayers(currentGameId, userId) {
    const player = await Player.create({
      isJudge: false,
      score: 0,
      game_id: currentGameId,
      user_id: userId,
    });

    let currentUser = await User.read(userId);

    currentUser.isAvailable = false;

    return {
      player,
      currentUser,
    };
  }

  static async buzzIn(currentGameId, userId) {
    const buzzedInPlayer = await Player.read(userId);
    const players = await Player.where({ game_id: currentGameId });

    players = players.map((player) => (player.buzzerIsEnabled = false));

    return {
      buzzedInPlayer,
      players,
    };
  }

  static async enableBuzzer(currentUser, currentGameId) {
    const players = await Player.where({ game_id: currentGameId });
    if (currentUser.isJudge === true) {
      players = players.map((player) => (player.buzzerIsEnabled = true));
    }
    return players;
  }

  static async assignPoints(pointWinnerId, points) {
    const pointWinner = await Player.read(pointWinnerId);
    pointWinner.score = pointWinner.score + points;

    return pointWinner;
  }

  static async declareWinner(currentRound, currentGameId) {
    let game = await Game.read(currentGameId);
    if (currentRound > game.rounds) {
      return game.players.sort((a, b) => a.score - b.score);
    }
  }
}
