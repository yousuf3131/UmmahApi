/**
 * Prayer Times Calculator
 * 
 * This module calculates the five daily prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha)
 * for any location on Earth using accurate astronomical calculations.
 */

const { Coordinates, CalculationMethod, Prayer, PrayerTimes } = require('adhan');
const moment = require('moment');

/**
 * Convert English numerals to Arabic-Indic numerals
 * @param {string} str - String containing English numerals (0-9)
 * @returns {string} String with Arabic-Indic numerals (٠-٩)
 */
function convertToArabicNumerals(str) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.replace(/[0-9]/g, (digit) => arabicNumerals[parseInt(digit)]);
}

/**
 * Calculate prayer times for a given location and date
 * @param {number} latitude - Latitude in degrees
 * @param {number} longitude - Longitude in degrees  
 * @param {string} date - Date in YYYY-MM-DD format (optional, defaults to today)
 * @param {string} method - Calculation method (optional, defaults to 'MuslimWorldLeague')
 * @param {string} numerals - Numeral system: 'english' or 'arabic' (optional, defaults to 'english')
 * @returns {Object} Prayer times with additional information
 */
function calculatePrayerTimes(latitude, longitude, date = null, method = 'MuslimWorldLeague', numerals = 'english') {
    try {
        // Set up coordinates
        const coordinates = new Coordinates(latitude, longitude);
        
        // Parse date or use current date
        const prayerDate = date ? moment(date).toDate() : new Date();
        
        // Select calculation method
        const calculationMethods = {
            'MuslimWorldLeague': CalculationMethod.MuslimWorldLeague(),
            'Egyptian': CalculationMethod.Egyptian(),
            'Karachi': CalculationMethod.Karachi(),
            'UmmAlQura': CalculationMethod.UmmAlQura(),
            'Dubai': CalculationMethod.Dubai(),
            'MoonsightingCommittee': CalculationMethod.MoonsightingCommittee(),
            'NorthAmerica': CalculationMethod.NorthAmerica(),
            'ISNA': CalculationMethod.NorthAmerica(), // Islamic Society of North America (alias for NorthAmerica)
            'Kuwait': CalculationMethod.Kuwait(),
            'Qatar': CalculationMethod.Qatar(),
            'Singapore': CalculationMethod.Singapore()
        };
        
        const params = calculationMethods[method] || calculationMethods.MuslimWorldLeague;
        
        // Calculate prayer times
        const prayerTimes = new PrayerTimes(coordinates, prayerDate, params);
        
        // Format times based on numeral preference
        const formatTime = (time) => {
            const timeStr = moment(time).format('HH:mm');
            return numerals === 'arabic' ? convertToArabicNumerals(timeStr) : timeStr;
        };
        
        const formatTimeWithSeconds = (time) => {
            const timeStr = moment(time).format('HH:mm:ss');
            return numerals === 'arabic' ? convertToArabicNumerals(timeStr) : timeStr;
        };
        
        // Get current prayer
        const currentPrayer = prayerTimes.currentPrayer();
        const nextPrayer = prayerTimes.nextPrayer();
        
        // Calculate time until next prayer
        const now = new Date();
        const nextPrayerTime = prayerTimes.timeForPrayer(nextPrayer);
        const timeUntilNext = nextPrayerTime ? moment(nextPrayerTime).diff(moment(now)) : null;
        
        return {
            date: numerals === 'arabic' ? convertToArabicNumerals(moment(prayerDate).format('YYYY-MM-DD')) : moment(prayerDate).format('YYYY-MM-DD'),
            location: {
                latitude: latitude,
                longitude: longitude
            },
            calculation_method: method,
            numeral_system: numerals,
            prayer_times: {
                fajr: formatTime(prayerTimes.fajr),
                sunrise: formatTime(prayerTimes.sunrise),
                dhuhr: formatTime(prayerTimes.dhuhr),
                asr: formatTime(prayerTimes.asr),
                maghrib: formatTime(prayerTimes.maghrib),
                isha: formatTime(prayerTimes.isha)
            },
            prayer_times_detailed: {
                fajr: formatTimeWithSeconds(prayerTimes.fajr),
                sunrise: formatTimeWithSeconds(prayerTimes.sunrise),
                dhuhr: formatTimeWithSeconds(prayerTimes.dhuhr),
                asr: formatTimeWithSeconds(prayerTimes.asr),
                maghrib: formatTimeWithSeconds(prayerTimes.maghrib),
                isha: formatTimeWithSeconds(prayerTimes.isha)
            },
            current_status: {
                current_prayer: currentPrayer,
                next_prayer: nextPrayer,
                time_until_next: timeUntilNext ? moment.duration(timeUntilNext).humanize() : null,
                minutes_until_next: timeUntilNext ? Math.floor(timeUntilNext / 60000) : null
            },
            islamic_info: {
                prayer_names: {
                    fajr: 'Fajr (Dawn Prayer)',
                    dhuhr: 'Dhuhr (Noon Prayer)', 
                    asr: 'Asr (Afternoon Prayer)',
                    maghrib: 'Maghrib (Sunset Prayer)',
                    isha: 'Isha (Night Prayer)'
                },
                note: 'Times are calculated using astronomical methods. Local mosque times may vary slightly.'
            }
        };
        
    } catch (error) {
        throw new Error(`Failed to calculate prayer times: ${error.message}`);
    }
}

