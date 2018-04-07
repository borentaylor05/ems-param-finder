import React, {Component} from 'react';
import { Grid, Loader } from 'semantic-ui-react'

import GridRow from '../GridRow/GridRow';

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
            <Grid celled>
                {params.map((param, i) => {
                    return (
                        <GridRow key={i} param={param} />
                    )
                })}
            </Grid>
        )
    }
}

export default ParamsGrid;