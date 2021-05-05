import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from 'app/auth/store/userSlice';

function UserMenu(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Button className="min-h-40 min-w-40 md:px-16 md:py-6 px-0 py-0" onClick={userMenuClick}>
				<div className="md:flex flex-col items-end hidden mx-4">
					<Typography className="flex font-bold" component="span">
						{user.data?.displayName}
					</Typography>
					<Typography className="text-11 capitalize" color="textSecondary">
						{user.role.toString()}
						{(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
					</Typography>
				</div>

				{user.data?.photoURL ? (
					<Avatar alt="user photo" className="md:mx-4" src={user.data?.photoURL} />
				) : (
					<Avatar className="md:mx-4">{user.data?.displayName[0]}</Avatar>
				)}
			</Button>

			<Popover
				anchorEl={userMenu}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
				open={Boolean(userMenu)}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				onClose={userMenuClose}
			>
				{!user.role || user.role.length === 0 ? (
					<>
						<MenuItem component={Link} role="button" to="/login">
							<ListItemIcon className="min-w-40">
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem>
						<MenuItem component={Link} role="button" to="/register">
							<ListItemIcon className="min-w-40">
								<Icon>person_add</Icon>
							</ListItemIcon>
							<ListItemText primary="Register" />
						</MenuItem>
					</>
				) : (
					<>
						{/* <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button"> */}
						{/*	<ListItemIcon className="min-w-40"> */}
						{/*		<Icon>account_circle</Icon> */}
						{/*	</ListItemIcon> */}
						{/*	<ListItemText primary="My Profile" /> */}
						{/* </MenuItem> */}
						{/* <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button"> */}
						{/*	<ListItemIcon className="min-w-40"> */}
						{/*		<Icon>mail</Icon> */}
						{/*	</ListItemIcon> */}
						{/*	<ListItemText primary="Inbox" /> */}
						{/* </MenuItem> */}
						<MenuItem
							onClick={() => {
								dispatch(logoutUser());
								userMenuClose();
							}}
						>
							<ListItemIcon className="min-w-40">
								<Icon>exit_to_app</Icon>
							</ListItemIcon>
							<ListItemText primary="Cerrar sesión" />
						</MenuItem>
					</>
				)}
			</Popover>
		</>
	);
}

export default UserMenu;
