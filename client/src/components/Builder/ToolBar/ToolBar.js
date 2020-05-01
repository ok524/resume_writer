import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StyleIcon from '@material-ui/icons/Style';

import { toggleToolbar, changeTemplate } from '../../../action/builder';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: '60px' //theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ToolBar = ({ dispatch, toolbarOpen }) => {

  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: toolbarOpen,
        [classes.drawerClose]: !toolbarOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: toolbarOpen,
          [classes.drawerClose]: !toolbarOpen,
        }),
      }}
      open={toolbarOpen}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => dispatch(toggleToolbar())}>
          {toolbarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button key='template-1' onClick={() => { dispatch(changeTemplate('Template-1')) }}>
          <ListItemIcon><Badge color="secondary" badgeContent={1}><StyleIcon /></Badge></ListItemIcon>
          <ListItemText primary={'Template-1'} />
        </ListItem>
        <ListItem button key='template-2' onClick={() => { dispatch(changeTemplate('Template-2')) }}>
          <ListItemIcon><Badge color="secondary" badgeContent={2}><StyleIcon /></Badge></ListItemIcon>
          <ListItemText primary={'Template-2'} />
        </ListItem>
        <ListItem button key='export' onClick={() => { window.print(); }}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary={'Export to PDF'} />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );

};

ToolBar.defaultProps = {
  dispatch: () => { },
  toolbarOpen: false,
};

ToolBar.propTypes = {
  dispatch: PropTypes.func,
  toolbarOpen: PropTypes.bool,
};

const mapStateToProps = state => ({
  toolbarOpen: state.builder.toolbarOpen,
});

export default connect(mapStateToProps)(ToolBar);
