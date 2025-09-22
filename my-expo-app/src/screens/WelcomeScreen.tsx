import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Theme } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';

interface WelcomeScreenProps {
  onCreateAccount: () => void;
  onSignIn: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onCreateAccount, onSignIn }) => {
  return (
    <LinearGradient
      colors={[ '#00c853', '#00e676' ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={[ 'rgba(255,255,255,0.06)', 'transparent' ]} style={styles.decorTop} />
        <View style={styles.content}>
          <View style={styles.iconCircleLarge}>
            <Ionicons name="map" size={44} color={Colors.primary[600]} />
          </View>

          <Text style={styles.title}>Eco-Ranger</Text>
          <Text style={styles.subtitle}>Connect with local businesses and discover amazing experiences</Text>

          <TouchableOpacity onPress={onCreateAccount} style={{ width: '100%' }} activeOpacity={0.9}>
            <LinearGradient colors={[ '#ffffff', '#ffffff' ]} style={styles.primaryButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.primaryButtonText}>Create an Account</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={onSignIn} activeOpacity={0.8}>
            <LinearGradient
              colors={[ 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.3)' ]}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Already have an account?</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <LinearGradient colors={[ 'transparent', 'rgba(255,255,255,0.04)' ]} style={styles.decorBottom} />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconCircleLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#e8fff0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.lg,
  },
  title: {
    fontSize: 28,
    color: Colors.white,
    fontWeight: '900',
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.md,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.xl,
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: Colors.primary[500],
    fontWeight: '900',
    fontSize: 18,
  },
  secondaryButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.secondary[200],
    fontWeight: '700',
  },
  decorTop: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    transform: [{ scale: 1.2 }]
  },
  decorBottom: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    transform: [{ scale: 1.0 }]
  },
});

export default WelcomeScreen;
