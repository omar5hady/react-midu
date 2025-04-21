import { Link } from "../Link"

const HomePage = () => {
  return (
    <>
      <h1>Home</h1>
      <p>Pagina ejemplo para crear un React Router desde cero</p>
      <Link to='/about'>Ir a about</Link>
    </>
  );
};

export default HomePage