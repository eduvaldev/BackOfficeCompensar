import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

import UserMenu from '../../shared-components/UserMenu';

import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';

const useStyles = makeStyles(theme => ({
	root: {}
}));

function ToolbarLayout1(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(selectToolbarTheme);

	const classes = useStyles(props);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				className={clsx(classes.root, 'flex relative z-10 shadow-md')}
				color="default"
				id="fuse-toolbar"
				style={{ backgroundColor: toolbarTheme.palette.background.paper }}
			>
				<Toolbar className="p-0 min-h-48 md:min-h-64">
					{config.navbar.display && config.navbar.position === 'left' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-64 h-64 p-0 mx-0 sm:mx-8" />
						</Hidden>
					)}

					<div className="flex flex-1">
						{/* <Hidden mdDown> */}
						{/*		<FuseShortcuts className="px-16" /> */}
						{/* </Hidden> */}
					</div>

					<div className="flex">
						<UserMenu />
						{/* <LanguageSwitcher /> */}

						{/* <FullScreenToggle /> */}

						{/* <FuseSearch /> */}

						{/* <QuickPanelToggleButton /> */}
					</div>

					{config.navbar.display && config.navbar.position === 'right' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton />
						</Hidden>
					)}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(ToolbarLayout1);
