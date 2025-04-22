import { Link } from "../Link"

const i18n = {
  es: {
    title: 'Sobre nosotros',
    button: 'Ir a la home',
    description: 'Hola soy Shady! Estoy creando un router con el tutorial del Midu'
  },
  en: {
    title: 'About us',
    button: 'Go to home',
    description: 'Hi I am Shady!'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}


const AboutPage = ({routeParams}) => {

  const i18n = useI18n(routeParams.lang ?? 'es')
  return (
  <>  
    <h1>{i18n.title}</h1>
    <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmD3dqaoOi06B7DDuL4jYDz73b87cWEuB6ag&s"></img>
      <p>{i18n.description}</p>
    </div>
    <Link to='/'>{i18n.button}</Link>
  </>
  )
}

export default AboutPage;