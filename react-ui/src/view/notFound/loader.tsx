import * as React from 'react';
import * as Loadable from 'react-loadable';

export const NotFoundLoad = Loadable.Map({
    loader: {
        chunk: () => import('./page'),
    },
    loading: () => <i>Loading...</i>,
    render: ({ chunk }) => {
        const NotFound = chunk.NotFound;

        return <NotFound/>;
    }
});