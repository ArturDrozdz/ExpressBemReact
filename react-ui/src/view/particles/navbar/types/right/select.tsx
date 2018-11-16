import * as React from 'react';

import {NavBarRightAuth} from "./auth";


interface INavBarRight {
    type?: 'auth'
}

const navRightMap = {
    'auth': <NavBarRightAuth/>
};

class NavBarRight extends React.Component<INavBarRight> {
    constructor(props: any) {
        super(props)
    }
    public render() {
        return (this.props.type ? navRightMap[this.props.type] : null)
    }
}

export {NavBarRight, INavBarRight}
