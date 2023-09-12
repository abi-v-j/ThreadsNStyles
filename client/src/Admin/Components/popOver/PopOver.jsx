import {
  Popover,
  Typography,
  Paper,
  Avatar,
  ListItemIcon,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './popover.scss';

const PopOver = ({ prop }) => {
  console.log(prop.anchorEl);

  const id = prop.open ? 'simple-popover' : undefined;

  return (
    <>
      <Popover
        id={id}
        open={prop.open}
        anchorEl={prop.anchorEl}
        onClose={prop.handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className="popover"
      >
        <Paper className="paper">
          <Typography variant="h6" className="name">
            My Profile
          </Typography>
          <Link to="/my-profile" className="link">
            <Typography variant="subtitle1" className="row">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                />
              </ListItemIcon>
              My Profile
            </Typography>
          </Link>
          <Link to="/edit-profile" className="link">
            <Typography className="row" variant="subtitle1">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                />
              </ListItemIcon>
              Edit Profile
            </Typography>
          </Link>
          <Link to="/logout" className="link">
            <Typography className='btn' variant="subtitle1">
              Logout
            </Typography>
          </Link>
        </Paper>
      </Popover>
    </>
  );
};

export default PopOver;
