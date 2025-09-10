// App Colors
export const Colors = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  secondary: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308', // Main yellow
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  white: '#ffffff',
  black: '#000000',
};

// App Theme
export const Theme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      lineHeight: 38,
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold' as const,
      lineHeight: 34,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 30,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 26,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal' as const,
      lineHeight: 22,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal' as const,
      lineHeight: 18,
    },
    small: {
      fontSize: 12,
      fontWeight: 'normal' as const,
      lineHeight: 16,
    },
  },
};

// App Configuration
export const Config = {
  APP_NAME: 'EcoTourism',
  API_BASE_URL: __DEV__ 
    ? 'http://localhost:3000/api' 
    : 'https://api.ecotourism.com',
  DEFAULT_CURRENCY: 'USD',
  DEFAULT_LANGUAGE: 'en',
  ITEMS_PER_PAGE: 10,
  MAX_SEARCH_HISTORY: 10,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

// App Routes
export const Routes = {
  HOME: 'Home',
  DESTINATIONS: 'Destinations',
  DESTINATION_DETAILS: 'DestinationDetails',
  TOURS: 'Tours',
  TOUR_DETAILS: 'TourDetails',
  SEARCH: 'Search',
  PROFILE: 'Profile',
  BOOKINGS: 'Bookings',
  FAVORITES: 'Favorites',
  SETTINGS: 'Settings',
  LOGIN: 'Login',
  REGISTER: 'Register',
} as const;
