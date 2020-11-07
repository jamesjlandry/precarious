import { Resource } from '@triframe/core'
import { include, Model, string, hasMany } from '@triframe/scribe'
import { session, stream } from '@triframe/scribe/dist/decorators'
import { hash, compare } from 'bcrypt'

export class User extends Resource {
    @include(Model)

    @string 
    username = ""

    @string
    passwordDigest = ""

    @hasMany
    players

    @hasMany({through: user => user.players.game})
    games

    static async register(username, password) {
        let existingUsers = await User.where({username: username})
        if(existingUsers.length > 0) {
            throw Error("Too Late to the party, someone already chose that name.")
        }
        let passwordDigest = await hash(password, 11)
        return User.create({username, passwordDigest})
    }
    @session
    static async login(session, username, password){
        let [ user ] = await User.where({ username: username })
        if(user == undefined) {
            throw Error("Spooky, that username doesn't exist, maybe try again, or Register.")
        }
        if(!await compare(password, user.passwordDigest)) {
            throw Error('Yeah, that was the wrong passwrod. Maybe you spelled it wrong, like I just did?')
        }
        session.loggedInUserId = user.id
        return true
    }

    @session
    @stream
    static *current(session){
        return (
            session.loggedInUserId !== null
                ? yield User.read(session.loggedInUserId)
                : null
            )
    }

}