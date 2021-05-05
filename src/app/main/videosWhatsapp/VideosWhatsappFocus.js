import { Button, FormControl, OutlinedInput, Typography, TextField } from '@material-ui/core';
import { EditSharp } from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useForm } from '../../../@fuse/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { videosGet, selectVideosById, updateVideo } from '../../store/app/videosSlice';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.light,
		color: theme.palette.primary.main
	},
	content: {
		background: '#F4F4F4'
	},
  headerCard:{
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
	input: {
    paddingTop: 0,
    marginBottom: 20,
    display: 'grid',
    gridTemplateColumns: 'auto 80%',
    gridColumnGap: 10,
    maxWidth: 700,
    '& .MuiOutlinedInput-input': {
      padding: '6px 7px',
    }
	},
  botonEdit: {
    background: '#85B300',
    color: theme.palette.primary.contrastText
  }
}));

const defaultFormState = {
	id: 0,
	title: '',
  type: '',
  duration: '',
  url: '',
	type: ''
};

function VideosWhatsappFocus(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const routeParams = useParams();
  const video = useSelector( state => selectVideosById(state, routeParams.videoId));
  const [ desableText, setDesableText ] = useState(true);

  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(defaultFormState, () =>
		handleSubmitBlog()
	);

  const initText = useCallback(() => {
    if(video){
      setForm({
        ...video,
        url: ''
      })
    }
  },[setForm, video]);

	useEffect(() => {
		dispatch(videosGet(routeParams.enlaceId));
	}, [dispatch, routeParams]);

  useEffect(() => {
    console.log(video);
    if(video){
      initText();
    }
	}, [dispatch, routeParams, video]);

  const handleSubmitBlog = () => {
    dispatch(updateVideo(form));
	};
	return (
    <FuseAnimate delay={100} >
      <div >
        <Typography className={clsx('mb-16 py-12 px-36', classes.headerCard)} color="textPrimary" variant="h6">{video && video.title}</Typography>
        <form noValidate className='p-32 flex flex-col' onSubmit={handleSubmit}>
          <FormControl className={clsx('p-0', classes.input)} variant="outlined">
            <Typography className='' color="textPrimary" variant="body1">Link</Typography>
            <OutlinedInput
              name='somting'
              value={video && video.url}
              disabled
            />
          </FormControl>
          <FormControl className={clsx('p-0', classes.input)} variant="outlined">
            <Typography className='' color="textPrimary" variant="body1">Nuevo Link</Typography>
            <OutlinedInput
              name='url'
              onChange={handleChange}
              value={form.url}
              disabled={desableText}
            />
          </FormControl>
          <div className='ml-auto'>
            <Button
              className={clsx('mr-16', classes.botonEdit)}
              variant="contained"
              color="primary"
              startIcon={<EditSharp />}
              onClick={()=> setDesableText(!desableText)}
            > Editar </Button>
            <Button
              className={clsx('mr-4')}  
              disabled={desableText}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              type="submit"
            > Guardar </Button>
          </div>
        </form>
      </div>
    </FuseAnimate>
	);
}

export default VideosWhatsappFocus;