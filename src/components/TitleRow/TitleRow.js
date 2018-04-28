import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';

import './TitleRow.scss';

class TitleRow extends Component {
    render() {
        return (
            <Grid.Row className="title-row">
                <Grid.Column className={`title-row__column`} width={1}>
                   Type
                </Grid.Column>
                <Grid.Column className="title-row__column" width={2}>
                    Area
                </Grid.Column>
                <Grid.Column className="title-row__column" width={3}>
                    Title
                </Grid.Column>
                <Grid.Column className="title-row__column" width={4}>
                    Description
                </Grid.Column>
                <Grid.Column className="title-row__column" width={2}>
                    Value
                </Grid.Column>
                <Grid.Column className="title-row__column" width={3}>
                    Example
                </Grid.Column>
            </Grid.Row>
        )
    } 
}

export default TitleRow;