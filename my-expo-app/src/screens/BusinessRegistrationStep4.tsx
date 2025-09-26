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

interface BusinessRegistrationStep4Props {
  onSubmit: () => void;
  onBack: () => void;
  onEdit: (section: string) => void;
}

const BusinessRegistrationStep4: React.FC<BusinessRegistrationStep4Props> = ({
  onSubmit,
  onBack,
  onEdit,
}) => {
  const [agreementChecked, setAgreementChecked] = useState(false);

  const businessInfo = {
    businessName: 'TechStart Solutions LLC',
    businessType: 'Limited Liability Company',
    industry: 'Technology Services',
    registrationState: 'California',
  };

  const contactInfo = {
    emailAddress: 'john@techstart.com',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Innovation Drive Suite 100\nSan Francisco, CA 94103',
  };

  const ownerInfo = {
    fullName: 'John Michael Smith',
    title: 'CEO & Founder',
    ownershipPercent: '100%',
    ssn: '***-**-4567',
  };

  const uploadedDocuments = [
    { name: 'Articles of Organization', type: 'PDF', size: '2.4 MB', status: 'verified' },
    { name: 'EIN Confirmation', type: 'PDF', size: '1.2 MB', status: 'verified' },
    { name: 'ID Verification', type: 'PDF', size: '3.1 MB', status: 'verified' },
  ];

  const applicationFee = 299.00;
  const processingTime = '3-5 business days';

  const handleSubmit = () => {
    if (!agreementChecked) {
      Alert.alert(
        'Agreement Required',
        'Please acknowledge that all information provided is accurate and complete.'
      );
      return;
    }

    Alert.alert(
      'Submit Application',
      `Your application will be submitted for approval. The application fee of $${applicationFee.toFixed(2)} will be charged to your payment method.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit for Approval',
          style: 'default',
          onPress: onSubmit
        }
      ]
    );
  };

  const InfoSection = ({
    title,
    data,
    onEdit: onEditSection
  }: {
    title: string;
    data: Record<string, string>;
    onEdit: () => void;
  }) => (
    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-lg font-bold text-gray-900">{title}</Text>
        <TouchableOpacity
          onPress={onEditSection}
          className="px-0"
        >
          <Text className="text-blue-600 text-sm font-medium">Edit</Text>
        </TouchableOpacity>
      </View>

      {Object.entries(data).map(([key, value]) => (
        <View key={key} className="mb-4 last:mb-0">
          <Text className="text-gray-500 text-sm mb-1 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </Text>
          <Text className="text-gray-900 font-medium text-base">
            {value}
          </Text>
        </View>
      ))}
    </View>
  );

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
          <View className="flex-col items-center">
            <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mb-1">
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
            <Text className="text-green-600 text-xs font-medium">Basic Info</Text>
          </View>

          <View className="flex-1 h-0.5 bg-green-500 mx-2 mt-[-12px]" />

          <View className="flex-col items-center">
            <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mb-1">
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
            <Text className="text-green-600 text-xs font-medium">Business Details</Text>
          </View>

          <View className="flex-1 h-0.5 bg-green-500 mx-2 mt-[-12px]" />

          <View className="flex-col items-center">
            <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mb-1">
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
            <Text className="text-green-600 text-xs font-medium">Documents</Text>
          </View>

          <View className="flex-1 h-0.5 bg-green-500 mx-2 mt-[-12px]" />

          <View className="flex-col items-center">
            <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mb-1">
              <Text className="text-white font-bold text-sm">4</Text>
            </View>
            <Text className="text-blue-600 text-xs font-medium">Review</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="mb-2">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-blue-600 text-sm font-medium">Step 4 of 4</Text>
            <Text className="text-blue-600 text-sm font-medium">Review & Submit</Text>
          </View>
          <View className="w-full h-2 bg-gray-200 rounded-full">
            <View className="w-full h-2 bg-blue-500 rounded-full" />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</Text>
          <Text className="text-gray-600 mb-6">
            Please review all information before submitting your application.
          </Text>

          {/* Business Information */}
          <InfoSection
            title="Business Information"
            data={businessInfo}
            onEdit={() => onEdit('business')}
          />

          {/* Contact Information */}
          <InfoSection
            title="Contact Information"
            data={contactInfo}
            onEdit={() => onEdit('contact')}
          />

          {/* Owner Information */}
          <InfoSection
            title="Owner Information"
            data={ownerInfo}
            onEdit={() => onEdit('owner')}
          />

          {/* Uploaded Documents */}
          <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-lg font-bold text-gray-900">Uploaded Documents</Text>
              <TouchableOpacity
                onPress={() => onEdit('documents')}
                className="px-0"
              >
                <Text className="text-blue-600 text-sm font-medium">Edit</Text>
              </TouchableOpacity>
            </View>

            {uploadedDocuments.map((doc, index) => (
              <View key={index} className="flex-row items-center justify-between mb-4 last:mb-0">
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-blue-100 rounded-lg items-center justify-center mr-4">
                    <Ionicons name="document-text" size={24} color="#3B82F6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-medium text-base mb-1">{doc.name}</Text>
                    <Text className="text-gray-500 text-sm">{doc.type} • {doc.size}</Text>
                  </View>
                </View>
                <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center">
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
              </View>
            ))}
          </View>

          {/* Agreement Checkbox */}
          <TouchableOpacity
            onPress={() => setAgreementChecked(!agreementChecked)}
            className="flex-row items-start mb-6"
          >
            <View className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${agreementChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
              }`}>
              {agreementChecked && (
                <Ionicons name="checkmark" size={14} color="white" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 text-sm leading-5">
                I acknowledge that all information provided is accurate and complete.{'\n'}
                I agree to the{' '}
                <Text className="text-blue-600">Privacy Policy</Text>
                {' '}and{' '}
                <Text className="text-blue-600">Terms of Service</Text>
              </Text>
            </View>
          </TouchableOpacity>

          {/* Processing Information */}
          <View className="bg-blue-50 rounded-2xl p-4 mb-6">
            <View className="flex-row items-center mb-3">
              <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-3">
                <Ionicons name="time" size={16} color="white" />
              </View>
              <Text className="text-blue-900 font-semibold">Processing Time</Text>
            </View>
            <Text className="text-blue-800">
              Your application will be reviewed within {processingTime}. You'll receive email updates on the status.
            </Text>
          </View>

          {/* Application Fee */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900 mb-1">Application Fee</Text>
              <Text className="text-gray-500 text-sm">Includes state filing fee and processing</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900">${applicationFee.toFixed(2)}</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className={`py-4 rounded-2xl ${agreementChecked ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            disabled={!agreementChecked}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons
                name="paper-plane"
                size={18}
                color={agreementChecked ? 'white' : '#6B7280'}
                style={{ marginRight: 8 }}
              />
              <Text className={`text-lg font-semibold ${agreementChecked ? 'text-white' : 'text-gray-500'
                }`}>
                Submit for Approval
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessRegistrationStep4;