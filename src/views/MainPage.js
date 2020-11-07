import React from 'react'
import { tether, Section, TextInput, List, Container, Heading, Button } from '@triframe/designer'


export const MainPage = tether(function*({ Api }) {

    const { Message } = Api;

    const messages = yield Message.list()

    const form = yield { content: '' }

    const handleSubmit = async () => {
        await Message.create({ content: form.content })
        form.content = ''
    }

    return (
        <Container>
            <Heading>Message List</Heading>
            <Section>
                {messages.map(message => (
                    <List.Item
                        key={message.id}
                        title={message.content}
                        right={() => 
                            <Button onPress={() => message.delete()}>
                                Delete
                            </Button>
                        }
                    />
                ))}
            </Section>
            <Heading>Create Message</Heading>
            <Section>
                <TextInput
                    label="Name"
                    value={form.content}
                    onChange={ value => form.content = value }
                />
                <Button onPress={handleSubmit}>
                    Create
                </Button>
            </Section>
        </Container>
    )
})  