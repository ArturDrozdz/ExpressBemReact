import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Switch} from "react-router";
import {BrowserRouter as Router, Route} from 'react-router-dom'


import './index.css';
import Navbar from './particles/navbar/navbar';
import registerServiceWorker from './registerServiceWorker';

import App from './pages/main/App';
// import Footer from './footer/footer'; <Footer/>

import Events from './pages/events/events';
import NotFound from './pages/notFound/notFound'


const routing = (
    <Router>
        <div>
            <Navbar/>
            <Switch>
                <Route exact={true} path="/" component={App}/>
                <Route path="/events" component={Events}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);




ReactDOM.render(routing, document.getElementById('root') as HTMLElement);
registerServiceWorker();
