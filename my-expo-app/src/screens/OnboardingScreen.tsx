import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  FlatList, 
  TouchableOpacity,
  ViewToken
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Theme } from '../constants';
import { Button } from '../components';

const { width, height } = Dimensions.get('window');

interface OnboardingItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  iconColor: string;
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Reduce & Recycle',
    subtitle: 'Make a Difference',
    description: 'Join thousands of eco-warriors in reducing waste and protecting our planet through smart recycling habits.',
    icon: 'leaf',
    backgroundColor: Colors.primary[500],
    iconColor: Colors.white,
  },
  {
    id: '2',
    title: 'Adventure Awaits',
    subtitle: 'Explore Sustainably',
    description: 'Discover breathtaking waterways and connect with nature through eco-friendly kayaking adventures.',
    icon: 'boat',
    backgroundColor: '#3b82f6', // Blue
    iconColor: Colors.white,
  },
  {
    id: '3',
    title: 'Wildlife Watching',
    subtitle: 'Protect & Observe',
    description: 'Experience incredible wildlife encounters while supporting conservation efforts and animal protection.',
    icon: 'eye',
    backgroundColor: '#f97316', // Orange
    iconColor: Colors.white,
  },
  {
    id: '4',
    title: 'Plant Together',
    subtitle: 'Grow Communities',
    description: 'Build stronger communities by planting trees, creating gardens, and fostering environmental stewardship.',
    icon: 'flower',
    backgroundColor: '#84cc16', // Light green
    iconColor: Colors.white,
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const renderOnboardingItem = ({ item }: { item: OnboardingItem }) => (
    <LinearGradient
      colors={['#f0fdf4', '#dbeafe']} // Light green to light blue
      style={styles.slide}
    >
      {/* Background decorations */}
      <View style={[styles.backgroundCircle, styles.topCircle]} />
      <View style={[styles.backgroundCircle, styles.bottomCircle]} />

      {/* Small decorative icon at top */}
      <View style={styles.topIcon}>
        <Ionicons name={item.icon} size={20} color={item.backgroundColor} />
      </View>

      {/* Main icon circle */}
      <View style={[styles.iconContainer, { backgroundColor: item.backgroundColor }]}>
        <Ionicons name={item.icon} size={60} color={item.iconColor} />
      </View>

      {/* Content card */}
      <View style={styles.contentCard}>
        <Text style={[styles.title, { color: item.backgroundColor }]}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {/* Progress dots */}
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentIndex ? item.backgroundColor : Colors.neutral[300],
                }
              ]}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderOnboardingItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      {/* Bottom actions */}
      <View style={styles.navigationContainer}>
        {currentIndex === onboardingData.length - 1 ? (
          <Button
            title="Start Adventure!"
            variant="primary"
            onPress={onComplete}
            style={styles.actionButton}
          />
        ) : (
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    position: 'relative',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.1,
  },
  topCircle: {
    top: 100,
    left: -75,
    backgroundColor: Colors.primary[500],
  },
  bottomCircle: {
    bottom: 200,
    right: -75,
    backgroundColor: Colors.secondary[500],
  },
  topIcon: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    ...Theme.shadows.lg,
  },
  contentCard: {
    backgroundColor: Colors.white,
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    marginHorizontal: Theme.spacing.md,
    ...Theme.shadows.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Theme.spacing.lg,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
  },
  actionButton: {
    paddingHorizontal: 40,
    minWidth: 200,
  },
  skipButton: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  skipButtonText: {
    fontSize: 16,
    color: Colors.neutral[600],
    fontWeight: '600',
  },
});

export default OnboardingScreen;
