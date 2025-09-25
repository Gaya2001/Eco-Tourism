import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CertificationProgress {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  date: string;
  description: string;
}

interface Certification {
  id: string;
  name: string;
  type: string;
  status: 'approved' | 'pending' | 'rejected';
}

const EcoBizDashboardScreen: React.FC = () => {
  const certificationProgress: CertificationProgress[] = [
    {
      id: '1',
      title: 'Application Submitted',
      status: 'completed',
      date: 'Completed on Dec 15, 2024',
      description: '',
    },
    {
      id: '2',
      title: 'Document Review',
      status: 'in-progress',
      date: 'Expected completion: Dec 22, 2024',
      description: '',
    },
    {
      id: '3',
      title: 'Final Approval',
      status: 'pending',
      date: 'Pending previous step',
      description: '',
    },
  ];

  const certifications: Certification[] = [
    {
      id: '1',
      name: 'ISO 14001',
      type: 'Environmental Management',
      status: 'approved',
    },
    {
      id: '2',
      name: 'B Corp',
      type: 'Social Impact',
      status: 'pending',
    },
    {
      id: '3',
      name: 'LEED',
      type: 'Green Building',
      status: 'rejected',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'bg-green-500';
      case 'in-progress':
      case 'pending':
        return 'bg-orange-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'checkmark-circle';
      case 'in-progress':
        return 'time';
      case 'pending':
        return 'ellipse';
      case 'rejected':
        return 'close-circle';
      default:
        return 'ellipse';
    }
  };

  const QuickActionButton = ({ 
    icon, 
    title, 
    description, 
    onPress, 
    bgColor = 'bg-green-500' 
  }: {
    icon: string;
    title: string;
    description: string;
    onPress: () => void;
    bgColor?: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`${bgColor} rounded-2xl p-4 flex-row items-center justify-between mb-3`}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center mr-3">
          <Ionicons name={icon as any} size={20} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-white font-semibold text-base">{title}</Text>
          <Text className="text-white/80 text-sm">{description}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="white" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#10B981" />
      
      {/* Header */}
      <View className="bg-green-500 px-4 py-6">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-green-600 rounded-full items-center justify-center mr-3">
              <Text className="text-white font-bold text-lg">E</Text>
            </View>
            <Text className="text-white text-lg font-semibold">EcoBiz</Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center">
              <View className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1" />
              <Ionicons name="person" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text className="text-white text-2xl font-bold mb-1">Welcome back, Sarah!</Text>
        <Text className="text-green-100 text-base">Let's continue building your eco-profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Eco-Profile Status */}
        <View className="bg-white mx-4 mt-4 rounded-2xl p-4 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">Eco-Profile Status</Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <Text className="text-green-600 font-medium">Active</Text>
            </View>
          </View>
          
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-600">Profile Completion</Text>
              <Text className="text-gray-900 font-semibold">75%</Text>
            </View>
            <View className="w-full h-2 bg-gray-200 rounded-full">
              <View className="w-3/4 h-2 bg-green-500 rounded-full" />
            </View>
          </View>

          {/* Status Items */}
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center mb-2">
                <Ionicons name="business" size={24} color="#10B981" />
              </View>
              <Text className="text-xs text-gray-600 text-center mb-1">Company Info</Text>
              <Text className="text-xs text-green-600 font-medium">Complete</Text>
            </View>
            
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-orange-100 rounded-xl items-center justify-center mb-2">
                <Ionicons name="star" size={24} color="#F59E0B" />
              </View>
              <Text className="text-xs text-gray-600 text-center mb-1">Certifications</Text>
              <Text className="text-xs text-orange-600 font-medium">Pending</Text>
            </View>
            
            <View className="items-center flex-1">
              <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mb-2">
                <Ionicons name="document" size={24} color="#6B7280" />
              </View>
              <Text className="text-xs text-gray-600 text-center mb-1">Documents</Text>
              <Text className="text-xs text-gray-500 font-medium">Incomplete</Text>
            </View>
          </View>
        </View>

        {/* Certification Progress */}
        <View className="bg-white mx-4 mt-4 rounded-2xl p-4 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">Certification Progress</Text>
            <Text className="text-orange-600 font-medium">In Review</Text>
          </View>
          
          {certificationProgress.map((item, index) => (
            <View key={item.id} className="flex-row items-start mb-4 last:mb-0">
              <View className="items-center mr-4">
                <View className={`w-8 h-8 rounded-full items-center justify-center ${getStatusColor(item.status)}`}>
                  <Ionicons 
                    name={getStatusIcon(item.status) as any} 
                    size={16} 
                    color="white" 
                  />
                </View>
                {index < certificationProgress.length - 1 && (
                  <View className="w-0.5 h-6 bg-gray-200 mt-2" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold mb-1">{item.title}</Text>
                <Text className="text-gray-600 text-sm">{item.date}</Text>
                {item.status === 'in-progress' && (
                  <View className="bg-orange-50 mt-2 p-2 rounded-lg">
                    <View className="flex-row items-center">
                      <Ionicons name="time" size={16} color="#F59E0B" />
                      <Text className="text-orange-700 text-sm ml-2">Review in progress</Text>
                    </View>
                    <Text className="text-orange-600 text-sm mt-1">Expected completion: Dec 22, 2024</Text>
                  </View>
                )}
                {item.status === 'completed' && (
                  <View className="bg-green-50 mt-2 p-2 rounded-lg">
                    <View className="flex-row items-center">
                      <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                      <Text className="text-green-700 text-sm ml-2">All documents verified</Text>
                    </View>
                    <Text className="text-green-600 text-sm mt-1">Portfolio, resume, and certificates approved</Text>
                  </View>
                )}
                {item.status === 'pending' && (
                  <View className="bg-gray-50 mt-2 p-2 rounded-lg">
                    <View className="flex-row items-center">
                      <Ionicons name="ellipse" size={16} color="#6B7280" />
                      <Text className="text-gray-600 text-sm ml-2">Awaiting approval</Text>
                    </View>
                    <Text className="text-gray-500 text-sm mt-1">Digital certificate will be available here</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Your Certifications */}
        <View className="bg-white mx-4 mt-4 rounded-2xl p-4 shadow-sm">
          <Text className="text-xl font-bold text-gray-900 mb-4">Your Certifications</Text>
          
          <View className="flex-row flex-wrap justify-between">
            {certifications.map((cert) => (
              <View key={cert.id} className="w-[48%] mb-4">
                <View className="border border-gray-200 rounded-2xl p-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className={`w-8 h-8 rounded-full items-center justify-center ${getStatusColor(cert.status)}`}>
                      <Ionicons 
                        name={getStatusIcon(cert.status) as any} 
                        size={16} 
                        color="white" 
                      />
                    </View>
                    <Text className={`text-xs font-medium capitalize ${
                      cert.status === 'approved' ? 'text-green-600' :
                      cert.status === 'pending' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {cert.status}
                    </Text>
                  </View>
                  <Text className="font-semibold text-gray-900 mb-1">{cert.name}</Text>
                  <Text className="text-gray-600 text-sm">{cert.type}</Text>
                </View>
              </View>
            ))}
            
            {/* Add New Certificate */}
            <View className="w-[48%] mb-4">
              <TouchableOpacity className="border-2 border-dashed border-gray-300 rounded-2xl p-3 items-center justify-center h-24">
                <Ionicons name="add" size={24} color="#9CA3AF" />
                <Text className="text-gray-500 text-sm mt-1 text-center">Add New</Text>
                <Text className="text-gray-400 text-xs text-center">Apply for certification</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mx-4 mt-4 mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">Quick Actions</Text>
          
          <QuickActionButton
            icon="person"
            title="Update Profile"
            description="Complete missing information"
            onPress={() => console.log('Update Profile')}
          />
          
          <QuickActionButton
            icon="cloud-upload"
            title="Upload Documents"
            description="Add certification files"
            onPress={() => console.log('Upload Documents')}
            bgColor="bg-blue-500"
          />
          
          <QuickActionButton
            icon="bar-chart"
            title="View Analytics"
            description="Track your eco-impact"
            onPress={() => console.log('View Analytics')}
            bgColor="bg-purple-500"
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 px-4 py-2 flex-row justify-around">
        <TouchableOpacity className="items-center py-2">
          <Ionicons name="home" size={24} color="#10B981" />
          <Text className="text-green-500 text-xs mt-1">Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center py-2">
          <Ionicons name="calendar" size={24} color="#9CA3AF" />
          <Text className="text-gray-400 text-xs mt-1">Certifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center py-2">
          <Ionicons name="document" size={24} color="#9CA3AF" />
          <Text className="text-gray-400 text-xs mt-1">Documents</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center py-2">
          <Ionicons name="settings" size={24} color="#9CA3AF" />
          <Text className="text-gray-400 text-xs mt-1">Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EcoBizDashboardScreen;