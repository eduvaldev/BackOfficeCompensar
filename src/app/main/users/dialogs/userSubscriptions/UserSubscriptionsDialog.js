import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import FuseLoading from '../../../../../@fuse/core/FuseLoading';
import { closeUserSubscriptionDialog, getUserSubscription } from '../../../../store/app/usersSlice';

import UserSubscriptionsForm from './UserSubscriptionsForm';

function UserSubscriptionDialog() {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);

	const userSubscriptions = useSelector(({ users }) => users.userSubscriptions);
	const userSubscriptionDialog = useSelector(({ users }) => users.userSubscriptionDialog);

	useEffect(() => {
		if (userSubscriptionDialog.props.open) {
			dispatch(getUserSubscription(userSubscriptionDialog.data)).then(() => setIsLoading(false));
		}
	}, [dispatch, userSubscriptionDialog]);

	const closeSubscriptionDialog = () => {
		dispatch(closeUserSubscriptionDialog());
		setIsLoading(true);
	};

	return (
		<Dialog
			classes={{
				paper: 'm-0'
			}}
			{...userSubscriptionDialog.props}
			maxWidth="lg"
			fullWidth
			onClose={() => closeSubscriptionDialog()}
		>
			<AppBar elevation={1} position="static">
				<Toolbar className="flex justify-between w-full">
					<Typography color="inherit" variant="subtitle1">
						Información de suscripciones
					</Typography>
					<IconButton className="cursor-pointer" onClick={() => closeSubscriptionDialog()}>
						<MdClose />
					</IconButton>
				</Toolbar>
			</AppBar>

			<DialogContent className="p-0">
				{isLoading ? (
					<FuseLoading />
				) : userSubscriptions.length === 0 ? (
					<div>
						<div className="h-96 flex items-center justify-center">
							<Typography variant="h6">No existen subscripciones</Typography>
						</div>
					</div>
				) : (
					<UserSubscriptionsForm userSubscriptions={userSubscriptions} onClick={() => closeSubscriptionDialog()} />
				)}
			</DialogContent>
		</Dialog>
	);
}

export default UserSubscriptionDialog;
