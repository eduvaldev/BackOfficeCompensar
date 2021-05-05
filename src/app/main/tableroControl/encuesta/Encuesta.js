import React from 'react';

import FusePageCarded from '../../../@fuse/core/FusePageCarded';

import TableroControlContent from './TableroControlContent';
import TableroControlHeader from './TableroControlHeader';

const Encuesta = () => {
  return (
    <>
      <FusePageCarded
        classes={{
          content: 'flex',
          contentCard: 'overflow-hidden',
          header: 'min-h-172 h-172 sm:h-172 sm:min-h-172 my-10'
        }}
				content={<TableroControlContent />}
				header={<TableroControlHeader />}
        innerScroll
      />
    </>
  )
}

export default Encuesta;