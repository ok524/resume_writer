import React from 'react';

import Hero from '../../components/Index/Hero/Hero';
import Workflow from '../../components/Index/Workflow/Workflow';
import Benefits from '../../components/Index/Benefits/Benefits';

/*
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

}));
*/

const Landing = ({ match }) => {

//const classes = useStyles();

    return (
        <div>
            <Hero/>
            <Workflow/>
            <Benefits />
        </div>
    )
};

export default Landing;
