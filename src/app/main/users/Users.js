import React from 'react';

import FusePageCarded from '../../../@fuse/core/FusePageCarded';

import UserSubscriptionDialog from './dialogs/userSubscriptions/UserSubscriptionsDialog';
import UsersContent from './UsersContent';
import UsersHeader from './UsersHeader';

const Users = () => {
	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-172 h-172 sm:h-172 sm:min-h-172 my-10'
				}}
				content={<UsersContent />}
				header={<UsersHeader />}
				innerScroll
			/>
			<UserSubscriptionDialog />
		</>
	);
};
export default Users;
