import { withRouter } from 'react-router-dom';

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { pages } from '../../utils/links';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'block',
        width: '100%',
        backgroundColor: '#222D3C',
    },
    content: {
        padding: theme.spacing(4, 2)
    },
    gridItem: {
        width: '100%',
        padding: theme.spacing(2, 1)
    },
    footerLogo: {
        width: '100%',
        height: 'auto',
        maxWidth: '200px'
    },
    footerLinkTitle: {
        color: 'white',
        borderBottom: '2px solid white',
        fontWeight: 'bold'
    },
    footerLinkItem: {
        display: 'block',
        color: 'white',
        margin: theme.spacing(1, 0),
        width: '100%',
        cursor: 'pointer'
    },
    copyright: {
        display: 'block',
        color: 'white',
        margin: theme.spacing(4, 0, 3)
    }
}));

const Footer = ({history}) => {
    const classes = useStyles();

    const changePage = (pageId = "") => {
        history.push(`/${pageId.toLowerCase()}`);
    };

    return(
        <div className={classes.container}>
            <Container className={classes.content} maxWidth="lg">
                <Grid container spacing={6} justify="center" alignItems="stretch">
                    <Grid item className={classes.gridItem} md={5}>
                        <img src="/assets/images/logo.svg" alt="logo" className={classes.footerLogo} />
                    </Grid>
                    <Grid item className={classes.gridItem} md={4}>
                        { null &&
                        <>
                        <Typography className={classes.footerLinkTitle} variant="h5" align="left" gutterBottom>
                            NAVIGATE
                        </Typography>
                        { pages.map(page => (
                            (page.id !== 'sign-up' && page.id !== 'login') ?
                                (<Link
                                key={page.id}
                                className={classes.footerLinkItem}
                                underline="none"
                                onClick={e => changePage(page.id)}>
                                    {page.name}
                                </Link>) : null
                        ))}
                        </>
                        }
                    </Grid>
                </Grid>
                <Typography className={classes.copyright} variant="body2" align="center" gutterBottom>
                    &copy;Copyright Resume4Jobs 2019. All rights reserved.
                </Typography>
            </Container>
        </div>
    )
}

export default withRouter(Footer);