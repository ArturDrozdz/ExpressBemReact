import * as React from 'react';

interface IntCriticalEvent {
    data?: any
    description: string | null
}

import {cnEvent} from "./item";

import {Text} from "../../../particles/Text/Text";

class Critical extends React.Component<IntCriticalEvent> {
    constructor(props: IntCriticalEvent) {
        super(props);
    }

    public render() {
        const description = this.props.description;

        return (<div className={cnEvent('critical')}>
                {description ? <Text className={cnEvent('description')}  text={description}/> : ''}
                {this.placeImage()}
            </div>
        )
    }

    private placeImage() {
        return this.props.data && this.props.data.image ? <div className='smallMarginTop'>
            <img className={cnEvent('image')} src={require('./images/' + this.props.data.image)}/>
        </div> : ''
    }
}

export default Critical