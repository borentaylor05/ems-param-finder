import React, {Component} from 'react';
import { Checkbox, Loader } from 'semantic-ui-react'

import './TypeFilters.scss';

function toTitleCase(str){
    return str.split('-')
        .join(' ')
        .replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
}

class TypeFilters extends Component {
    render() {
        const {
            filterFunc,
            isFiltering,
            typeFilters
        } = this.props;

        return (
            <div className="type-filters">
                <h3 className="type-filters__title">
                    Filter by Type
                    <Loader
                        className="type-filters__loader"
                        active={isFiltering}
                        inline
                        size="tiny"
                    />
                </h3>
                <div className="type-filters__filter-container">
                    {typeFilters.map((type, i) => {
                        return (
                            <div key={i} className="type-filters__filter">
                                <Checkbox
                                    className="type-filters__label"
                                    label={toTitleCase(type)}
                                    onChange={filterFunc}
                                    value={type}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } 
}

export default TypeFilters;