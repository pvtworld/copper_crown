import proj4 from 'proj4'

export var SWEREFProjection = '+proj=tmerc +lat_0=0 +lon_0=18 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
export var WGS84Projection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

function convertPoint(fromProjection, toProjection, [long, lat]) {
    return proj4(fromProjection, toProjection, [long, lat])
}

export{convertPoint}