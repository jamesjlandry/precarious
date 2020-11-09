import React from 'react'
import {
    Container,
    Heading,
    tether,
    Section,
    Button,
    Card
} from "@triframe/designer"

export const GameOver = tether(function* ({ Api, redirect, useParams }) {

    const { Game, User, Player } = Api
    const currentUser = yield User.current()
    const { id } = yield useParams()
   
    const [game] = yield Game.where({id: id}, ` *, players { score, user { username } }`)
    let filteredPlayers = yield Player.where({gameId: id, isJudge: false})
    const declareWinner = () =>  {
        return filteredPlayers.sort((a, b) => b.score - a.score);
      }
    const players = declareWinner()

    const [winner] = players


    return (

        <Container>
            <Heading>
                Congratulations {`${winner.user.username}`} you won the game and such.
            </Heading>
            <Section>
                {players.map(player => <Card>
                        <Section>{player.user.username}</Section>
                        <Section>{player.score}</Section>
                    </Card>)}
            </Section>
            <Button onPress={() => redirect(`/view-user/${currentUser.id}`)}>
                GG's, let's go back home.
            </Button>
        </Container>
    )



})