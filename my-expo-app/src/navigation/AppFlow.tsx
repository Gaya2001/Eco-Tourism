import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  SplashScreen, 
  OnboardingScreen, 
  RoleSelectionScreen, 
  SignUpScreen, 
  SignInScreen, 
  DashboardScreen,
  EcoBizDashboardScreen,
  BusinessRegistrationStep1,
  BusinessRegistrationStep2,
  BusinessRegistrationStep3,
  BusinessRegistrationStep4,
  WelcomeScreen,
  CertificationStatusScreen,
} from '../screens';
import { Colors } from '../constants';

type AppFlowState = 'splash' | 'onboarding' | 'welcome' | 'roleSelection' | 'signUp' | 'signIn' | 'dashboard' | 'bizDashboard' | 'businessRegistration1' | 'businessRegistration2' | 'businessRegistration3' | 'businessRegistration4' | 'certificationStatus';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'businessman' | 'admin';
}

const AppFlow: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<AppFlowState>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCompletedBusinessRegistration, setHasCompletedBusinessRegistration] = useState(false);
  const [businessRegistrationData, setBusinessRegistrationData] = useState<Record<string, any>>({});

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
        name: userData.fullName,
        email: userData.email,
        role: userData.role || 'tourist', // Use the selected role
      };
      
      setUser(newUser);
      // Navigate to appropriate dashboard based on role
      if (userData.role === 'businessman') {
        setCurrentFlow('bizDashboard');
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
      
      // Determine role based on email
      const role = credentials.email === 'business@gmail.com' ? 'businessman' : 'tourist';
      const userName = role === 'businessman' ? 'Business Owner' : 'John Doe';
      
      const existingUser: User = {
        id: '1',
        name: userName,
        email: credentials.email,
        role: role,
      };
      
      setUser(existingUser);
      
      // Navigate to appropriate dashboard based on role
      if (role === 'businessman') {
        setCurrentFlow('bizDashboard');
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
    // For demo, just show an alert or navigate to forgot password screen
    console.log('Navigate to forgot password');
  };

  const handleStartBusinessRegistration = () => {
    setCurrentFlow('businessRegistration1');
  };

  const handleNavigateToCertificationStatus = () => {
    setCurrentFlow('certificationStatus');
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
        />
      );
    
    case 'bizDashboard':
      return (
        <EcoBizDashboardScreen 
          user={{
            name: user?.name || 'Business Owner',
          }}
          hasCompletedBusinessRegistration={hasCompletedBusinessRegistration}
          onStartBusinessRegistration={handleStartBusinessRegistration}
          onNavigateToCertificationStatus={handleNavigateToCertificationStatus}
        />
      );
    
    case 'businessRegistration1':
      return (
        <BusinessRegistrationStep1
          onNext={(data) => {
            // Store step 1 data and move to step 2
            setBusinessRegistrationData(prev => ({ ...prev, step1: data }));
            setCurrentFlow('businessRegistration2');
          }}
          onSaveDraft={(data) => {
            // Save draft and navigate back to dashboard
            setBusinessRegistrationData(prev => ({ ...prev, step1: data }));
            setCurrentFlow('bizDashboard');
          }}
          onBack={() => setCurrentFlow('bizDashboard')}
        />
      );

    case 'businessRegistration2':
      return (
        <BusinessRegistrationStep2
          onNext={(data) => {
            // Store step 2 data and move to step 3
            setBusinessRegistrationData(prev => ({ ...prev, step2: data }));
            setCurrentFlow('businessRegistration3');
          }}
          onBack={() => {
            // Go back to step 1
            setCurrentFlow('businessRegistration1');
          }}
        />
      );

    case 'businessRegistration3':
      return (
        <BusinessRegistrationStep3
          onNext={(data) => {
            // Store step 3 data and move to step 4
            setBusinessRegistrationData(prev => ({ ...prev, step3: data }));
            setCurrentFlow('businessRegistration4');
          }}
          onBack={() => {
            // Go back to step 2
            setCurrentFlow('businessRegistration2');
          }}
          onSaveDraft={() => {
            // Save draft and navigate back to dashboard
            setCurrentFlow('bizDashboard');
          }}
        />
      );

    case 'businessRegistration4':
      return (
        <BusinessRegistrationStep4
          onSubmit={() => {
            // Complete registration and mark as completed
            setHasCompletedBusinessRegistration(true);
            setCurrentFlow('bizDashboard');
          }}
          onBack={() => {
            // Go back to step 3
            setCurrentFlow('businessRegistration3');
          }}
          onEdit={(section) => {
            // Handle editing specific sections (navigate to appropriate step)
            if (section.includes('business')) {
              setCurrentFlow('businessRegistration1');
            } else if (section.includes('service')) {
              setCurrentFlow('businessRegistration2');
            } else if (section.includes('document')) {
              setCurrentFlow('businessRegistration3');
            }
          }}
        />
      );
    
    case 'certificationStatus':
      return (
        <CertificationStatusScreen
          onBack={() => setCurrentFlow('bizDashboard')}
          hasCompletedBusinessRegistration={hasCompletedBusinessRegistration}
        />
      );
    
    default:
      return <SplashScreen onFinish={() => setCurrentFlow('onboarding')} />;
  }
};

export default AppFlow;
