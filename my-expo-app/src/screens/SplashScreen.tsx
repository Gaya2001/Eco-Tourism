import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Theme } from '../constants';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <LinearGradient
      colors={['#a7f3d0', '#dbeafe']} // Light green to light blue gradient
      style={styles.container}
    >
      {/* Decorative background elements */}
      <View style={[styles.backgroundCircle, styles.topLeft]} />
      <View style={[styles.backgroundCircle, styles.topRight]} />
      <View style={[styles.backgroundCircle, styles.bottomLeft]} />
      <View style={[styles.backgroundCircle, styles.bottomRight]} />

      {/* Main content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={40} color={Colors.white} />
        </View>

        {/* App name */}
        <Text style={styles.appName}>EcoVenture</Text>
        <Text style={styles.tagline}>Sustainable adventures await</Text>
      </View>

      {/* Loading indicator */}
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your adventure...</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.3,
  },
  topLeft: {
    top: -50,
    left: -50,
    backgroundColor: Colors.primary[300],
  },
  topRight: {
    top: 100,
    right: -30,
    backgroundColor: Colors.secondary[300],
  },
  bottomLeft: {
    bottom: 200,
    left: -40,
    backgroundColor: Colors.secondary[400],
  },
  bottomRight: {
    bottom: -50,
    right: -50,
    backgroundColor: Colors.primary[400],
  },
  content: {
    alignItems: 'center',
    marginBottom: 100,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.lg,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  tagline: {
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    width: '80%',
  },
  loadingText: {
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: Theme.spacing.md,
  },
  progressBar: {
    width: '60%',
    height: 4,
    backgroundColor: Colors.neutral[300],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: Colors.primary[500],
    borderRadius: 2,
  },
});

export default SplashScreen;
