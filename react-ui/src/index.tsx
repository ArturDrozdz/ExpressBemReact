import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Switch} from "react-router";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import {NavBar} from "./view/particles/navbar/element";
import {NotFoundLoad} from "./view/notFound/loader";
import {LoginLoad} from "./view/Login/loader";
import {IntroLoad} from "./view/Intro/loader";
import {FrontPageLoad} from "./view/Front/loader";

import './index.css';

const navBarItems = [{name:'Page1', url:'/page1'},{name:'Page2', url:'/page2'},{name:'Page3', url:'/page3'}];


const routing = (
    <Router>
        <div>
        <NavBar typeRight="auth" items={navBarItems}/>
        <main className="MainContainer">
            <Switch>
                <Route exact={true} path="/" component={FrontPageLoad}/>
                <Route path="/page1" component={IntroLoad}/>
                <Route path="/login" component={LoginLoad}/>
                <Route component={NotFoundLoad}/>
            </Switch>
        </main>
        </div>
    </Router>
);




ReactDOM.render(routing, document.getElementById('root') as HTMLElement);
registerServiceWorker();
