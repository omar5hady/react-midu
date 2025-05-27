import { useAppSelector } from "@/hooks/store";
import { useUserActions } from "@/hooks/useUserActions";
import { Table, Button, HStack, Heading, Card, Badge, Stack } from "@chakra-ui/react"

export const ListOfUsers = () => {
    const users = useAppSelector((state) => state.users);
    const { removeUser } = useUserActions()
    return (
        <Card.Root size="lg" variant="subtle">
            <Card.Header>
                <Heading size="lg">Lista de usuarios <Badge style={{ marginLeft: '5px' }} colorPalette="purple">{users.length}</Badge></Heading>
            </Card.Header>
            <Card.Body gap="2">
                <Table.Root size="sm" striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Id</Table.ColumnHeader>
                            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                            <Table.ColumnHeader>Email</Table.ColumnHeader>
                            <Table.ColumnHeader>Github</Table.ColumnHeader>
                            <Table.ColumnHeader>Acciones</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users.map((user) => (
                            <Table.Row key={user.id}>
                                <Table.Cell>{user.id}</Table.Cell>
                                <Table.Cell>
                                    <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                                        <img style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }}
                                            src={`https://unavatar.io/github/${user.github}`} alt={user.name} />
                                        {user.name}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.github}</Table.Cell>
                                <Table.Cell>
                                    <HStack wrap="wrap" gap="2">
                                        <Button colorPalette="red" variant="surface"
                                            onClick={() => removeUser(user.id)}
                                        >
                                            <svg aria-label="Remove element"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </Button>
                                        <Button colorPalette="blue" variant="surface">
                                            <svg aria-label="Edit element"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>

                                        </Button>
                                    </HStack>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Card.Body>
        </Card.Root>
    )
}

