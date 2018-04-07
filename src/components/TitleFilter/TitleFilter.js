import React, {Component} from 'react';
import { Input } from 'semantic-ui-react'

import './TitleFilter.scss';

class TitleFilter extends Component {
    render() {
        const {
            isSearchFiltering,
            filterFunc
        } = this.props;

        return (
            <div className="title-filter">
                <h3>Filter By Title</h3>
                <Input
                    className="title-filter__input"
                    onChange={filterFunc} 
                    loading={isSearchFiltering} 
                    size="big"
                    icon='search' 
                    placeholder='Start typing to filter...' 
                />
            </div>
        )
    } 
}

export default TitleFilter;