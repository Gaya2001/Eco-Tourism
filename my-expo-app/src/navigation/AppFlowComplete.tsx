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
  EventsScreen,
  EcoBizDashboardScreen,
  CertificationStatusScreen,
  BusinessRegistrationStep1,
  BusinessRegistrationStep2,
  BusinessRegistrationStep3,
  BusinessRegistrationStep4,
} from '../screens';
import { Colors } from '../constants';

type AppFlow = 
  | 'splash' 
  | 'onboarding' 
  | 'welcome' 
  | 'roleSelection' 
  | 'signUp' 
  | 'signIn' 
  | 'dashboard'
  | 'events'
  | 'ecoBizDashboard'
  | 'certificationStatus'
  | 'businessRegistration1'
  | 'businessRegistration2'
  | 'businessRegistration3'
  | 'businessRegistration4';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'business' | 'admin';
}

interface BusinessRegistrationData {
  step1?: any;
  step2?: any;
  step3?: any;
}

const AppFlow: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<AppFlow>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [businessRegistrationData, setBusinessRegistrationData] = useState<BusinessRegistrationData>({});

  const handleOnboardingComplete = () => {
    setCurrentFlow('welcome');
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
        role: userData.role || 'tourist',
      };
      
      setUser(newUser);
      
      // Navigate based on user role
      if (newUser.role === 'business') {
        setCurrentFlow('ecoBizDashboard');
      } else {
        setCurrentFlow('dashboard');
      }
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
        name: 'Sarah Johnson',
        email: credentials.email,
        role: 'business', // For demo, let's use business role
      };
      
      setUser(existingUser);
      
      // Navigate based on user role
      if (existingUser.role === 'business') {
        setCurrentFlow('ecoBizDashboard');
      } else {
        setCurrentFlow('dashboard');
      }
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
    console.log('Navigate to forgot password');
  };

  // Business Registration Flow Handlers
  const handleBusinessRegistrationStep1Next = (data: any) => {
    setBusinessRegistrationData(prev => ({ ...prev, step1: data }));
    setCurrentFlow('businessRegistration2');
  };

  const handleBusinessRegistrationStep2Next = (data: any) => {
    setBusinessRegistrationData(prev => ({ ...prev, step2: data }));
    setCurrentFlow('businessRegistration3');
  };

  const handleBusinessRegistrationStep3Next = (data: any) => {
    setBusinessRegistrationData(prev => ({ ...prev, step3: data }));
    setCurrentFlow('businessRegistration4');
  };

  const handleBusinessRegistrationComplete = () => {
    console.log('Business Registration Complete', businessRegistrationData);
    setCurrentFlow('ecoBizDashboard');
  };

  const handleBusinessRegistrationEdit = (section: string) => {
    switch (section) {
      case 'business':
      case 'contact':
      case 'owner':
        setCurrentFlow('businessRegistration1');
        break;
      case 'services':
        setCurrentFlow('businessRegistration2');
        break;
      case 'documents':
        setCurrentFlow('businessRegistration3');
        break;
    }
  };

  const handleSaveDraft = (data?: any) => {
    console.log('Draft saved', data);
  };

  // Navigation helpers
  const navigateTo = (flow: AppFlow) => {
    setCurrentFlow(flow);
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
    
    case 'dashboard':
      return (
        <DashboardScreen 
          user={{
            name: user?.name || 'User',
            level: 3,
            ecoPoints: 1250,
          }}
        />
      );

    case 'events':
      return <EventsScreen />;

    case 'ecoBizDashboard':
      return <EcoBizDashboardScreen />;

    case 'certificationStatus':
      return (
        <CertificationStatusScreen 
          onBack={() => setCurrentFlow('ecoBizDashboard')}
        />
      );

    case 'businessRegistration1':
      return (
        <BusinessRegistrationStep1
          onNext={handleBusinessRegistrationStep1Next}
          onSaveDraft={handleSaveDraft}
        />
      );

    case 'businessRegistration2':
      return (
        <BusinessRegistrationStep2
          onNext={handleBusinessRegistrationStep2Next}
          onBack={() => setCurrentFlow('businessRegistration1')}
        />
      );

    case 'businessRegistration3':
      return (
        <BusinessRegistrationStep3
          onNext={handleBusinessRegistrationStep3Next}
          onBack={() => setCurrentFlow('businessRegistration2')}
          onSaveDraft={handleSaveDraft}
        />
      );

    case 'businessRegistration4':
      return (
        <BusinessRegistrationStep4
          onSubmit={handleBusinessRegistrationComplete}
          onBack={() => setCurrentFlow('businessRegistration3')}
          onEdit={handleBusinessRegistrationEdit}
        />
      );
    
    default:
      return <SplashScreen onFinish={() => setCurrentFlow('onboarding')} />;
  }
};

export default AppFlow;