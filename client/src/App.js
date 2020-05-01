import React, { useEffect } from 'react';
import { Router, Switch } from 'react-router';
import { Route, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import quicklink from 'quicklink/dist/quicklink.mjs';
//import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { Landing, Builder } from './routes';
//const { Landing } = routes;

/*
const useStyles = makeStyles(theme => ({

}));
*/
toast.configure();

const App = ({ location, history }) => {

    //const classes = useStyles();

    useEffect(() => {
        quicklink();
    }, [location.pathname]);

    return (
        <div className='app-wrapper'>
            <Router history={history}>
                <Switch>
                    <Route path='/builder' component={Builder} />
                    <Route component={Landing} />
                </Switch>
            </Router>
        </div>
    );
};

export default withRouter(App);
