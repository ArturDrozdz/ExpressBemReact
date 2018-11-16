import {cn} from '@bem-react/classname';
import {Registry,  withRegistry} from "@bem-react/di";
import * as React from 'react';
import './events.css'
import EventItem from './item/item';

import {cnButtonsBlock, default as ButtonsBlock } from "../../particles/ButtonsBlock/ButtonsBlock";



const registry = new Registry({id: 'EventPage'});
registry.set(cnButtonsBlock(), ButtonsBlock);


const cnEventPage = cn('EventPage');

class Events extends React.Component {
    public render() {
        const arr: any[] = eventsData;
        return (<div className={cnEventPage()}>
            <div className="headText">
                <p>Лента событий</p>
            </div>
            <div className='ContainerEvents'>
                {arr.map((x, i) => <EventItem event={arr[i]} key={i}/>)}
            </div>
        </div>)
    }
}



export default withRegistry(registry)(Events)
export {cnEventPage};



// DATA
const eventsData = [
    {
        "data": {
            "image": "vacuum_cleaner.jpg",
            "type": "graph",
            "values": [
                {
                    "electricity": [
                        [
                            "1536883200",
                            115
                        ],
                        [
                            "1536969600",
                            117
                        ],
                        [
                            "1537056000",
                            117.2
                        ],
                        [
                            "1537142400",
                            118
                        ],
                        [
                            "1537228800",
                            120
                        ],
                        [
                            "1537315200",
                            123
                        ],
                        [
                            "1537401600",
                            129
                        ]
                    ]
                },
                {
                    "water": [
                        [
                            "1536883200",
                            40
                        ],
                        [
                            "1536969600",
                            40.2
                        ],
                        [
                            "1537056000",
                            40.5
                        ],
                        [
                            "1537142400",
                            41
                        ],
                        [
                            "1537228800",
                            41.4
                        ],
                        [
                            "1537315200",
                            41.9
                        ],
                        [
                            "1537401600",
                            42.6
                        ]
                    ]
                },
                {
                    "gas": [
                        [
                            "1536883200",
                            13
                        ],
                        [
                            "1536969600",
                            13.2
                        ],
                        [
                            "1537056000",
                            13.5
                        ],
                        [
                            "1537142400",
                            13.7
                        ],
                        [
                            "1537228800",
                            14
                        ],
                        [
                            "1537315200",
                            14.2
                        ],
                        [
                            "1537401600",
                            14.5
                        ]
                    ]
                }
            ]
        },
        "description": "Так держать! За последнюю неделю вы потратили на 10% меньше ресурсов, чем неделей ранее.",
        "icon": "stats",
        "size": "l",
        "source": "Сенсоры потребления",
        "time": "19:00, Сегодня",
        "title": "Еженедельный отчет по расходам ресурсов",
        "type": "info"
    },
    {
        "description": null,
        "icon": "key",
        "size": "s",
        "source": "Сенсор входной двери",
        "time": "18:50, Сегодня",
        "title": "Дверь открыта",
        "type": "info"
    },
    {
        "description": null,
        "icon": "robot-cleaner",
        "size": "s",
        "source": "Пылесос",
        "time": "18:45, Сегодня",
        "title": "Уборка закончена",
        "type": "info",
    },
    {
        "description": null,
        "icon": "router",
        "size": "s",
        "source": "Роутер",
        "time": "18:45, Сегодня",
        "title": "Новый пользователь",
        "type": "info"
    },
    {
        "data": {
            "humidity": 80,
            "temperature": 24,
            "type":"temp"
        },
        "description": "Установлен климатический режим «Фиджи»",
        "icon": "thermal",
        "size": "m",
        "source": "Сенсор микроклимата",
        "time": "18:30, Сегодня",
        "title": "Изменен климатический режим",
        "type": "info",
    },
    {
        "description": "В комнате открыто окно, закройте его и повторите попытку",
        "icon": "ac-white",
        "size": "m",
        "source": "Кондиционер",
        "time": "18:21, Сегодня",
        "title": "Невозможно включить кондиционер",
        "type": "critical"
    },
    {
        "data": {
            "albumcover": "https://avatars.yandex.net/get-music-content/193823/1820a43e.a.5517056-1/m1000x1000",
            "artist": "Florence & The Machine",
            "track": {
                "length": "4:31",
                "name": "Big God"
            },
            "type":"music",
            "volume": 80
        },
        "description": "Сейчас проигрывается:",
        "icon": "music",
        "size": "m",
        "source": "Яндекс.Станция",
        "time": "18:16, Сегодня",
        "title": "Музыка включена",
        "type": "info"
    },
    {
        "data": {
            "buttons": [
                "Да",
                "Нет"
            ],
            "type":"buttons"
        },
        "description": "Кажется, в холодильнике заканчивается молоко. Вы хотите добавить его в список покупок?",
        "icon": "fridge",
        "size": "m",
        "source": "Холодильник",
        "time": "17:23, Сегодня",
        "title": "Заканчивается молоко",
        "type": "info"
    },
    {
        "description": "Ура! Устройство «Оконный сенсор» снова в строю!",
        "icon": "battery",
        "size": "s",
        "source": "Оконный сенсор",
        "time": "16:22, Сегодня",
        "title": "Зарядка завершена",
        "type": "info"
    },
    {
        "data": {
            "image": "vacuum_cleaner.jpg"
        },
        "description": "Робопылесос не смог сменить свое местоположение в течение последних 3 минут. Похоже, ему нужна помощь.",
        "icon": "cam-white",
        "size": "l",
        "source": "Сенсор движения",
        "time": "16:17, Сегодня",
        "title": "Пылесос застрял",
        "type": "critical"
    },
    {
        "description": null,
        "icon": "kettle",
        "size": "s",
        "source": "Чайник",
        "time": "16:20, Сегодня",
        "title": "Вода вскипела",
        "type": "info"
    }
];