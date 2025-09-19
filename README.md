# Islamic Services API 🕋

A comprehensive, free Islamic services API providing essential tools for the Muslim community worldwide.

## Sadaqah Jariah Project

This API is created as a sadaqah jariah - a continuous charity that benefits the global Muslim ummah by providing free Islamic services including prayer times, Qibla direction, Islamic calendar, and more.

## 🌟 Services Available

- **🧭 Qibla Direction** - Find prayer direction to Mecca from anywhere
- **🕌 Prayer Times** - Accurate prayer times for any location
- **📅 Islamic Calendar** - Hijri date conversions and Islamic events
- **📿 99 Names of Allah** - Asma ul Husna with meanings
- **📖 Quran Verses** - Random verses with translations
- **🕋 Islamic Information** - Various Islamic utilities

## Quick Start

### Base URL
```
https://ummahapi.com/api
```

### Example Services
```bash
# Qibla Direction
GET /qibla?lat=40.7128&lng=-74.0060

# Prayer Times (with madhab support)
GET /prayer-times?lat=40.7128&lng=-74.0060&date=2025-09-19&madhab=Hanafi

# Islamic Calendar
GET /hijri-date?date=2025-09-19

# 99 Names of Allah
GET /asma-ul-husna

# Random Quran Verse
GET /quran/random
```

### Example Response
```json
{
  "success": true,
  "data": {
    "qibla_direction": 58.48,
    "compass_bearing": "ENE",
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "kaaba_coordinates": {
      "latitude": 21.4225,
      "longitude": 39.8262
    },
    "distance_km": 9534.12
  }
}
```

## Installation & Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Production server: `npm start`

## License

MIT License - Free for everyone to use

---

**May Allah accept this as sadaqah jariah and benefit the ummah. Ameen.**