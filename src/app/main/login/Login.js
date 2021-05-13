import { Button, Card, CardContent, darken, Icon, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { TextFieldFormsy } from '../../../@fuse/core/formsy';
import { submitLogin } from '../../auth/store/loginSlice';

import FuseAnimate from '@fuse/core/FuseAnimate';

const useStyles = makeStyles(theme => ({
	root: {
		background: `#D6D6D6`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {
		background: `#fff`
  },
	rightSection: {
		background: `#fff`,
		color: theme.palette.primary.dark
	}
}));

function Login() {
	const classes = useStyles();

	const dispatch = useDispatch();

	const login = useSelector(({ auth }) => auth.login);

	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const formRef = useRef(null);

	useEffect(() => {
		if (login.error && (login.error.email || login.error.password)) {
			formRef.current.updateInputsWithError({
				...login.error
			});
			disableButton();
		}
	}, [login.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
    model.TIPODOCUMENTO = 'CC'
    console.log(model)
		dispatch(submitLogin(model));
	}

	return (
		<div
			className={clsx(classes.root, 'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24')}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="max-w-400 md:max-w-3xl rounded-12 flex w-full overflow-hidden shadow-2xl">
					<Card
						className={clsx(classes.leftSection, 'flex flex-col w-full max-w-sm items-center justify-center')}
						square
					>
						<CardContent className="max-w-320 flex flex-col items-center justify-center w-full">
							<FuseAnimate delay={300}>
								<div className="flex flex-col items-center mb-32">
									<img alt="logo" className="logo-icon w-7/12 mb-12" src="assets/images/logos/compensar_logo.png" />
									<div>
										<Typography className="text-24 font-800 logo-text text-center" color="inherit">
											Adulto Mayor Admin
										</Typography>
									</div>
								</div>
							</FuseAnimate>
							<div className="w-full">
								<Formsy
									ref={formRef}
									className="flex flex-col justify-center w-full"
									onInvalid={disableButton}
									onValid={enableButton}
									onValidSubmit={handleSubmit}
								>
									<TextFieldFormsy
										className="mb-16"
										label="Documento"
										name="NUMERODOCUMENTO"
										// value=""
										type="text"
										validationErrors={{
											minLength: 'Mínimo de 5 caracteres'
										}}
										validations={{
											minLength: 5
										}}
										variant="outlined"
										required
									/>
									<TextFieldFormsy
										className="mb-16"
										InputProps={{
											className: 'pr-2',
											type: showPassword ? 'text' : 'password',
											endAdornment: (
												<InputAdornment position="end">
													<IconButton onClick={() => setShowPassword(!showPassword)}>
														<Icon className="text-20" color="action">
															{showPassword ? 'visibility' : 'visibility_off'}
														</Icon>
													</IconButton>
												</InputAdornment>
											)
										}}
										label="Password"
										name="CONTRASENA"
										type="password"
										validationErrors={{
											minLength: 'Mínimo de 5 caracteres'
										}}
										validations={{
											minLength: 5
										}}
										variant="outlined"
										required
									/>
									<Button
										aria-label="LOG IN"
										className="w-full mx-auto mt-16 normal-case"
										color="primary"
										disabled={!isFormValid}
										type="submit"
										value="legacy"
										variant="contained"
									>
										Ingresar
									</Button>
								</Formsy>
							</div>
						</CardContent>
					</Card>
					<div className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}>
						<div className="max-w-320">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography className="font-800 leading-tight" color="inherit" variant="h3">
									Bienvenido admin de Adulto Mayor
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography className="mt-32" color="inherit" variant="subtitle1">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur assumenda cumque debitis.
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Login;
