import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  Dimensions,
} from 'react-native';
import BottomNavigation, { type BottomNavTab } from '../components/BottomNavigation';

const { width: screenWidth } = Dimensions.get('window');

interface DirectoryScreenProps {
  onNavigateBack?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToRewards?: () => void;
  onNavigateToHotelDetail?: (businessId: string) => void;
}

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  image: string;
  certification: 'Gold' | 'Platinum' | 'Silver';
  description: string;
  isFavorited: boolean;
}

interface FilterTag {
  id: string;
  label: string;
  type: 'category' | 'certification' | 'distance' | 'rating';
  isActive: boolean;
}

interface FilterCategory {
  id: string;
  name: string;
  options: string[];
}

interface FilterState {
  categories: string[];
  certifications: string[];
  distance: number;
  minRating: number;
}

const DirectoryScreen: React.FC<DirectoryScreenProps> = ({ 
  onNavigateBack,
  onNavigateToHome,
  onNavigateToProfile,
  onNavigateToRewards,
  onNavigateToHotelDetail 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    categories: [], // Show all categories by default
    certifications: [], // Show all certifications by default
    distance: 10,
    minRating: 0
  });

  const filterCategories: FilterCategory[] = [
    {
      id: 'business-types',
      name: 'Business Type',
      options: ['Restaurant', 'Coffee Shop', 'Hotel', 'Fashion', 'Grocery', 'Wellness', 'Accommodation']
    },
    {
      id: 'certifications',
      name: 'Certification Level',
      options: ['Gold', 'Platinum', 'Silver']
    }
  ];

  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: '1',
      name: 'Green Garden Bistro',
      category: 'Restaurant',
      location: 'Downtown',
      distance: '0.8',
      rating: 4.8,
      reviewCount: 120,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      certification: 'Gold',
      description: 'Organic farm-to-table restaurant specializing in zero-waste practices.',
      isFavorited: false
    },
    {
      id: '2',
      name: 'EcoBean Coffee Co.',
      category: 'Coffee Shop',
      location: 'Midtown',
      distance: '1.2 mi',
      rating: 4.6,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
      certification: 'Platinum',
      description: 'Fair trade coffee roastery powered by 100% renewable energy with compostable packaging.',
      isFavorited: true
    },
    {
      id: '3',
      name: 'Sustainable Style',
      category: 'Fashion',
      location: 'Fashion District',
      distance: '2.1 mi',
      rating: 4.3,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      certification: 'Silver',
      description: 'Ethical fashion boutique featuring organic cotton, recycled materials, and fair trade practices.',
      isFavorited: false
    },
    {
      id: '4',
      name: 'Zero Waste Market',
      category: 'Grocery',
      location: 'Eastside',
      distance: '1.5 mi',
      rating: 4.9,
      reviewCount: 203,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      certification: 'Gold',
      description: 'Package-free grocery store with bulk organic foods, refillable containers, and local produce.',
      isFavorited: false
    },
    {
      id: '5',
      name: 'Pure Earth Spa',
      category: 'Wellness',
      location: 'Wellness District',
      distance: '3.2 mi',
      rating: 4.7,
      reviewCount: 91,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
      certification: 'Platinum',
      description: 'Luxury spa using only organic, cruelty-free products with solar-powered facilities.',
      isFavorited: true
    },
    {
      id: '6',
      name: 'EcoStay Hotel',
      category: 'Accommodation',
      location: 'City Center',
      distance: '0.5 mi',
      rating: 4.4,
      reviewCount: 178,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      certification: 'Silver',
      description: 'LEED-certified boutique hotel with energy-efficient systems and eco-friendly amenities.',
      isFavorited: false
    },
    {
      id: '7',
      name: 'Green Leaf Bookstore & Cafe',
      category: 'Coffee Shop',
      location: 'Arts District',
      distance: '1.8 mi',
      rating: 4.5,
      reviewCount: 142,
      image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400&h=300&fit=crop',
      certification: 'Gold',
      description: 'Cozy bookstore cafe serving organic coffee and locally sourced pastries with recycled furniture.',
      isFavorited: false
    },
    {
      id: '8',
      name: 'Ocean Breeze Eco Resort',
      category: 'Hotel',
      location: 'Coastal Area',
      distance: '4.2 mi',
      rating: 4.8,
      reviewCount: 267,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
      certification: 'Platinum',
      description: 'Beachfront resort powered by renewable energy with marine conservation programs and zero-waste dining.',
      isFavorited: true
    }
  ]);

  // Generate active filters from filter state
  const activeFilters: FilterTag[] = [
    ...filterState.categories.map((category, index) => ({
      id: `category-${index}`,
      label: category + 's',
      type: 'category' as const,
      isActive: true
    })),
    ...filterState.certifications.map((cert, index) => ({
      id: `cert-${index}`,
      label: `${cert} Certified`,
      type: 'certification' as const,
      isActive: true
    }))
  ];

  const toggleFavorite = (businessId: string) => {
    setBusinesses(businesses.map(business => 
      business.id === businessId 
        ? { ...business, isFavorited: !business.isFavorited }
        : business
    ));
  };

  const removeFilter = (filterId: string) => {
    if (filterId.startsWith('category-')) {
      const index = parseInt(filterId.split('-')[1]);
      const newCategories = [...filterState.categories];
      newCategories.splice(index, 1);
      setFilterState({ ...filterState, categories: newCategories });
    } else if (filterId.startsWith('cert-')) {
      const index = parseInt(filterId.split('-')[1]);
      const newCerts = [...filterState.certifications];
      newCerts.splice(index, 1);
      setFilterState({ ...filterState, certifications: newCerts });
    }
  };

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const getCertificationColor = (certification: string) => {
    switch (certification) {
      case 'Gold': return '#fbbf24';
      case 'Platinum': return '#22c55e';
      case 'Silver': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getCertificationBgColor = (certification: string) => {
    switch (certification) {
      case 'Gold': return '#fef3c7';
      case 'Platinum': return '#d1fae5';
      case 'Silver': return '#dbeafe';
      default: return '#f3f4f6';
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {[...Array(fullStars)].map((_, index) => (
          <Text key={`full-${index}`} style={{ color: '#fbbf24', fontSize: 14, marginRight: 0.5 }}>★</Text>
        ))}
        {hasHalfStar && <Text style={{ color: '#fbbf24', fontSize: 14, marginRight: 0.5 }}>☆</Text>}
        {[...Array(emptyStars)].map((_, index) => (
          <Text key={`empty-${index}`} style={{ color: '#e5e7eb', fontSize: 14, marginRight: 0.5 }}>☆</Text>
        ))}
      </View>
    );
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterState.categories.length === 0 || 
                           filterState.categories.some(cat => 
                             business.category.toLowerCase() === cat.toLowerCase()
                           );
    
    const matchesCertification = filterState.certifications.length === 0 ||
                               filterState.certifications.includes(business.certification);
    
    const matchesRating = business.rating >= filterState.minRating;
    
    return matchesSearch && matchesCategory && matchesCertification && matchesRating;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: '#ffffff'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <TouchableOpacity 
            onPress={onNavigateBack}
            style={{
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12
            }}
          >
            <Text style={{ fontSize: 20, color: '#111827', fontWeight: '400' }}>←</Text>
          </TouchableOpacity>
          
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#111827',
            letterSpacing: -0.2
          }}>
            Eco Directory
          </Text>
        </View>

        <TouchableOpacity 
          onPress={openFilterModal}
          style={{
            backgroundColor: '#22c55e',
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#22c55e',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 3
          }}
        >
          <Text style={{ fontSize: 12, color: 'white', marginRight: 4 }}>▼</Text>
          <Text style={{
            color: 'white',
            fontSize: 14,
            fontWeight: '600'
          }}>
            Filter
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor: '#ffffff'
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: '#e9ecef'
          }}>
            <View style={{
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10
            }}>
              <Text style={{ color: '#9ca3af', fontSize: 14 }}>🔍</Text>
            </View>
            <TextInput
              placeholder="Search eco-friendly businesses..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                fontSize: 15,
                color: '#374151',
                paddingVertical: 2,
                fontWeight: '400'
              }}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <View style={{
            paddingHorizontal: 16,
            paddingBottom: 8,
            backgroundColor: '#ffffff'
          }}>
            <Text style={{
              fontSize: 13,
              color: '#6b7280',
              marginBottom: 8,
              fontWeight: '500'
            }}>
              Active:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {activeFilters.map((filter) => (
                <View
                  key={filter.id}
                  style={{
                    backgroundColor: filter.type === 'category' ? '#22c55e' : '#3b82f6',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{
                    color: 'white',
                    fontSize: 11,
                    fontWeight: '600',
                    marginRight: 4
                  }}>
                    {filter.label}
                  </Text>
                  <TouchableOpacity onPress={() => removeFilter(filter.id)}>
                    <Text style={{
                      color: 'white',
                      fontSize: 12,
                      fontWeight: '600',
                      lineHeight: 12
                    }}>
                      ×
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Results Count */}
        <View style={{ 
          paddingHorizontal: 16, 
          paddingTop: 12,
          paddingBottom: 16,
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: '#f3f4f6'
        }}>
          <Text style={{
            fontSize: 13,
            color: '#6b7280',
            fontWeight: '500'
          }}>
            {filteredBusinesses.length} eco-certified businesses found
          </Text>
        </View>

        {/* Business Listings */}
        <View style={{ backgroundColor: '#f8fafc', paddingTop: 4 }}>
          <View style={{ paddingHorizontal: 16 }}>
            {filteredBusinesses.map((business) => (
              <TouchableOpacity
                key={business.id}
                onPress={() => onNavigateToHotelDetail?.(business.id)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  marginBottom: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                  elevation: 3,
                  overflow: 'hidden'
                }}
              >
                <View style={{ flexDirection: 'row', padding: 12 }}>
                  {/* Business Image */}
                  <View style={{ position: 'relative', marginRight: 12 }}>
                    <Image
                      source={{ uri: business.image }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                        backgroundColor: '#f3f4f6'
                      }}
                    />
                    
                    {/* Certification Badge */}
                    <View style={{
                      position: 'absolute',
                      top: 4,
                      left: 4,
                      backgroundColor: getCertificationBgColor(business.certification),
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                      borderRadius: 6,
                      borderWidth: 0.5,
                      borderColor: getCertificationColor(business.certification),
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 1
                    }}>
                      <Text style={{
                        color: getCertificationColor(business.certification),
                        fontSize: 7,
                        fontWeight: '700',
                        lineHeight: 8,
                        textAlign: 'center'
                      }}>
                        {business.certification}
                      </Text>
                      <Text style={{
                        color: getCertificationColor(business.certification),
                        fontSize: 5,
                        fontWeight: '500',
                        lineHeight: 6,
                        textAlign: 'center'
                      }}>
                        Certified
                      </Text>
                    </View>
                  </View>

                  {/* Business Info */}
                  <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    {/* Top Row - Name and Heart */}
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 6
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#111827',
                        flex: 1,
                        lineHeight: 20
                      }}>
                        {business.name}
                      </Text>
                      
                      <TouchableOpacity 
                        onPress={() => toggleFavorite(business.id)}
                        style={{ paddingLeft: 8 }}
                      >
                        <Text style={{
                          fontSize: 18,
                          color: business.isFavorited ? '#ef4444' : '#d1d5db'
                        }}>
                          {business.isFavorited ? '❤️' : '🤍'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Location */}
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 6
                    }}>
                      <Text style={{ fontSize: 12, marginRight: 4, color: '#ef4444' }}>📍</Text>
                      <Text style={{
                        color: '#6b7280',
                        fontSize: 12,
                        fontWeight: '500'
                      }}>
                        {business.location}, {business.distance}
                      </Text>
                    </View>

                    {/* Stars and Rating */}
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8
                    }}>
                      {renderStars(business.rating)}
                      <Text style={{
                        color: '#111827',
                        fontSize: 12,
                        fontWeight: '600',
                        marginLeft: 6
                      }}>
                        ({business.rating})
                      </Text>
                    </View>

                    {/* Description */}
                    <Text style={{
                      color: '#374151',
                      fontSize: 12,
                      lineHeight: 16,
                      fontWeight: '400'
                    }} numberOfLines={2}>
                      {business.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Load More Button */}
        <View style={{ backgroundColor: '#f8fafc', paddingHorizontal: 16, paddingBottom: 100, paddingTop: 8 }}>
          <TouchableOpacity style={{
            backgroundColor: '#22c55e',
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: 'center',
            shadowColor: '#22c55e',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3
          }}>
            <Text style={{
              color: 'white',
              fontSize: 15,
              fontWeight: '600'
            }}>
              Load More Businesses
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="directory"
        onTabPress={(tab: BottomNavTab) => {
          switch (tab) {
            case 'home':
              onNavigateToHome?.();
              break;
            case 'rewards':
              onNavigateToRewards?.();
              break;
            case 'profile':
              onNavigateToProfile?.();
              break;
            case 'directory':
              // Already on directory, do nothing
              break;
          }
        }}
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
          {/* Modal Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#f3f4f6'
          }}>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Text style={{ fontSize: 16, color: '#6b7280', fontWeight: '500' }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>Filters</Text>
            <TouchableOpacity onPress={() => {
              setFilterState({
                categories: [],
                certifications: [],
                distance: 10,
                minRating: 0
              });
            }}>
              <Text style={{ fontSize: 16, color: '#22c55e', fontWeight: '600' }}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1, padding: 16 }}>
            {/* Business Type Filter */}
            <View style={{ marginBottom: 32 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 16 }}>
                Business Type
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {filterCategories.find(cat => cat.id === 'business-types')?.options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      const newCategories = filterState.categories.includes(option)
                        ? filterState.categories.filter(cat => cat !== option)
                        : [...filterState.categories, option];
                      setFilterState({ ...filterState, categories: newCategories });
                    }}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: filterState.categories.includes(option) ? '#22c55e' : '#f3f4f6',
                      borderWidth: 1,
                      borderColor: filterState.categories.includes(option) ? '#22c55e' : '#e5e7eb'
                    }}
                  >
                    <Text style={{
                      color: filterState.categories.includes(option) ? 'white' : '#374151',
                      fontSize: 14,
                      fontWeight: '500'
                    }}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Certification Level Filter */}
            <View style={{ marginBottom: 32 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 16 }}>
                Certification Level
              </Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {filterCategories.find(cat => cat.id === 'certifications')?.options.map((cert) => (
                  <TouchableOpacity
                    key={cert}
                    onPress={() => {
                      const newCerts = filterState.certifications.includes(cert)
                        ? filterState.certifications.filter(c => c !== cert)
                        : [...filterState.certifications, cert];
                      setFilterState({ ...filterState, certifications: newCerts });
                    }}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: filterState.certifications.includes(cert) 
                        ? (cert === 'Gold' ? '#fbbf24' : cert === 'Platinum' ? '#22c55e' : '#3b82f6')
                        : '#f3f4f6',
                      borderWidth: 1,
                      borderColor: filterState.certifications.includes(cert)
                        ? (cert === 'Gold' ? '#fbbf24' : cert === 'Platinum' ? '#22c55e' : '#3b82f6')
                        : '#e5e7eb'
                    }}
                  >
                    <Text style={{
                      color: filterState.certifications.includes(cert) ? 'white' : '#374151',
                      fontSize: 14,
                      fontWeight: '500'
                    }}>
                      {cert}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Distance Filter */}
            <View style={{ marginBottom: 32 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 16 }}>
                Distance (within {filterState.distance} miles)
              </Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {[1, 5, 10, 25, 50].map((distance) => (
                  <TouchableOpacity
                    key={distance}
                    onPress={() => setFilterState({ ...filterState, distance })}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: filterState.distance === distance ? '#22c55e' : '#f3f4f6',
                      borderWidth: 1,
                      borderColor: filterState.distance === distance ? '#22c55e' : '#e5e7eb'
                    }}
                  >
                    <Text style={{
                      color: filterState.distance === distance ? 'white' : '#374151',
                      fontSize: 14,
                      fontWeight: '500'
                    }}>
                      {distance} mi
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Rating Filter */}
            <View style={{ marginBottom: 32 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 16 }}>
                Minimum Rating
              </Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {[0, 3, 4, 4.5].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    onPress={() => setFilterState({ ...filterState, minRating: rating })}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: filterState.minRating === rating ? '#22c55e' : '#f3f4f6',
                      borderWidth: 1,
                      borderColor: filterState.minRating === rating ? '#22c55e' : '#e5e7eb'
                    }}
                  >
                    <Text style={{
                      color: filterState.minRating === rating ? 'white' : '#374151',
                      fontSize: 14,
                      fontWeight: '500'
                    }}>
                      {rating === 0 ? 'Any' : `${rating}+ ⭐`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Apply Filters Button */}
          <View style={{ padding: 16, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#f3f4f6' }}>
            <TouchableOpacity
              onPress={() => setShowFilterModal(false)}
              style={{
                backgroundColor: '#22c55e',
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                Apply Filters ({filteredBusinesses.length} results)
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default DirectoryScreen;