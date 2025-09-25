import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BusinessRegistrationStep2Props {
  onNext: (data: ServiceSelection) => void;
  onBack: () => void;
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: 'accommodation' | 'dining' | 'activities' | 'wellness';
  icon: string;
}

interface ServiceSelection {
  selectedServices: string[];
}

const services: Service[] = [
  // Accommodation
  {
    id: 'eco-lodging',
    name: 'Eco-Lodging',
    description: 'Sustainable accommodation with minimal environmental impact',
    category: 'accommodation',
    icon: 'home',
  },
  {
    id: 'glamping',
    name: 'Glamping',
    description: 'Luxury camping experience in nature',
    category: 'accommodation',
    icon: 'triangle',
  },
  {
    id: 'eco-cabins',
    name: 'Eco-Cabins',
    description: 'Self-contained sustainable cabins',
    category: 'accommodation',
    icon: 'business',
  },

  // Food & Dining
  {
    id: 'organic-meals',
    name: 'Organic Meals',
    description: 'Farm-to-table dining with organic ingredients',
    category: 'dining',
    icon: 'restaurant',
  },
  {
    id: 'vegan-options',
    name: 'Vegan Options',
    description: 'Plant-based meal options available',
    category: 'dining',
    icon: 'leaf',
  },
  {
    id: 'local-cuisine',
    name: 'Local Cuisine',
    description: 'Traditional dishes from local ingredients',
    category: 'dining',
    icon: 'cafe',
  },

  // Activities & Experiences
  {
    id: 'guided-nature-tours',
    name: 'Guided Nature Tours',
    description: 'Expert-led exploration of local ecosystems',
    category: 'activities',
    icon: 'walk',
  },
  {
    id: 'eco-cycling-tours',
    name: 'Eco-Cycling Tours',
    description: 'Sustainable cycling adventures',
    category: 'activities',
    icon: 'bicycle',
  },
  {
    id: 'water-activities',
    name: 'Water Activities',
    description: 'Kayaking, swimming, and water sports',
    category: 'activities',
    icon: 'water',
  },

  // Wellness & Sustainability
  {
    id: 'yoga-meditation',
    name: 'Yoga & Meditation',
    description: 'Mindfulness sessions in natural settings',
    category: 'wellness',
    icon: 'fitness',
  },
  {
    id: 'waste-management',
    name: 'Waste Management',
    description: 'Comprehensive recycling and composting programs',
    category: 'wellness',
    icon: 'trash',
  },
  {
    id: 'renewable-energy',
    name: 'Renewable Energy',
    description: 'Solar, wind, or other sustainable energy sources',
    category: 'wellness',
    icon: 'flash',
  },
];

const categoryTitles = {
  accommodation: 'Accommodation',
  dining: 'Food & Dining',
  activities: 'Activities & Experiences',
  wellness: 'Wellness & Sustainability',
};

const categoryIcons = {
  accommodation: 'bed',
  dining: 'restaurant',
  activities: 'trail-sign',
  wellness: 'leaf',
};

const BusinessRegistrationStep2: React.FC<BusinessRegistrationStep2Props> = ({
  onNext,
  onBack,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleNext = () => {
    if (selectedServices.length === 0) {
      Alert.alert(
        'No Services Selected',
        'Please select at least one service your business provides to guests.'
      );
      return;
    }
    onNext({ selectedServices });
  };

  const ServiceCard = ({ service }: { service: Service }) => {
    const isSelected = selectedServices.includes(service.id);
    
    return (
      <TouchableOpacity
        onPress={() => toggleService(service.id)}
        className={`border-2 rounded-2xl p-4 mb-3 ${
          isSelected 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-200 bg-white'
        }`}
      >
        <View className="flex-row items-start">
          <View className={`w-12 h-12 rounded-xl items-center justify-center mr-3 ${
            isSelected ? 'bg-green-500' : 'bg-gray-100'
          }`}>
            <Ionicons 
              name={service.icon as any} 
              size={24} 
              color={isSelected ? 'white' : '#6B7280'} 
            />
          </View>
          
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className={`font-semibold ${
                isSelected ? 'text-green-900' : 'text-gray-900'
              }`}>
                {service.name}
              </Text>
              {isSelected && (
                <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center">
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
              )}
            </View>
            <Text className={`text-sm ${
              isSelected ? 'text-green-700' : 'text-gray-600'
            }`}>
              {service.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const CategorySection = ({ category }: { category: keyof typeof categoryTitles }) => {
    const categoryServices = services.filter(service => service.category === category);
    
    return (
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
          <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-3">
            <Ionicons 
              name={categoryIcons[category] as any} 
              size={20} 
              color="#10B981" 
            />
          </View>
          <Text className="text-lg font-bold text-gray-900">
            {categoryTitles[category]}
          </Text>
        </View>
        
        {categoryServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={onBack} className="w-10 h-10 items-center justify-center -ml-2">
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-gray-900">Business Registration</Text>
          </View>
          <View className="w-10" />
        </View>
        
        {/* Progress Steps */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center space-x-2">
            <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center">
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
            <Text className="text-green-600 text-sm font-medium">Basic Info</Text>
          </View>
          
          <View className="flex-1 h-0.5 bg-green-500 mx-2" />
          
          <View className="flex-row items-center space-x-2">
            <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center">
              <Text className="text-white font-bold text-sm">2</Text>
            </View>
            <Text className="text-green-600 text-sm font-medium">Services</Text>
          </View>
          
          <View className="flex-1 h-0.5 bg-gray-300 mx-2" />
          
          <View className="flex-row items-center space-x-2">
            <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center">
              <Text className="text-gray-600 font-bold text-sm">3</Text>
            </View>
            <Text className="text-gray-500 text-sm font-medium">Verification</Text>
          </View>
          
          <View className="flex-1 h-0.5 bg-gray-300 mx-2" />
          
          <View className="flex-row items-center space-x-2">
            <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center">
              <Text className="text-gray-600 font-bold text-sm">4</Text>
            </View>
            <Text className="text-gray-500 text-sm font-medium">Complete</Text>
          </View>
        </View>
        
        {/* Progress Bar */}
        <View className="mb-2">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-green-600 text-sm font-medium">Step 2 of 4</Text>
            <Text className="text-gray-500 text-sm">50%</Text>
          </View>
          <View className="w-full h-2 bg-gray-200 rounded-full">
            <View className="w-1/2 h-2 bg-green-500 rounded-full" />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Services Offered</Text>
          <Text className="text-gray-600 mb-6">
            Select all the services your business provides to guests.
          </Text>

          <CategorySection category="accommodation" />
          <CategorySection category="dining" />
          <CategorySection category="activities" />
          <CategorySection category="wellness" />
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View className="bg-white border-t border-gray-200 px-4 py-4">
        {/* Selected Services Counter */}
        <View className="bg-green-500 rounded-2xl p-4 mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-white/20 rounded-full items-center justify-center mr-3">
              <Ionicons name="checkmark-circle" size={20} color="white" />
            </View>
            <Text className="text-white font-semibold">Selected Services</Text>
          </View>
          <Text className="text-white font-bold text-lg">{selectedServices.length}</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={onBack}
            className="flex-1 bg-gray-200 py-4 rounded-xl"
          >
            <Text className="text-gray-700 font-semibold text-center">Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleNext}
            className="flex-1 bg-green-500 py-4 rounded-xl"
            disabled={selectedServices.length === 0}
          >
            <Text className="text-white font-semibold text-center">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BusinessRegistrationStep2;