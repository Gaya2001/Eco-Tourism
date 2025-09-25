const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  navMenu: {
    backgroundColor: '#fff',
    padding: 5,
    paddingTop: 35,
    paddingHorizontal: 10,
    marginTop: 0,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    flexGrow: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    zIndex: 2,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 3,
    borderRadius: 15,
    height: 32,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#2ecc71',
  },
  navButtonText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#fff',
  },
  separator: {
    marginHorizontal: 5,
    fontSize: 18,
    color: '#ddd',
    alignSelf: 'center',
  },
});
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import {
  AllEventsScreen,
  SignInScreen,
  SignUpScreen,
  SplashScreen,
  OnboardingScreen,
  DashboardScreen,
  DashboardWelcome,
  RoleSelectionScreen,
  BusinessRegistration1,
  BusinessRegistration2,
  BusinessRegistration3,
  BusinessCertificationStatus,
  BusinessRegistration4,
  ProfileManagement,
  AdminDashboard,
  Campaigns,
} from './src/screens';
import './global.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('AllEvents');

  const ScreenWrapper = ({ children }: { children: React.ReactNode }) => (
    <View style={{ flex: 1, width: '100%' }}>{children}</View>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'AllEvents':
        return (
          <ScreenWrapper>
            <AllEventsScreen />
          </ScreenWrapper>
        );
      case 'SignIn':
        return (
          <ScreenWrapper>
            <SignInScreen
              onSignIn={() => {}}
              onNavigateToSignUp={() => setCurrentScreen('SignUp')}
              onForgotPassword={() => {}}
            />
          </ScreenWrapper>
        );
      case 'SignUp':
        return (
          <ScreenWrapper>
            <SignUpScreen
              onSignUp={() => {}}
              onNavigateToSignIn={() => setCurrentScreen('SignIn')}
            />
          </ScreenWrapper>
        );
      case 'Splash':
        return (
          <ScreenWrapper>
            <SplashScreen onFinish={() => setCurrentScreen('Onboarding')} />
          </ScreenWrapper>
        );
      case 'Onboarding':
        return (
          <ScreenWrapper>
            <OnboardingScreen onComplete={() => setCurrentScreen('RoleSelection')} />
          </ScreenWrapper>
        );
      case 'RoleSelection':
        return (
          <ScreenWrapper>
            <RoleSelectionScreen onRoleSelect={() => {}} />
          </ScreenWrapper>
        );
      case 'ReportViolations':
        return <ScreenWrapper>{require('./src/screens/ReportViolations').default()}</ScreenWrapper>;
      case 'EcoAnalytics':
        return <ScreenWrapper>{require('./src/screens/EcoAnalytics').default()}</ScreenWrapper>;
      case 'CertifiReview':
        return <ScreenWrapper>{require('./src/screens/CertifiReview').default()}</ScreenWrapper>;
      case 'Dashboard':
        return (
          <ScreenWrapper>
            <DashboardScreen />
          </ScreenWrapper>
        );
      case 'DashboardWelcome':
        return (
          <ScreenWrapper>
            <DashboardWelcome />
          </ScreenWrapper>
        );
      case 'BusinessRegistration1':
        return (
          <ScreenWrapper>
            <BusinessRegistration1 />
          </ScreenWrapper>
        );
      case 'ProfileManagement':
        return (
          <ScreenWrapper>
            <ProfileManagement />
          </ScreenWrapper>
        );
      case 'AdminDashboard':
        return (
          <ScreenWrapper>
            <AdminDashboard />
          </ScreenWrapper>
        );
      case 'Campaigns':
        return (
          <ScreenWrapper>
            <Campaigns
              navigation={{
                navigate: () => {},
                goBack: () => {},
                push: () => {},
                pop: () => {},
                replace: () => {},
                reset: () => {},
              }}
            />
          </ScreenWrapper>
        );
      default:
        return (
          <ScreenWrapper>
            <AllEventsScreen />
          </ScreenWrapper>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* Navigation container with explicit flexGrow: 0 */}
      <View style={{ flexGrow: 0 }}>
        {/* Navigation Menu - setting flexGrow: 0 to prevent stretching */}
        <ScrollView
          horizontal
          style={styles.navMenu}
          contentContainerStyle={{ flexGrow: 0 }}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.navButton, currentScreen === 'AllEvents' && styles.activeButton]}
            onPress={() => setCurrentScreen('AllEvents')}>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'AllEvents' && styles.activeButtonText,
              ]}>
              All Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, currentScreen === 'EcoAnalytics' && styles.activeButton]}
            onPress={() => setCurrentScreen('EcoAnalytics')}>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'EcoAnalytics' && styles.activeButtonText,
              ]}>
              EcoAnalytics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, currentScreen === 'ReportViolations' && styles.activeButton]}
            onPress={() => setCurrentScreen('ReportViolations')}>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'ReportViolations' && styles.activeButtonText,
              ]}>
              Reports
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, currentScreen === 'Dashboard' && styles.activeButton]}
            onPress={() => setCurrentScreen('Dashboard')}>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'Dashboard' && styles.activeButtonText,
              ]}>
              Dashboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, currentScreen === 'DashboardWelcome' && styles.activeButton]}
            onPress={() => setCurrentScreen('DashboardWelcome')}>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'DashboardWelcome' && styles.activeButtonText,
              ]}>
              EcoBiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentScreen === 'BusinessRegistration1' && styles.activeButton,
            ]}
            onPress={() => setCurrentScreen('BusinessRegistration1')}>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'BusinessRegistration1' && styles.activeButtonText,
              ]}>
              Business Reg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, currentScreen === 'ProfileManagement' && styles.activeButton]}
            onPress={() => setCurrentScreen('ProfileManagement')}>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'ProfileManagement' && styles.activeButtonText,
              ]}>
              Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, currentScreen === 'AdminDashboard' && styles.activeButton]}
            onPress={() => setCurrentScreen('AdminDashboard')}>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'AdminDashboard' && styles.activeButtonText,
              ]}>
              Admin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, currentScreen === 'Campaigns' && styles.activeButton]}
            onPress={() => setCurrentScreen('Campaigns')}>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'Campaigns' && styles.activeButtonText,
              ]}>
              Campaigns
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, currentScreen === 'CertifiReview' && styles.activeButton]}
            onPress={() => setCurrentScreen('CertifiReview')}>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'CertifiReview' && styles.activeButtonText,
              ]}>
              Cert Review
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Content area below navigation - takes full available height */}
      <View style={styles.contentContainer}>{renderScreen()}</View>
    </View>
  );
}
