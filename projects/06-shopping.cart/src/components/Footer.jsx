import { FiltersProvider } from '../context/FiltersContext';
// import { useFilters } from '../hooks/useFilters';
import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <h4>Prueba técnica de React</h4>
            <span>@shady</span>
            <h5>Shopping Cart con useContext & useReducer</h5>
        </footer>
    );
}

export default Footer;
