import { type User } from '../../../google-translate-clone/src/types/type';

interface Props {
    users: User[]
}


const UsersList = ({users}: Props) => {

    return (
        <table width="100%">
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map( user => {
                        return (
                            <tr key={user.id.value}>
                                <td>
                                    <img src={user.picture.thumbnail}/>
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
                                    <button>Eliminar</button>
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
