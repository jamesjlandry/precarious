import { Resource } from "@triframe/core";
import {
  boolean,
  belongsTo,
  hidden,
  hiddenUnless,
  include,
  integer,
  Model,
  string,
  session,
} from "@triframe/scribe";
import { Game } from "./Game";

import { Player } from "./Player";

export class Chat extends Resource {
    @include(Model)
    @belongsTo
    game;

    @belongsTo
    player;

    @string
    chatMessage = '';

    @hidden
    delete;

    static async newChatMessage(currentGameId, currentPlayerId, chatText) {
      const game = await Game.read(currentGameId);

      const player = await Player.read(currentPlayerId);

      const chatMessage = await Chat.create({
        playerId: currentPlayerId,
        gameId: currentGameId,
        chatMessage: chatText
      })
      
      return Chat.read(
        chatMessage.id,
        `
        *,
        players {
          *
        }
        `
      )

    }

}

