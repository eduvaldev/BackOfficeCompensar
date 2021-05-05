import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import GoogleMap from 'google-map-react';
import React from 'react';

function Marker({ text }) {
	return (
		<Tooltip placement="top" title={text}>
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}

const Map = ({ latitude, longitude }) => {
	console.log(latitude, longitude);
	return (
		<div className="w-full">
			<div className="h-512 w-full">
				<GoogleMap
					bootstrapURLKeys={{
						key: process.env.REACT_APP_MAP_KEY
					}}
					defaultCenter={[Number.parseFloat(latitude), Number.parseFloat(longitude)]}
					defaultZoom={12}
				>
					<Marker lat={Number.parseFloat(latitude)} lng={Number.parseFloat(longitude)} text="Hola" />
				</GoogleMap>
			</div>
		</div>
	);
};

export default Map;
