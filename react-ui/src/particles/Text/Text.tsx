import {compose, IClassNameProps} from '@bem-react/core';

import {
    TextBase,  TextThemeBlack, TextThemeWhite, TextTypeLink,
    TextTypeTitle
} from "./TextTypes";

import './Text.css'

export interface IText extends IClassNameProps {
    text: string;

    type?: 'link' | 'title';
    theme?: 'white' | 'black';
}

export const Text = compose(
    TextTypeLink,
    TextThemeBlack,
    TextThemeWhite,
    TextTypeTitle,

)(TextBase);