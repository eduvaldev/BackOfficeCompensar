import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectNavigation } from 'app/store/fuse/navigationSlice';

function Navigation(props) {
	const navigation = useSelector(selectNavigation);

	return (
		<FuseNavigation
      active={props.active}
			className={clsx('navigation', props.className)}
			dense={props.dense}
			layout={props.layout}
			navigation={navigation}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
