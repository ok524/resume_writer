import { withRouter } from 'react-router-dom';

import { pages } from '../../utils/links';

import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { userLogout } from './../../action/auth'
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    appBar: {
        flexGrow: 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#222D3C'
    },
    button: {
        marginRight: theme.spacing(2)
    },
    logo: {
        maxWidth: 160,
        cursor: 'pointer'
    },
    appBarButtons: {
        marginLeft: 'auto',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    }
}));

const NavBar = ({ auth, history, location, dispatch }) => {
    const classes = useStyles();
    //const [loggedIn, setLoggedIn] = React.useState(false);

    const changePage = (pageId = "") => {
        history.push(`/${pageId.toLowerCase()}`);
    };

    const handleLogout = e => {
        dispatch(userLogout());
        toast.success('Logout Success');
        history.push('/');
    }

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'resume4jobs-appbar-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
                { pages.map(page => (
                    <MenuItem key={page.id}>
                        <Button
                            variant="text"
                            onClick={e => changePage(page.id)}>
                            {page.name}
                        </Button>
                    </MenuItem>
                ))}
        </Menu>
    );

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <img 
                        src="/assets/images/logo.svg" 
                        alt="logo" 
                        className={classes.logo} 
                        onClick={e => changePage()}/>
                    <div className={classes.grow}></div>
                    <div className={classes.sectionDesktop}>
                        { pages.map(page => (
                            <Button
                            key={page.id}
                            className={classes.button}
                            variant={page.navBarVariant}
                            color={location.pathname.substr(1) === page.id ? 'secondary' : 'inherit'}
                            onClick={e => changePage(page.id)}>
                            {page.name}
                            </Button>
                        )) }
                        {!auth.isAuthenticated &&
                            <>
                            <Button key='sign-up' className={classes.button} variant='contained' color='primary' onClick={e => changePage('sign-up')}>Sign Up</Button>
                            <Button key='login' className={classes.button} variant='outlined' color={location.pathname.substr(1) === 'login' ? 'secondary' : 'inherit'} onClick={e => changePage('login')}>Login</Button>
                            </>
                        }
                        {auth.isAuthenticated &&
                            <>
                            <Button key='profile' className={classes.button} variant='contained' color='primary' onClick={e => changePage('profile')}>Profile</Button>
                            <Button key='logout' className={classes.button} variant='outlined' color={location.pathname.substr(1) === 'logout' ? 'secondary' : 'inherit'} onClick={handleLogout}>Logout</Button>
                            </>
                        }
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit">
                                <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps)(withRouter(NavBar));
