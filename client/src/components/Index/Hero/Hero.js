import { withRouter } from 'react-router-dom';

import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    heroContainer: {
        height: '100vh',
        width: '100%',
        backgroundImage: "url('/assets/images/home-main-visual.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
    },
    heroContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    heroTypography: {
        color: 'white'
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    }
}));

const Hero = ({history}) => {

    const classes = useStyles();

    const goToSignUp = () => {
        history.push('/sign-up');
    };

    return (
        <div className={classes.heroContainer}>
            <Container className={classes.heroContent} maxWidth="sm">
                <img src="/assets/images/logo.svg" alt="logo" className={classes.logo} />
                <Typography className={classes.heroTypography} variant="h3" align="center" gutterBottom>
                    AI Resume Builder
                </Typography>
                <Typography className={classes.heroTypography} variant="h5" align="center" paragraph>
                    Create a tailor-made resume for you
                </Typography>
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                        <Button variant="contained" color="primary" size="large" onClick={goToSignUp}>
                            Get Started for Free
                        </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

export default withRouter(Hero);