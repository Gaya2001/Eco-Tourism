import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  EventsScreen,
  EcoBizDashboardScreen,
  CertificationStatusScreen,
  BusinessRegistrationStep1,
  BusinessRegistrationStep2,
  BusinessRegistrationStep3,
  BusinessRegistrationStep4,
} from '../screens';

type DemoScreen = 
  | 'menu'
  | 'events'
  | 'ecoBizDashboard'
  | 'certificationStatus'
  | 'businessRegistration1'
  | 'businessRegistration2'
  | 'businessRegistration3'
  | 'businessRegistration4';

const DemoNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<DemoScreen>('menu');
  const [businessData, setBusinessData] = useState<Record<string, any>>({});

  const screens = [
    {
      id: 'events',
      title: 'Events Screen',
      description: 'Event listing with filters and cards',
      icon: 'calendar',
      color: 'bg-blue-500',
    },
    {
      id: 'ecoBizDashboard',
      title: 'EcoBiz Dashboard',
      description: 'Business dashboard with profile status',
      icon: 'business',
      color: 'bg-green-500',
    },
    {
      id: 'certificationStatus',
      title: 'Certification Status',
      description: 'Certification tracking with timeline',
      icon: 'school',
      color: 'bg-purple-500',
    },
    {
      id: 'businessRegistration1',
      title: 'Business Registration - Step 1',
      description: 'Basic business information form',
      icon: 'document-text',
      color: 'bg-orange-500',
    },
    {
      id: 'businessRegistration2',
      title: 'Business Registration - Step 2',
      description: 'Services selection',
      icon: 'list',
      color: 'bg-red-500',
    },
    {
      id: 'businessRegistration3',
      title: 'Business Registration - Step 3',
      description: 'Document upload',
      icon: 'cloud-upload',
      color: 'bg-indigo-500',
    },
    {
      id: 'businessRegistration4',
      title: 'Business Registration - Step 4',
      description: 'Review and submit',
      icon: 'checkmark-circle',
      color: 'bg-pink-500',
    },
  ];

  const navigateToScreen = (screenId: DemoScreen) => {
    setCurrentScreen(screenId);
  };

  const goBackToMenu = () => {
    setCurrentScreen('menu');
  };

  // Business Registration Flow Handlers
  const handleStep1Next = (data: any) => {
    setBusinessData((prev: Record<string, any>) => ({ ...prev, step1: data }));
    setCurrentScreen('businessRegistration2');
  };

  const handleStep2Next = (data: any) => {
    setBusinessData((prev: Record<string, any>) => ({ ...prev, step2: data }));
    setCurrentScreen('businessRegistration3');
  };

  const handleStep3Next = (data: any) => {
    setBusinessData((prev: Record<string, any>) => ({ ...prev, step3: data }));
    setCurrentScreen('businessRegistration4');
  };

  const handleStep4Submit = () => {
    console.log('Registration Complete:', businessData);
    setCurrentScreen('menu');
  };

  const handleStep4Edit = (section: string) => {
    switch (section) {
      case 'business':
      case 'contact':
      case 'owner':
        setCurrentScreen('businessRegistration1');
        break;
      case 'services':
        setCurrentScreen('businessRegistration2');
        break;
      case 'documents':
        setCurrentScreen('businessRegistration3');
        break;
    }
  };

  const handleSaveDraft = (data?: any) => {
    console.log('Draft saved:', data);
  };

  if (currentScreen === 'menu') {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
        
        {/* Header */}
        <View className="bg-white px-4 py-6 border-b border-gray-200">
          <Text className="text-3xl font-bold text-gray-900 mb-2">UI Showcase</Text>
          <Text className="text-gray-600">Explore all the implemented screens</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="px-4 py-6">
            {screens.map((screen) => (
              <TouchableOpacity
                key={screen.id}
                onPress={() => navigateToScreen(screen.id as DemoScreen)}
                className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
              >
                <View className="flex-row items-center">
                  <View className={`w-14 h-14 ${screen.color} rounded-2xl items-center justify-center mr-4`}>
                    <Ionicons name={screen.icon as any} size={24} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-900 mb-1">
                      {screen.title}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {screen.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Render specific screens
  switch (currentScreen) {
    case 'events':
      return <EventsScreen />;
    
    case 'ecoBizDashboard':
      return <EcoBizDashboardScreen />;
    
    case 'certificationStatus':
      return <CertificationStatusScreen onBack={goBackToMenu} />;
    
    case 'businessRegistration1':
      return (
        <BusinessRegistrationStep1
          onNext={handleStep1Next}
          onSaveDraft={handleSaveDraft}
        />
      );
    
    case 'businessRegistration2':
      return (
        <BusinessRegistrationStep2
          onNext={handleStep2Next}
          onBack={() => setCurrentScreen('businessRegistration1')}
        />
      );
    
    case 'businessRegistration3':
      return (
        <BusinessRegistrationStep3
          onNext={handleStep3Next}
          onBack={() => setCurrentScreen('businessRegistration2')}
          onSaveDraft={handleSaveDraft}
        />
      );
    
    case 'businessRegistration4':
      return (
        <BusinessRegistrationStep4
          onSubmit={handleStep4Submit}
          onBack={() => setCurrentScreen('businessRegistration3')}
          onEdit={handleStep4Edit}
        />
      );
    
    default:
      return <View />;
  }
};

export default DemoNavigator;