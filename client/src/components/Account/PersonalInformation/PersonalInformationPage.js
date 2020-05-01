import { withRouter } from 'react-router-dom';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

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
    title: {
        fontWeight: 'bold'
    },
    divider: {
        margin: theme.spacing(3, 0)
    },
    form: {
        display: 'block',
        width: '100%'
    },
    grid: {
        width: '100%',
    },
    buttonSection: {
        textAlign: 'right',
        marginTop: theme.spacing(3),
        padding: '0'
    },
    button: {
        display: 'inline',
        marginLeft: theme.spacing(1)
    }
}));

const PersonalInformationPage = ({ history, auth }) => {
    const classes = useStyles();

    useEffect(() => {
        if (auth.isAuthenticated) {
            fetch(process.env.REACT_APP_WEB_API_URL + '/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            }).then(response => response.json())
                .then(data => {
                    var user = JSON.parse(data.user);
                    setName(user.name || '')
                    setPhone(user.phone || '')
                    setEmail(user.email || '')
                    setLinkedin(user.linkedin || '')
                    setWebsite(user.website || '');
                    setGithub(user.github || '')
                    setAddress(user.address || '')
                });
        }
    }, [auth]);

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [linkedin, setLinkedin] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [github, setGithub] = React.useState('');
    const [address, setAddress] = React.useState('');

    const handleUpdate = e => {
        e.preventDefault();
        fetch(process.env.REACT_APP_WEB_API_URL + '/user', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email,
                linkedin: linkedin,
                website: website,
                github: github,
                address: address
            })
        }).then(response => response.json())
            .then(data => {
                toast.success('update successful')
            });
    }

    return (
        <div className={classes.section}>
            <Container className={classes.content} maxWidth="md">
                <Typography variant="h4" align="left" className={classes.title} gutterBottom>
                    Personal Information
                </Typography>
                <Divider variant="fullWidth" className={classes.divider} />
                <Grid container spacing={3} justify="space-between" alignItems="center">
                    <Grid item lg={6} xs={12}>
                        <TextField id="name" type="text" name="name" label="Name" value={name} onChange={e => setName(e.target.value)} variant="outlined" required fullWidth />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField id="phone" type="text" name="phone" label="Phone No." value={phone} onChange={e => setPhone(e.target.value)} variant="outlined" required fullWidth />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField id="email" type="text" name="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} variant="outlined" required fullWidth />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField id="linkedin" type="text" name="linkedin" label="LinkedIn" value={linkedin} onChange={e => setLinkedin(e.target.value)} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField id="website" type="text" name="website" label="Website" value={website} onChange={e => setWebsite(e.target.value)} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField id="github" type="text" name="github" label="GitHub" value={github} onChange={e => setGithub(e.target.value)} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField id="address" type="text" name="address" label="Address" value={address} onChange={e => setAddress(e.target.value)} variant="outlined" fullWidth />
                    </Grid>
                </Grid>
                <Divider className={classes.divider} variant="middle" />
                <Container className={classes.buttonSection}>
                    <Button type="reset" className={classes.button} variant="text" color="secondary" size="large">Clear</Button>
                    <Button type="submit" className={classes.button} variant="contained" color="primary" size="large" onClick={handleUpdate}>Update</Button>
                </Container>
            </Container>
        </div>
    )
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(withRouter(PersonalInformationPage));