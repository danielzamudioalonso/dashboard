import * as React from 'react';
  import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button
} from '@mui/material';

import ImageCard from '../../atoms/ImageCard/ImageCard';
import SearchBar from '../../molecules/SearchBar/SearchBar';
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretDown,
  CaretUp,
  Globe,
  Storefront,
  BellSimple,
  SidebarSimple,
  Flag
} from 'phosphor-react';

import MenuSettings from './MenuSettings';

const imageLogo = './img/Logo.png';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer,
  width: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }));

function NavigationBar({ children }) {
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenuSettings, setOpenMenuSettings] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenMenu = () => {
    setOpenMenu(true);
  }
  const handleCloseMenu = () => {
    setOpenMenu(false);
  }

  const handleOpenMenuSettings = () => {
    setOpenMenuSettings(true);
  }
  const handleCloseMenuSettings = () => {
    setOpenMenuSettings(false);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <SearchBar />
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Storefront size={16} />
            <BellSimple size={16} />
            <Divider orientation="vertical" />
            <Typography variant='body1'>Nombre</Typography>
            <Avatar alt="Remy Sharp" src="" />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            <ImageCard imgDir={imageLogo} size={25} />
            {
              open ? <CaretDoubleLeft size={18} />
                :
                <CaretDoubleRight size={18} />
            }
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {['Dashboard', 'Tasks', 'Calendar', 'Reports'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Globe size={18} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <Button
          onClick={openMenu ? handleCloseMenu : handleOpenMenu}
          startIcon={<SidebarSimple size={20} color="#ed5e2e" />}
          endIcon={
            open ?
              openMenu ? <CaretUp size={12} /> : <CaretDown size={12} />
              :
              ''
          }
        >
          {open ? <Typography variant='button'>Document Control</Typography> : ''}
        </Button>
        {openMenu ? (
          <>
            {['Document', 'Document Set', 'Request', 'Printed Copies', 'Admin Options', 'Context Fields', 'Print Profiles', 'Workflows', 'Obsolete Reasons', 'Characteristics'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openMenu ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openMenu ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Globe size={18} />
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </>)
          :
          ''
        }

        <Box>
          <Divider />
          <List>
            {['Org. Structure', 'Workspace'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Globe size={18} />
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
            <Button
              sx={{ width: 1 }}
              onClick={openMenu ? handleCloseMenu : handleOpenMenu}
              startIcon={<Flag size={20} />}
              endIcon={<CaretDown size={12} />}
            >
              {open ? <Typography variant='button'>Business Unit</Typography> : ''}
            </Button>
            <Divider />
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleOpenMenuSettings}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Globe size={18} />
              </ListItemIcon>
              <ListItemText primary='Settings' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <MenuSettings openMenu={openMenuSettings} handleClose={handleCloseMenuSettings} drawerWidth={drawerWidth} openDrawer={open}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default NavigationBar;