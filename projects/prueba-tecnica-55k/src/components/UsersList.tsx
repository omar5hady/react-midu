import { type User } from '../type';

interface Props {
    users: User[],
    showColor: boolean
}


const UsersList = ({users, showColor}: Props) => {

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
                    users.map( (user, index) => {
                        const backGroundColor = index % 2 === 0 ? '#333' : '#555'
                        const color = showColor ? backGroundColor : 'transparent'
                        return (
                            <tr key={user.id.value} style={{ backgroundColor: color}}>
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
