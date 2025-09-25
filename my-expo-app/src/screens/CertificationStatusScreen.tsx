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

interface CertificationStatusProps {
  onBack?: () => void;
}

const CertificationStatusScreen: React.FC<CertificationStatusProps> = ({ onBack }) => {
  const certificationInfo = {
    title: 'Digital Marketing Professional',
    id: '#DMP-2024-001',
    currentStatus: 'Under Review',
    completedSteps: 2,
    totalSteps: 3,
  };

  const timeline = [
    {
      id: '1',
      title: 'Submitted',
      description: 'Application and documents submitted successfully',
      date: 'Dec 15, 2024',
      status: 'completed',
      details: {
        icon: 'checkmark-circle',
        message: 'All documents verified',
        submessage: 'Portfolio, resume, and certificates approved',
      },
    },
    {
      id: '2',
      title: 'Under Review',
      description: 'Expert panel reviewing your application',
      date: 'In Progress',
      status: 'in-progress',
      details: {
        icon: 'time',
        message: 'Review in progress',
        submessage: 'Expected completion: Dec 22, 2024',
      },
    },
    {
      id: '3',
      title: 'Approved',
      description: 'Certificate issued and ready for download',
      date: 'Pending',
      status: 'pending',
      details: {
        icon: 'trophy',
        message: 'Awaiting approval',
        submessage: 'Digital certificate will be available here',
      },
    },
  ];

  const feedbackTips = [
    {
      id: '1',
      type: 'strength',
      title: 'Strong Portfolio',
      description: 'Your portfolio demonstrates excellent project diversity and technical skills.',
      tip: 'Consider adding case studies showing ROI metrics to strengthen your application.',
      icon: 'trending-up',
      color: 'green',
    },
    {
      id: '2',
      type: 'warning',
      title: 'Experience Documentation',
      description: 'Some work experience entries lack detailed descriptions.',
      tip: 'Add specific achievements and quantifiable results for each role.',
      icon: 'warning',
      color: 'orange',
    },
    {
      id: '3',
      type: 'suggestion',
      title: 'Skill Enhancement',
      description: 'Consider adding certifications in emerging marketing technologies.',
      tip: 'AI marketing tools and automation certifications are highly valued.',
      icon: 'bulb',
      color: 'blue',
    },
  ];

  const additionalInfo = {
    applicationDate: 'December 15, 2024',
    reviewDuration: '5-7 business days',
    certificationValid: '2 years',
    renewalRequired: 'December 2026',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-orange-500';
      case 'pending':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'in-progress':
        return 'time';
      case 'pending':
        return 'ellipse';
      default:
        return 'ellipse';
    }
  };

  const getFeedbackColor = (type: string) => {
    const colors = {
      strength: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: 'text-green-600' },
      warning: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', icon: 'text-orange-600' },
      suggestion: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'text-blue-600' },
    };
    return colors[type as keyof typeof colors] || colors.suggestion;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="bg-white px-4 mt-6 border-b border-gray-100">
        <View className="flex-row items-center justify-between mx-2">
          <TouchableOpacity onPress={onBack} className="p-2">
            <Ionicons name="arrow-back" size={22} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900 flex-1 text-center">
            Certification Status
          </Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Certification Header */}
        <View className="bg-white mx-4 mt-6 rounded-2xl p-6 shadow-sm items-center">
          <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-5">
            <Ionicons name="ribbon" size={36} color="#3B82F6" />
          </View>
          <Text className="text-xl font-bold text-gray-900 text-center mb-2 leading-6">
            {certificationInfo.title}
          </Text>
          <Text className="text-gray-500 mb-5 text-sm">
            Certification ID: {certificationInfo.id}
          </Text>
          
          <View className="flex-row items-center mb-1">
            <Text className="text-gray-700 text-sm font-medium mr-2">Current Status</Text>
          </View>
          <View className="mb-4">
            <Text className="text-orange-600 font-semibold bg-orange-100 px-4 py-2 rounded-full text-sm">
              {certificationInfo.currentStatus}
            </Text>
          </View>
          
          <View className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <View 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${(certificationInfo.completedSteps / certificationInfo.totalSteps) * 100}%` }}
            />
          </View>
          <Text className="text-gray-600 text-sm font-medium">
            Step {certificationInfo.completedSteps} of {certificationInfo.totalSteps} completed
          </Text>
        </View>

        {/* Certification Timeline */}
        <View className="bg-white mx-4 mt-6 rounded-2xl p-5 shadow-sm">
          <Text className="text-lg font-bold text-gray-900 mb-5">Certification Timeline</Text>
          
          {timeline.map((item, index) => (
            <View key={item.id} className="flex-row items-start mb-5 last:mb-0">
              <View className="items-center mr-4">
                <View className={`w-12 h-12 rounded-full items-center justify-center ${getStatusColor(item.status)} shadow-sm`}>
                  <Ionicons 
                    name={getStatusIcon(item.status) as any} 
                    size={20} 
                    color="white" 
                  />
                </View>
                {index < timeline.length - 1 && (
                  <View className="w-0.5 h-10 bg-gray-300 mt-3" />
                )}
              </View>
              
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-gray-900 font-bold text-base">{item.title}</Text>
                  <Text className="text-gray-500 text-sm font-medium">{item.date}</Text>
                </View>
                <Text className="text-gray-600 text-sm mb-3 leading-5">{item.description}</Text>
                
                {/* Status Details */}
                <View className={`rounded-lg p-3 border ${
                  item.status === 'completed' ? 'bg-green-50 border-green-200' :
                  item.status === 'in-progress' ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <View className="flex-row items-center mb-2">
                    <Ionicons 
                      name={item.details.icon as any} 
                      size={16} 
                      color={
                        item.status === 'completed' ? '#10B981' :
                        item.status === 'in-progress' ? '#F59E0B' : '#6B7280'
                      }
                    />
                    <Text className={`ml-2 font-semibold text-sm ${
                      item.status === 'completed' ? 'text-green-800' :
                      item.status === 'in-progress' ? 'text-orange-800' : 'text-gray-700'
                    }`}>
                      {item.details.message}
                    </Text>
                  </View>
                  <Text className={`text-sm leading-4 ${
                    item.status === 'completed' ? 'text-green-700' :
                    item.status === 'in-progress' ? 'text-orange-700' : 'text-gray-600'
                  }`}>
                    {item.details.submessage}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* AI Feedback & Tips */}
        <View className="bg-purple-600 mx-4 mt-6 rounded-2xl p-5 shadow-lg">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
              <Ionicons name="sparkles" size={22} color="white" />
            </View>
            <Text className="text-white font-bold text-lg">AI Feedback & Tips</Text>
          </View>
          <Text className="text-purple-100 mb-5 text-sm leading-5">
            Personalized insights to improve your certification success
          </Text>
          
          {feedbackTips.map((tip, index) => {
            const colorClasses = getFeedbackColor(tip.type);
            const getIconColor = (type: string) => {
              switch (type) {
                case 'strength': return '#10B981';
                case 'warning': return '#F59E0B';
                case 'suggestion': return '#3B82F6';
                default: return '#3B82F6';
              }
            };
            
            return (
              <View key={tip.id} className={`${colorClasses.bg} ${colorClasses.border} border rounded-xl p-4 shadow-sm`} style={{ marginBottom: index < feedbackTips.length - 1 ? 20 : 0 }}>
                <View className="flex-row items-start">
                  <View className="mr-4 mt-1">
                    <Ionicons 
                      name={tip.icon as any} 
                      size={20} 
                      color={getIconColor(tip.type)}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className={`font-bold mb-2 text-base ${colorClasses.text}`}>
                      {tip.title}
                    </Text>
                    <Text className={`text-sm mb-3 leading-5 ${colorClasses.text}`}>
                      {tip.description}
                    </Text>
                    <View className="bg-white rounded-lg p-3 border border-white/20">
                      <Text className={`text-sm font-medium leading-5 ${colorClasses.text}`}>
                        <Text className="font-bold">Tip: </Text>{tip.tip}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Additional Information */}
        <View className="bg-white mx-4 mt-6 mb-6 rounded-2xl p-5 shadow-sm">
          <Text className="text-lg font-bold text-gray-900 mb-5">Additional Information</Text>
          
          <View className="space-y-4">
            <View className="flex-row justify-between items-center py-1">
              <Text className="text-gray-600 text-sm font-medium">Application Date</Text>
              <Text className="text-gray-900 font-semibold text-sm">{additionalInfo.applicationDate}</Text>
            </View>
            
            <View className="flex-row justify-between items-center py-1">
              <Text className="text-gray-600 text-sm font-medium">Review Duration</Text>
              <Text className="text-gray-900 font-semibold text-sm">{additionalInfo.reviewDuration}</Text>
            </View>
            
            <View className="flex-row justify-between items-center py-1">
              <Text className="text-gray-600 text-sm font-medium">Certification Valid</Text>
              <Text className="text-gray-900 font-semibold text-sm">{additionalInfo.certificationValid}</Text>
            </View>
            
            <View className="flex-row justify-between items-center py-1">
              <Text className="text-gray-600 text-sm font-medium">Renewal Required</Text>
              <Text className="text-gray-900 font-semibold text-sm">{additionalInfo.renewalRequired}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="bg-white border-t border-gray-100 px-4 py-4">
        <TouchableOpacity className="bg-blue-500 py-3.5 rounded-xl flex-row items-center justify-center mb-3 shadow-sm">
          <Ionicons name="notifications" size={18} color="white" />
          <Text className="text-white font-semibold ml-2">Enable Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="bg-gray-100 py-3.5 rounded-xl flex-row items-center justify-center mb-3 shadow-sm">
          <Ionicons name="download" size={16} color="#4B5563" />
          <Text className="text-gray-700 font-semibold ml-2 text-sm">Download Application Copy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="bg-gray-100 py-3.5 rounded-xl flex-row items-center justify-center shadow-sm">
          <Ionicons name="help-circle-outline" size={16} color="#4B5563" />
          <Text className="text-gray-700 font-semibold ml-2 text-sm">Contact Support</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CertificationStatusScreen;