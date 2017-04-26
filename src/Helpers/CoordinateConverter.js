import proj4 from 'proj4';

const SWEREFProjection = '+proj=tmerc +lat_0=0 +lon_0=18 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
const WGS84Projection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

export function convertPoint(long, lat) {
    return proj4(WGS84Projection, SWEREFProjection, [long, lat]);
}

