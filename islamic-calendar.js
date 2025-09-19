/**
 * Islamic Calendar / Hijri Date Utilities
 * 
 * This module provides conversions between Gregorian and Islamic (Hijri) calendar dates
 * and information about Islamic months and events.
 */

const moment = require('moment');
const hijri = require('moment-hijri');

/**
 * Convert Gregorian date to Hijri date
 * @param {string} gregorianDate - Date in YYYY-MM-DD format
 * @returns {Object} Hijri date information
 */
function gregorianToHijri(gregorianDate) {
    try {
        const date = moment(gregorianDate, 'YYYY-MM-DD');
        const hijriDate = hijri(date);
        
        return {
            gregorian: {
                date: date.format('YYYY-MM-DD'),
                formatted: date.format('dddd, MMMM DD, YYYY'),
                day_of_week: date.format('dddd'),
                day: date.date(),
                month: date.month() + 1,
                month_name: date.format('MMMM'),
                year: date.year()
            },
            hijri: {
                date: hijriDate.format('iYYYY-iMM-iDD'),
                formatted: hijriDate.format('iDD iMMMM iYYYY') + ' AH',
                day: hijriDate.iDate(),
                month: hijriDate.iMonth() + 1,
                month_name: getIslamicMonthName(hijriDate.iMonth() + 1),
                month_name_arabic: getIslamicMonthNameArabic(hijriDate.iMonth() + 1),
                year: hijriDate.iYear(),
                era: 'AH (After Hijra)'
            },
            islamic_info: {
                hijri_era_start: 'July 16, 622 CE - Migration of Prophet Muhammad (PBUH) from Mecca to Medina',
                calendar_type: 'Lunar calendar based on moon phases',
                note: 'Islamic dates may vary by 1-2 days depending on moon sighting'
            }
        };
    } catch (error) {
        throw new Error(`Failed to convert date: ${error.message}`);
    }
}

/**
 * Convert Hijri date to Gregorian date
 * @param {number} year - Hijri year
 * @param {number} month - Hijri month (1-12)
 * @param {number} day - Hijri day
 * @returns {Object} Gregorian date information
 */
