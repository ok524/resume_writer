import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { userLogin } from './../../../action/auth'

const useStyles = makeStyles(theme => ({
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
    forgetPassword: {
        float: 'right',
        cursor: 'pointer'
    },
    loginButton: {
        marginTop: theme.spacing(3)
    },
    signUpSection: {
        marginTop: theme.spacing(7),
        textAlign: 'center'
    },
    signUpButton: {
        display: 'inline',
        marginLeft: theme.spacing(1)
    }
}));

const LoginForm = ({ history, dispatch }) => {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const changePage = (pageId = '') => {
        history.push(`/${pageId.toLowerCase()}`);
    };

    const handleLogin = e => {
        e.preventDefault();
        fetch(process.env.REACT_APP_WEB_API_URL + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => response.json())
            .then(data => {
                if (!data.error) {
                    dispatch(userLogin({
                        isAuthenticated: true,
                        token: data.token
                    }));
                    history.push('/profile');
                    toast.success('Login Success');
                } else {
                    toast.error(data.error);
                }
            });

    }

    return (
        <div className={classes.section}>
            <Paper className={classes.content}>
                <Typography variant="h4" align="center" className={classes.title} gutterBottom>
                    LOGIN
                </Typography>
                <form className={classes.form} noValidate autoComplete="on">
                    <TextField id="email" type="email" name="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} margin="normal" variant="outlined" required fullWidth />
                    <TextField id="password" type="password" name="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} margin="normal" variant="outlined" required fullWidth />
                    <Link variant="body2" underline="none" className={classes.forgetPassword} onClick={e => changePage('forget-password')}>Forget Password?</Link>
                    <Button type="submit" className={classes.loginButton} variant="contained" color="primary" size="large" onClick={handleLogin} fullWidth>Login</Button>
                </form>
                <Container className={classes.signUpSection}>
                    <Typography variant="body2" component="span" align="center">
                        Not a member?
                    </Typography>
                    <Button variant="outlined" className={classes.signUpButton} color="secondary" onClick={e => changePage('sign-up')}>Sign Up</Button>
                </Container>
            </Paper>
        </div>
    )
};

export default connect()(withRouter(LoginForm));