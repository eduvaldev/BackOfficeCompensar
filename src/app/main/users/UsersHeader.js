import { Button, Icon, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { RiAuctionLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import FilterSelect from '../../components/FilterSelect';
import FilterTextField from '../../components/FilterTextfield';
import { getStatuses } from '../../store/app/entitiesSlice';
import { setSearchText, setSelectedStatus } from '../../store/app/usersSlice';

import { selectMainTheme } from '../../store/fuse/settingsSlice';

import FuseAnimate from '@fuse/core/FuseAnimate';

const UsersHeader = () => {
	const dispatch = useDispatch();

	const mainTheme = useSelector(selectMainTheme);

	const generalStatus = useSelector(({ entities }) => entities.statuses).filter(s => s.type === 'general');
	const selectedStatus = useSelector(({ users }) => users.selectedStatus);

	useEffect(() => {
		if (generalStatus.length === 0) dispatch(getStatuses());
	}, [dispatch]);

	return (
		<div className="flex flex-col justify-center w-full mt-16 space-y-20">
			<div className="flex mt-24">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32 mr-16">
						<RiAuctionLine />
					</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="sm:flex sm:mx-12 mx-0" variant="h6">
						Usuarios
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex justify-between w-full">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<div className="lg:flex-row lg:space-y-0 flex flex-col justify-between w-full h-full space-y-10">
							<div className="lg:items-center flex w-full space-x-8">
								<FilterTextField actionCallback={setSearchText} />
								<FilterSelect actionCallback={setSelectedStatus} data={generalStatus} selectedStatus={selectedStatus} />
							</div>
							{/* <div className="flex h-full"> */}
							{/*	<Button */}
							{/*		className="whitespace-nowrap w-full normal-case" */}
							{/*		color="primary" */}
							{/*		startIcon={<FiPlus />} */}
							{/*		variant="contained" */}
							{/*		onClick={() => dispatch(openNewAnimalDialog())} */}
							{/*	> */}
							{/*		<span className="sm:flex hidden">Agregar Animal</span> */}
							{/*		<span className="sm:hidden flex">Agregar</span> */}
							{/*	</Button> */}
							{/* </div> */}
						</div>
					</FuseAnimate>
				</ThemeProvider>
			</div>
		</div>
	);
};

export default UsersHeader;
