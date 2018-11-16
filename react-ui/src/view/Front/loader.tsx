import * as React from 'react';
import * as Loadable from 'react-loadable';
export const FrontPageLoad = Loadable.Map({
    loader: {
        chunk: () => import('./page'),
    },
    loading: () => <i>Loading...</i>,
    render: ({ chunk }) => {
        const FrontPage = chunk.FrontPage;

        return <FrontPage/>;
    }
});