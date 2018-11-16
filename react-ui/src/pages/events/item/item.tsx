import {cn} from '@bem-react/classname';
import * as React from 'react';
import Critical from './critical';
import Info from './info';


const cnEvent = cn('Event');


function EventItem(props: any) {
    const data = props.event;
    const isCritical = data.type === 'critical';

    return (<div className={cnEvent({critical: isCritical, size: data.size})}>
        <Info data={data}/>
        {isCritical ? <Critical data={data.data} description={data.description}/> : ''}
        <img src={require('./images/cross.svg')} className="closeIcon"/>
        <img src={require('./images/Next.svg')} className="selectIcon"/>
    </div> )
}

export {cnEvent};

export default EventItem;