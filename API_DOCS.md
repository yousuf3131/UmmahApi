# Qibla Direction API Documentation 🕋

## Overview

The Qibla Direction API is a free, public REST API that calculates the prayer direction (Qibla) towards the Kaaba in Mecca from any location on Earth. This service is provided as **sadaqah jariah** (continuous charity) for the benefit of the Muslim ummah worldwide.

## Base URL

```
https://your-domain.com/api
```

For local development:
```
http://localhost:3000/api
```

## Authentication

**No authentication required** - This is a completely free public API.

## Rate Limiting

- **100 requests per 15 minutes** per IP address
- Rate limit headers are included in responses
- Exceeding limits returns HTTP 429 with retry information

## Endpoints

### 1. Calculate Qibla Direction

**GET** `/qibla`

Calculate the Qibla direction from your coordinates to the Kaaba.

#### Parameters

| Parameter | Type | Required | Range | Description |
|-----------|------|----------|--------|-------------|
| `lat` or `latitude` | number | Yes | -90 to 90 | Your latitude coordinate |
| `lng` or `longitude` | number | Yes | -180 to 180 | Your longitude coordinate |

#### Example Requests

```bash
# Using lat/lng parameters
curl "https://your-domain.com/api/qibla?lat=40.7128&lng=-74.0060"

# Using latitude/longitude parameters  
curl "https://your-domain.com/api/qibla?latitude=40.7128&longitude=-74.0060"

# From London, UK
curl "https://your-domain.com/api/qibla?lat=51.5074&lng=-0.1278"

# From Jakarta, Indonesia
curl "https://your-domain.com/api/qibla?lat=-6.2088&lng=106.8456"
```

