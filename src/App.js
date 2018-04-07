import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import uniqby from 'lodash.uniqby';

import ParamsGrid from './components/ParamsGrid/ParamsGrid';
import FiltersContainer from './components/FiltersContainer/FiltersContainer';
import {getAll} from './api/ems';

import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allParams: [],
            appliedAreaFilters: [],
            appliedTypeFilters: [],
            areaFilters: [],
            error: null,
            isDataLoaded: false,
            searchValue: '',
            typeFilters: [],
            visibleParams: [],
        }

        this.debounceFilterByTitle = debounce(this.debounceFilterByTitle, 400);
    }

    filterResults = ({searchValue, areaFilters, typeFilters}) => {
        const {allParams} = this.state;

        // no filters
        if (!searchValue && !areaFilters.length && !typeFilters.length) {
            return this.state.allParams;
        }

        // all filters
        if (searchValue && areaFilters.length && typeFilters.length) {
            return this.filterTitle(searchValue, this.filterArea(areaFilters, this.filterType(typeFilters, allParams)));
        }

        // search and area
        if (searchValue && areaFilters.length) {
            console.log('SEARCH AND AREA');
            return this.filterTitle(searchValue, this.filterArea(areaFilters, allParams));
        }

        // search and type
        if (searchValue && typeFilters.length) {
            return this.filterTitle(searchValue, this.filterType(typeFilters, allParams));
        }

        // area and type
        if (areaFilters.length && typeFilters.length) {
            return this.filterArea(areaFilters, this.filterType(typeFilters, allParams));
        }
        
        // search only
        if (searchValue) {
            return this.filterTitle(searchValue, allParams);
        }
        
        // area only
        if (areaFilters.length) {
            return this.filterArea(areaFilters, allParams);
        }

        // type only
        if (typeFilters.length) {
            return this.filterArea(typeFilters, allParams);
        }
    }

    filterTitle = (searchValue, params) => {
        return params.filter(param => param.Title.toLowerCase().includes(searchValue.toLowerCase()));
    }

    filterArea = (areaFilters, params) => {
        console.log('AREA');
        return params.filter(param => areaFilters.includes(param.Area));
    }

    filterType = (typeFilters, params) => {
        return params.filter(param => typeFilters.includes(param.type));
    }

    debounceFilterByTitle = (newSearchValue) => {
        const {
            appliedAreaFilters,
            appliedTypeFilters
        } = this.state;

        const visibleParams = this.filterResults({
            searchValue: newSearchValue,
            areaFilters: appliedAreaFilters,
            typeFilters: appliedTypeFilters
        });

        this.setState({
            isSearchFiltering: false,
            searchValue: newSearchValue,
            visibleParams
        })
    }

    filterByArea = (e, obj) => {
        const {
            checked,
            label
        } = obj;

        const {
            appliedTypeFilters,
            appliedAreaFilters,
            searchValue
        } = this.state;

        // remove unchecked filter or add it to existing
        const newAreaFilters = checked ? 
            appliedAreaFilters.concat([label]) : 
            appliedAreaFilters.filter(area => area !== label);

        const visibleParams = this.filterResults({
            searchValue,
            areaFilters: newAreaFilters,
            typeFilters: appliedTypeFilters
        });
    
        this.setState({
            appliedAreaFilters: newAreaFilters,
            isSearchFiltering: false,
            searchValue,
            visibleParams
        })
    }

    filterByType = (e, obj) => {
        const {
            checked,
            label
        } = obj;

        const {
            appliedTypeFilters,
            appliedAreaFilters,
            searchValue
        } = this.state;

        const newTypeFilters = checked ?
            // add new filter
            appliedTypeFilters.concat([label]) :
            // remove filter
            appliedTypeFilters.filter(area => area !== label);

        const visibleParams = this.filterResults({
            searchValue,
            areaFilters: appliedAreaFilters,
            typeFilters: newTypeFilters
        });

        this.setState({
            appliedTypeFilters: newTypeFilters,
            isSearchFiltering: false,
            searchValue,
            visibleParams
        });
    }

    filterByTitle = (event, obj) => {
        this.setState({isSearchFiltering: true});
        this.debounceFilterByTitle(obj.value);
    }

    componentDidMount() {
        getAll()
            .then(resp => {
                this.setState({
                    allParams: resp,
                    isDataLoaded: true,
                    areaFilters: uniqby(resp, 'Area').map(param => param.Area),
                    typeFilters: uniqby(resp, 'type').map(param => param.type),
                    visibleParams: resp
                });
            })
            .catch(err => {
                this.setState({error: err});
            });
    }

    render() {
        const {
            isDataLoaded,
            isSearchFiltering,
            areaFilters,
            typeFilters,
            visibleParams
        } = this.state;

        return (
            <div className="app">
                <div className="app__filter-container">
                    <h1>EMS Param Finder</h1>
                    <FiltersContainer
                        areaFilters={areaFilters}
                        typeFilters={typeFilters}
                        isSearchFiltering={isSearchFiltering}
                        filterByArea={this.filterByArea}
                        filterByType={this.filterByType}
                        filterByTitle={this.filterByTitle}
                    />
                </div>

                <ParamsGrid isDataLoaded={isDataLoaded} params={visibleParams} />
            </div>
        );
    }
}

export default App;
