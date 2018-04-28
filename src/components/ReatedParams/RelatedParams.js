import React, {Component} from 'react';
import {Segment} from 'semantic-ui-react';
import './RelatedParams.scss';

class RelatedParams extends Component {
    render() {
        let {
            text
        } = this.props;

        return (
            <Segment className="related-params" raised>
                {text}
            </Segment>
        )
    }
}

export default RelatedParams;