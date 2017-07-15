import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Weather from './weather/Weather';
import News from './news/News';
import Menu from './menu/Menu';
import CriticalError from './error/CriticalError'
import App from './app/App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider, observer} from 'mobx-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
injectTapEventPlugin();


const muiTheme = getMuiTheme({}, {
    palette: {
        accent1Color: '#ffd200',
    },
});

const Routes = observer((props) => (
    <Provider {...props}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <BrowserRouter>
                <section>
                    <Menu />
                    <div>
                        <Switch>
                            <Route exact path="/" component={App}/>
                            <Route path="/weather" component={Weather}/>
                            <Route path="/news" component={News}/>
                            <Route path="/about" component={News}/>
                            <Route path="/error" component={CriticalError}/>
                        </Switch>
                    </div>
                </section>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
));

export default Routes;
