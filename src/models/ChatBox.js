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

import { Player } from "./Player";

export class ChatBox extends Resource {
    @include(Model)
    @belongsTo
    game;

    @belongsTo
    player;

    @string
    info = '';

    @hidden
    delete;

}