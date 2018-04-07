import React, {Component} from 'react';
import { Checkbox } from 'semantic-ui-react'

import './TypeFilters.scss';

function toTitleCase(str){
    return str.split('-').join(' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

class TypeFilters extends Component {
    render() {
        const {
            typeFilters
        } = this.props;

        return (
            <div className="type-filters">
                <h3>Filter by Type</h3>
                <div className="type-filters__filter-container">
                    {typeFilters.map((type, i) => {
                        return (
                            <div key={i} className="type-filters__filter">
                                <Checkbox value={type} label={<label>{toTitleCase(type)}</label>} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } 
}

export default TypeFilters;