// src/types/farm.ts

export interface Farm {
  id: string;
  name: string;
  location: string;
  description: string;
  shortStory: string;
  images: string[];
  pricePerNight: number;
  comfortLevel: 'Basic' | 'Premium' | 'Luxury';
  amenities: string[];
  foodOfferings: string[];
  capacity: number;
  contact: {
    email: string;
    phone: string;
  };
  latitude: number;
  longitude: number;
}

export interface BookingRequest {
  farmId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}
