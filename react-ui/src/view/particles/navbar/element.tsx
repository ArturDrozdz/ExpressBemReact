import * as React from 'react';
import {cn} from "@bem-react/classname";
import {Link} from "react-router-dom";

import {NavBarRight} from "./types/right/select";

import './style.css'


const cnNav = cn('NavBar');

interface INavBar {
    typeRight?: 'auth'
    items: Array<{ url: string, name: string }>
}

class NavBar extends React.Component<INavBar> {
    constructor(props: any) {
        super(props)
    }

    public render() {
        return (
            <header className={cnNav()}>
                <Link to="/" className={cnNav('Brand')}><span className={cnNav('Logo')}/></Link>
                <div className={cnNav('Container')}>
                    <nav className={cnNav('List')}>
                        {this.props.items.map((v, i) => <li key={i.toString()}><Link to={v.url}>{v.name}</Link></li>)}
                    </nav>
                    <NavBarRight type={this.props.typeRight}/>
                </div>
            </header>
        )
    }
}


export {cnNav, NavBar}