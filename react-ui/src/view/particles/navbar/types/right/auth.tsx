import * as React from 'react';
import {Link} from "react-router-dom";

import {cnNav} from "../../element";
import {INavBarRight} from "./select";

class NavBarRightAuth extends React.Component<INavBarRight> {
    public render() {
        return (
            <nav className={cnNav('Right')}>
                <li><Link to="/login">Войти</Link></li>
                <li><Link to="/register">Регистрация</Link></li>
            </nav>)
    }
}

export {NavBarRightAuth}
