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
    renderButton(relatedParams) {
        console.log(relatedParams);
        <Button color="teal" animated='fade'>
            <Button.Content visible>
                {'Related Param(s)'}
            </Button.Content>
            <Button.Content hidden>
                View
            </Button.Content>
        </Button>
    }

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
                    {param['Relationship Parameters'] &&
                        this.renderButton(param['Relationship Parameters'])
                    }
                </Grid.Column>
                <Grid.Column className="grid-row__column grid-row__column--v-center" width={4}>
                    {param.Description}
                </Grid.Column>
                <Grid.Column className="grid-row__column grid-row__column--v-center" width={2}>
                    {param.Value}
                </Grid.Column>
                <Grid.Column className="grid-row__column grid-row__column--v-center" width={3}>
                    {param.Example}
                </Grid.Column>
            </Grid.Row>
        )
    } 
}

export default GridRow;