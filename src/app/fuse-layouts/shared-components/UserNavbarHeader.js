import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		'&.user': {
			'& .username, & .email': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	avatar: {
		width: '75%',
		height: 65,
		padding: 8,
		background: theme.palette.background.light,
    borderRadius: '20px',
		boxSizing: 'content-box',
		'& > img': {
			borderRadius: '0px',
      width: '75%',
		}
	}
}));

function UserNavbarHeader(props) {
	const user = useSelector(({ auth }) => auth.user);

	const classes = useStyles();

	return (
		<AppBar
			classes={{ root: classes.root }}
			className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-52 z-0 shadow-0"
			color="primary"
			position="static"
		>
			<Avatar alt="user photo" className={clsx(classes.avatar, 'avatar')} src="assets/images/logos/compensar_sencillo.png" />
		</AppBar>
	);
}

export default UserNavbarHeader;
