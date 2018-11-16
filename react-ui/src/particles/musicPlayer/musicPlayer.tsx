import * as React from 'react';
import './musicPlayer.css';

import {cn} from '@bem-react/classname';



export const cnMusic = cn('musicPlayer');



export interface IMusicPlayer {
    artist: string;
    volume: number;
    name: string;
    length: string;
}



class MusicPlayer extends React.Component<IMusicPlayer> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        const props = this.props;
        const artist = props.artist;
        const volume = props.volume;
        const trackName = props.name;
        const trackLen = props.length;

        return (
            <div className={cnMusic()}>
                <img src={require('../../pages/events/item/images/album-cover.png')}/>
                <p className={cnMusic('title')}>{window.screen.availWidth > 768 ? artist + " " + trackName : artist + "..."}</p>
                <input type='range' className='slider slider-cube'/>
                <span>{trackLen}</span>
                <img src={require('../../pages/events/item/images/Prev.svg')}/>
                <img src={require('../../pages/events/item/images/Prev.svg')} className='rot90'/>
                <input type='range' className='slider slider-arrow'/>
                <span>{volume}%</span>
            </div>);
    }
}


export default MusicPlayer


