# 🌍 User Location Tracking System

> **Built with ❤️ by MD Affan Asghar**  
> [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/mdaffanasghar)  
> [![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/affancoder)

A full-stack web application for capturing, storing, and managing user location data with an interactive dashboard.

A full-stack web application for capturing, storing, and managing user location data with an interactive dashboard.

## ✨ Features

### User Form
- 📝 User information collection
- 📍 Automatic GPS location detection
- 🏠 Reverse geocoding for address details
- 📱 Mobile-responsive form design

### Admin Dashboard
- 📊 Interactive data visualization
- 🔍 Advanced search and filtering
- 📱 Responsive design for all devices
- 📱 Mobile-optimized table view
- 🔄 Real-time data refresh
- 📋 User details modal with map view
- 📱 Touch-friendly interface

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive Design with Flexbox/Grid
- Google Maps JavaScript API
- Modern UI/UX Principles

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- RESTful API Architecture
- Environment-based Configuration

### APIs
- Web Geolocation API
- Google Maps Geocoding API
- Google Maps Embed API

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account
- Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Track-User-Location.git
   cd Track-User-Location
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update with your credentials:
     ```
     MONGODB_URI=your_mongodb_connection_string
     GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     PORT=3000
     ```

4. **Start the application**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Access the application**
   - User Form: `http://localhost:3000`
   - Dashboard: `http://localhost:3000/dashboard.html`

## 📱 Mobile Support
- Fully responsive design
- Touch-optimized interface
- Mobile-first approach
- Offline capabilities

## 🔍 Features in Detail

### Dashboard Features
- **Responsive Data Table**
  - Horizontal scrolling on mobile
  - Sortable columns
  - Pagination
  - Search and filter functionality

- **User Management**
  - View detailed user information
  - Filter users by location status
  - Export data (CSV/JSON)

- **Interactive Map**
  - View user locations on a map
  - Click markers for details
  - Zoom and pan functionality

## 👨‍💻 About the Developer

**MD Affan Asghar**  
Full Stack Developer | Web & Mobile Applications  
📍 Based in India  
📧 affanasghar786@example.com  

### Skills
- Frontend: React, Angular, Vue.js
- Backend: Node.js, Express, Django
- Mobile: React Native, Flutter
- Databases: MongoDB, PostgreSQL, Firebase
- DevOps: Docker, AWS, CI/CD

### Connect with Me
- [Portfolio](https://affancoder.dev) (Example)
- [GitHub](https://github.com/affancoder)
- [LinkedIn](https://linkedin.com/in/affan-asghar)
- [Twitter](https://twitter.com/affancoder)

## Project Structure

- `index.html` - Main frontend interface with form and location tracking
- `style.css` - Styling for the application
- `server.js` - Express server with MongoDB integration
- `.env` - Environment variables for MongoDB connection

## MongoDB Schema

The application stores user data with the following schema:

```javascript
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  age: Number,
  gender: String,
  location: {
    latitude: Number,
    longitude: Number,
    accuracy: Number,
    timestamp: Date
  },
  exactLocationData: {
    fullAddress: String,
    placeId: String,
    components: Array,
    types: Array
  },
  locationCaptured: Boolean,
  submittedAt: { type: Date, default: Date.now }
});
```

## Troubleshooting

### MongoDB Connection Issues

- **Authentication Failed**: If you see `bad auth : authentication failed` error, check that:
  - Your username and password in the connection string are correct
  - The database user has the proper permissions
  - There are no special characters in your password that need URL encoding

- **Connection Timeout**: If the connection times out:
  - Check your network connection
  - Verify that your IP address is whitelisted in MongoDB Atlas Network Access settings

### Form Submission Errors

- **Missing Fields**: Ensure all required fields (firstName, lastName, email) are filled out
- **Server Not Running**: Make sure the Node.js server is running before submitting the form
- **Port Already in Use**: If port 3000 is already in use, change the PORT value in your .env file