export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  rating: number;
  price: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  category: 'Wildlife' | 'Adventure' | 'Cultural' | 'Nature' | 'Marine';
  highlights: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Tour {
  id: string;
  destinationId: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  duration: string;
  maxGroupSize: number;
  includedServices: string[];
  excludedServices: string[];
  itinerary: TourDay[];
  guide: Guide;
  availableDates: string[];
  rating: number;
  reviewCount: number;
}

export interface TourDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation?: string;
}

export interface Guide {
  id: string;
  name: string;
  avatar: string;
  experience: string;
  languages: string[];
  rating: number;
  specializations: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    favoriteCategories: string[];
    budget: {
      min: number;
      max: number;
    };
    travelStyle: 'Budget' | 'Comfort' | 'Luxury';
  };
}

export interface Booking {
  id: string;
  tourId: string;
  userId: string;
  selectedDate: string;
  travelers: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  paymentStatus: 'Pending' | 'Paid' | 'Refunded';
  bookingDate: string;
}

export interface Review {
  id: string;
  tourId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}
