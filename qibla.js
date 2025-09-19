/**
 * Qibla Direction Calculator
 * 
 * This module calculates the direction (bearing) from any point on Earth
 * to the Kaaba in Mecca, Saudi Arabia.
 * 
 * The Kaaba coordinates: 21.4225° N, 39.8262° E
 */

// Kaaba coordinates in Mecca, Saudi Arabia
const KAABA_LATITUDE = 21.4225;
const KAABA_LONGITUDE = 39.8262;

/**
 * Convert degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} Angle in radians
 */
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 * @param {number} radians - Angle in radians
 * @returns {number} Angle in degrees
 */
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

/**
 * Calculate the bearing (direction) from one point to another
 * Uses the forward azimuth formula for spherical coordinates
 * 
 * @param {number} lat1 - Starting latitude in degrees
 * @param {number} lng1 - Starting longitude in degrees
 * @param {number} lat2 - Destination latitude in degrees
 * @param {number} lng2 - Destination longitude in degrees
 * @returns {number} Bearing in degrees (0-360, where 0 is North)
 */
function calculateBearing(lat1, lng1, lat2, lng2) {
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δλ = toRadians(lng2 - lng1);

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

    const θ = Math.atan2(y, x);
    
    // Convert to degrees and normalize to 0-360
    const bearing = (toDegrees(θ) + 360) % 360;
    
    return bearing;
}

/**
 * Calculate the great circle distance between two points on Earth
 * Uses the Haversine formula
 * 
 * @param {number} lat1 - Starting latitude in degrees
 * @param {number} lng1 - Starting longitude in degrees
 * @param {number} lat2 - Destination latitude in degrees
 * @param {number} lng2 - Destination longitude in degrees
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lng2 - lng1);

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

/**
 * Convert bearing to compass direction
 * @param {number} bearing - Bearing in degrees (0-360)
 * @returns {string} Compass direction (e.g., "N", "NE", "ENE", etc.)
 */
function bearingToCompass(bearing) {
    const directions = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE", 
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
    ];
    
    const index = Math.round(bearing / 22.5) % 16;
    return directions[index];
}

/**
 * Calculate Qibla direction from given coordinates
 * @param {number} latitude - User's latitude (-90 to 90)
 * @param {number} longitude - User's longitude (-180 to 180)
 * @returns {Object} Qibla calculation results
 */
function calculateQibla(latitude, longitude) {
    // Calculate bearing to Kaaba
    const bearing = calculateBearing(latitude, longitude, KAABA_LATITUDE, KAABA_LONGITUDE);
    
    // Calculate distance to Kaaba
    const distance = calculateDistance(latitude, longitude, KAABA_LATITUDE, KAABA_LONGITUDE);
    
    // Get compass direction
    const compass = bearingToCompass(bearing);
    
    return {
        qibla_direction: Math.round(bearing * 100) / 100, // Round to 2 decimal places
        compass_bearing: compass,
        location: {
            latitude: latitude,
            longitude: longitude
        },
        kaaba_coordinates: {
            latitude: KAABA_LATITUDE,
            longitude: KAABA_LONGITUDE
        },
        distance_km: Math.round(distance * 100) / 100 // Round to 2 decimal places
    };
}

/**
 * Validate latitude and longitude coordinates
 * @param {number} lat - Latitude to validate
 * @param {number} lng - Longitude to validate
 * @returns {Object} Validation result with isValid boolean and error message
 */
function validateCoordinates(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
        return {
            isValid: false,
            error: 'Latitude and longitude must be numbers'
        };
    }
    
    if (isNaN(lat) || isNaN(lng)) {
        return {
            isValid: false,
            error: 'Latitude and longitude must be valid numbers'
        };
    }
    
    if (lat < -90 || lat > 90) {
        return {
            isValid: false,
            error: 'Latitude must be between -90 and 90 degrees'
        };
    }
    
    if (lng < -180 || lng > 180) {
        return {
            isValid: false,
            error: 'Longitude must be between -180 and 180 degrees'
        };
    }
    
    return {
        isValid: true
    };
}

module.exports = {
    calculateQibla,
    validateCoordinates,
    KAABA_LATITUDE,
    KAABA_LONGITUDE
};