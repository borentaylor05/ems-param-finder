import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import uniqby from 'lodash.uniqby';
import intersectionWith from 'lodash.intersectionwith';
import isEqual from 'lodash.isequal';

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
            areaFilterResults: [],
            searchFilterResults: [],
            typeFilterResults: [],
            searchValue: '',
            error: null,
            isDataLoaded: false,
            typeFilters: [],
            visibleParams: [],
        }

        this.debounceFilterByTitle = debounce(this.debounceFilterByTitle, 400);
    }

    calculateVisibleParams = () => {
        const {
            appliedAreaFilters,
            appliedTypeFilters,
            areaFilterResults,
            searchFilterResults,
            typeFilterResults,
            searchValue
        } = this.state;

        const areaFiltersOnly = appliedAreaFilters.length && !appliedTypeFilters.length && !searchValue;
        const searchFiltersOnly = !appliedAreaFilters.length && searchValue && !appliedTypeFilters.length;
        const typeFiltersOnly = !appliedAreaFilters.length && !searchValue && appliedTypeFilters.length;
        const allFiltersApplied = appliedAreaFilters.length && searchValue && appliedTypeFilters.length;
        
        if (allFiltersApplied) {
            return intersectionWith(areaFilterResults, searchFilterResults, typeFilterResults, isEqual);
        }
        if (areaFiltersOnly) {
            return areaFilterResults;
        }
        if (searchFiltersOnly) {
            return searchFilterResults;
        }
        if (typeFiltersOnly) {
            return typeFilterResults;
        }
        if (appliedAreaFilters.length && appliedTypeFilters.length) {
            return intersectionWith(areaFilterResults, typeFilterResults, isEqual);
        }
        if (appliedTypeFilters.length && searchValue) {
            return intersectionWith(typeFilterResults, searchFilterResults, isEqual);
        }
        if (appliedAreaFilters.length && searchValue) {
            return intersectionWith(areaFilterResults, searchFilterResults, isEqual);
        }
        
    }

    debounceFilterByTitle = (newSearchValue) => {
        const {
            allParams,
            appliedAreaFilters,
            appliedTypeFilters
        } = this.state;

        if (!newSearchValue) {
            const hasOtherFilters = appliedAreaFilters.length || appliedTypeFilters.length;
            return this.setState({
                isSearchFiltering: false,
                searchValue: null,
                searchFilterResults: hasOtherFilters ? [] : allParams
            }, () => {
                this.setState({
                    visibleParams: this.calculateVisibleParams()
                })
            })
        }


        this.setState({
            isSearchFiltering: false,
            searchValue: newSearchValue,
            searchFilterResults: allParams.filter(param => {
                return param.Title.toLowerCase().includes(newSearchValue.toLowerCase());
            })
        }, () => {
            this.setState({
                visibleParams: this.calculateVisibleParams()
            })
        });
    }

    filterByArea = (e, obj) => {
        const {
            checked,
            label
        } = obj;

        const {
            allParams,
            appliedAreaFilters,
            visibleParams
        } = this.state;

        const currentParams = appliedAreaFilters.length ? visibleParams : [];

        if (checked) {
            appliedAreaFilters.push(label);

            return this.setState({
                appliedAreaFilters,
                areaFilterResults: currentParams.concat(allParams.filter(param => param.Area === label))
            }, () => {
                this.setState({
                    visibleParams: this.calculateVisibleParams()
                })
            });
        }

        // remove unchecked filter
        const newAreaFilters = appliedAreaFilters.filter(area => area !== label);

        if (!newAreaFilters.length) {
            return this.setState({
                appliedAreaFilters: newAreaFilters,
                areaFilterResults: allParams
            }, () => {
                this.setState({
                    visibleParams: this.calculateVisibleParams()
                })
            });
        }

        return this.setState({
            appliedAreaFilters: newAreaFilters,
            areaFilterResults: visibleParams.filter(param => param.Area !== label)
        }, () => {
            this.setState({
                visibleParams: this.calculateVisibleParams()
            })
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
