import React, {Component} from 'react';

import AreaFilters from '../AreaFilters/AreaFilters';
import TitleFilter from '../TitleFilter/TitleFilter';
import TypeFilters from '../TypeFilters/TypeFilters';

import './FiltersContainer.scss';

class FiltersContainer extends Component {
    render() {
        const {
            areaFilters,
            filterByArea,
            filterByType,
            filterByTitle,
            isSearchFiltering,
            isTypeFiltering,
            typeFilters
        } = this.props;

        return (
            <div className="filters-container">
                <TitleFilter
                    isFiltering={isSearchFiltering}
                    filterFunc={filterByTitle} 
                />

                <TypeFilters
                    isFiltering={isTypeFiltering}
                    filterFunc={filterByType} 
                    typeFilters={typeFilters} 
                />
                
                <AreaFilters 
                    filterFunc={filterByArea} 
                    areaFilters={areaFilters} 
                />
            </div>
        )
    } 
}

export default FiltersContainer;