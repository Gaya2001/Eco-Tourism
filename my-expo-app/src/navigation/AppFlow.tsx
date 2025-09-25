import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  SplashScreen, 
  OnboardingScreen, 
  RoleSelectionScreen, 
  SignUpScreen, 
  SignInScreen, 
  DashboardScreen,
  WelcomeScreen,
  HomeScreen,
  DirectoryScreen,
  ProfileScreen,
  NotificationsScreen,
  HotelDetailScreen,
  ReviewsScreen,
  EcoRewardsScreen,
} from '../screens';
import { Colors } from '../constants';

type AppFlow = 'splash' | 'onboarding' | 'welcome' | 'roleSelection' | 'signUp' | 'signIn' | 'dashboard' | 'home' | 'directory' | 'profile' | 'notifications' | 'hotelDetail' | 'reviews' | 'rewards';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'business' | 'admin';
}

const AppFlow: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<AppFlow>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);

  const handleOnboardingComplete = () => {
    setCurrentFlow('welcome');
  };

  const handleRoleSelect = (_role: string) => {
    setCurrentFlow('signUp');
  };

  const handleSignUp = async (userData: any) => {
    setIsLoading(true);
    try {
      // Simulate sign up process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: '1',
        name: userData.firstName,
        email: userData.email,
        role: 'tourist', // Default role for demo
      };
      
      setUser(newUser);
      setCurrentFlow('home');
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (credentials: any) => {
    setIsLoading(true);
    try {
      // Simulate sign in process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const existingUser: User = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        role: 'tourist',
      };
      
      setUser(existingUser);
      setCurrentFlow('home');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToSignIn = () => {
    setCurrentFlow('signIn');
  };

  const handleNavigateToSignUp = () => {
    setCurrentFlow('signUp');
  };

  const handleForgotPassword = () => {
    // For demo, just show an alert or navigate to forgot password screen
    console.log('Navigate to forgot password');
  };

  const handleNavigateToProfile = () => {
    setCurrentFlow('profile');
  };

  const handleNavigateToNotifications = () => {
    setCurrentFlow('notifications');
  };

  const handleNavigateToDirectory = () => {
    setCurrentFlow('directory');
  };

  const handleNavigateBack = () => {
    // Navigate back to previous screen based on current flow
    switch (currentFlow) {
      case 'onboarding':
        setCurrentFlow('splash');
        break;
      case 'welcome':
        setCurrentFlow('onboarding');
        break;
      case 'roleSelection':
        setCurrentFlow('welcome');
        break;
      case 'signUp':
      case 'signIn':
        setCurrentFlow('welcome');
        break;
      case 'dashboard':
        setCurrentFlow('home');
        break;
      case 'directory':
        setCurrentFlow('home');
        break;
      case 'hotelDetail':
        setCurrentFlow('directory');
        break;
      case 'reviews':
        setCurrentFlow('hotelDetail');
        break;
      case 'rewards':
        setCurrentFlow('home');
        break;
      case 'profile':
        setCurrentFlow('home');
        break;
      case 'notifications':
        setCurrentFlow('home');
        break;
      default:
        setCurrentFlow('splash');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentFlow('welcome');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
      </View>
    );
  }

  switch (currentFlow) {
    case 'splash':
      return <SplashScreen onFinish={() => setCurrentFlow('onboarding')} />;
    
    case 'onboarding':
      return <OnboardingScreen onComplete={handleOnboardingComplete} />;

    case 'welcome':
      return (
        <WelcomeScreen
          onCreateAccount={() => setCurrentFlow('signUp')}
          onSignIn={() => setCurrentFlow('signIn')}
        />
      );

    case 'roleSelection':
      return <RoleSelectionScreen onRoleSelect={handleRoleSelect} />;

    case 'signUp':
      return (
        <SignUpScreen 
          onSignUp={handleSignUp}
          onNavigateToSignIn={handleNavigateToSignIn}
        />
      );
    
    case 'signIn':
      return (
        <SignInScreen 
          onSignIn={handleSignIn}
          onNavigateToSignUp={handleNavigateToSignUp}
          onForgotPassword={handleForgotPassword}
        />
      );
    
    case 'home':
      return (
        <HomeScreen 
          user={{
            name: user?.name || 'Sarah',
          }}
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToNotifications={handleNavigateToNotifications}
          onNavigateToDirectory={handleNavigateToDirectory}
          onNavigateToRewards={() => setCurrentFlow('rewards')}
        />
      );

    case 'directory':
      return (
        <DirectoryScreen 
          onNavigateBack={handleNavigateBack}
          onNavigateToHome={() => setCurrentFlow('home')}
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToRewards={() => setCurrentFlow('rewards')}
          onNavigateToHotelDetail={(businessId: string) => {
            setSelectedBusinessId(businessId);
            setCurrentFlow('hotelDetail');
          }}
        />
      );

    case 'dashboard':
      return (
        <DashboardScreen 
          user={{
            name: user?.name || 'User',
            level: 3,
            ecoPoints: 1250,
          }}
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToNotifications={handleNavigateToNotifications}
          onNavigateToHome={() => setCurrentFlow('home')}
          onLogout={handleLogout}
        />
      );
    
    case 'profile':
      return (
        <ProfileScreen 
          onNavigateBack={handleNavigateBack}
          onLogout={handleLogout}
          onNavigateToHome={() => setCurrentFlow('home')}
          onNavigateToDirectory={() => setCurrentFlow('directory')}
          onNavigateToRewards={() => setCurrentFlow('rewards')}
        />
      );

    case 'notifications':
      return (
        <NotificationsScreen 
          onNavigateBack={handleNavigateBack}
        />
      );

    case 'hotelDetail':
      return (
        <HotelDetailScreen 
          onNavigateBack={handleNavigateBack}
          onNavigateToReviews={() => setCurrentFlow('reviews')}
        />
      );

    case 'reviews':
      return (
        <ReviewsScreen 
          onNavigateBack={handleNavigateBack}
        />
      );

    case 'rewards':
      return (
        <EcoRewardsScreen 
          onNavigateBack={handleNavigateBack}
          onNavigateToHome={() => setCurrentFlow('home')}
          onNavigateToDirectory={() => setCurrentFlow('directory')}
          onNavigateToProfile={handleNavigateToProfile}
        />
      );
    
    default:
      return <SplashScreen onFinish={() => setCurrentFlow('onboarding')} />;
  }
};

export default AppFlow;
