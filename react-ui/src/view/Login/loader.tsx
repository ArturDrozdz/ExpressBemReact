import * as React from 'react';
import * as Loadable from 'react-loadable';
export const LoginLoad = Loadable.Map({
    loader: {
        chunk: () => import('./page'),
    },
    loading: () => <i>Loading...</i>,
    render: ({ chunk }) => {
        const Login = chunk.Intro;

        return <Login/>;
    }
});