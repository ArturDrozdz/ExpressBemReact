import * as React from 'react';
import * as Loadable from 'react-loadable';
export const IntroLoad = Loadable.Map({
    loader: {
        chunk: () => import('./page'),
    },
    loading: () => <i>Loading...</i>,
    render: ({ chunk }) => {
        const Intro = chunk.Intro;
        return <Intro/>;
    }
});