import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BusinessRegistrationStep1Props {
  onNext: (data: BusinessInfo) => void;
  onSaveDraft: (data: BusinessInfo) => void;
}

interface BusinessInfo {
  businessName: string;
  businessType: string;
  industry: string;
  businessEmail: string;
  phoneNumber: string;
  website: string;
  businessDescription: string;
}

const businessTypes = [
  'Sole Proprietorship',
  'Partnership',
  'Limited Liability Company',
  'Corporation',
  'Non-Profit Organization',
  'Cooperative',
];

const industries = [
  'Eco-Tourism',
  'Sustainable Agriculture',
  'Renewable Energy',
  'Green Technology',
  'Environmental Consulting',
  'Organic Food & Beverage',
  'Sustainable Fashion',
  'Waste Management',
  'Water Conservation',
  'Green Building',
];

const BusinessRegistrationStep1: React.FC<BusinessRegistrationStep1Props> = ({
  onNext,
  onSaveDraft,
}) => {
  const [formData, setFormData] = useState<BusinessInfo>({
    businessName: '',
    businessType: '',
    industry: '',
    businessEmail: '',
    phoneNumber: '',
    website: '',
    businessDescription: '',
  });

  const [showBusinessTypeDropdown, setShowBusinessTypeDropdown] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

  const validateForm = () => {
    const requiredFields = ['businessName', 'businessType', 'businessEmail', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof BusinessInfo]);
    
    if (missingFields.length > 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields marked with *');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.businessEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  const handleSaveDraft = () => {
    onSaveDraft(formData);
    Alert.alert('Draft Saved', 'Your progress has been saved');
  };

  const CustomDropdown = ({ 
    value, 
    placeholder, 
    options, 
    onSelect, 
    isOpen, 
    onToggle 
  }: {
    value: string;
    placeholder: string;
    options: string[];
    onSelect: (value: string) => void;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <View className="relative">
      <TouchableOpacity
        onPress={onToggle}
        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between"
      >
        <Text className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value || placeholder}
        </Text>
        <Ionicons 
          name={isOpen ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color="#6B7280" 
        />
      </TouchableOpacity>
      
      {isOpen && (
        <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-10 max-h-48">
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  onSelect(option);
                  onToggle();
                }}
                className="px-4 py-3 border-b border-gray-100"
              >
                <Text className="text-gray-900">{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity className="w-10 h-10 items-center justify-center -ml-2">
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-gray-900">Business Registration</Text>
          </View>
          <View className="w-10" />
        </View>
        
        {/* Progress Bar */}
        <View className="mb-2">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-green-600 text-sm font-medium">Step 1 of 3</Text>
            <Text className="text-gray-500 text-sm">33%</Text>
          </View>
          <View className="w-full h-2 bg-gray-200 rounded-full">
            <View className="w-1/3 h-2 bg-green-500 rounded-full" />
          </View>
        </View>
        
        <Text className="text-gray-600 text-sm mt-2">
          Let's start with the basics about your business
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 py-6">
          {/* Business Name */}
          <View className="mb-6">
            <Text className="text-gray-900 font-semibold mb-2">
              Business Name <Text className="text-red-500">*</Text>
            </Text>
            <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 flex-row items-center">
              <TextInput
                placeholder="Enter your business name"
                value={formData.businessName}
                onChangeText={(text) => setFormData({...formData, businessName: text})}
                className="flex-1 text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
              <Ionicons name="business" size={20} color="#9CA3AF" />
            </View>
          </View>

          {/* Business Type */}
          <View className="mb-6">
            <Text className="text-gray-900 font-semibold mb-2">
              Business Type <Text className="text-red-500">*</Text>
            </Text>
            <CustomDropdown
              value={formData.businessType}
              placeholder="Select business type"
              options={businessTypes}
              onSelect={(value) => setFormData({...formData, businessType: value})}
              isOpen={showBusinessTypeDropdown}
              onToggle={() => {
                setShowBusinessTypeDropdown(!showBusinessTypeDropdown);
                setShowIndustryDropdown(false);
              }}
            />
          </View>

          {/* Industry */}
          <View className="mb-6">
            <Text className="text-gray-900 font-semibold mb-2">Industry</Text>
            <CustomDropdown
              value={formData.industry}
              placeholder="Select industry"
              options={industries}
              onSelect={(value) => setFormData({...formData, industry: value})}
              isOpen={showIndustryDropdown}
              onToggle={() => {
                setShowIndustryDropdown(!showIndustryDropdown);
                setShowBusinessTypeDropdown(false);
              }}
            />
          </View>

          {/* Contact Information Section */}
          <Text className="text-xl font-bold text-gray-900 mb-4 mt-6">Contact Information</Text>

          {/* Business Email */}
          <View className="mb-6">
            <Text className="text-gray-900 font-semibold mb-2">
              Business Email <Text className="text-red-500">*</Text>
            </Text>
            <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 flex-row items-center">
              <TextInput
                placeholder="business@company.com"
                value={formData.businessEmail}
                onChangeText={(text) => setFormData({...formData, businessEmail: text})}
                className="flex-1 text-gray-900"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Ionicons name="mail" size={20} color="#9CA3AF" />
            </View>
          </View>

          {/* Phone Number */}
          <View className="mb-6">
            <Text className="text-gray-900 font-semibold mb-2">
              Phone Number <Text className="text-red-500">*</Text>
            </Text>
            <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 flex-row items-center">
              <TextInput
                placeholder="+1 (555) 123-4567"
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
                className="flex-1 text-gray-900"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
              <Ionicons name="call" size={20} color="#9CA3AF" />
            </View>
          </View>

          {/* Website */}
          <View className="mb-6">
            <Text className="text-gray-900 font-semibold mb-2">Website</Text>
            <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 flex-row items-center">
              <TextInput
                placeholder="www.yourcompany.com"
                value={formData.website}
                onChangeText={(text) => setFormData({...formData, website: text})}
                className="flex-1 text-gray-900"
                placeholderTextColor="#9CA3AF"
                keyboardType="url"
                autoCapitalize="none"
              />
              <Ionicons name="globe" size={20} color="#9CA3AF" />
            </View>
            <Text className="text-gray-500 text-sm mt-1">
              Optional - Add your company website if available
            </Text>
          </View>

          {/* Business Description */}
          <View className="mb-8">
            <Text className="text-gray-900 font-semibold mb-2">Business Description</Text>
            <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4">
              <TextInput
                placeholder="Tell us about your business..."
                value={formData.businessDescription}
                onChangeText={(text) => setFormData({...formData, businessDescription: text})}
                className="text-gray-900 min-h-24"
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
              />
            </View>
            <Text className="text-gray-500 text-sm mt-1">
              Optional - Brief description of your business activities
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-3 mb-6">
            <TouchableOpacity
              onPress={handleSaveDraft}
              className="flex-1 bg-gray-200 py-4 rounded-xl"
            >
              <Text className="text-gray-700 font-semibold text-center">Save Draft</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleNext}
              className="flex-1 bg-green-500 py-4 rounded-xl"
            >
              <View className="flex-row items-center justify-center">
                <Text className="text-white font-semibold mr-2">Continue</Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Required Fields Note */}
          <Text className="text-gray-500 text-sm text-center">
            <Text className="text-red-500">*</Text> Required fields
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessRegistrationStep1;