import React from 'react'
import {
    Container,
    Heading,
    tether,
    Section,
    Button,
} from "@triframe/designer"

export const GameOver = tether(function* ({ Api, redirect, useParams }){

    const { Game, User } = Api
    const currentUser = yield User.current()
    const { id } = yield useParams()
    const game = yield Game.read(id)

    const players = game.declareWinner()

    const [winner] = players


    return (

        <Container>
            <Heading>
                Congratulations {`${winner}`} you won the game and such.
            </Heading>
            <Section>
                {players.map(player => <Card>
                        <Section>{player.name}</Section>
                        <Section>{player.score}</Section>
                    </Card>)}
            </Section>
            <Button onPress={() => redirect(`//view-user/${currentUser.id}`)}>
                GG's, let's go back home.
            </Button>
        </Container>
    )



})