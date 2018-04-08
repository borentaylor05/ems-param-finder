import React, {Component} from 'react';
import { Checkbox } from 'semantic-ui-react'

import './AreaFilters.scss';

class AreaFilters extends Component {
    render() {
        const {
            areaFilters,
            filterFunc
        } = this.props;

        return (
            <div className="area-filters">
                <h3>Filter by Area</h3>
                <div className="area-filters__filter-container">
                    {areaFilters.map((area, i) => {
                        return (
                            <div key={i} className="area-filters__filter">
                                <Checkbox 
                                    onChange={filterFunc}
                                    label={area}
                                    value={area}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } 
}

export default AreaFilters;