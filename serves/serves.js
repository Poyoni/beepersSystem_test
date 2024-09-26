import { Longitude, Latitude } from '../models/constants.js';
export const checkLocation = (LAT, LON) => {
    for (let i = 0; i < Longitude.length; i++) {
        if (Longitude[i] === LON && Latitude[i] === LAT) {
            return true;
        }
    }
    return false;
};