#### Success Response (200 OK)

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
  },
  "timestamp": "2024-01-01T12:00:00.000Z",
  "api_info": {
    "sadaqah_jariah": "This API is provided as sadaqah jariah for the Muslim ummah",
    "usage": "Free for everyone"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `qibla_direction` | number | Bearing in degrees (0-360°) where 0° is North |
| `compass_bearing` | string | Compass direction (N, NE, ENE, E, etc.) |
| `location` | object | Your provided coordinates |
| `kaaba_coordinates` | object | Kaaba's coordinates in Mecca |
| `distance_km` | number | Great circle distance to Kaaba in kilometers |
| `timestamp` | string | ISO timestamp of the calculation |

#### Error Responses

**400 Bad Request - Missing Parameters**
```json
{
  "success": false,
  "error": "Missing required parameters",
  "message": "Please provide both latitude and longitude",
  "example": "/api/qibla?lat=40.7128&lng=-74.0060",
  "required_params": {
    "lat": "Latitude (-90 to 90)",
    "lng": "Longitude (-180 to 180)"
  }
}
```

**400 Bad Request - Invalid Coordinates**
```json
{
  "success": false,
  "error": "Invalid coordinates",
  "message": "Latitude must be between -90 and 90 degrees",
  "provided": {
    "latitude": "invalid_value",
    "longitude": "-74.0060"
  }
}
```

**429 Too Many Requests**
```json
{
  "success": false,
  "error": "Too many requests, please try again later",
  "retry_after": "15 minutes"
}
```

### 2. Health Check

**GET** `/health`

Check the API service status.

#### Example Request
```bash
curl "https://your-domain.com/api/health"
```

#### Response (200 OK)
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 3600.45,
  "version": "1.0.0"
}
```

### 3. API Documentation

**GET** `/docs`

Get comprehensive API documentation in JSON format.

#### Example Request
```bash
curl "https://your-domain.com/api/docs"
```

## Usage Examples

### JavaScript/Node.js

```javascript
async function getQiblaDirection(latitude, longitude) {
  try {
    const response = await fetch(
      `https://your-domain.com/api/qibla?lat=${latitude}&lng=${longitude}`
    );
    const data = await response.json();
    
    if (data.success) {
      console.log(`Qibla direction: ${data.data.qibla_direction}°`);
      console.log(`Compass bearing: ${data.data.compass_bearing}`);
      console.log(`Distance to Kaaba: ${data.data.distance_km} km`);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}

// Example: Get Qibla from New York City
getQiblaDirection(40.7128, -74.0060);
```

### Python

```python
import requests

def get_qibla_direction(latitude, longitude):
    url = f"https://your-domain.com/api/qibla"
    params = {'lat': latitude, 'lng': longitude}
    
    try:
        response = requests.get(url, params=params)
        data = response.json()
        
        if data['success']:
            qibla_data = data['data']
            print(f"Qibla direction: {qibla_data['qibla_direction']}°")
            print(f"Compass bearing: {qibla_data['compass_bearing']}")
            print(f"Distance to Kaaba: {qibla_data['distance_km']} km")
        else:
            print(f"Error: {data['error']}")
    except Exception as e:
        print(f"Request failed: {e}")

# Example: Get Qibla from London
get_qibla_direction(51.5074, -0.1278)
```

### PHP

```php
<?php
function getQiblaDirection($latitude, $longitude) {
    $url = "https://your-domain.com/api/qibla?" . http_build_query([
        'lat' => $latitude,
        'lng' => $longitude
    ]);
    
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    
    if ($data['success']) {
        $qiblaData = $data['data'];
        echo "Qibla direction: " . $qiblaData['qibla_direction'] . "°\n";
        echo "Compass bearing: " . $qiblaData['compass_bearing'] . "\n";
        echo "Distance to Kaaba: " . $qiblaData['distance_km'] . " km\n";
    } else {
        echo "Error: " . $data['error'] . "\n";
    }
}

// Example: Get Qibla from Jakarta
getQiblaDirection(-6.2088, 106.8456);
?>
```

### curl (Command Line)

```bash
# Basic request
curl "https://your-domain.com/api/qibla?lat=40.7128&lng=-74.0060"

# Pretty print JSON response
curl -s "https://your-domain.com/api/qibla?lat=40.7128&lng=-74.0060" | jq

# Include headers to see rate limiting info
curl -i "https://your-domain.com/api/qibla?lat=40.7128&lng=-74.0060"
```

## Mathematical Details

### Calculation Method
- Uses **great circle bearing** calculation with spherical trigonometry
- Formula: `θ = atan2(sin(Δlong).cos(lat2), cos(lat1).sin(lat2) − sin(lat1).cos(lat2).cos(Δlong))`
- Results normalized to 0-360° range (0° = North, 90° = East, 180° = South, 270° = West)

### Kaaba Coordinates
- **Latitude:** 21.4225° N
- **Longitude:** 39.8262° E
- Location: Masjid al-Haram, Mecca, Saudi Arabia

### Accuracy
- Bearing calculations rounded to 2 decimal places
- Distance calculations use the Haversine formula
- Suitable for prayer direction determination

## Error Handling

The API uses standard HTTP status codes:

- **200 OK** - Successful calculation
- **400 Bad Request** - Invalid or missing parameters
- **429 Too Many Requests** - Rate limit exceeded
- **404 Not Found** - Endpoint not found
- **500 Internal Server Error** - Server error

All error responses include:
- `success: false`
- `error` field with error type
- `message` field with human-readable description
- Additional context where applicable

## CORS Policy

- **All origins allowed** (`*`) for public access
- **GET method only** supported
- **Standard headers** allowed

## Privacy & Data

- **No user data stored** - All calculations are stateless
- **No authentication required** - Completely anonymous
- **No tracking or analytics** - Privacy-focused service
- **Open source** - Transparent implementation

## Support & Contribution

### Issues & Questions
- Report bugs or request features on GitHub
- This is a community service - please be patient and respectful

### Donations (Sadaqah)
This API is provided free as sadaqah jariah. If you benefit from it:
- Please make dua for the developers and all Muslims
- Consider making sadaqah to your local Islamic charity
- Share this API with other developers who might benefit

### Technical Support
- Check the `/health` endpoint if you're experiencing issues
- Review rate limiting if requests are being rejected
- Validate your coordinates are within the correct ranges

## License

This API is provided under the MIT License - free for everyone to use, modify, and distribute.

---

**"And whoever does good deeds, whether male or female, while being a believer - those will enter Paradise and will not be wronged even as much as the speck on a date seed."** - Quran 4:124

**May Allah accept this service as sadaqah jariah and benefit the entire ummah. Ameen.**