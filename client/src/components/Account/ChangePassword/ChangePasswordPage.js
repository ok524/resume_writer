import { withRouter } from 'react-router-dom';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
        width: '100%',
        maxWidth: '500px'
    },
    buttonSection: {
        textAlign: 'right',
        marginTop: theme.spacing(3),
        padding: '0'
    },
    changePasswordButton: {
        display: 'inline'
    }
}));

const ChangePasswordPage = ({history}) => {
    const classes = useStyles();

    return(
        <div className={classes.section}>
            <Container className={classes.content} maxWidth="md">
                <Typography variant="h4" align="left" className={classes.title} gutterBottom>
                    Change Password
                </Typography>
                <Divider variant="fullWidth" className={classes.divider} />
                <form className={classes.form} autoComplete="on">
                    <TextField id="current-password" type="password" name="current-password" label="Current Password" margin="normal" variant="outlined" required fullWidth />
                    <TextField id="new-password" type="password" name="new-password" label="New Password" margin="normal" variant="outlined"
                    helperText="New password must contains at least 8 characters" required fullWidth />
                    <TextField id="confirm-password" type="password" name="confirm-password" label="Confirm Password" margin="normal" variant="outlined" required fullWidth />
                    <Container className={classes.buttonSection}>
                        <Button type="submit" className={classes.changePasswordButton} variant="contained" color="primary" size="large">Change Password</Button>
                    </Container>
                </form>
            </Container>
        </div>
    )
};

export default withRouter(ChangePasswordPage);