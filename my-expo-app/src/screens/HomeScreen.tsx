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
} from 'react-native';
import BottomNavigation, { type BottomNavTab } from '../components/BottomNavigation';

interface HomeScreenProps {
  user?: {
    name: string;
    avatar?: string;
  };
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToDirectory?: () => void;
  onNavigateToRewards?: () => void;
  onNavigateToEvents?: () => void;
}

interface EcoImpact {
  treesSaved: number;
  co2Reduced: string;
  ecoTrips: number;
}

interface Accommodation {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  isEcoCertified: boolean;
  isCarbonNeutral?: boolean;
}

interface Trail {
  id: string;
  name: string;
  distance: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  duration: string;
  highlights: string;
  icon: string;
  color: string;
}

interface EcoTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
  user = { name: 'Sarah' },
  onNavigateToProfile,
  onNavigateToNotifications,
  onNavigateToDirectory,
  onNavigateToRewards,
  onNavigateToEvents
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Hotels' | 'Trails' | 'Parks'>('Hotels');

  const ecoImpact: EcoImpact = {
    treesSaved: 247,
    co2Reduced: '12kg',
    ecoTrips: 8
  };

  const accommodations: Accommodation[] = [
    {
      id: '1',
      name: 'Green Valley Lodge',
      location: 'Costa Rica',
      distance: '2.3km away',
      rating: 4.8,
      reviews: 124,
      price: 89,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      isEcoCertified: true,
      isCarbonNeutral: false
    },
    {
      id: '2',
      name: 'Canopy Retreat',
      location: 'Ecuador',
      distance: '1.8km away',
      rating: 4.9,
      reviews: 89,
      price: 156,
      image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=300&fit=crop',
      isEcoCertified: true,
      isCarbonNeutral: true
    }
  ];

  const nearbyTrails: Trail[] = [
    {
      id: '1',
      name: 'Emerald Forest Trail',
      distance: '2.4 km',
      difficulty: 'Easy',
      duration: '45',
      highlights: 'Wildlife spotting',
      icon: '🌲',
      color: '#22c55e'
    },
    {
      id: '2',
      name: 'Waterfall Discovery',
      distance: '5.2 km',
      difficulty: 'Moderate',
      duration: '2h',
      highlights: 'Photo opportunities',
      icon: '💧',
      color: '#3b82f6'
    }
  ];

  const todaysEcoTip: EcoTip = {
    id: '1',
    title: 'Pack Reusable Water Bottles',
    description: 'Bring refillable bottles to reduce plastic waste during your eco-adventures. Many trails have natural water sources!',
    icon: '💚',
    color: '#22c55e'
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <StatusBar backgroundColor="#f8fafc" barStyle="dark-content" />
      
      <ScrollView 
        style={{ flex: 1 }} 
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Header with User Greeting */}
        <View style={{ 
          paddingHorizontal: 20, 
          paddingTop: 16, 
          paddingBottom: 20,
          backgroundColor: '#f8fafc'
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 24
          }}>
            {/* User Info */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity 
                onPress={onNavigateToProfile}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#22c55e',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                  shadowColor: '#22c55e',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 3
                }}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                  {user.name.charAt(0)}
                </Text>
              </TouchableOpacity>
              <View>
                <Text style={{ 
                  color: '#6b7280', 
                  fontSize: 14, 
                  fontWeight: '500' 
                }}>
                  Good morning
                </Text>
                <Text style={{ 
                  color: '#111827', 
                  fontSize: 18, 
                  fontWeight: '700' 
                }}>
                  {user.name}
                </Text>
              </View>
            </View>

            {/* Notification Bell */}
            <TouchableOpacity 
              onPress={onNavigateToNotifications}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2
              }}
            >
              <Text style={{ fontSize: 20 }}>🔔</Text>
              {/* Notification Badge */}
              <View style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#22c55e'
              }} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
            marginBottom: 20
          }}>
            <Text style={{ color: '#9ca3af', fontSize: 16, marginRight: 12 }}>🔍</Text>
            <TextInput
              placeholder="Search eco destinations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                fontSize: 16,
                color: '#374151',
                paddingVertical: 4
              }}
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <Text style={{ color: '#22c55e', fontSize: 18 }}>⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Category Tabs */}
          <View style={{
            flexDirection: 'row',
            gap: 12
          }}>
            {(['Hotels', 'Trails', 'Parks'] as const).map((category) => (
              <TouchableOpacity
                key={category}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 25,
                  backgroundColor: selectedCategory === category ? '#22c55e' : 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: selectedCategory === category ? 0.15 : 0.05,
                  shadowRadius: 4,
                  elevation: selectedCategory === category ? 3 : 1,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={{ 
                  fontSize: 14, 
                  marginRight: 6,
                }}>
                  {category === 'Hotels' ? '🏨' : category === 'Trails' ? '⛰️' : '🌳'}
                </Text>
                <Text style={{
                  color: selectedCategory === category ? 'white' : '#374151',
                  fontWeight: selectedCategory === category ? '600' : '500',
                  fontSize: 14
                }}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Your Eco Impact Section */}
        <View style={{
          marginHorizontal: 20,
          marginBottom: 32,
          backgroundColor: '#22c55e',
          borderRadius: 20,
          padding: 24,
          shadowColor: '#22c55e',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 20
          }}>
            <Text style={{ 
              color: 'white', 
              fontSize: 20, 
              fontWeight: '700' 
            }}>
              Your Eco Impact
            </Text>
            <View style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: 'rgba(255,255,255,0.2)',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: 16 }}>🌱</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ 
                color: 'white', 
                fontSize: 32, 
                fontWeight: '800' 
              }}>
                {ecoImpact.treesSaved}
              </Text>
              <Text style={{ 
                color: 'rgba(255,255,255,0.9)', 
                fontSize: 12, 
                fontWeight: '500',
                marginTop: 4
              }}>
                Trees Saved
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{ 
                color: 'white', 
                fontSize: 32, 
                fontWeight: '800' 
              }}>
                {ecoImpact.co2Reduced}
              </Text>
              <Text style={{ 
                color: 'rgba(255,255,255,0.9)', 
                fontSize: 12, 
                fontWeight: '500',
                marginTop: 4
              }}>
                CO₂ Reduced
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Text style={{ 
                color: 'white', 
                fontSize: 32, 
                fontWeight: '800' 
              }}>
                {ecoImpact.ecoTrips}
              </Text>
              <Text style={{ 
                color: 'rgba(255,255,255,0.9)', 
                fontSize: 12, 
                fontWeight: '500',
                marginTop: 4
              }}>
                Eco Trips
              </Text>
            </View>
          </View>
          
          {/* Rewards Button */}
          <TouchableOpacity
            onPress={onNavigateToRewards}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 12,
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 8 }}>🏆</Text>
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600'
            }}>
              View Rewards & Achievements
            </Text>
          </TouchableOpacity>

          {/* Events Button */}
          <TouchableOpacity
            onPress={onNavigateToEvents}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 12,
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 8 }}>🎉</Text>
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600'
            }}>
              View Events & Activities
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recommended for You Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 16 
          }}>
            <Text style={{ 
              color: '#111827', 
              fontSize: 20, 
              fontWeight: '700' 
            }}>
              Recommended for You
            </Text>
            <TouchableOpacity>
              <Text style={{ 
                color: '#22c55e', 
                fontSize: 14, 
                fontWeight: '600' 
              }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {accommodations.map((accommodation, index) => (
              <TouchableOpacity
                key={accommodation.id}
                style={{
                  width: 280,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  marginRight: index === accommodations.length - 1 ? 0 : 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                  overflow: 'hidden'
                }}
              >
                <View style={{ position: 'relative' }}>
                  <Image
                    source={{ uri: accommodation.image }}
                    style={{ 
                      width: '100%', 
                      height: 160,
                      backgroundColor: '#f3f4f6'
                    }}
                  />
                  
                  {/* Badges */}
                  <View style={{ 
                    position: 'absolute', 
                    top: 12, 
                    left: 12,
                    flexDirection: 'row',
                    gap: 8
                  }}>
                    {accommodation.isEcoCertified && (
                      <View style={{
                        backgroundColor: '#22c55e',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12
                      }}>
                        <Text style={{ 
                          color: 'white', 
                          fontSize: 10, 
                          fontWeight: '600' 
                        }}>
                          Eco Certified
                        </Text>
                      </View>
                    )}
                    {accommodation.isCarbonNeutral && (
                      <View style={{
                        backgroundColor: '#059669',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12
                      }}>
                        <Text style={{ 
                          color: 'white', 
                          fontSize: 10, 
                          fontWeight: '600' 
                        }}>
                          Carbon Neutral+
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Favorite Heart */}
                  <TouchableOpacity style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style={{ fontSize: 16 }}>🤍</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ padding: 16 }}>
                  <Text style={{ 
                    color: '#111827', 
                    fontSize: 16, 
                    fontWeight: '700',
                    marginBottom: 4
                  }}>
                    {accommodation.name}
                  </Text>
                  
                  <Text style={{ 
                    color: '#6b7280', 
                    fontSize: 14,
                    marginBottom: 8
                  }}>
                    {accommodation.location} • {accommodation.distance}
                  </Text>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: '#f59e0b', fontSize: 14 }}>⭐</Text>
                      <Text style={{ 
                        color: '#111827', 
                        fontSize: 14, 
                        fontWeight: '600',
                        marginLeft: 4
                      }}>
                        {accommodation.rating}
                      </Text>
                      <Text style={{ 
                        color: '#6b7280', 
                        fontSize: 14,
                        marginLeft: 4
                      }}>
                        ({accommodation.reviews})
                      </Text>
                    </View>

                    <Text style={{ 
                      color: '#111827', 
                      fontSize: 16, 
                      fontWeight: '700' 
                    }}>
                      ${accommodation.price}
                      <Text style={{ 
                        color: '#6b7280', 
                        fontSize: 12, 
                        fontWeight: '400' 
                      }}>
                        /night
                      </Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Trails Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 16 
          }}>
            <Text style={{ 
              color: '#111827', 
              fontSize: 20, 
              fontWeight: '700' 
            }}>
              Nearby Trails
            </Text>
            <TouchableOpacity>
              <Text style={{ 
                color: '#22c55e', 
                fontSize: 14, 
                fontWeight: '600' 
              }}>
                Explore
              </Text>
            </TouchableOpacity>
          </View>

          {nearbyTrails.map((trail) => (
            <TouchableOpacity
              key={trail.id}
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: `${trail.color}20`,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Text style={{ fontSize: 20 }}>{trail.icon}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ 
                  color: '#111827', 
                  fontSize: 16, 
                  fontWeight: '600',
                  marginBottom: 4
                }}>
                  {trail.name}
                </Text>
                <Text style={{ 
                  color: '#6b7280', 
                  fontSize: 14,
                  marginBottom: 4
                }}>
                  {trail.distance} • {trail.difficulty} • {trail.duration}
                </Text>
                <View style={{
                  backgroundColor: `${trail.color}20`,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 8,
                  alignSelf: 'flex-start'
                }}>
                  <Text style={{ 
                    color: trail.color, 
                    fontSize: 12, 
                    fontWeight: '600' 
                  }}>
                    🌿 {trail.highlights}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#f3f4f6',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{ color: trail.color, fontSize: 16 }}>→</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Eco Tip Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 100 }}>
          <Text style={{ 
            color: '#111827', 
            fontSize: 20, 
            fontWeight: '700',
            marginBottom: 16
          }}>
            Today&apos;s Eco Tip
          </Text>

          <View style={{
            backgroundColor: '#f0fdf4',
            borderRadius: 20,
            padding: 20,
            borderWidth: 1,
            borderColor: '#bbf7d0'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: todaysEcoTip.color,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Text style={{ fontSize: 20 }}>{todaysEcoTip.icon}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ 
                  color: '#111827', 
                  fontSize: 16, 
                  fontWeight: '600',
                  marginBottom: 8
                }}>
                  {todaysEcoTip.title}
                </Text>
                <Text style={{ 
                  color: '#059669', 
                  fontSize: 14,
                  lineHeight: 20
                }}>
                  {todaysEcoTip.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab: BottomNavTab) => {
          switch (tab) {
            case 'home':
              // Already on home, do nothing
              break;
            case 'directory':
              onNavigateToDirectory?.();
              break;
            case 'events':
              onNavigateToEvents?.();
              break;
            case 'rewards':
              onNavigateToRewards?.();
              break;
            case 'profile':
              onNavigateToProfile?.();
              break;
          }
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;