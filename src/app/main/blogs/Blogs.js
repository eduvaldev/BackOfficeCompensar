import React from 'react';

import FusePageCarded from '../../../@fuse/core/FusePageCarded';

import BlogsContent from './BlogsContent';
import BlogsHeader from './BlogsHeader';
import BlogDialog from './dialog/BlogDialog';
import CommentsDialog from './dialog/Comments/CommentsDialog';

const Blogs = () => {
	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-172 h-172 sm:h-172 sm:min-h-172 my-10'
				}}
				content={<BlogsContent />}
				header={<BlogsHeader />}
				innerScroll
			/>
			<BlogDialog />
			<CommentsDialog />
		</>
	);
};
export default Blogs;
