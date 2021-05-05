
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { textosGet, selectTextos } from '../../store/app/teextosSilce';

import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';

const useStyles = makeStyles(theme => ({
	root: {},
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
    marginTop: 10,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			fontSize: 16,
			width: 16,
			height: 16,
			marginRight: 16
		}
	},
	listSubheader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.primary.contrastText,
		padding: 16,
		backgroundColor: theme.palette.primary.main,
		fontSize: 20
	}
}));

function TextosDescriptivosSidebarContent(props) {
	const dispatch = useDispatch();

	const textos = useSelector(selectTextos).filter(data => data.type === 'descriptivo');

	const classes = useStyles();

  useEffect(() => {
		dispatch(textosGet());
	}, [dispatch]);

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={400}>
			<div className={clsx('z-10 flex-auto h-auto', classes.root)}>
				<div>
					<List>
						<ListSubheader className={classes.listSubheader} disableSticky>
							Editar
						</ListSubheader>

						{textos.length > 0 &&
							textos.map(texto => (
								<ListItem
									key={texto.id}
									activeClassName="active"
									className={classes.listItem}
									component={NavLinkAdapter}
									to={`/textos/descriptivos/${texto.id}`}
									button
								>
									<ListItemText primary={texto.pagina} disableTypography />
								</ListItem>
							))}
					</List>
				</div>
			</div>
		</FuseAnimate>
	);
}

export default TextosDescriptivosSidebarContent;
