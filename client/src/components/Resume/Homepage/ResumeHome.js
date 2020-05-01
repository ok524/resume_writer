import { withRouter } from 'react-router-dom';

import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import ReceiptIcon from '@material-ui/icons/Receipt';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { newResume } from '../../../action/builder';

const useStyles = makeStyles(theme => ({
    section: {
        flex: '1 1 auto'
    },
    content: {
        width: '100%',
        marginTop: '80px',
        padding: theme.spacing(1),
        boxSizing: 'border-box',
        marginBottom: theme.spacing(3)
    },
    pageTitle: {
        fontWeight: 'bold'
    },
    divider: {
        margin: theme.spacing(3, 0)
    },
    gridContainer: {
        marginTop: theme.spacing(4),
        boxSizing: 'border-box',
        width: '100%',
        margin: '0 auto'
    },
    newbieGridDesktop: {
        border: '2px solid #0099FF',
        borderRadius: '5px',
        margin: theme.spacing(0, 1, 1, 0),
        color: '#0099FF',
        cursor: 'pointer'
    },
    newbieGridMobile: {
        border: '2px solid #0099FF',
        borderRadius: '5px',
        margin: theme.spacing(1, 0),
        color: '#0099FF',
        cursor: 'pointer'
    },
    professionalGridDesktop: {
        border: '2px solid #009688',
        borderRadius: '5px',
        margin: theme.spacing(0, 0, 1, 1),
        color: '#009688',
        cursor: 'pointer'
    },
    professionalGridMobile: {
        border: '2px solid #009688',
        borderRadius: '5px',
        marginBottom: theme.spacing(1),
        color: '#009688',
        cursor: 'pointer'
    },
    icon: {
        display: 'block',
        fontSize: '72px'
    },
    itemTitle: {
        marginTop: theme.spacing(2)
    }
}));

const ResumeHome = ({history, dispatch}) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width: 552px)');

    const changePage = (pageId = '') => {
        history.push(`/${pageId.toLowerCase()}`);
    };

    return(
        <div className={classes.section}>
            <Container className={classes.content} maxWidth="md">
                <Typography variant="h4" align="left" className={classes.pageTitle} gutterBottom>
                    Create Resume
                </Typography>
                <Divider variant="fullWidth" className={classes.divider} />
                <Grid container className={classes.gridContainer} spacing={6} align="center" justify="center" alignItems="stretch">
                    <Grid item md className={isMobile ? classes.newbieGridMobile : classes.newbieGridDesktop} onClick={e => {changePage('resume/edit'); dispatch(newResume()); }}>
                        <PeopleIcon className={classes.icon} />
                        <Typography className={classes.itemTitle} variant="h6" align="center" gutterBottom>
                            I'm a newbie
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            I have no or a few experience on writing resume, please provide a step-by-step tutorial on how to write a resume for me.
                        </Typography>
                    </Grid>
                    <Grid item md className={isMobile ? classes.professionalGridMobile : classes.professionalGridDesktop} onClick={e => changePage('resume/professional')}>
                        <ReceiptIcon className={classes.icon} />
                        <Typography className={classes.itemTitle} variant="h6" align="center" gutterBottom>
                            I'm a professional
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            I have already built up my resume, but I'm not sure whether there are some mistakes in it. Please take a look and help me to correct.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(withRouter(ResumeHome));

