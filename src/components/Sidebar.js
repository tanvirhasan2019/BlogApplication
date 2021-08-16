import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch , useSelector } from 'react-redux';
import '../index.css';
import { useHistory } from 'react-router-dom';
import * as actionType from '../constants/actionTypes';


const anchor = 'left'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },

});

export default function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const {authData , loading } = useSelector(state => state.auth);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClickProfile = () =>{
    history.push(`/my-profile/${authData.result._id}`)
  }

  const handleClickCreatePost = () =>{
    history.push('/create-memories')
  }

  const handleClickLoginLogut = () =>{
    if(authData) logout()
    else history.push('/login')
   
  }

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
   // setUser(null);
    history.push('/')
  };

  


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{height:'100%'}}
    >
      <List style={{height:'100%'}} className="d-flex flex-column justify-content-center align-items-center">
            {
              authData && !loading ?
              <ListItem onClick={handleClickProfile} className="sidebar-items">
                  <ListItemIcon> 
                   <Avatar style={{width:'70px', height:'70px', boxShadow:'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'}} 
                       alt="Remy Sharp" src={authData.result.avatar} />
                  </ListItemIcon>
                  
                  <div style={{marginLeft:'10px'}} className="sidebar-ul">Profile</div>
              </ListItem> : null

            }
            
            <ListItem className="sidebar-items">
                <ListItemIcon> 
                    <InboxIcon />
                </ListItemIcon>
                <div onClick={handleClickCreatePost} className="sidebar-items sidebar-ul">create a post</div>
            </ListItem>


            <ListItem>
                <ListItemIcon> 
                    <InboxIcon />
                </ListItemIcon>
                <div onClick={handleClickLoginLogut} className="sidebar-ul"> {authData ? 'Logout' : 'Login'} </div>
            </ListItem>

      </List>
      
    </div>
  );

  return (
    <div>   
        <React.Fragment key={1}>
          <MenuIcon  onClick={toggleDrawer(anchor, true)} />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
