import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  PanResponder,
  Dimensions,
  Alert,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');

interface NotificationItem {
  id: string;
  type: 'achievement' | 'alert' | 'reminder' | 'challenge' | 'activity' | 'report' | 'discount' | 'badge' | 'warning';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  hasActions?: boolean;
  icon: string;
  iconBgColor: string;
}

interface NotificationsScreenProps {
  onNavigateBack?: () => void;
}

type TabType = 'All' | 'Unread' | 'Actions';

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ 
  onNavigateBack 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'achievement',
      title: 'Carbon Goal Achieved!',
      description: "You've reduced your carbon footprint by 15% this week. Keep up the great work!",
      timestamp: '2 minutes ago',
      isRead: false,
      hasActions: true,
      icon: '🌱',
      iconBgColor: '#22c55e'
    },
    {
      id: '2',
      type: 'alert',
      title: 'Water Conservation Alert',
      description: 'Your daily water usage is 20% lower than average. Excellent progress!',
      timestamp: '1 hour ago',
      isRead: true,
      hasActions: false,
      icon: '💧',
      iconBgColor: '#3b82f6'
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Recycling Reminder',
      description: "Don't forget to put out your recycling bin tomorrow morning.",
      timestamp: '3 hours ago',
      isRead: true,
      hasActions: false,
      icon: '♻️',
      iconBgColor: '#f59e0b'
    },
    {
      id: '4',
      type: 'challenge',
      title: 'New Eco Challenge',
      description: 'Join the "Plastic-Free Week" challenge starting Monday!',
      timestamp: '5 hours ago',
      isRead: true,
      hasActions: false,
      icon: '🌿',
      iconBgColor: '#10b981'
    },
    {
      id: '5',
      type: 'activity',
      title: 'Bike Trip Logged',
      description: 'Your 5.2 km bike ride saved 1.2 kg of CO2 emissions.',
      timestamp: '1 day ago',
      isRead: true,
      hasActions: false,
      icon: '🚲',
      iconBgColor: '#22c55e'
    },
    {
      id: '6',
      type: 'report',
      title: 'Energy Savings Report',
      description: 'Your solar panels generated 12.5 kWh today, saving $3.75.',
      timestamp: '1 day ago',
      isRead: true,
      hasActions: false,
      icon: '☀️',
      iconBgColor: '#f59e0b'
    },
    {
      id: '7',
      type: 'discount',
      title: 'Eco Store Discount',
      description: 'Get 20% off sustainable products this weekend!',
      timestamp: '2 days ago',
      isRead: true,
      hasActions: false,
      icon: '🛍️',
      iconBgColor: '#8b5cf6'
    },
    {
      id: '8',
      type: 'achievement',
      title: 'Tree Planting Success',
      description: 'Your contribution helped plant 50 trees in the Amazon rainforest.',
      timestamp: '3 days ago',
      isRead: true,
      hasActions: false,
      icon: '🌳',
      iconBgColor: '#22c55e'
    },
    {
      id: '9',
      type: 'warning',
      title: 'High Usage Alert',
      description: 'Your electricity usage is 30% higher than usual this week.',
      timestamp: '3 days ago',
      isRead: true,
      hasActions: false,
      icon: '⚠️',
      iconBgColor: '#ef4444'
    },
    {
      id: '10',
      type: 'badge',
      title: 'Eco Champion Badge',
      description: 'Congratulations! You\'ve earned the "Green Week" achievement.',
      timestamp: '1 week ago',
      isRead: true,
      hasActions: false,
      icon: '🏆',
      iconBgColor: '#22c55e'
    }
  ]);

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'Unread':
        return notifications.filter(n => !n.isRead);
      case 'Actions':
        return notifications.filter(n => n.hasActions);
      default:
        return notifications;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    Alert.alert('✓ Marked as Read', 'Notification has been marked as read.');
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNotifications(prev => prev.filter(notification => notification.id !== id));
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#22c55e' }}>
      <StatusBar backgroundColor="#22c55e" barStyle="light-content" />
      
      {/* Enhanced Header */}
      <View style={{ 
        backgroundColor: '#22c55e', 
        paddingHorizontal: 20, 
        paddingBottom: 28,
        shadowColor: '#22c55e',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
      }}>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: 28, 
          paddingTop: 12 
        }}>
          <TouchableOpacity 
            style={{ 
              padding: 12,
              borderRadius: 12,
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
            onPress={onNavigateBack}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>←</Text>
          </TouchableOpacity>
          
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>Notifications</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 }}>
              {getFilteredNotifications().filter(n => !n.isRead).length} unread
            </Text>
          </View>
          
          <TouchableOpacity 
            style={{ 
              padding: 12,
              borderRadius: 12,
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Enhanced Tabs */}
        <View style={{ 
          flexDirection: 'row', 
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: 16,
          padding: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2
        }}>
          {(['All', 'Unread', 'Actions'] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            const count = tab === 'All' 
              ? getFilteredNotifications().length 
              : tab === 'Unread' 
                ? getFilteredNotifications().filter(n => !n.isRead).length
                : getFilteredNotifications().filter(n => n.hasActions).length;
            
            return (
              <TouchableOpacity
                key={tab}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  backgroundColor: isActive ? 'white' : 'transparent',
                  alignItems: 'center',
                  shadowColor: isActive ? '#000' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isActive ? 0.1 : 0,
                  shadowRadius: 4,
                  elevation: isActive ? 3 : 0
                }}
                onPress={() => setActiveTab(tab)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{
                    color: isActive ? '#22c55e' : 'white',
                    fontWeight: isActive ? '700' : '500',
                    fontSize: 14
                  }}>
                    {tab}
                  </Text>
                  {count > 0 && (
                    <View style={{
                      backgroundColor: isActive ? '#22c55e' : 'rgba(255,255,255,0.3)',
                      borderRadius: 10,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      marginLeft: 6,
                      minWidth: 20,
                      alignItems: 'center'
                    }}>
                      <Text style={{
                        color: isActive ? 'white' : 'white',
                        fontSize: 10,
                        fontWeight: '600'
                      }}>
                        {count}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Enhanced Notifications List */}
      <ScrollView 
        style={{ flex: 1, backgroundColor: '#f8fafc', marginTop: -20 }} 
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={{ 
          backgroundColor: '#f8fafc', 
          borderTopLeftRadius: 24, 
          borderTopRightRadius: 24, 
          paddingTop: 28,
          minHeight: '100%'
        }}>
          
          {/* Instructions */}
          {getFilteredNotifications().length > 0 && (
            <View style={{ 
              paddingHorizontal: 20, 
              marginBottom: 16,
              backgroundColor: 'rgba(34, 197, 94, 0.05)',
              marginHorizontal: 20,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: 'rgba(34, 197, 94, 0.2)'
            }}>
              <Text style={{ 
                color: '#059669', 
                fontSize: 14, 
                fontWeight: '600',
                textAlign: 'center'
              }}>
                💡 Swipe right to mark as read • Swipe left to delete
              </Text>
            </View>
          )}
          
          {/* Notifications */}
          {getFilteredNotifications().length > 0 ? (
            getFilteredNotifications().map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 60,
              paddingHorizontal: 40
            }}>
              <Text style={{ fontSize: 64, marginBottom: 16 }}>📭</Text>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8,
                textAlign: 'center'
              }}>
                No {activeTab.toLowerCase()} notifications
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#9ca3af',
                textAlign: 'center',
                lineHeight: 20
              }}>
                You're all caught up! Check back later for new eco-friendly updates.
              </Text>
            </View>
          )}

          {/* Enhanced Load More Button */}
          {getFilteredNotifications().length > 0 && (
            <View style={{ paddingHorizontal: 20, paddingVertical: 32 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  paddingVertical: 18,
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: '#e5e7eb',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ 
                    color: '#6b7280', 
                    fontWeight: '600', 
                    fontSize: 16,
                    marginRight: 8
                  }}>
                    Load More Notifications
                  </Text>
                  <Text style={{ color: '#9ca3af', fontSize: 18 }}>↓</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Enhanced Notification Card Component with Swipe Gestures
const NotificationCard: React.FC<{
  notification: NotificationItem;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ notification, onMarkAsRead, onDelete }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isSwipeActive, setIsSwipeActive] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5 && Math.abs(gestureState.dy) < 50;
      },
      onPanResponderGrant: () => {
        setIsSwipeActive(true);
      },
      onPanResponderMove: (_, gestureState) => {
        // Limit swipe to reasonable bounds
        const newTranslateX = Math.max(-120, Math.min(120, gestureState.dx));
        translateX.setValue(newTranslateX);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, vx } = gestureState;
        
        if (dx > 80 || vx > 0.5) {
          // Swipe right - mark as read
          Animated.spring(translateX, {
            toValue: screenWidth,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
          }).start(() => {
            onMarkAsRead(notification.id);
            translateX.setValue(0);
          });
        } else if (dx < -80 || vx < -0.5) {
          // Swipe left - delete
          Animated.spring(translateX, {
            toValue: -screenWidth,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
          }).start(() => {
            onDelete(notification.id);
            translateX.setValue(0);
          });
        } else {
          // Snap back to center
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
          }).start();
        }
        
        setIsSwipeActive(false);
      },
    })
  ).current;

  return (
    <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
      <View style={{ position: 'relative' }}>
        {/* Background Actions */}
        <View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          borderRadius: 16,
          overflow: 'hidden'
        }}>
          {/* Mark as Read Action */}
          <View style={{
            backgroundColor: '#22c55e',
            width: 80,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            shadowColor: '#22c55e',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text style={{ fontSize: 24, marginBottom: 4 }}>✓</Text>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>READ</Text>
          </View>
          
          {/* Delete Action */}
          <View style={{
            backgroundColor: '#ef4444',
            width: 80,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            shadowColor: '#ef4444',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text style={{ fontSize: 24, marginBottom: 4 }}>🗑️</Text>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>DELETE</Text>
          </View>
        </View>

        {/* Swipeable Notification Card */}
        <Animated.View
          style={{
            transform: [{ translateX }],
            backgroundColor: 'white',
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isSwipeActive ? 0.25 : 0.1,
            shadowRadius: isSwipeActive ? 8 : 4,
            elevation: isSwipeActive ? 8 : 3,
          }}
          {...panResponder.panHandlers}
        >
          <View style={{
            padding: 20,
            borderRadius: 16,
            borderLeftWidth: notification.isRead ? 0 : 5,
            borderLeftColor: notification.iconBgColor,
            backgroundColor: notification.isRead ? '#ffffff' : '#fafffe'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              {/* Enhanced Icon */}
              <View style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: notification.iconBgColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
                shadowColor: notification.iconBgColor,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 2,
              }}>
                <Text style={{ fontSize: 24 }}>{notification.icon}</Text>
              </View>

              {/* Enhanced Content */}
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      color: '#111827',
                      fontWeight: '700',
                      fontSize: 16,
                      marginBottom: 6,
                      lineHeight: 22
                    }}>
                      {notification.title}
                    </Text>
                    <Text style={{
                      color: '#6b7280',
                      fontSize: 14,
                      lineHeight: 20,
                      marginBottom: 10
                    }}>
                      {notification.description}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{
                        color: '#9ca3af',
                        fontSize: 12,
                        fontWeight: '500'
                      }}>
                        {notification.timestamp}
                      </Text>
                      {notification.hasActions && (
                        <View style={{
                          backgroundColor: '#fef3c7',
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: '#f59e0b'
                        }}>
                          <Text style={{ color: '#d97706', fontSize: 10, fontWeight: '600' }}>ACTION REQUIRED</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  {/* Enhanced Unread Indicator */}
                  {!notification.isRead && (
                    <View style={{ alignItems: 'center', marginLeft: 12 }}>
                      <View style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: notification.iconBgColor,
                        shadowColor: notification.iconBgColor,
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.4,
                        shadowRadius: 2,
                        elevation: 2,
                      }} />
                      <Text style={{ 
                        color: notification.iconBgColor, 
                        fontSize: 8, 
                        fontWeight: '600', 
                        marginTop: 2 
                      }}>
                        NEW
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default NotificationsScreen;