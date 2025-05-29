import { SortBy, type User } from '../type.d';

interface Props {
    handleChangeSort: (sort: SortBy) => void
    deleteUser: (uuid: string) => void;
    users: User[],
    showColor: boolean
}


const UsersList = ({ users, showColor, deleteUser, handleChangeSort }: Props) => {

    return (
        <table width="100%">
            <thead>
                <tr>
                    <th>Foto</th>
                    <th onClick={() => handleChangeSort(SortBy.NAME)}>Nombre</th>
                    <th onClick={() => handleChangeSort(SortBy.LAST)}>Apellidos</th>
                    <th onClick={() => handleChangeSort(SortBy.COUNTRY)}>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className={showColor ? 'table--colors' : ''}>
                {
                    users.map((user) => {
                        // const backGroundColor = index % 2 === 0 ? '#333' : '#555'
                        // const color = showColor ? backGroundColor : 'transparent'
                        return (
                            <tr key={user.login.uuid}
                            // style={{ backgroundColor: color}}
                            >
                                <td>
                                    <img src={user.picture.thumbnail} />
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button onClick={() => deleteUser(user.login.uuid)}>Eliminar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

export default UsersList;
