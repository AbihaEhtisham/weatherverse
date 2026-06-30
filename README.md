# WeatherVerse — Full Stack Weather Intelligence Platform

**PM Accelerator Technical Assessment — Full Stack Engineering Role**

A comprehensive weather intelligence platform that provides real-time weather data, 5-day forecasts, trip planning with day scoring, activity and clothing recommendations, city comparison, and full CRUD history management.

---

## 🚀 Features

### Core Features
- **Smart Location Search** — Search by city name, ZIP/postal code, GPS coordinates, or landmarks
- **Current Weather** — Temperature, feels like, humidity, wind, UV index, visibility, pressure, and air quality
- **5-Day Forecast** — Detailed daily forecast with high/low temps, rain chance, and conditions
- **Geolocation Support** — Get weather for your current location with one click

### Standout Features
- **⭐ Trip Planner** — Intelligent day scoring algorithm that finds the best day to visit
- **🧠 Decision Assistant** — Rule-based recommendations for clothing and activities
- **🗺️ Google Maps Integration** — Visualize any searched location on an embedded map
- **📊 Compare Cities** — Side-by-side weather comparison for two locations
- **📝 Full CRUD History** — All searches are saved; view, edit, and delete past records
- **📤 Data Export** — Export history to JSON or CSV formats
- **🎨 Dynamic Backgrounds** — UI theme changes based on weather conditions (sunny, rainy, snowy, etc.)
- **✅ Error Handling** — Graceful error messages for invalid locations, API failures, and network issues

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | SQLite + Prisma ORM |
| **Weather API** | WeatherAPI.com |
| **Maps** | Google Maps Embed API |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Validation** | Zod |
| **Deployment** | Vercel |

---

## 📦 Prerequisites

- Node.js 18+
- npm or yarn
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
- A Google Maps API key (optional, for map display)

---

## 🔧 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/weatherverse.git
cd weatherverse