function hijriToGregorian(year, month, day) {
    try {
        const hijriDate = hijri(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`, 'iYYYY-iMM-iDD');
        const gregorianDate = moment(hijriDate);
        
        return {
            hijri: {
                date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
                formatted: `${day} ${getIslamicMonthName(month)} ${year} AH`,
                day: day,
                month: month,
                month_name: getIslamicMonthName(month),
                month_name_arabic: getIslamicMonthNameArabic(month),
                year: year
            },
            gregorian: {
                date: gregorianDate.format('YYYY-MM-DD'),
                formatted: gregorianDate.format('dddd, MMMM DD, YYYY'),
                day_of_week: gregorianDate.format('dddd'),
                day: gregorianDate.date(),
                month: gregorianDate.month() + 1,
                month_name: gregorianDate.format('MMMM'),
                year: gregorianDate.year()
            }
        };
    } catch (error) {
        throw new Error(`Failed to convert Hijri date: ${error.message}`);
    }
}

/**
 * Get current Islamic date
 * @returns {Object} Current Islamic date information
 */
function getCurrentIslamicDate() {
    const today = moment();
    return gregorianToHijri(today.format('YYYY-MM-DD'));
}

/**
 * Get Islamic month name in English
 * @param {number} month - Month number (1-12)
 * @returns {string} Month name
 */
function getIslamicMonthName(month) {
    const months = [
        '', // 0 index placeholder
        'Muharram',
        'Safar', 
        'Rabi\' al-awwal',
        'Rabi\' al-thani',
        'Jumada al-awwal',
        'Jumada al-thani',
        'Rajab',
        'Sha\'ban',
        'Ramadan',
        'Shawwal',
        'Dhu al-Qi\'dah',
        'Dhu al-Hijjah'
    ];
    return months[month] || 'Unknown';
}

/**
 * Get Islamic month name in Arabic
 * @param {number} month - Month number (1-12) 
 * @returns {string} Arabic month name
 */
function getIslamicMonthNameArabic(month) {
    const monthsArabic = [
        '', // 0 index placeholder
        'مُحَرَّم',
        'صَفَر',
        'رَبِيع الْأَوَّل',
        'رَبِيع الثَّانِي',
        'جُمَادَىٰ الْأُولَىٰ',
        'جُمَادَىٰ الثَّانِيَة',
        'رَجَب',
        'شَعْبَان',
        'رَمَضَان',
        'شَوَّال',
        'ذُو الْقَعْدَة',
        'ذُو الْحِجَّة'
    ];
    return monthsArabic[month] || 'غير معروف';
}

/**
 * Get Islamic months information
 * @returns {Object} All Islamic months with details
 */
function getIslamicMonths() {
    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push({
            number: i,
            name_english: getIslamicMonthName(i),
            name_arabic: getIslamicMonthNameArabic(i),
            significance: getMonthSignificance(i)
        });
    }
    return {
        months: months,
        total_months: 12,
        calendar_info: {
            type: 'Lunar calendar',
            average_month_length: '29-30 days',
            year_length: '354-355 days (approximately 11 days shorter than solar year)'
        }
    };
}

/**
 * Get significance of Islamic month
 * @param {number} month - Month number
 * @returns {string} Month significance
 */
function getMonthSignificance(month) {
    const significance = {
        1: 'First month of Islamic calendar, one of the four sacred months. Ashura (10th day) is significant.',
        2: 'Second month. Some consider it unlucky, but Prophet Muhammad (PBUH) said this is superstition.',
        3: 'Birth month of Prophet Muhammad (PBUH). Contains Mawlid an-Nabi.',
        4: 'Fourth month of the Islamic calendar.',
        5: 'Fifth month of the Islamic calendar.',
        6: 'Sixth month of the Islamic calendar.',
        7: 'One of the four sacred months. Contains Isra and Mi\'raj (27th night).',
        8: 'Month before Ramadan. Prophet Muhammad (PBUH) used to fast frequently in this month.',
        9: 'Holy month of fasting (Ramadan). Contains Laylat al-Qadr (Night of Power).',
        10: 'Month of Eid al-Fitr. Celebration after Ramadan.',
        11: 'One of the four sacred months. Pilgrimage (Hajj) preparations begin.',
        12: 'Sacred month containing Hajj pilgrimage and Eid al-Adha.'
    };
    return significance[month] || 'Islamic month';
}

/**
 * Get upcoming Islamic events
 * @returns {Array} List of upcoming Islamic events
 */
function getIslamicEvents() {
    const currentHijri = getCurrentIslamicDate();
    const currentMonth = currentHijri.hijri.month;
    const currentYear = currentHijri.hijri.year;
    
    const events = [
        { month: 1, day: 1, name: 'Islamic New Year', description: 'Beginning of new Hijri year' },
        { month: 1, day: 10, name: 'Day of Ashura', description: 'Fasting day, martyrdom of Imam Hussein' },
        { month: 3, day: 12, name: 'Mawlid an-Nabi', description: 'Birth of Prophet Muhammad (PBUH)' },
        { month: 7, day: 27, name: 'Isra and Mi\'raj', description: 'Night Journey of Prophet Muhammad (PBUH)' },
        { month: 8, day: 15, name: 'Mid-Sha\'ban', description: 'Night of Forgiveness (Laylat al-Bara\'ah)' },
        { month: 9, day: 1, name: 'Start of Ramadan', description: 'Beginning of holy month of fasting' },
        { month: 9, day: 27, name: 'Laylat al-Qadr', description: 'Night of Power (estimated)' },
        { month: 10, day: 1, name: 'Eid al-Fitr', description: 'Festival of Breaking the Fast' },
        { month: 12, day: 8, name: 'Hajj begins', description: 'Start of pilgrimage to Mecca' },
        { month: 12, day: 10, name: 'Eid al-Adha', description: 'Festival of Sacrifice' }
    ];
    
    return {
        current_hijri_date: currentHijri,
        events: events,
        note: 'Exact dates may vary by location based on moon sighting'
    };
}

/**
 * Validate date parameters
 * @param {string} date - Date string or Hijri components
 * @returns {Object} Validation result
 */
function validateDateRequest(date) {
    if (date && !moment(date, 'YYYY-MM-DD', true).isValid()) {
        return {
            isValid: false,
            error: 'Date must be in YYYY-MM-DD format (e.g., 2025-09-19)'
        };
    }
    
    return {
        isValid: true
    };
}

/**
 * Validate Hijri date parameters
 * @param {number} year - Hijri year
 * @param {number} month - Hijri month
 * @param {number} day - Hijri day
 * @returns {Object} Validation result
 */
function validateHijriDate(year, month, day) {
    if (!Number.isInteger(year) || year < 1 || year > 2000) {
        return {
            isValid: false,
            error: 'Hijri year must be a valid integer between 1 and 2000'
        };
    }
    
    if (!Number.isInteger(month) || month < 1 || month > 12) {
        return {
            isValid: false,
            error: 'Hijri month must be between 1 and 12'
        };
    }
    
    if (!Number.isInteger(day) || day < 1 || day > 30) {
        return {
            isValid: false,
            error: 'Hijri day must be between 1 and 30'
        };
    }
    
    return {
        isValid: true
    };
}

module.exports = {
    gregorianToHijri,
    hijriToGregorian,
    getCurrentIslamicDate,
    getIslamicMonths,
    getIslamicEvents,
    validateDateRequest,
    validateHijriDate
};