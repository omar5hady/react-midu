import { useId } from 'react';
import './Filters.css'
import { useFilters } from '../hooks/useFilters';

const Filters = () => {
    const {setFilters, filters} = useFilters()
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
                <input type="range" 
                    id={minPriceFilterId} 
                    min="0" max="1000" 
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                ></input>
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterId}>Categoría</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="fragrances">Fragancias</option>
                    <option value="beauty">Belleza</option>
                </select>
            </div>
        </section>
    );
}

export default Filters;
