import { Resource } from "@triframe/core";
import {
  include,
  hasMany,
  Model,
  boolean,
  integer,
  belongsTo,
  sql,
  hidden,
  hiddenUnless
} from "@triframe/scribe";
import {  session, stream } from "@triframe/scribe/dist/decorators";
import { Game } from "./Game";

export class Player extends Resource {
  @include(Model)
  @belongsTo
  user;

  @belongsTo
  game;

  @hasMany
  chatBoxes;

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

  @hiddenUnless(({session, resource}) => session.loggedInUserId === resource.userId)
  async  decline () {
    this.delete()
  };

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
