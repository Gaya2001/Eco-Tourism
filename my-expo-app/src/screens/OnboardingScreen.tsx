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
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Theme } from '../constants';
// ...existing code... (Button component not used in this screen)

const { width, height } = Dimensions.get('window');

interface OnboardingItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  iconColor: string;
  // optional bullets for final screen
  bullets?: { icon: keyof typeof Ionicons.glyphMap; text: string; bgColor: string }[];
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Discover Eco-Friendly Stays',
    subtitle: 'Find unique sustainable accommodations',
    description: 'Find unique sustainable accommodations that respect nature while providing unforgettable experiences',
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
  {
    id: '5',
    title: 'Welcome to Eco-Ranger',
    subtitle: '',
    description: 'Connect with local businesses and discover authentic experiences wherever you go',
    icon: 'map',
    backgroundColor: Colors.white,
    iconColor: Colors.primary[500],
    bullets: [
      { icon: 'map', text: 'Discover local attractions', bgColor: '#e6f0ff' },
      { icon: 'business', text: 'Connect with businesses', bgColor: '#e9fbe9' },
      { icon: 'star', text: 'Authentic experiences', bgColor: '#f6e9ff' },
    ],
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

  const renderOnboardingItem = ({ item, index }: { item: OnboardingItem; index: number }) => (
    <View style={styles.slide}>
      {/* Top bar: counter and Skip */}
      <View style={styles.topBar}>
        <Text style={styles.counter}>{`${index + 1} / ${onboardingData.length}`}</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Large rounded image placeholder (use icon circle as image) */}
      <View style={styles.imageWrapper}>
        <View style={[styles.imageBox, { backgroundColor: item.backgroundColor }]}> 
          <Ionicons name={item.icon} size={80} color={item.iconColor} />
        </View>
      </View>

      {/* Card-like content or final welcome layout */}
      {item.bullets ? (
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeHeading}>{item.title}</Text>
          <Text style={styles.welcomeDescription}>{item.description}</Text>

          <View style={styles.bulletsList}>
            {item.bullets.map((b, i) => (
              <View style={styles.bulletRow} key={i}>
                <View style={[styles.bulletIcon, { backgroundColor: b.bgColor }]}>
                  <Ionicons name={b.icon} size={18} color={Colors.primary[500] as any} />
                </View>
                <Text style={styles.bulletText}>{b.text}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <Text style={styles.heading}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>

          {/* Progress dots */}
          <View style={styles.dotsContainer}>
            {onboardingData.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  { backgroundColor: idx === currentIndex ? Colors.primary[500] : Colors.neutral[300] }
                ]}
              />
            ))}
          </View>
        </View>
      )}
    </View>
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
        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continueButtonText}>{currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Continue'}</Text>
        </TouchableOpacity>
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
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.md,
  },
  counter: {
    color: Colors.neutral[500],
    fontWeight: '600',
  },
  skipText: {
    color: Colors.neutral[500],
    fontWeight: '600',
  },
  imageWrapper: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  imageBox: {
    width: 280,
    height: 220,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.lg,
  },
  cardContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    marginTop: 24,
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.lg,
    alignItems: 'center',
    ...Theme.shadows.lg,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Theme.spacing.lg,
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
  continueButton: {
    backgroundColor: Colors.primary[500],
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.md,
    minWidth: 220,
    alignItems: 'center',
  },
  continueButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  welcomeCard: {
    width: '90%',
    backgroundColor: Colors.white,
    marginTop: 24,
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    ...Theme.shadows.lg,
  },
  welcomeHeading: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: Theme.spacing.sm,
  },
  welcomeDescription: {
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
  },
  bulletsList: {
    width: '100%',
    marginTop: Theme.spacing.md,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Theme.spacing.sm,
  },
  bulletIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  bulletText: {
    fontSize: 14,
    color: Colors.neutral[700],
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
