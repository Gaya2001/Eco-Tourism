import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Theme } from '../constants';
import { SearchInput } from '../components';

const { width } = Dimensions.get('window');

interface DashboardScreenProps {
  user?: {
    name: string;
    avatar?: string;
    level: number;
    ecoPoints: number;
  };
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  user = {
    name: 'John',
    level: 3,
    ecoPoints: 1250
  }
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const ecoActivities = [
    {
      id: '1',
      title: 'Beach Cleanup',
      location: 'Bali, Indonesia',
      points: 50,
      icon: 'water',
      color: '#06b6d4',
      progress: 0.7,
    },
    {
      id: '2',
      title: 'Tree Planting',
      location: 'Costa Rica',
      points: 75,
      icon: 'leaf',
      color: Colors.primary[500],
      progress: 0.4,
    },
    {
      id: '3',
      title: 'Wildlife Tour',
      location: 'Kenya',
      points: 100,
      icon: 'camera',
      color: '#f97316',
      progress: 0.9,
    },
  ];

  const achievements = [
    { id: '1', title: 'Eco Warrior', icon: 'shield', unlocked: true },
    { id: '2', title: 'Tree Hugger', icon: 'leaf', unlocked: true },
    { id: '3', title: 'Ocean Guardian', icon: 'water', unlocked: false },
    { id: '4', title: 'Carbon Neutral', icon: 'planet', unlocked: false },
  ];

  const quickActions = [
    { id: '1', title: 'Book Tour', icon: 'calendar', color: Colors.primary[500] },
    { id: '2', title: 'Find Events', icon: 'search', color: '#3b82f6' },
    { id: '3', title: 'Track Impact', icon: 'analytics', color: '#10b981' },
    { id: '4', title: 'Community', icon: 'people', color: '#f59e0b' },
  ];

  const renderEcoActivity = (activity: any) => (
    <View key={activity.id} style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <View style={[styles.activityIcon, { backgroundColor: activity.color }]}>
          <Ionicons name={activity.icon} size={20} color={Colors.white} />
        </View>
        <View style={styles.activityInfo}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <Text style={styles.activityLocation}>{activity.location}</Text>
        </View>
        <View style={styles.activityPoints}>
          <Text style={styles.pointsText}>+{activity.points}</Text>
          <Text style={styles.pointsLabel}>pts</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${activity.progress * 100}%`,
                backgroundColor: activity.color 
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{Math.round(activity.progress * 100)}% complete</Text>
      </View>
    </View>
  );

  const renderAchievement = (achievement: any) => (
    <TouchableOpacity 
      key={achievement.id} 
      style={[
        styles.achievementCard,
        achievement.unlocked ? styles.achievementUnlocked : styles.achievementLocked
      ]}
    >
      <View style={[
        styles.achievementIcon,
        { backgroundColor: achievement.unlocked ? Colors.primary[500] : Colors.neutral[300] }
      ]}>
        <Ionicons 
          name={achievement.icon} 
          size={16} 
          color={achievement.unlocked ? Colors.white : Colors.neutral[500]} 
        />
      </View>
      <Text style={[
        styles.achievementTitle,
        { color: achievement.unlocked ? Colors.neutral[900] : Colors.neutral[500] }
      ]}>
        {achievement.title}
      </Text>
    </TouchableOpacity>
  );

  const renderQuickAction = (action: any) => (
    <TouchableOpacity key={action.id} style={styles.quickActionCard}>
      <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
        <Ionicons name={action.icon} size={24} color={Colors.white} />
      </View>
      <Text style={styles.quickActionTitle}>{action.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[Colors.primary[500], Colors.primary[600]]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.greeting}>Good morning,</Text>
                <Text style={styles.userName}>{user.name}!</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={24} color={Colors.white} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Eco Journey Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.ecoPoints}</Text>
              <Text style={styles.statLabel}>Eco Points</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Level {user.level}</Text>
              <Text style={styles.statLabel}>Eco Warrior</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Tours Done</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search eco tours, events..."
            style={styles.searchInput}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Current Eco Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Eco Journey</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {ecoActivities.map(renderEcoActivity)}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsContainer}
          >
            {achievements.map(renderAchievement)}
          </ScrollView>
        </View>

        {/* Impact Summary Card */}
        <View style={styles.impactCard}>
          <LinearGradient
            colors={['#ecfdf5', '#f0fdf4']}
            style={styles.impactGradient}
          >
            <View style={styles.impactHeader}>
              <Ionicons name="leaf" size={24} color={Colors.primary[500]} />
              <Text style={styles.impactTitle}>Your Eco Impact</Text>
            </View>
            <View style={styles.impactStats}>
              <View style={styles.impactItem}>
                <Text style={styles.impactValue}>2.5 tons</Text>
                <Text style={styles.impactLabel}>CO² Saved</Text>
              </View>
              <View style={styles.impactItem}>
                <Text style={styles.impactValue}>150</Text>
                <Text style={styles.impactLabel}>Trees Planted</Text>
              </View>
              <View style={styles.impactItem}>
                <Text style={styles.impactValue}>5 km</Text>
                <Text style={styles.impactLabel}>Beach Cleaned</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.borderRadius.xl,
    borderBottomRightRadius: Theme.borderRadius.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[500],
  },
  greeting: {
    fontSize: 14,
    color: Colors.primary[100],
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  notificationButton: {
    position: 'relative',
    padding: Theme.spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    ...Theme.shadows.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.neutral[900],
  },
  statLabel: {
    fontSize: 12,
    color: Colors.neutral[600],
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.neutral[200],
    marginHorizontal: Theme.spacing.md,
  },
  searchContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  searchInput: {
    marginBottom: 0,
  },
  section: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.neutral[900],
    marginBottom: Theme.spacing.md,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary[500],
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - Theme.spacing.lg * 2 - Theme.spacing.md) / 2,
    backgroundColor: Colors.white,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral[700],
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: Colors.white,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[900],
    marginBottom: 2,
  },
  activityLocation: {
    fontSize: 13,
    color: Colors.neutral[600],
  },
  activityPoints: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary[500],
  },
  pointsLabel: {
    fontSize: 11,
    color: Colors.neutral[500],
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.neutral[200],
    borderRadius: 3,
    marginRight: Theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: Colors.neutral[600],
    minWidth: 80,
    textAlign: 'right',
  },
  achievementsContainer: {
    paddingRight: Theme.spacing.lg,
  },
  achievementCard: {
    alignItems: 'center',
    marginRight: Theme.spacing.md,
    width: 80,
  },
  achievementUnlocked: {
    opacity: 1,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  impactCard: {
    backgroundColor: Colors.white,
    borderRadius: Theme.borderRadius.xl,
    margin: Theme.spacing.lg,
    padding: 0,
    overflow: 'hidden',
    ...Theme.shadows.lg,
  },
  impactGradient: {
    padding: Theme.spacing.lg,
  },
  impactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.neutral[900],
    marginLeft: Theme.spacing.sm,
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactItem: {
    alignItems: 'center',
  },
  impactValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[600],
  },
  impactLabel: {
    fontSize: 12,
    color: Colors.neutral[600],
    marginTop: 2,
  },
});

export default DashboardScreen;
