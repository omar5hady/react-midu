import { Link } from "../Link"


const AboutPage = () => {
  return (
  <>  
    <h1>About</h1>
    <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmD3dqaoOi06B7DDuL4jYDz73b87cWEuB6ag&s"></img>
      <p>Hola soy Shady! Estoy creando un router con el tutorial del Midu</p>
    </div>
    <Link to='/'>Ir a home</Link>
  </>
  )
}

export default AboutPage;