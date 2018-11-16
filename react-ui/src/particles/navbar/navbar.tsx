import { cn } from '@bem-react/classname';
import * as React from 'react';
import { Link} from 'react-router-dom'

import logo from './logo.svg';
import mobile_toggle from './mobile_toggle.png';
import './navbar.css'



const nav = cn('Navbar');

class Contact extends React.Component {
    public render() {
        return (<div  className={nav()}>
                    <Link to="/" className={nav('Brand')}><img src={logo}/></Link>
                    <div className={nav('Container')}>
                        <div className={nav('Toggle')}><img src={mobile_toggle}/></div>
                        <nav className={nav('List')}>
                            <li><Link to="/events" >События</Link></li>
                            <li><Link to="/video_obs" >Видеокамеры</Link></li>
                            <li><Link to="#">Устройства</Link></li>
                        </nav>
                        <nav className={nav('Right')}>
                            <li><Link to="/login" >Войти</Link></li>
                            <li><Link to="/register">Регистрация</Link></li>
                        </nav>
                    </div>
                </div>)
    }
}

export default Contact