/**
 * Get available calculation methods
 * @returns {Object} Available calculation methods with descriptions
 */
function getCalculationMethods() {
    return {
        'MuslimWorldLeague': {
            name: 'Muslim World League',
            description: 'General purpose method used in many countries',
            fajr_angle: '18°',
            isha_angle: '17°'
        },
        'Egyptian': {
            name: 'Egyptian General Authority of Survey',
            description: 'Used in Egypt and some Middle Eastern countries',
            fajr_angle: '19.5°',
            isha_angle: '17.5°'
        },
        'Karachi': {
            name: 'University of Islamic Sciences, Karachi',
            description: 'Used in Pakistan, Bangladesh, India, Afghanistan',
            fajr_angle: '18°',
            isha_angle: '18°'
        },
        'UmmAlQura': {
            name: 'Umm Al-Qura University, Makkah',
            description: 'Used in Saudi Arabia',
            fajr_angle: '18.5°',
            isha_description: '90 minutes after Maghrib'
        },
        'Dubai': {
            name: 'Dubai',
            description: 'Used in UAE',
            fajr_angle: '18.2°',
            isha_angle: '18.2°'
        },
        'MoonsightingCommittee': {
            name: 'Moonsighting Committee Worldwide',
            description: 'Recommended for North America',
            fajr_angle: '18°',
            isha_angle: '18°'
        },
        'NorthAmerica': {
            name: 'Islamic Society of North America (ISNA)',
            description: 'Used in North America',
            fajr_angle: '15°',
            isha_angle: '15°'
        },
        'ISNA': {
            name: 'Islamic Society of North America',
            description: 'Used in North America - alias for NorthAmerica method',
            fajr_angle: '15°',
            isha_angle: '15°'
        },
        'Kuwait': {
            name: 'Kuwait',
            description: 'Used in Kuwait',
            fajr_angle: '18°',
            isha_angle: '17.5°'
        },
        'Qatar': {
            name: 'Qatar',
            description: 'Used in Qatar',
            fajr_angle: '18°',
            isha_angle: '18°'
        },
        'Singapore': {
            name: 'Singapore',
            description: 'Used in Singapore and Malaysia',
            fajr_angle: '20°',
            isha_angle: '18°'
        }
    };
}

/**
 * Validate prayer times request parameters
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} date - Date string
 * @param {string} method - Calculation method
 * @param {string} numerals - Numeral system
 * @returns {Object} Validation result
 */
function validatePrayerTimesRequest(lat, lng, date, method, numerals) {
    // Validate coordinates (reuse from qibla.js)
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
    
    // Validate date if provided
    if (date && !moment(date, 'YYYY-MM-DD', true).isValid()) {
        return {
            isValid: false,
            error: 'Date must be in YYYY-MM-DD format (e.g., 2025-09-19)'
        };
    }
    
    // Validate method if provided
    if (method && !getCalculationMethods()[method]) {
        const availableMethods = Object.keys(getCalculationMethods()).join(', ');
        return {
            isValid: false,
            error: `Invalid calculation method. Available methods: ${availableMethods}`
        };
    }
    
    // Validate numerals if provided
    if (numerals && !['english', 'arabic'].includes(numerals)) {
        return {
            isValid: false,
            error: 'Invalid numeral system. Use "english" for 0-9 or "arabic" for ٠-٩'
        };
    }
    
    return {
        isValid: true
    };
}

module.exports = {
    calculatePrayerTimes,
    getCalculationMethods,
    validatePrayerTimesRequest
};