# Eco-Tourism Backend API - Authentication Only

A simplified Node.js backend API for authentication in the Eco-Tourism mobile application using Firebase and Express.js.

## 🚀 Features

- **Authentication**: Firebase Auth integration with custom JWT tokens
- **User Management**: Basic profile operations
- **Database**: Firestore for user data storage
- **API Security**: Helmet, CORS, Rate limiting
- **Validation**: Joi schema validation for auth endpoints
- **Error Handling**: Centralized error handling
- **Logging**: Morgan for request logging

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   │   ├── firebase.js # Firebase configuration
│   │   └── config.js   # App configuration
│   ├── controllers/    # Business logic
│   │   ├── authController.js # Authentication logic
│   │   └── userController.js # User profile management
│   ├── middleware/     # Custom middleware
│   │   ├── auth.js     # Authentication middleware
│   │   ├── errorHandler.js # Error handling
│   │   └── validation.js   # Input validation
│   ├── routes/         # API routes
│   │   ├── auth.js     # Auth endpoints
│   │   └── users.js    # User endpoints
│   └── app.js          # Main application file
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore file
└── package.json       # Dependencies and scripts
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication, Firestore, and Storage
4. Go to Project Settings > Service Accounts
5. Generate a new private key (JSON file)
6. Extract the credentials for your .env file

### 3. Environment Configuration

1. Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

2. Fill in your Firebase credentials in the `.env` file

### 4. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/signout` - Logout user
- `POST /api/auth/forgot-password` - Send password reset email
- `GET /api/auth/verify-token` - Verify JWT token
- `POST /api/auth/refresh-token` - Refresh JWT token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get public user info

## 🔧 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

### Testing

The API includes a health check endpoint:
```bash
GET http://localhost:3000/health
```

## 🚀 Deployment

1. Set environment variables on your hosting platform
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## 📱 Mobile App Integration

This backend is designed to work with the React Native Expo app. Make sure to:

1. Update the API base URL in your mobile app
2. Handle authentication tokens properly
3. Implement proper error handling

## 🔐 Security Features

- Helmet for security headers
- CORS configuration
- Rate limiting
- JWT token authentication
- Firebase Auth integration
- Request validation with Joi
- Error handling without sensitive data exposure

## 📝 License

MIT License - see LICENSE file for details
