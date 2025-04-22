import { FilterValue } from "../types";
import Filter from "./Filter";

interface Props {
    activeCount: number
    completedCount: number
    filterSelected: FilterValue
    onClearCompleted: () => void
    handleFilterChange: (filter: FilterValue) => void
}


const Footer: React.FC<Props> = ({ activeCount = 0, completedCount = 0, filterSelected, onClearCompleted, handleFilterChange }) => {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> Tareas pendientes
            </span>

            <Filter
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange}
            ></Filter>
            {
                completedCount > 0 && (
                    <button className="clear-completed" onClick={onClearCompleted}>Borrar completados</button>
                )
            }
        </footer>
    );
}

export default Footer;
