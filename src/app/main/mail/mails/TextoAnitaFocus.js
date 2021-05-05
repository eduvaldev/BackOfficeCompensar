import List from '@material-ui/core/List';
import { Button, Card, CardContent, darken, Icon, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { EditSharp } from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useForm } from '../../../../@fuse/hooks';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { textosGetId, selectTextosById,  updateText, textosGet} from '../../../store/app/teextosSilce';
import { SelectFormsy } from '@fuse/core/formsy';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.light,
		color: theme.palette.primary.main
	},
	content: {
		background: '#F4F4F4'
	},
	textAera: {
		border: '1px solid black',
    borderRadius: 8,
    outline: 'none',
    maxHeight: 200,
    maxWidth: '80%',
	},
  botonEdit: {
    background: '#85B300',
    color: theme.palette.primary.contrastText
  }
}));

const defaultFormState = {
	texto_id: 0,
	pagina: '',
	texto: '',
	type: 'anita'
};

function TextoAnitaFocus(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const routeParams = useParams();
  const texto = useSelector( state => selectTextosById(state, routeParams.textoId));
  const [ desableText, setDesableText ] = useState(true);

  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(defaultFormState, () =>
		handleSubmitBlog()
	);

  const initText = useCallback(() => {
    setForm({
      ...texto
    })
  },[setForm, texto]);

	useEffect(() => {
		dispatch(textosGetId(routeParams.textoId));
    initText();
	}, [dispatch, routeParams]);

  const handleSubmitBlog = () => {
    form.texto_id = texto.id;
    form.pagina = texto.pagina;
	  form.type = 'anita';
    console.log(form);
    dispatch(updateText(form));
    setDesableText(!desableText);
		dispatch(textosGet());
	};
  
	return (
		<FuseAnimate delay={100} className={clsx('p-4')} >
        <div >
          <form noValidate onSubmit={handleSubmit}>
				    <Typography className='mb-16' color="textPrimary" variant="h4">{texto && texto.pagina}</Typography>
            <div className='w-full'>
              <TextareaAutosize 
                onChange={handleChange}
                name="texto"
                className={clsx('w-full p-8 mb-8', classes.textAera)}
                aria-label="empty textarea" 
                rowsMin={3}
                rowsMax={8}
                defaultValue={texto && texto.texto}
                value={form.texto}
                placeholder="Agrega un texto"  
                disabled={desableText}
              />
            </div>
            <div>
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

export default TextoAnitaFocus;
