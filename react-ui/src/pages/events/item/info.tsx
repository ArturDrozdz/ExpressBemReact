import * as React from 'react';
import MusicPlayer from "../../../particles/musicPlayer/musicPlayer";
import {cnEvent} from "./item";

import {RegistryConsumer} from "@bem-react/di";
import {cnButtonsBlock, IntButtonsBlock} from "../../../particles/ButtonsBlock/ButtonsBlock";
import {cnEventPage} from "../events";

import {Text} from "../../../particles/Text/Text";


interface IntCriticalEvent {
    data: any
}


class Critical extends React.Component<IntCriticalEvent> {
    constructor(props: any) {
        super(props);
    }


    public render() {
        const event = this.props.data;
        const isCritical = event.type === 'critical';
        return (<div className={(isCritical ? 'paddingBottom ' : '') + cnEvent('info')}>
                <div className={cnEvent('header')}>
                    <img className={cnEvent('icon')} src={require('./images/' + event.icon + '.svg')}/>
                    <Text className={cnEvent('title')} type="title" text={event.title} theme={isCritical ? 'white' : undefined}/>
                </div>
                <div className={event.size === 's' ? '' : cnEvent('statusLine')}>
                    <Text className={cnEvent('status')}  text={event.source} theme={isCritical ? 'white' : undefined}/>
                    <Text className={cnEvent('time')}  text={event.time} theme={isCritical ? 'white' : undefined}/>
                </div>
                {event.description && !isCritical ? <Text className={cnEvent('description')}  text={event.description} /> : ''}
                {event.data && event.data.image && event.type !== 'critical' ?
                    <img className={cnEvent('image')} src={require('./images/' + event.data.image)}/> : ''}



                {this.placeTemp()}
                {this.placeButtons()}
                {this.placeMusic()}
            </div>
        )
    }

    private placeButtons() {
        const data = this.props.data.data;
        return data && data.buttons && data.buttons.length === 2 ?
            <RegistryConsumer>
            {registries => {
                const buttons = registries[cnEventPage()];
                const NewButtonsBlock = buttons.get<IntButtonsBlock>(cnButtonsBlock());
                return <NewButtonsBlock one={data.buttons[0]} two={data.buttons[1]}/>;
            }}
        </RegistryConsumer> : ''
    }

    private placeMusic() {
        const data = this.props.data.data;
        return data && data.artist ? <MusicPlayer artist={data.artist} name={data.track.name} length={data.track.length} volume={data.volume}/> : ''
    }

    private placeTemp(){
        const data = this.props.data.data;
        return data && data.temperature && data.humidity ?
            <p className='marginTop'>
                <span>Температура:<span className='boldText'>{data.temperature} С</span></span>
                <span className='marginLeft'>Влажность:<span className='boldText'>{data.humidity} С</span></span>
            </p> : ''
    }
}

export default Critical