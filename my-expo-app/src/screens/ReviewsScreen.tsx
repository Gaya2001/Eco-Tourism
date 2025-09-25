import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

interface ReviewsScreenProps {
  onNavigateBack?: () => void;
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  tags?: string[];
  likes: number;
  photos?: string[];
  isReported?: boolean;
}

type FilterTab = 'all' | '5stars' | 'photos' | 'recent';

const ReviewsScreen: React.FC<ReviewsScreenProps> = ({ onNavigateBack }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    photos: [] as string[]
  });

  const allReviews: Review[] = [
    {
      id: '1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '2 days ago',
      comment: 'Amazing service! The team was incredible and delivered exactly what they promised. Highly recommend to anyone looking for quality work.',
      tags: ['Eco-friendly', 'Great Service'],
      likes: 24
    },
    {
      id: '2',
      userName: 'Mike Chen',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 4,
      date: '1 week ago',
      comment: 'Good experience overall. The product quality was excellent and arrived on time. Customer service was responsive when I had questions.',
      tags: ['Good Packaging', 'Sustainable'],
      likes: 12,
      photos: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop'
      ]
    },
    {
      id: '3',
      userName: 'Emma Davis',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Exceptional experience from start to finish! Everything went above and beyond to ensure I was satisfied. Will definitely use their services again.',
      tags: ['Great Service', 'Excellent Quality', 'Eco Solutions'],
      likes: 18
    },
    {
      id: '4',
      userName: 'Alex Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 3,
      date: '3 weeks ago',
      comment: 'Average experience. The product was okay but took longer than expected to arrive. Customer service could be more responsive.',
      tags: ['Slow Delivery', 'Average Service'],
      likes: 3,
      isReported: true
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={{
            color: i <= rating ? '#fbbf24' : '#e5e7eb',
            fontSize: 16
          }}
        >
          ★
        </Text>
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  const getRatingBarWidth = (stars: number) => {
    const percentages = { 5: 78, 4: 15, 3: 4, 2: 2, 1: 1 };
    return percentages[stars as keyof typeof percentages] || 0;
  };

  const getFilteredReviews = () => {
    switch (activeFilter) {
      case '5stars':
        return allReviews.filter(review => review.rating === 5);
      case 'photos':
        return allReviews.filter(review => review.photos && review.photos.length > 0);
      case 'recent':
        return allReviews.sort((a, b) => {
          const aDate = a.date.includes('day') ? 1 : a.date.includes('week') ? 7 : 21;
          const bDate = b.date.includes('day') ? 1 : b.date.includes('week') ? 7 : 21;
          return aDate - bDate;
        });
      default:
        return allReviews;
    }
  };

  const filterTabs = [
    { key: 'all' as FilterTab, label: 'All Reviews' },
    { key: '5stars' as FilterTab, label: '5 Stars' },
    { key: 'photos' as FilterTab, label: 'With Photos' },
    { key: 'recent' as FilterTab, label: 'Recent' }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb'
      }}>
        <TouchableOpacity 
          onPress={onNavigateBack}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 20, color: '#374151' }}>←</Text>
        </TouchableOpacity>
        
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#111827'
        }}>
          Reviews
        </Text>
        
        <TouchableOpacity style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ fontSize: 18, color: '#6b7280' }}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Overall Rating Section */}
        <View style={{
          alignItems: 'center',
          paddingVertical: 32,
          paddingHorizontal: 20
        }}>
          {/* Star Rating */}
          <View style={{ marginBottom: 8 }}>
            {renderStars(5)}
          </View>

          {/* Large Rating Number */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            marginBottom: 8
          }}>
            <Text style={{
              fontSize: 64,
              fontWeight: '700',
              color: '#111827',
              lineHeight: 70
            }}>
              4
            </Text>
            <Text style={{
              fontSize: 32,
              fontWeight: '700',
              color: '#111827',
              lineHeight: 36,
              marginLeft: 4
            }}>
              .8
            </Text>
          </View>

          {/* Review Count */}
          <Text style={{
            fontSize: 14,
            color: '#6b7280',
            marginBottom: 24
          }}>
            Based on 1,247 reviews
          </Text>

          {/* Rating Breakdown */}
          <View style={{ width: '100%', maxWidth: 280 }}>
            {[5, 4, 3, 2, 1].map((stars) => (
              <View
                key={stars}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: '#6b7280',
                  width: 12,
                  textAlign: 'right'
                }}>
                  {stars}
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#fbbf24',
                  marginHorizontal: 8
                }}>
                  ★
                </Text>
                <View style={{
                  flex: 1,
                  height: 8,
                  backgroundColor: '#f3f4f6',
                  borderRadius: 4,
                  marginRight: 12
                }}>
                  <View style={{
                    width: `${getRatingBarWidth(stars)}%`,
                    height: '100%',
                    backgroundColor: '#22c55e',
                    borderRadius: 4
                  }} />
                </View>
                <Text style={{
                  fontSize: 12,
                  color: '#6b7280',
                  width: 35,
                  textAlign: 'right'
                }}>
                  {getRatingBarWidth(stars)}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Write a Review Button */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <TouchableOpacity 
            onPress={() => setShowReviewForm(true)}
            style={{
              backgroundColor: '#22c55e',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              shadowColor: '#22c55e',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, marginRight: 8, color: 'white' }}>✏️</Text>
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '700'
              }}>
                Write a Review
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginBottom: 20
        }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {filterTabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveFilter(tab.key)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: activeFilter === tab.key ? '#22c55e' : '#f3f4f6',
                  borderWidth: 1,
                  borderColor: activeFilter === tab.key ? '#22c55e' : '#e5e7eb'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: activeFilter === tab.key ? 'white' : '#6b7280'
                }}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reviews List */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {getFilteredReviews().map((review) => (
            <View
              key={review.id}
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 3,
                ...(review.isReported && {
                  backgroundColor: '#fef3c7',
                  borderWidth: 1,
                  borderColor: '#f59e0b'
                })
              }}
            >
              {/* User Info Row */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12
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
                  <Text style={{
                    fontSize: 12,
                    color: '#6b7280'
                  }}>
                    {review.date}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={{ fontSize: 16, color: '#6b7280' }}>⋯</Text>
                </TouchableOpacity>
              </View>

              {/* Rating */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12
              }}>
                {renderStars(review.rating)}
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#111827',
                  marginLeft: 8
                }}>
                  {review.rating}.0
                </Text>
              </View>

              {/* Review Text */}
              <Text style={{
                fontSize: 14,
                color: '#374151',
                lineHeight: 20,
                marginBottom: 12
              }}>
                {review.comment}
              </Text>

              {/* Tags */}
              {review.tags && review.tags.length > 0 && (
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginBottom: 12
                }}>
                  {review.tags.map((tag, index) => {
                    const tagColors = {
                      'Eco-friendly': { bg: '#d1fae5', text: '#22c55e' },
                      'Great Service': { bg: '#dbeafe', text: '#3b82f6' },
                      'Fast Delivery': { bg: '#fce7f3', text: '#ec4899' },
                      'Good Packaging': { bg: '#fef3c7', text: '#f59e0b' },
                      'Sustainable': { bg: '#d1fae5', text: '#22c55e' },
                      'Excellent Quality': { bg: '#fef3c7', text: '#f59e0b' },
                      'Eco Solutions': { bg: '#d1fae5', text: '#22c55e' },
                      'Slow Delivery': { bg: '#fee2e2', text: '#ef4444' },
                      'Average Service': { bg: '#f3f4f6', text: '#6b7280' }
                    };
                    const colors = tagColors[tag as keyof typeof tagColors] || { bg: '#f3f4f6', text: '#6b7280' };
                    
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: colors.bg,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: colors.text + '33'
                        }}
                      >
                        <Text style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: colors.text
                        }}>
                          {tag}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}

              {/* Photos */}
              {review.photos && review.photos.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8 }}
                  >
                    {review.photos.map((photo, index) => (
                      <Image
                        key={index}
                        source={{ uri: photo }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 8,
                          backgroundColor: '#f3f4f6'
                        }}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Action Buttons */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20
              }}>
                <TouchableOpacity style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Text style={{ fontSize: 14, marginRight: 4 }}>👍</Text>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#6b7280'
                  }}>
                    {review.likes}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Text style={{ fontSize: 14, marginRight: 4 }}>↩️</Text>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#6b7280'
                  }}>
                    Reply
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Text style={{ fontSize: 14, marginRight: 4, color: '#ef4444' }}>🚩</Text>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: review.isReported ? '#ef4444' : '#6b7280'
                  }}>
                    {review.isReported ? 'Reported' : 'Report'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Reported Notice */}
              {review.isReported && (
                <View style={{
                  marginTop: 12,
                  backgroundColor: '#fef3c7',
                  padding: 8,
                  borderRadius: 8,
                  borderLeftWidth: 4,
                  borderLeftColor: '#f59e0b'
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, marginRight: 6 }}>⚠️</Text>
                    <Text style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#92400e'
                    }}>
                      Reported Issues
                    </Text>
                  </View>
                  <Text style={{
                    fontSize: 12,
                    color: '#92400e',
                    marginTop: 4
                  }}>
                    Review mentions potential service delays. We're investigating this matter.
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Load More Reviews Button */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          <TouchableOpacity style={{
            backgroundColor: '#f8fafc',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#e5e7eb'
          }}>
            <Text style={{
              color: '#374151',
              fontSize: 16,
              fontWeight: '600'
            }}>
              Load More Reviews
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Review Form Modal */}
      <Modal
        visible={showReviewForm}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
          <StatusBar backgroundColor="#22c55e" barStyle="light-content" />
          
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: '#e5e7eb'
          }}>
            <TouchableOpacity onPress={() => setShowReviewForm(false)}>
              <Text style={{ fontSize: 16, color: '#6b7280' }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937' }}>
              Write Review
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (formData.rating === 0 || formData.comment.trim() === '') {
                  Alert.alert('Error', 'Please provide a rating and comment');
                  return;
                }
                Alert.alert('Success', 'Your review has been submitted!');
                setFormData({ rating: 0, title: '', comment: '', photos: [] });
                setShowReviewForm(false);
              }}
            >
              <Text style={{ fontSize: 16, color: '#22c55e', fontWeight: '600' }}>Submit</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }}>
            {/* Rating Section */}
            <View style={{
              backgroundColor: 'white',
              marginTop: 16,
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 12
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: 16
              }}>
                Rate your experience
              </Text>
              
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setFormData({ ...formData, rating: star })}
                  >
                    <Text style={{
                      fontSize: 32,
                      color: star <= formData.rating ? '#fbbf24' : '#e5e7eb'
                    }}>
                      ⭐
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={{
                fontSize: 14,
                color: '#6b7280',
                textAlign: 'center'
              }}>
                {formData.rating === 0 ? 'Tap to rate' : 
                 formData.rating === 1 ? 'Poor' :
                 formData.rating === 2 ? 'Fair' :
                 formData.rating === 3 ? 'Good' :
                 formData.rating === 4 ? 'Very Good' : 'Excellent'}
              </Text>
            </View>

            {/* Review Title */}
            <View style={{
              backgroundColor: 'white',
              marginTop: 16,
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 12
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: 12
              }}>
                Review Title (Optional)
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 16,
                  backgroundColor: '#f9fafb'
                }}
                placeholder="Summarize your experience..."
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                maxLength={100}
              />
              <Text style={{
                fontSize: 12,
                color: '#6b7280',
                textAlign: 'right',
                marginTop: 4
              }}>
                {formData.title.length}/100
              </Text>
            </View>

            {/* Review Comment */}
            <View style={{
              backgroundColor: 'white',
              marginTop: 16,
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 12
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: 12
              }}>
                Your Review *
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 16,
                  backgroundColor: '#f9fafb',
                  height: 120,
                  textAlignVertical: 'top'
                }}
                placeholder="Tell others about your experience..."
                value={formData.comment}
                onChangeText={(text) => setFormData({ ...formData, comment: text })}
                maxLength={500}
                multiline
                numberOfLines={6}
              />
              <Text style={{
                fontSize: 12,
                color: '#6b7280',
                textAlign: 'right',
                marginTop: 4
              }}>
                {formData.comment.length}/500
              </Text>
            </View>

            {/* Photo Upload Section */}
            <View style={{
              backgroundColor: 'white',
              marginTop: 16,
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 12,
              marginBottom: 32
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: 16
              }}>
                Add Photos (Optional)
              </Text>
              
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderColor: '#e5e7eb',
                  borderStyle: 'dashed',
                  borderRadius: 8,
                  paddingVertical: 32,
                  alignItems: 'center'
                }}
                onPress={() => Alert.alert('Photo Upload', 'Photo upload functionality would be implemented here')}
              >
                <Text style={{ fontSize: 24, marginBottom: 8 }}>📷</Text>
                <Text style={{
                  fontSize: 16,
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  Tap to add photos
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  marginTop: 4
                }}>
                  Up to 5 photos
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default ReviewsScreen;