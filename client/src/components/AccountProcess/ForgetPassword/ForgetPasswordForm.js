import { withRouter } from 'react-router-dom';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme =>({
    section: {
        width: '100%',
        height: '100vh',
        backgroundImage: 'url(/assets/images/login-bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        padding: theme.spacing(1),
        boxSizing: 'border-box'
    },
    content: {
        width: '80%',
        maxWidth: '500px',
        padding: theme.spacing(5, 3),
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        marginTop: '30px'
    },
    title: {
        fontWeight: 'bold'
    },
    form: {
        display: 'block',
        width: '100%'
    },
    sendRequestButton: {
        marginTop: theme.spacing(3)
    },
    loginSection: {
        marginTop: theme.spacing(7),
        textAlign: "center"
    },
    loginButton: {
        display: 'inline',
        marginLeft: theme.spacing(1)
    }
}));

const ForgetPasswordForm = ({history}) => {
    const classes = useStyles();

    const goBack = () => {
        window.history.back();
    }

    return(
        <div className={classes.section}>
            <Paper className={classes.content}>
                <Typography variant="h4" align="center" className={classes.title} gutterBottom>
                    FORGET PASSWORD
                </Typography>
                <Typography variant="body2" align="left" gutterBottom>
                    If you have forgotten your password, please enter the email of your account registered below and click "Send Request" button. We will send you an email for you to reset the password as soon as possible.
                </Typography>
                <form className={classes.form} autoComplete="on">
                    <TextField id="email" type="email" name="email" label="Account Email" margin="normal" variant="outlined" required fullWidth />
                    <Button type="submit" className={classes.sendRequestButton} variant="contained" color="primary" size="large" fullWidth>Send Request</Button>
                </form>
                <Container className={classes.loginSection}>
                    <Typography variant="body2" component="span" align="center">
                        Remember password?
                    </Typography>
                    <Button variant="outlined" className={classes.loginButton} color="secondary" onClick={e => goBack()}>Go Back</Button>
                </Container>
            </Paper>
        </div>
    )
};

export default withRouter(ForgetPasswordForm);