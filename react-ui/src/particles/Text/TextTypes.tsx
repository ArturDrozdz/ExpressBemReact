import * as React from 'react';

import { ModBody, withBemMod } from '@bem-react/core';
import {IText} from "./Text";

const cnText = 'Text';

export const TextBase: React.SFC<IText> = ({ text, className }) => (
    <p className={className}>{text}</p>
);


const TextLink: ModBody<IText> = (Base, { text, className }) => (
    <a className={className}>{text}</a>
);

const TextTitle: ModBody<IText> = (Base, { text, className }) => (
    <h1 className={className}>{text}</h1>
);


export const TextTypeLink = withBemMod<IText>(cnText, { type: 'link' }, TextLink);
export const TextTypeTitle = withBemMod<IText>(cnText, { type: 'title' }, TextTitle);




export const TextThemeBlack = withBemMod<IText>(cnText, { theme: 'black' });
export const TextThemeWhite = withBemMod<IText>(cnText, { theme: 'white' });