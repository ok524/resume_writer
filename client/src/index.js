import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';

import store, { history } from './store';
import ScrollToTop from './components/Utilities/ScrollToTop';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// TODO: remove theme and use component-level css
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0099FF'
        },
        secondary: {
            main: '#009688',
            dark: '#004d40'
        },
        error: {
            light: '#F8BBD0',
            main: '#E91E63',
            dark: '#880E4F'
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    overrides: {
        MuiIconButton: {
            label: {
                color: '#7C7C7C'
            }
        }
    }
});

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
            <Router>
                <ScrollToTop>
                    <App />
                </ScrollToTop>
            </Router>
        </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();