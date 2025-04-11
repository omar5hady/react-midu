import { createContext, useState } from "react";

//Crear el contexto
export const FiltersContext = createContext()

// Crear el provider
export const FiltersProvider = ({children}) => {
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 50
    })
    return (
        <FiltersContext.Provider value={{
            filters, setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}