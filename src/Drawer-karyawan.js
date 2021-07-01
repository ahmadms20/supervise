import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Logo from './img/Logo-menu.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Dashicon from './img/startup.png';
import Kegiatan from './img/file.png';
import Absen from './img/immigration.png';
import Jadwal from './img/schedule.png';
import { useLocation } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    color: '#ffffff',
    display: 'fixed',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      boxShadow:'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#34495e'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const modalFunction = (para) => {
    if(para === 'open kesatu'){
      setOpen(!open);
    }else if(para === 'open kedua'){
      setOpen2(true)
    }else if(para === 'close kesatu'){
      setOpen2(false)
    }
  }

  const handleLogout = () =>{
    localStorage.removeItem('token')
  }
  const { pathname } = useLocation();
  var id = localStorage.getItem('id_kegiatan')
  console.log("id", id)
  const drawer = (
    // Menu sidebar
    <div>
      <div className={classes.toolbar} style={{backgroundColor:"#2980b9"}}>
        <img src={Logo} width="180px" height="25px" style={{marginLeft:"30px", marginTop:"20px"}}/>
      </div>
      <Divider light />
        <ListItem button component={NavLink} to="/dashboard-karyawan" id="menu" activeClassName="active">
          <ListItemIcon>
            <img style={{width:'20px'}} src={Dashicon} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" activeClassName="active"/>
        </ListItem>
      <Divider light/>
      <ListItem button component={NavLink} to="/absen-karyawan" id="menu" activeClassName="active">
          <ListItemIcon>
            <img style={{width:'20px'}} src={Absen} />
          </ListItemIcon>
          <ListItemText primary="Absen" activeClassName="active"/>
        </ListItem>
      <Divider light/>
        <ListItem button component={NavLink} to="/kegiatan-karyawan" isActive={() => ['/kegiatan-karyawan', '/histori-kegiatan', `/karyawan-kegiatan/detail/${id}`].includes(pathname)} id="menu" activeClassName="active">
          <ListItemIcon>
            <img style={{width:'20px'}} src={Kegiatan} />
          </ListItemIcon>
          <ListItemText primary="Kegiatan" activeClassName="active"/>
        </ListItem>
      <Divider light/>
        <ListItem button component={NavLink} to="/jadwal-karyawan" id="menu" activeClassName="active">
          <ListItemIcon>
            <img style={{width:'20px'}} src={Jadwal} />
          </ListItemIcon>
          <ListItemText primary="Jadwal" activeClassName="active"/>
        </ListItem>
    </div>
    // Menu sidebar
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      {/* Navbar */}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{backgroundColor:"#3498db"}}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap style={{color:'white'}}>
            Karyawan
          </Typography>
          <Button
            startIcon={<AccountCircleIcon />}
            component={NavLink}
            to="/profil-karyawan"
            id="profil" activeClassName="active"
          >
            Profil
          </Button>
          <Button id="keluar" onClick={()=>modalFunction('open kedua')} endIcon={<ExitToAppIcon />}>Keluar</Button>
        </Toolbar>
      </AppBar>
      {/* Navbar */}
      {/* Sidebar */}
      <nav className={classes.drawer} style={{backgroundColor:'white'}} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {/* Sidebar */}
      {/* Konten */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.component}
      </main>
      {/* Konten */}
      {/* Modal konfirmasi keluar */}
      <Dialog
        open={open2}
        onClose={()=>modalFunction('close kesatu')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth 
      >
        <DialogTitle id="alert-dialog-title">{"Keluar"}</DialogTitle>
        <DialogContent dividers>
          <p style={{fontSize:"17px"}}>Apakah anda ingin keluar?</p>
        </DialogContent>
        <DialogActions>
          <Button id="button" href="/login" onClick={()=>handleLogout()} style={{color:"red"}}>
            Ya
          </Button>
          <Button id="button" onClick={()=>modalFunction('close kesatu')} style={{color:"blue"}}>
            Batal
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal konfirmasi keluar */}
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};


