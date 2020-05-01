import { withRouter } from 'react-router-dom';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    section: {
        width: '100%',
        height: '100vh',
        backgroundImage: 'url(/assets/images/sign-up-bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        padding: theme.spacing(1),
        boxSizing: 'border-box',
    },
    content: {
        width: '80%',
        maxWidth: '700px',
        height: 'auto',
        maxHeight: '75vh',
        padding: theme.spacing(5, 3),
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflowY: 'auto',
        marginTop: '30px'
    },
    title: {
        fontWeight: 'bold'
    },
    form: {
        display: 'block',
        width: '100%'
    },
    signUpButton: {
        marginTop: theme.spacing(3)
    },
    divider: {
        margin: theme.spacing(3, 0)
    },
    loginSection: {
        marginTop: theme.spacing(5),
        textAlign: 'center'
    },
    loginButton: {
        display: 'inline',
        marginLeft: theme.spacing(1)
    }
}));

const SignUpForm = ({ history }) => {
    const classes = useStyles();

    const goToLogin = () => {
        history.push('/login');
    };

    const checkPasswordLength = (passwd) => {
        if (passwd.target.value < 8) {
            passwd.setAttribute('error', 'true');
        }
    };

    return (
        <div className={classes.section}>
            <Paper className={classes.content}>
                <Typography variant="h4" align="center" className={classes.title} gutterBottom>
                    SIGN UP
                </Typography>
                <form className={classes.form} autoComplete="off">
                    <Typography variant="h6" align="left" className={classes.title} gutterBottom>
                        Personal Information
                    </Typography>
                    <TextField id="full-name" type="text" name="full-name" label="Full Name" margin="normal" variant="outlined" required fullWidth />
                    <TextField id="phone" type="tel" name="phone" label="Phone Number" margin="normal" variant="outlined" required fullWidth />
                    <TextField id="address" type="text" name="address" label="Address" margin="normal" variant="outlined" required fullWidth />
                    <Divider variant="middle" className={classes.divider} />
                    <Typography variant="h6" align="left" className={classes.title} gutterBottom>
                        Account Information
                    </Typography>
                    <TextField id="email" type="email" name="email" label="Email Address" margin="normal" variant="outlined" required fullWidth />
                    <TextField id="password" type="password" name="password" label="Password" margin="normal" variant="outlined"
                        helperText="The password should contains at least 8 characters." onChange={event => checkPasswordLength(event)} required fullWidth />
                    <Button type="submit" className={classes.signUpButton} variant="contained" color="primary" size="large" fullWidth>Sign Up</Button>
                </form>
                <Container className={classes.loginSection}>
                    <Typography variant="body2" component="span" align="center">
                        Already have account?
                    </Typography>
                    <Button variant="outlined" className={classes.loginButton} color="secondary" onClick={goToLogin}>Login</Button>
                </Container>
            </Paper>
        </div>
    )
};

export default withRouter(SignUpForm);