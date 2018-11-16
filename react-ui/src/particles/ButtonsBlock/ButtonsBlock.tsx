import {cn} from '@bem-react/classname';
import * as React from 'react';
import './ButtonsBlock.css'



const cnButtonsBlock = cn('buttonsBlock');

interface IntButtonsBlock{
    one:string
    two:string
}

function  ButtonsBlock(props:IntButtonsBlock) {
    return (<div className={cnButtonsBlock()}>
        <div className={cnButtonsBlock('yes')}>{props.one}</div>
        <div className={cnButtonsBlock('no')}>{props.two}</div>
    </div>)
}



export default ButtonsBlock
export {cnButtonsBlock, IntButtonsBlock}