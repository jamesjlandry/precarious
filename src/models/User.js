import { Resource } from "@triframe/core";
import { boolean, hasMany, include, Model, string } from "@triframe/scribe";
import { session, stream } from "@triframe/scribe/dist/decorators";
import { hash, compare } from "bcrypt";

export class User extends Resource {
  @include(Model)
  @string
  username = "";

  @string
  passwordDigest = "";

  @boolean
  isAvailable = false;

  @hasMany
  players;

  @hasMany({ through: (user) => user.players.game })
  games;

  @session
  static async register(session, username, password) {
    let existingUsers = await User.where({ username: username });
    if (existingUsers.length > 0) {
      throw Error("Too Late to the party, someone already chose that name.");
    }
    let passwordDigest = await hash(password, 11);
    const newUser = await User.create({ username, passwordDigest });
    session.loggedInUserId = newUser.id;
    return newUser;
  }

  @session
  static async login(session, username, password) {
    let [user] = await User.where({ username: username });
    if (user == undefined) {
      throw Error(
        "Spooky, that username doesn't exist, maybe try again, or Register."
      );
    }
    if (!(await compare(password, user.passwordDigest))) {
      throw Error(
        "Yeah, that was the wrong passwrod. Maybe you spelled it wrong, like I just did?"
      );
    }
    session.loggedInUserId = user.id;
    return user;
  }

  @session
  static logout(session) {
    session.loggedInUserId = null;
  }

  @session
  @stream
  static *current(session) {
    return session.loggedInUserId !== null
      ? yield User.read(session.loggedInUserId)
      : null;
  }
}
