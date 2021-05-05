import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import React, { useRef } from 'react';

import FusePageCardedHeader from './FusePageCardedHeader';
import FusePageCardedSidebar from './FusePageCardedSidebar';

import FuseScrollbars from '@fuse/core/FuseScrollbars';

const drawerWidth = 296;
const headerHeight = 200;
const toolbarHeight = 64;
const headerContentHeight = headerHeight - toolbarHeight;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: '100%',
		position: 'relative',
		flex: '1 0 auto',
		height: 'auto',
		backgroundColor: theme.palette.background.default
	},
	innerScroll: {
		flex: '1 1 auto',
		height: '100%'
	},
	topBg: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		backgroundColor: theme.palette.background.paper,
		backgroundSize: 'cover',
		//borderBottom: `1px solid ${theme.palette.primary.main}`,
		pointerEvents: 'none'
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0 3.2rem',
		flex: '1 1 100%',
		zIndex: 2,
		maxWidth: '100%',
		minWidth: 0,
		minHeight: 0,
		[theme.breakpoints.down('xs')]: {
			padding: '0 1.6rem'
		}
	},
	header: {
		height: headerContentHeight,
		minHeight: headerContentHeight,
		maxHeight: headerContentHeight,
		display: 'flex',
		// color: theme.palette.primary.contrastText
		color: theme.palette.secondary.main
	},
	headerSidebarToggleButton: {
		color: theme.palette.primary.dark
	},
	contentCard: {
		display: 'flex',
		flex: '1 1 100%',
		flexDirection: 'column',
		backgroundColor: theme.palette.background.light,
		boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
		minHeight: 0,
		borderRadius: '8px 8px 0 0',
    marginTop: 20
	},
	toolbar: {
		height: toolbarHeight,
		minHeight: toolbarHeight,
		display: 'flex',
		alignItems: 'center',
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	content: {
		flex: '1 1 auto',
		height: '100%',
		overflow: 'auto',
		'-webkit-overflow-scrolling': 'touch'
	},
	sidebarWrapper: {
		position: 'absolute',
		backgroundColor: 'transparent',
		zIndex: 5,
		overflow: 'hidden',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				zIndex: 1,
				position: 'relative'
			}
		}
	},
	sidebar: {
		position: 'absolute',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				backgroundColor: 'transparent',
				position: 'relative',
				border: 'none',
				overflow: 'hidden'
			}
		},
		width: drawerWidth,
		height: '100%',
    marginRight: 40,
    marginLeft: 19
	},
	leftSidebar: {},
	rightSidebar: {},
	sidebarHeader: {
		height: headerHeight,
		minHeight: headerHeight,
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.dark,
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				backgroundColor: 'transparent'
			}
		}
	},
	sidebarContent: {
		display: 'flex',
		flex: '1 1 auto',
		flexDirection: 'column',
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		[theme.breakpoints.up('lg')]: {
			overflow: 'auto',
			'-webkit-overflow-scrolling': 'touch'
		},
    marginTop: -70,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: theme.palette.primary.contrastText
	},
	backdrop: {
		position: 'absolute'
	}
}));

const FusePageCarded = React.forwardRef((props, ref) => {
	const leftSidebarRef = useRef(null);
	const rightSidebarRef = useRef(null);
	const rootRef = useRef(null);
	const classes = useStyles(props);
	const isRightSidebar = props.rightSidebarHeader || props.rightSidebarContent;
	const isLeftSidebar = props.leftSidebarHeader || props.leftSidebarContent;

	React.useImperativeHandle(ref, () => ({
		rootRef,
		toggleLeftSidebar: () => {
			leftSidebarRef.current.toggleSidebar();
		},
		toggleRightSidebar: () => {
			rightSidebarRef.current.toggleSidebar();
		}
	}));

	return (
		<div ref={rootRef} className={clsx(classes.root, props.innerScroll && classes.innerScroll)}>
			<div className={classes.topBg} />

			<div className="container flex w-full">
				{isLeftSidebar && (
					<FusePageCardedSidebar
						ref={leftSidebarRef}
						classes={classes}
						content={props.leftSidebarContent}
						header={props.leftSidebarHeader}
						innerScroll={props.innerScroll}
						position="left"
						rootRef={rootRef}
						variant={props.leftSidebarVariant || 'permanent'}
					/>
				)}

				<div
					className={clsx(
						classes.contentWrapper,
						isLeftSidebar &&
							(props.leftSidebarVariant === undefined || props.leftSidebarVariant === 'permanent') &&
							'lg:ltr:pl-0 lg:rtl:pr-0',
						isRightSidebar &&
							(props.rightSidebarVariant === undefined || props.rightSidebarVariant === 'permanent') &&
							'lg:pr-0'
					)}
				>
					<FusePageCardedHeader classes={classes} header={props.header} />

					<div className={clsx(classes.contentCard, props.innerScroll && 'inner-scroll')}>
						{props.contentToolbar && <div className={classes.toolbar}>{props.contentToolbar}</div>}

						{props.content && (
							<FuseScrollbars
								className={classes.content}
								enable={props.innerScroll}
								scrollToTopOnRouteChange={props.innerScroll}
							>
								{props.content}
							</FuseScrollbars>
						)}
					</div>
				</div>

				{isRightSidebar && (
					<FusePageCardedSidebar
						ref={rightSidebarRef}
						classes={classes}
						content={props.rightSidebarContent}
						header={props.rightSidebarHeader}
						innerScroll={props.innerScroll}
						position="right"
						rootRef={rootRef}
						variant={props.rightSidebarVariant || 'permanent'}
					/>
				)}
			</div>
		</div>
	);
});

FusePageCarded.propTypes = {
	rightSidebarHeader: PropTypes.node,
	rightSidebarContent: PropTypes.node,
	rightSidebarVariant: PropTypes.node,
	leftSidebarHeader: PropTypes.node,
	leftSidebarContent: PropTypes.node,
	leftSidebarVariant: PropTypes.node,
	header: PropTypes.node,
	content: PropTypes.node,
	contentToolbar: PropTypes.node,
	innerScroll: PropTypes.bool
};

FusePageCarded.defaultProps = {};

export default React.memo(FusePageCarded);
