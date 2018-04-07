import React, {Component} from 'react';
import { Grid, Loader } from 'semantic-ui-react'

import GridRow from '../GridRow/GridRow';
import TitleRow from '../TitleRow/TitleRow';
import './ParamsGrid.scss';

class ParamsGrid extends Component {
    

    render() {
        const {
            isDataLoaded,
            params
        } = this.props;

        if (!isDataLoaded) {
            return <Loader active={!isDataLoaded} inline='centered' />;
        }

        return (
            <div className="params-grid">
                <Grid celled>
                    <TitleRow />
                    {params.map((param, i) => {
                        return (
                            <GridRow key={i} param={param} />
                        )
                    })}
                </Grid>
            </div>
        )
    }
}

export default ParamsGrid;