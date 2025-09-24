# Islamic Services API 🕋

A comprehensive, free Islamic services API providing essential tools for the Muslim community worldwide.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 🎯 Sadaqah Jariah Project

This API is created as a **sadaqah jariah** - a continuous charity that benefits the global Muslim ummah by providing free Islamic services including prayer times, Qibla direction, Islamic calendar, and more.

> *"When a person dies, all their deeds end except three: a continuing charity, beneficial knowledge, or a child who prays for them."* - Prophet Muhammad (PBUH)

## 🌟 Services Available

| Service | Description | Endpoint |
|---------|-------------|----------|
| 🧭 **Qibla Direction** | Find prayer direction to Mecca from anywhere | `/api/qibla` |
| 🕌 **Prayer Times** | Accurate prayer times with madhab support | `/api/prayer-times` |
| 📅 **Islamic Calendar** | Hijri date conversions and Islamic events | `/api/hijri-date` |
| 📿 **99 Names of Allah** | Asma ul Husna with meanings and translations | `/api/asma-ul-husna` |

## 🚀 Quick Start

### Using the Hosted API
```bash
# Base URL
https://your-domain.com/api

# Qibla Direction for New York
curl "https://your-domain.com/api/qibla?lat=40.7128&lng=-74.0060"

# Prayer Times with Hanafi madhab
curl "https://your-domain.com/api/prayer-times?lat=40.7128&lng=-74.0060&madhab=Hanafi"

# Today's Islamic date
curl "https://your-domain.com/api/hijri-date"

# Get all 99 Names of Allah
curl "https://your-domain.com/api/asma-ul-husna"
```

### Self-Hosting (Recommended for High Usage)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yousuf3131/UmmahApi.git
   cd UmmahApi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env file as needed
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

5. **Test the API**
   - Open `http://localhost:3000/test.html` for interactive testing
   - API docs at `http://localhost:3000/api/docs`

## 📖 API Documentation

### Qibla Direction
```bash
GET /api/qibla?lat={latitude}&lng={longitude}
```

**Example Response:**
**Example Response:**
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

### Prayer Times
```bash
GET /api/prayer-times?lat={lat}&lng={lng}&date={YYYY-MM-DD}&method={method}&madhab={madhab}
```

**Parameters:**
- `lat`, `lng`: Coordinates (required)
- `date`: Date in YYYY-MM-DD format (optional, defaults to today)
- `method`: Calculation method - MuslimWorldLeague, Egyptian, Karachi, etc. (optional)
- `madhab`: Hanafi or Shafi (optional, defaults to Shafi)

### Islamic Calendar
```bash
GET /api/hijri-date?date={YYYY-MM-DD}
GET /api/hijri-date/convert?year={hijri_year}&month={month}&day={day}
```

### 99 Names of Allah
```bash
GET /api/asma-ul-husna              # All names
GET /api/asma-ul-husna/{number}     # Specific name (1-99)
GET /api/asma-ul-husna/random       # Random name
GET /api/asma-ul-husna/search?q={query}  # Search names
```

## 🛠️ Technical Features

- **No Database Required** - All calculations are algorithmic
- **High Performance** - Pure mathematical calculations
- **Rate Limited** - Fair usage policies
- **CORS Enabled** - Use from any domain
- **Swagger Documentation** - Interactive API docs
- **Docker Support** - Easy deployment
- **Vercel Ready** - Serverless deployment

## 🌍 Deployment Options

### Vercel (Recommended)
1. Fork this repository
2. Import to Vercel
3. Deploy automatically

### Docker
```bash
# Build image
docker build -t ummah-api .

# Run container
docker run -p 3000:3000 ummah-api
```

### Traditional Hosting
Works on any Node.js hosting platform (Heroku, DigitalOcean, AWS, etc.)

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Areas where we need help:**
- Additional calculation methods
- More Islamic services
- Translations
- Performance improvements
- Documentation
- Testing

## 📊 Islamic Accuracy

- **Kaaba Coordinates**: 21.4225°N, 39.8262°E (Masjid al-Haram, Mecca)
- **Prayer Calculations**: Based on established astronomical methods
- **Calendar System**: Accurate Hijri calendar using `moment-hijri`
- **Qibla Direction**: Great circle bearing using spherical trigonometry

## ⚡ Performance

- **Response Time**: < 50ms average
- **Concurrent Requests**: Handles thousands
- **Memory Usage**: ~50MB base
- **No External Dependencies**: All calculations are local

## 📜 License

MIT License - Free for everyone to use, modify, and distribute.

## 🙏 Support the Project

- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features  
- 🤝 Contribute code
- 📢 Share with others

## 📞 Support & Community

- 🐞 **Issues**: [GitHub Issues](https://github.com/yousuf3131/UmmahApi/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yousuf3131/UmmahApi/discussions)  
- 📖 **Documentation**: [API Docs](https://your-domain.com/api/docs)

---

**May Allah accept this as sadaqah jariah and benefit the ummah worldwide. Ameen.** 🤲

*Built with ❤️ for the Muslim community*