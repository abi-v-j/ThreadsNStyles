import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useState } from 'react';
import { Avatar} from '@mui/material';
import { Button } from '@mui/base';
import PopOver from '../popOver/PopOver';

const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl)

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="top">
          <span className="logo">Threads N Styles</span>
        </div>

        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <Button style={{border:'none',backgroundColor:'white'}}>
            <NotificationsNoneIcon  />
            <div className="counter">5</div>
            </Button>
            
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <Button onClick={handleClick}
            style={{
              border:'none',
               backgroundColor:'white',
            }}
            >
            <Avatar alt="Remy Sharp" 
           src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          
          />

            </Button>
         {open  === true ? <PopOver prop={{handleClose,anchorEl,open}}/>:''}
           
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
