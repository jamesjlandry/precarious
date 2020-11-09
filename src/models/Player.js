import { Resource } from "@triframe/core";
import {
  include,
  Model,
  boolean,
  integer,
  belongsTo,
  sql,
  hidden,
} from "@triframe/scribe";
import { session, stream } from "@triframe/scribe/dist/decorators";
import { Game } from "./Game";
import { User } from "./User";

export class Player extends Resource {
  @include(Model)
  @belongsTo
  user;

  @belongsTo
  game;

  @integer
  score = 0;

  @boolean
  buzzerIsEnabled = false;

  @boolean
  isJudge = false;

  @hidden
  delete;

  async buzzIn(currentGameId) {
    if (this.buzzerIsEnabled === true) {
      let players = await Player.where({ game_id: currentGameId });

      players = players.map((player) => (player.buzzerIsEnabled = false));

      const game = await Game.read(currentGameId);

      game.buzzedInPlayerId = this.id;

      return players;
    }
  }

  @session
  @stream
  static *current(session) {
    if (session !== undefined && session.loggedInUser !== null) {
      let [player] = yield sql`
            SELECT {
                players {
                    *,
                    user {
                        *
                    },
                    game {
                        *
                    }
                }
            }
            WHERE players.userId  = ${session.loggedInUserId}
                AND
            game.isActive = true
        `;
      return player;
    }
    return null;
  }
}
