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
} from 'react-native';
import BottomNavigation, { type BottomNavTab } from '../components/BottomNavigation';

interface EcoRewardsScreenProps {
  onNavigateBack?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToDirectory?: () => void;
  onNavigateToProfile?: () => void;
}

interface User {
  id: string;
  name: string;
  points: number;
  avatar: string;
  rank: number;
  isCurrentUser?: boolean;
}

interface EcoAction {
  id: string;
  title: string;
  points: number;
  icon: string;
  completed: boolean;
}

interface Badge {
  id: string;
  title: string;
  level: number;
  icon: string;
}

const EcoRewardsScreen: React.FC<EcoRewardsScreenProps> = ({ 
  onNavigateBack,
  onNavigateToHome,
  onNavigateToDirectory,
  onNavigateToProfile
}) => {
  const [showAchievement, setShowAchievement] = useState(true);
  const [todaysActions, setTodaysActions] = useState<EcoAction[]>([
    {
      id: '1',
      title: 'Recycle Plastic',
      points: 50,
      icon: '♻️',
      completed: true
    },
    {
      id: '2',
      title: 'Bike to Work',
      points: 100,
      icon: '🚲',
      completed: true
    },
    {
      id: '3',
      title: 'Save Energy',
      points: 75,
      icon: '💡',
      completed: false
    }
  ]);

  const userStats = {
    name: 'Sarah',
    points: 2480,
    ecoActions: 47,
    dayStreak: 12,
    globalRank: 3
  };

  const badges: Badge[] = [
    { id: '1', title: 'Master', level: 4, icon: '🏆' },
    { id: '2', title: 'Master', level: 2, icon: '🥈' },
    { id: '3', title: 'Master', level: 7, icon: '🥇' }
  ];

  const leaderboard: User[] = [
    {
      id: '1',
      name: 'Emma Wilson',
      points: 3240,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=100&h=100&fit=crop&crop=face',
      rank: 1
    },
    {
      id: '2',
      name: 'Mike Chen',
      points: 2890,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rank: 2
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      points: 2480,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rank: 3,
      isCurrentUser: true
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      points: 2150,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rank: 4
    },
    {
      id: '5',
      name: 'Lisa Park',
      points: 1980,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      rank: 5
    }
  ];

  const toggleAction = (actionId: string) => {
    setTodaysActions(actions =>
      actions.map(action =>
        action.id === actionId
          ? { ...action, completed: !action.completed }
          : action
      )
    );
  };

  const completedActions = todaysActions.filter(action => action.completed).length;
  const totalActions = todaysActions.length;
  const progressPercentage = Math.round((completedActions / totalActions) * 100);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#fbbf24';
      case 2: return '#9ca3af';
      case 3: return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar backgroundColor="#22c55e" barStyle="light-content" />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={{
          backgroundColor: '#22c55e',
          paddingTop: 20,
          paddingBottom: 30,
          paddingHorizontal: 20
        }}>
          {/* Top Bar */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#16a34a',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Text style={{ fontSize: 20, color: 'white' }}>🌱</Text>
              </View>
              <Text style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'white'
              }}>
                EcoRewards
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.2)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16
              }}>
                <Text style={{ fontSize: 14, marginRight: 4, color: 'white' }}>💰</Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: 'white'
                }}>
                  {userStats.points.toLocaleString()}
                </Text>
              </View>
              
              <TouchableOpacity style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{ fontSize: 18, color: 'white' }}>🔔</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Welcome Message */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontSize: 24,
              fontWeight: '700',
              color: 'white',
              marginBottom: 4
            }}>
              Welcome back, {userStats.name}!
            </Text>
            <Text style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.8)'
            }}>
              You're making a difference
            </Text>
          </View>

          {/* Stats Cards */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12
          }}>
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: 16,
              borderRadius: 12,
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: 'white',
                marginBottom: 4
              }}>
                {userStats.ecoActions}
              </Text>
              <Text style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.8)',
                textAlign: 'center'
              }}>
                Eco Actions
              </Text>
            </View>

            <View style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: 16,
              borderRadius: 12,
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: 'white',
                marginBottom: 4
              }}>
                {userStats.dayStreak}
              </Text>
              <Text style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.8)',
                textAlign: 'center'
              }}>
                Day Streak
              </Text>
            </View>

            <View style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: 16,
              borderRadius: 12,
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: 'white',
                marginBottom: 4
              }}>
                #{userStats.globalRank}
              </Text>
              <Text style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.8)',
                textAlign: 'center'
              }}>
                Global Rank
              </Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={{ padding: 20 }}>
          {/* Today's Progress */}
          <View style={{
            backgroundColor: '#f8fafc',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#111827'
              }}>
                Today's Progress
              </Text>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#22c55e'
              }}>
                {progressPercentage}% Complete
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={{
              backgroundColor: '#e5e7eb',
              height: 8,
              borderRadius: 4,
              marginBottom: 8
            }}>
              <View style={{
                backgroundColor: '#22c55e',
                height: '100%',
                width: `${progressPercentage}%`,
                borderRadius: 4
              }} />
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20
            }}>
              <Text style={{
                fontSize: 12,
                color: '#6b7280'
              }}>
                {completedActions}
              </Text>
              <Text style={{
                fontSize: 12,
                color: '#6b7280'
              }}>
                Daily Goal: {totalActions} actions
              </Text>
            </View>

            {/* Action Items */}
            <View style={{ gap: 12 }}>
              {todaysActions.map((action) => (
                <View
                  key={action.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    padding: 16,
                    borderRadius: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 20, marginRight: 12 }}>{action.icon}</Text>
                    <View>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: 2
                      }}>
                        {action.title}
                      </Text>
                      <Text style={{
                        fontSize: 12,
                        color: '#22c55e',
                        fontWeight: '600'
                      }}>
                        +{action.points} points
                      </Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity
                    onPress={() => toggleAction(action.id)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: action.completed ? '#22c55e' : 'transparent',
                      borderWidth: action.completed ? 0 : 2,
                      borderColor: action.completed ? '#22c55e' : '#d1d5db',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {action.completed && (
                      <Text style={{ fontSize: 14, color: 'white' }}>✓</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Badges Section */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#111827',
              marginBottom: 16
            }}>
              Your Badges
            </Text>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 12
            }}>
              {badges.map((badge) => (
                <View
                  key={badge.id}
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    padding: 16,
                    borderRadius: 12,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 2
                  }}
                >
                  <Text style={{ fontSize: 32, marginBottom: 8 }}>{badge.icon}</Text>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: 4
                  }}>
                    {badge.title}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6b7280'
                  }}>
                    Level {badge.level}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Leaderboard */}
          <View style={{ marginBottom: 40 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#111827'
              }}>
                Leaderboard
              </Text>
              <TouchableOpacity>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#22c55e'
                }}>
                  View Full
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 3
            }}>
              {leaderboard.map((user) => (
                <View
                  key={user.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    backgroundColor: user.isCurrentUser ? '#f0fdf4' : 'transparent',
                    borderRadius: 12,
                    marginBottom: user.rank === leaderboard.length ? 0 : 4
                  }}
                >
                  <View style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: getRankColor(user.rank),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: 'white'
                    }}>
                      {user.rank}
                    </Text>
                  </View>

                  <Image
                    source={{ uri: user.avatar }}
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
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      {user.name} {user.isCurrentUser && '(You)'}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: '#6b7280'
                    }}>
                      {user.points.toLocaleString()} points
                    </Text>
                  </View>

                  <Text style={{ fontSize: 20 }}>
                    {getRankIcon(user.rank)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Achievement Modal */}
      <Modal
        visible={showAchievement}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAchievement(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 32,
            alignItems: 'center',
            maxWidth: 320,
            width: '100%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10
          }}>
            {/* Trophy Icon */}
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#fbbf24',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24
            }}>
              <Text style={{ fontSize: 40, color: 'white' }}>🏆</Text>
            </View>

            <Text style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#111827',
              textAlign: 'center',
              marginBottom: 12
            }}>
              Achievement Unlocked!
            </Text>

            <Text style={{
              fontSize: 16,
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: 32,
              lineHeight: 22
            }}>
              You've earned the "Daily Champion" badge!
            </Text>

            <TouchableOpacity
              onPress={() => setShowAchievement(false)}
              style={{
                backgroundColor: '#22c55e',
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderRadius: 12,
                minWidth: 120,
                alignItems: 'center',
                shadowColor: '#22c55e',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '700'
              }}>
                Awesome!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="rewards"
        onTabPress={(tab: BottomNavTab) => {
          switch (tab) {
            case 'home':
              onNavigateToHome?.();
              break;
            case 'directory':
              onNavigateToDirectory?.();
              break;
            case 'profile':
              onNavigateToProfile?.();
              break;
            case 'rewards':
              // Already on rewards, do nothing
              break;
          }
        }}
      />
    </SafeAreaView>
  );
};

export default EcoRewardsScreen;