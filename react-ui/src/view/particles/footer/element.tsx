import { cn } from '@bem-react/classname';
import * as React from 'react';


const footer = cn('Footer');
import './style.css'


class Footer extends React.Component {
    public render() {
        return (<footer className={footer()}>
            <div className={footer('Left')}>
                <a href="#">Помощь</a>
                <a href="#">Обратная связь</a>
                <a href="#">Разработчикам</a>
                <a href="#">Условия использования</a>
            </div>
            <div className={footer('Right')}>
                <a href="#">2001-2017 ООО "Яндекс"</a>
            </div>
        </footer>)
    }
}

export default Footer