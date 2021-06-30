import React from "react";

import { Link, useRouteMatch, useLocation } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import DrawerMaterial from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import useRoutes from "../hooks/useRoutes";
import ListSubheader from "@material-ui/core/ListSubheader";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(15),
    },
  },
}));

const Drawer: React.FC<any> = ({ children, window }) => {
  const routes = useRoutes({ isDrawer: true });

  const location = useLocation();
  const routeMatch = useRouteMatch(location.pathname);

  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ padding: 20 }}>
        <Typography variant='h5' noWrap>
          React hook form
        </Typography>
        <Typography noWrap>Integrating with Material UI</Typography>
        <Typography noWrap>rossarin.dev</Typography>
        <Typography noWrap>v1</Typography>
      </div>
      <Divider />
      <List
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Examples
          </ListSubheader>
        }>
        {routes.map((route, index) => (
          <Link
            to={route.path}
            key={route.path}
            style={{ textDecoration: "none", color: "#3f51b5" }}>
            <ListItem
              button
              selected={routeMatch?.path === route.path}
              key={route.path}>
              <ListItemText primary={route.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <DrawerMaterial
            container={container}
            variant='temporary'
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {drawer}
          </DrawerMaterial>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <DrawerMaterial
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open>
            {drawer}
          </DrawerMaterial>
        </Hidden>
      </nav>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Drawer;
