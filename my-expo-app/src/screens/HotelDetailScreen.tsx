import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Linking,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface HotelDetailScreenProps {
  hotel?: {
    id: string;
    name: string;
    category: string;
    location: string;
    distance: string;
    rating: number;
    reviewCount: number;
    price: number;
    certification: string;
    description: string;
    images: string[];
    facilities: string[];
    contact: {
      phone: string;
      email: string;
      website: string;
    };
    reviews: Review[];
  };
  onNavigateBack?: () => void;
  onNavigateToReviews?: () => void;
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface Amenity {
  id: string;
  name: string;
  icon: string;
}

const HotelDetailScreen: React.FC<HotelDetailScreenProps> = ({ 
  hotel = {
    id: '1',
    name: 'EcoLux Paradise Resort',
    category: 'Resort',
    location: 'Maldives, Indian Ocean',
    distance: '2.5km from airport',
    rating: 4.8,
    reviewCount: 247,
    price: 299,
    certification: 'Eco Certified',
    description: 'Experience sustainable luxury at its finest with our eco-certified resort featuring solar-powered villas, organic gardens, and coral reef preservation. Perfect for conscious travelers seeking bliss without compromise.',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&h=600&fit=crop'
    ],
    facilities: ['WiFi', 'Pool', 'Restaurant', 'Spa', 'Gym', 'Parking', 'AC', 'Eco Tours'],
    contact: {
      phone: '+960 123 4567',
      email: 'info@ecoluxparadise.com',
      website: 'www.ecoluxparadise.com'
    },
    reviews: [
      {
        id: '1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        date: '2 days ago',
        comment: 'Amazing eco-friendly resort! The staff was incredibly welcoming and the facilities were top notch. Loved the coral restoration program.'
      },
      {
        id: '2',
        userName: 'Mike Chen',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4,
        date: '1 week ago',
        comment: 'Great location and beautiful rooms. The organic food was delicious. Only minor issue was WiFi speed in some areas.'
      },
      {
        id: '3',
        userName: 'Emma Wilson',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Perfect for a sustainable vacation! The solar-powered villas are impressive and the snorkeling tours were unforgettable.'
      }
    ]
  },
  onNavigateBack,
  onNavigateToReviews
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const amenities: Amenity[] = [
    { id: '1', name: 'Free WiFi', icon: '📶' },
    { id: '2', name: 'Pool', icon: '🏊' },
    { id: '3', name: 'Restaurant', icon: '🍴' },
    { id: '4', name: 'Spa', icon: '🧘' },
    { id: '5', name: 'Gym', icon: '💪' },
    { id: '6', name: 'Parking', icon: '🚗' },
    { id: '7', name: 'AC', icon: '❄️' },
    { id: '8', name: 'Eco Tours', icon: '🌿' },
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {[...Array(fullStars)].map((_, index) => (
          <Text key={`full-${index}`} style={{ color: '#fbbf24', fontSize: 16 }}>★</Text>
        ))}
        {hasHalfStar && <Text style={{ color: '#fbbf24', fontSize: 16 }}>☆</Text>}
        {[...Array(emptyStars)].map((_, index) => (
          <Text key={`empty-${index}`} style={{ color: '#e5e7eb', fontSize: 16 }}>☆</Text>
        ))}
      </View>
    );
  };

  const getRatingBarWidth = (stars: number) => {
    const percentage = stars === 5 ? 78 : stars === 4 ? 15 : stars === 3 ? 5 : stars === 2 ? 2 : 0;
    return percentage;
  };

  const handleCall = () => {
    Linking.openURL(`tel:${hotel.contact.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${hotel.contact.email}`);
  };

  const handleWebsite = () => {
    Linking.openURL(`https://${hotel.contact.website}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header Image Gallery */}
        <View style={{ position: 'relative' }}>
          <TouchableOpacity 
            onPress={() => {
              setCurrentImageIndex((prevIndex) => 
                prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1
              );
            }}
          >
            <Image
              source={{ uri: hotel.images[currentImageIndex] }}
              style={{
                width: screenWidth,
                height: 280,
                backgroundColor: '#f3f4f6'
              }}
            />
          </TouchableOpacity>
          
          {/* Navigation Header */}
          <View style={{
            position: 'absolute',
            top: 16,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16
          }}>
            <TouchableOpacity 
              onPress={onNavigateBack}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.9)',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3
              }}
            >
              <Text style={{ fontSize: 18, color: '#374151' }}>←</Text>
            </TouchableOpacity>
            
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity 
                onPress={() => setIsFavorited(!isFavorited)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 3
                }}
              >
                <Text style={{ fontSize: 18 }}>{isFavorited ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.9)',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3
              }}>
                <Text style={{ fontSize: 16 }}>↗️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Image Counter */}
          <View style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            backgroundColor: 'rgba(0,0,0,0.6)',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16
          }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>
              {currentImageIndex + 1}/{hotel.images.length}
            </Text>
          </View>
        </View>

        {/* Hotel Information */}
        <View style={{ padding: 20 }}>
          {/* Name and Price */}
          <View style={{ marginBottom: 12 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 8
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#111827',
                flex: 1,
                lineHeight: 30
              }}>
                {hotel.name}
              </Text>
              
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#111827'
                }}>
                  ${hotel.price}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  per night
                </Text>
              </View>
            </View>

            {/* Eco Badge and Rating */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8
            }}>
              <View style={{
                backgroundColor: '#d1fae5',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                marginRight: 12,
                borderWidth: 1,
                borderColor: '#22c55e'
              }}>
                <Text style={{
                  color: '#22c55e',
                  fontSize: 12,
                  fontWeight: '600'
                }}>
                  🌱 {hotel.certification}
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#fbbf24', fontSize: 16, marginRight: 4 }}>★</Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#111827'
                }}>
                  {hotel.rating}
                </Text>
              </View>
            </View>

            {/* Location */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text style={{ fontSize: 14, marginRight: 6, color: '#ef4444' }}>📍</Text>
              <Text style={{
                color: '#6b7280',
                fontSize: 14,
                fontWeight: '500'
              }}>
                {hotel.location} • {hotel.distance}
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text style={{
            color: '#374151',
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 32,
            fontWeight: '400'
          }}>
            {hotel.description}
          </Text>

          {/* Facilities & Amenities */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#111827',
              marginBottom: 16
            }}>
              Facilities & Amenities
            </Text>
            
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 16
            }}>
              {amenities.map((amenity) => (
                <View
                  key={amenity.id}
                  style={{
                    width: (screenWidth - 72) / 4, // 4 columns with spacing
                    alignItems: 'center',
                    paddingVertical: 16,
                    backgroundColor: '#f8fafc',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#e5e7eb'
                  }}
                >
                  <Text style={{ fontSize: 24, marginBottom: 8 }}>{amenity.icon}</Text>
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#374151',
                    textAlign: 'center'
                  }}>
                    {amenity.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact Information */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#111827',
              marginBottom: 16
            }}>
              Contact Information
            </Text>
            
            <View style={{ gap: 16 }}>
              {/* Phone */}
              <TouchableOpacity 
                onPress={handleCall}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>📞</Text>
                <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    {hotel.contact.phone}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6b7280'
                  }}>
                    24/7 Reception
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Email */}
              <TouchableOpacity 
                onPress={handleEmail}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>📧</Text>
                <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    {hotel.contact.email}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6b7280'
                  }}>
                    Email us anytime
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Website */}
              <TouchableOpacity 
                onPress={handleWebsite}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ fontSize: 20, marginRight: 12 }}>🌐</Text>
                <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    {hotel.contact.website}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6b7280'
                  }}>
                    Visit our website
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Reviews Section */}
          <View style={{ marginBottom: 100 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#111827'
              }}>
                Reviews
              </Text>
              <TouchableOpacity onPress={onNavigateToReviews}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#22c55e'
                }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {/* Overall Rating */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{
                fontSize: 48,
                fontWeight: '700',
                color: '#111827',
                lineHeight: 56
              }}>
                {hotel.rating}
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#6b7280',
                marginBottom: 16
              }}>
                Based on {hotel.reviewCount} reviews
              </Text>

              {/* Rating Breakdown */}
              <View style={{ gap: 8 }}>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <View
                    key={stars}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <Text style={{
                      fontSize: 12,
                      color: '#6b7280',
                      width: 40
                    }}>
                      {stars} stars
                    </Text>
                    <View style={{
                      flex: 1,
                      height: 4,
                      backgroundColor: '#e5e7eb',
                      borderRadius: 2
                    }}>
                      <View style={{
                        width: `${getRatingBarWidth(stars)}%`,
                        height: '100%',
                        backgroundColor: '#fbbf24',
                        borderRadius: 2
                      }} />
                    </View>
                    <Text style={{
                      fontSize: 12,
                      color: '#6b7280',
                      width: 30,
                      textAlign: 'right'
                    }}>
                      {stars === 5 ? '78%' : stars === 4 ? '15%' : '7%'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Individual Reviews */}
            <View style={{ gap: 20 }}>
              {hotel.reviews.map((review) => (
                <View key={review.id}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8
                  }}>
                    <Image
                      source={{ uri: review.userAvatar }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#f3f4f6',
                        marginRight: 12
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: 2
                      }}>
                        {review.userName}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {renderStars(review.rating)}
                        <Text style={{
                          fontSize: 12,
                          color: '#6b7280',
                          marginLeft: 8
                        }}>
                          {review.date}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={{
                    fontSize: 14,
                    color: '#374151',
                    lineHeight: 18
                  }}>
                    {review.comment}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        gap: 12
      }}>
        <TouchableOpacity
          onPress={() => {
            // Navigate to booking flow
          }}
          style={{
            flex: 1,
            backgroundColor: '#22c55e',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            shadowColor: '#22c55e',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginRight: 6 }}>📅</Text>
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '700'
            }}>
              Book Now
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleCall}
          style={{
            width: 56,
            height: 56,
            backgroundColor: '#f3f4f6',
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#e5e7eb'
          }}
        >
          <Text style={{ fontSize: 20 }}>📞</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleEmail}
          style={{
            width: 56,
            height: 56,
            backgroundColor: '#f3f4f6',
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#e5e7eb'
          }}
        >
          <Text style={{ fontSize: 20 }}>📧</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HotelDetailScreen;