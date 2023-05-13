import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { SwipeableDrawer } from '@material-ui/core';

import Sidebar from '../Sidebar/Sidebar';
import ActiveUserList from '../ActiveUserList/ActiveUserList';
import { StoreState } from '../../reducers';

export default function Header() {
  // Get State from Redux Store
  const chatStore = useSelector((state: StoreState) => state.chat);
  const { activeChannel, activePMUser, activeView } = chatStore;

  // Local state
  const [sideBarDrawerVisible, setSideBarDrawerVisible] = useState(false);
  const [userListDrawerVisible, setUserListDrawerVisible] = useState(false);
  const [title, setTitle] = useState('');

  // On active view change title
  useEffect(() => {
    if (activeView === 'servers') {
      setTitle(activeChannel.split('-')[0].toLowerCase());
    } else if (activeView === 'home') {
      setTitle(activePMUser);
    }
  }, [activeView, activePMUser, activeChannel]);

  return (
    <AppBar position="static" className="appbar">
      <Toolbar className="navbar">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="menu-burger-button"
          onClick={() => setSideBarDrawerVisible(true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="left"
          open={sideBarDrawerVisible}
          onClose={() => setSideBarDrawerVisible(false)}
          onOpen={() => setSideBarDrawerVisible(true)}
        >
          <Sidebar setDrawerVisible={setSideBarDrawerVisible} />
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor="right"
          open={userListDrawerVisible}
          onClose={() => setUserListDrawerVisible(false)}
          onOpen={() => setUserListDrawerVisible(true)}
        >
          <ActiveUserList />
        </SwipeableDrawer>
        <Typography variant="h6">{title} </Typography>
      </Toolbar>
    </AppBar>
  );
}
