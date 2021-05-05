import _ from '@lodash';

const TextoModel = data => {
	data = data || {};

	return {
		id: data.texto_id,
		pagina: data.pagina,
		texto: data.texto,
		type: data.type
	};
};

export default TextoModel;
