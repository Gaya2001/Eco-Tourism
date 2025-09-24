import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  AllEventsScreen 
} from '../screens';
import { Colors } from '../constants';

type AppFlow = 'splash' | 'onboarding' | 'roleSelection' | 'signUp' | 'signIn' | 'dashboard' | 'allEvents';

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

  const handleAllEvents = () => {
    setCurrentFlow('allEvents');
  };

  const handleOnboardingComplete = () => {
    setCurrentFlow('roleSelection');
  };

  const handleRoleSelect = (role: string) => {
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
      setCurrentFlow('dashboard');
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
      setCurrentFlow('dashboard');
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
      </View>
    );
  } 

  switch (currentFlow) {
    case 'allEvents':
      return <AllEventsScreen />;
    default:
      return null;
  }
};

export default AppFlow;
