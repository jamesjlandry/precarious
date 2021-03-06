import { Resource } from "@triframe/core";
import {
  boolean,
  hasMany,
  belongsTo,
  hidden,
  hiddenUnless,
  include,
  integer,
  Model,
  string,
  session,
} from "@triframe/scribe";
import fetch from "node-fetch";
import { Player } from "./Player";
import { User } from "./User";

const hereComesTheJudge = ({ session, resource }) => {
  let [judge] = resource.players.where({ isJudge: true });
  return session.loggedInUserId === judge.id;
};

const triviaApiEndpoint = (amount, difficulty, category) => {
  return `https://opentdb.com/api.php?amount=${amount ?? 3}&difficulty=${
    difficulty ?? ""
  }&category=${category ?? ""}`;
};
const triviaCategoriesApiEndpoint = "https://opentdb.com/api_category.php";

export class Game extends Resource {
  @include(Model)
  @hasMany
  players = [];

  @hasMany
  chatBoxes;

  @string
  name = "";

  @integer
  rounds = 5;

  @integer
  currentRound = 0;

  @integer
  buzzedInPlayerId = null;

  @string
  question = "";

  @boolean
  isActive = false;

  @hasMany({ through: (game) => game.players.user })
  users;

  @hidden
  delete;

  async getQuestions(numberOfQuestions, difficulty, category) {
    let response = await fetch(
      triviaApiEndpoint(numberOfQuestions, difficulty, category)
    );
    let questions = await response.json();
    if (questions.results !== null && questions.results.length > 0) {
      return questions.results;
    }
    return null;
  }

  static async getQuestionCategories() {
    let response = await fetch(triviaCategoriesApiEndpoint);
    let categories = await response.json();
    if (
      categories.trivia_categories !== null &&
      categories.trivia_questions.length > 0
    ) {
      return categories.trivia_questions;
    }
    return null;
  }

  async getJudge() {
    const players = await Player.where({ gameId: this.id });
    const [judgePlayer] = players.filter((p) => p.isJudge);
    return await User.read(judgePlayer.userId);
  }

  @session
  static async createGame({ loggedInUserId }, name, rounds) {
    const newGame = await Game.create({
      name: name,
      rounds: rounds,
      isActive: true,
      currentRound: 0,
    });
    await Player.create({
      userId: loggedInUserId,
      isJudge: true,
      gameId: newGame.id,
    });

    return Game.read(
      newGame.id,
      `
            *,
            players {
                *
            }
            `
    );
  }

  static async invitePlayers(currentGameId, userId) {
    const player = await Player.create({
      isJudge: false,
      score: 0,
      gameId: currentGameId,
      userId: userId,
    });

    let selectedPlayer = await User.read(userId);

    selectedPlayer.isAvailable = false;

    return Player.read(
      player.id,
      `
                *, 
                game {
                    *
                }
            `
    );
  }
  // enableBuzzer method available to player with isJudge set to true.
  // enableBuzzer can be used after a wrong answer, or after points are scored.
  static async enableBuzzer(currentGameId) {
    let players = await Player.where({ gameId: currentGameId });

    players = players.map((player) => (player.buzzerIsEnabled = true));

    return players;
  }

  static async disableBuzzer(currentGameId) {
    let players = await Player.where({ gameId: currentGameId });
    players = players.map((player) => (player.buzzerIsEnabled = false));
    return players;
  }

  // assignPoints method available to player with isJudge set to true.
  static async assignPoints(pointWinnerId, points, currentGameId) {
    const pointWinner = await Player.read(pointWinnerId);
    pointWinner.score = pointWinner.score + parseInt(points);
    const currentGame = await Game.read(currentGameId);
    currentGame.currentRound = currentGame.currentRound + 1;
    currentGame.buzzedInPlayerId = null;
    return pointWinner;
  }

  // frontend method should check for if currentGame.currentRound > currentGame.rounds and
  // run declareWinner on that condition.
}
