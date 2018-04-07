import React, {Component} from 'react';
import { Grid, Button } from 'semantic-ui-react';

import './GridRow.scss';

const colorMap = {
    A: 'orange',
    D: 'green',
    E: 'blue',
    K: 'gray'
};

class GridRow extends Component {
    render() {
        const {param} = this.props;
        const clientLabel = param.type.charAt(0).toUpperCase();

        return (
            <Grid.Row className="grid-row">
                <Grid.Column className={`grid-row__column grid-row__column--center grid-row__column--${colorMap[clientLabel]}`} width={1}>
                    <span className="grid-row__type">
                        {clientLabel}
                    </span>
                </Grid.Column>
                <Grid.Column className="grid-row__column grid-row__column--v-center" width={2}>
                    <span className="grid-row__area">
                        {param.Area}
                    </span>
                </Grid.Column>
                <Grid.Column className="grid-row__column grid-row__column--v-center" width={3}>
                    {param.Title}
                </Grid.Column>
                <Grid.Column className="grid-row__column grid-row__column--v-center" width={4}>
                    {param.Description}
                </Grid.Column>
                <Grid.Column className="grid-row__column grid-row__column--v-center" width={3}>
                    {param.Example}
                </Grid.Column>
                <Grid.Column className="grid-row__column grid-row__column--center" width={3}>
                    <Button color="teal" disabled={!param['Relationship Parameters']} animated='fade'>
                        <Button.Content visible>
                            {'Related Param(s)'}
                        </Button.Content>
                        <Button.Content hidden>
                            View
                        </Button.Content>
                    </Button>
                </Grid.Column>
            </Grid.Row>
        )
    } 
}

export default GridRow;