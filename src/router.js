import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Chess from "./page/Chess";
// import Login from "./page/login/Login";
import OJBK from "./page/websocket";

export class MainRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path={'/chess'} component={Chess} />
                    {/* <Route exact path={'/login'} component={Login} /> */}
                    <Route exact path={'/ws'} component={OJBK} />
                </Switch>
            </HashRouter>
        );
    }
}