import { Button, Heading, Card, Field, CardBody, Input, Badge } from '@chakra-ui/react';
import { useUserActions } from '../hooks/useUserActions'
import type React from "react"
import { useState } from "react"

const CreateNewUser = () => {
    const { addUser } = useUserActions()
    const [result, setResult] = useState<'ok' | 'ko' | null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setResult(null)
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string;
        const github = formData.get('github') as string;

        if (!name || !email || !github) {
            return setResult('ko')
        }

        addUser({ name, email, github });
        setResult('ok')
        form.reset()
    }
    return (
        <Card.Root style={{ marginTop: '16px' }} size="lg" variant="subtle">
            <Card.Header>
                <Heading size="lg">Create New user</Heading>
            </Card.Header>
            <CardBody gap="2">
                <form className="" onSubmit={handleSubmit}>
                    <Field.Root>
                        <Field.Label>
                            Nombre
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input name="name" placeholder="Aqui el nombre" />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>
                            Email
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input name="email" placeholder="Aqui el email" />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>
                            Github
                        </Field.Label>
                        <Input name="github" placeholder="Aqui el usuario de Github" />
                    </Field.Root>

                    <div>
                        <Button colorPalette="blue" variant="surface"
                            type="submit"
                            style={{ marginTop: '16px' }}
                        > Crear usuario </Button>
                        <span>
                            {result === 'ok' && <Badge colorPalette="green">Guardado correctamente</Badge>}
                            {result === 'ko' && <Badge colorPalette="red">Error con los campos</Badge>}
                        </span>
                    </div>
                </form>
            </CardBody>
        </Card.Root>
    );
}

export default CreateNewUser;
