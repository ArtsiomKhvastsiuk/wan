import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Weather from './weather/Weather';
import News from './news/News';
import Menu from './menu/Menu';
import Register from './register/Register';
import Authentication from './authentication/Auth';
import App from './app/App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const Routes = () => (
    <MuiThemeProvider>
        <BrowserRouter>
            <section>
                <Menu />
                <div>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route path="/weather" component={Weather}/>
                        <Route path="/news" component={News}/>
                        <Route path="/about" component={News}/>
                        <Route path="/signup" component={Register} />
                        <Route path="/signin" component={Authentication} />
                    </Switch>
                </div>
            </section>
        </BrowserRouter>
    </MuiThemeProvider>
);

export default Routes;
