import React from 'react';

import FusePageCarded from '../../../@fuse/core/FusePageCarded';

import UsuariosContent from './UsuariosContent';
import UsuariosHeader from './UsuariosHeader';

const Usuarios = () => {
  return (
    <>
      <FusePageCarded
        classes={{
          content: 'flex',
          contentCard: 'overflow-hidden',
          header: 'min-h-172 h-172 sm:h-172 sm:min-h-172 my-10'
        }}
				content={<UsuariosContent />}
				header={<UsuariosHeader />}
        innerScroll
      />
    </>
  )
}

export default Usuarios;