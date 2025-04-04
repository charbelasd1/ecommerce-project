// Environment configuration for development environment
export const environment = {
  // Flag to indicate if we're in production mode
  production: false,

  // Base URL for authentication service endpoints
  authURL: 'http://173.249.40.235:5005/api/',

  // Firebase configuration for authentication and analytics
  firebase: {
    // Firebase API key for project authentication
    apiKey: "AIzaSyC3fab5pYNqTJrdKOTDzNkodglvIPLpp7o",
    // Firebase Auth domain for handling authentication UI/flows
    authDomain: "auth-inm.firebaseapp.com",
    // Firebase project ID for project identification
    projectId: "auth-inm",
    // Firebase storage bucket for file uploads
    storageBucket: "auth-inm.firebasestorage.app",
    // Firebase messaging sender ID for push notifications
    messagingSenderId: "710953281707",
    // Unique identifier for this Firebase app instance
    appId: "1:710953281707:web:e0a6c5987189da3fcd2fee",
    // Google Analytics measurement ID for tracking
    measurementId: "G-WXM3LNB3L2"
  },

  // Base URL for the Fake Store API that provides product data
  apiURL: 'https://fakestoreapi.com/'
}