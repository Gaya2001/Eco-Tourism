import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native';
import BottomNavigation, { type BottomNavTab } from '../components/BottomNavigation';

interface EcoBadge {
  id: string;
  title: string;
  icon: string;
  earned: boolean;
}

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  pushNotifications: boolean;
  weeklyReports: boolean;
  preferredLanguage: string;
  timeZone: string;
  avatar: string;
  title: string;
}

interface ProfileScreenProps {
  onNavigateBack?: () => void;
  onLogout?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToDirectory?: () => void;
  onNavigateToRewards?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  onNavigateBack,
  onLogout,
  onNavigateToHome,
  onNavigateToDirectory,
  onNavigateToRewards
}) => {
  const initialProfile: UserProfile = {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    pushNotifications: true,
    weeklyReports: true,
    preferredLanguage: 'English',
    timeZone: 'Eastern Time (ET)',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    title: 'Eco Warrior',
  };

  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [hasChanges, setHasChanges] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showTimezoneModal, setShowTimezoneModal] = useState(false);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

  const languages = [
    { label: 'English', value: 'English' },
    { label: 'French', value: 'French' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'German', value: 'German' },
    { label: 'Italian', value: 'Italian' },
    { label: 'Portuguese', value: 'Portuguese' },
  ];

  const timezones = [
    { label: 'Eastern Time (ET)', value: 'Eastern Time (ET)' },
    { label: 'Central Time (CT)', value: 'Central Time (CT)' },
    { label: 'Mountain Time (MT)', value: 'Mountain Time (MT)' },
    { label: 'Pacific Time (PT)', value: 'Pacific Time (PT)' },
    { label: 'Greenwich Mean Time (GMT)', value: 'Greenwich Mean Time (GMT)' },
    { label: 'Central European Time (CET)', value: 'Central European Time (CET)' },
    { label: 'Japan Standard Time (JST)', value: 'Japan Standard Time (JST)' },
  ];

  const ecoBadges: EcoBadge[] = [
    { id: '1', title: 'Green Starter', icon: '🌱', earned: true },
    { id: '2', title: 'Recycling Pro', icon: '♻️', earned: true },
    { id: '3', title: 'Water Saver', icon: '💧', earned: true },
    { id: '4', title: 'Solar Champion', icon: '☀️', earned: false },
    { id: '5', title: 'Climate Hero', icon: '🌍', earned: false },
    { id: '6', title: 'Eco Explorer', icon: '🚀', earned: true },
  ];

  // Check if profile has changes compared to initial values
  const checkForChanges = (newProfile: UserProfile) => {
    const changed = JSON.stringify(newProfile) !== JSON.stringify(initialProfile);
    setHasChanges(changed);
  };

  const updateProfile = (field: keyof UserProfile, value: any) => {
    const newProfile = { ...profile, [field]: value };
    setProfile(newProfile);
    checkForChanges(newProfile);
  };

  const handleSaveChanges = () => {
    // Here you would typically save to your backend/database
    console.log('Profile updated:', profile);
    
    // Reset changes state after successful save
    setHasChanges(false);
    
    // You could also show a success message here
    // Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#22c55e' }}>
      <StatusBar backgroundColor="#22c55e" barStyle="light-content" />
      
      {/* Dropdown Overlay */}
      {showLogoutDropdown && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onPress={() => setShowLogoutDropdown(false)}
          activeOpacity={1}
        />
      )}
      
      {/* Header */}
      <View style={{ backgroundColor: '#22c55e', paddingHorizontal: 16, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, paddingTop: 8 }}>
          <TouchableOpacity 
            style={{ padding: 8 }}
            onPress={onNavigateBack}
          >
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>←</Text>
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Profile</Text>
          <View style={{ position: 'relative' }}>
            <TouchableOpacity 
              style={{ padding: 8 }}
              onPress={() => setShowLogoutDropdown(!showLogoutDropdown)}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>⋮</Text>
            </TouchableOpacity>
            
            {/* Logout Dropdown */}
            {showLogoutDropdown && (
              <View style={{
                position: 'absolute',
                top: 40,
                right: 0,
                backgroundColor: 'white',
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                minWidth: 120,
                zIndex: 1000,
              }}>
                <TouchableOpacity
                  style={{
                    padding: 12,
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    setShowLogoutDropdown(false);
                    onLogout && onLogout();
                  }}
                >
                  <Text style={{ 
                    color: '#dc2626', 
                    fontSize: 16, 
                    fontWeight: '500',
                    textAlign: 'center'
                  }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Profile Info */}
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <View style={{ position: 'relative', marginBottom: 16 }}>
            <Image
              source={{ uri: profile.avatar }}
              style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: 'white' }}
            />
            <View style={{ 
              position: 'absolute', 
              bottom: -2, 
              right: -2, 
              width: 24, 
              height: 24, 
              backgroundColor: '#16a34a', 
              borderRadius: 12, 
              alignItems: 'center', 
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: 'white'
            }}>
              <Text style={{ color: 'white', fontSize: 10 }}>📷</Text>
            </View>
          </View>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{profile.fullName}</Text>
          <Text style={{ color: '#bbf7d0', fontSize: 14 }}>{profile.title}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={{ flex: 1, backgroundColor: '#f9fafb', marginTop: -16 }} 
        showsVerticalScrollIndicator={false}
      >
        <View style={{ 
          backgroundColor: 'white', 
          borderTopLeftRadius: 24, 
          borderTopRightRadius: 24, 
          paddingTop: 24,
          minHeight: '100%'
        }}>
          
          {/* Eco Badges Section */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 22, marginRight: 10 }}>🏆</Text>
              <Text style={{ color: '#1f2937', fontWeight: '700', fontSize: 20 }}>Eco Badges</Text>
            </View>
            
            {/* Badge Stats */}
            <View style={{ 
              backgroundColor: '#f0fdf4', 
              borderRadius: 16, 
              padding: 16, 
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#bbf7d0'
            }}>
              <Text style={{ color: '#15803d', fontWeight: '600', fontSize: 16, textAlign: 'center' }}>
                {ecoBadges.filter(badge => badge.earned).length} of {ecoBadges.length} badges earned
              </Text>
            </View>
            
            {/* Badges Grid */}
            <View style={{ 
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              justifyContent: 'space-between' 
            }}>
              {ecoBadges.map((badge) => (
                <View
                  key={badge.id}
                  style={{
                    width: '48%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    paddingVertical: 16,
                    borderRadius: 16,
                    marginBottom: 12,
                    backgroundColor: badge.earned ? '#f0fdf4' : '#f9fafb',
                    borderWidth: 2,
                    borderColor: badge.earned ? '#22c55e' : '#e5e7eb',
                    shadowColor: badge.earned ? '#22c55e' : '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: badge.earned ? 0.2 : 0.05,
                    shadowRadius: 4,
                    elevation: badge.earned ? 3 : 1
                  }}
                >
                  <View style={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: 25, 
                    backgroundColor: badge.earned ? '#22c55e' : '#e5e7eb',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12
                  }}>
                    <Text style={{ fontSize: 24 }}>{badge.earned ? badge.icon : '🔒'}</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: badge.earned ? '#15803d' : '#9ca3af',
                      textAlign: 'center'
                    }}
                  >
                    {badge.title}
                  </Text>
                  {badge.earned && (
                    <Text style={{ 
                      fontSize: 10, 
                      color: '#22c55e', 
                      fontWeight: '500',
                      marginTop: 4 
                    }}>
                      ✓ EARNED
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Personal Information Section */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 20, marginRight: 8 }}>👤</Text>
              <Text style={{ color: '#1f2937', fontWeight: '600', fontSize: 18 }}>Personal Information</Text>
            </View>

            {/* Full Name */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: '#4b5563', fontSize: 14, fontWeight: '500', marginBottom: 8 }}>Full Name</Text>
              <View style={{ 
                backgroundColor: '#f9fafb', 
                borderRadius: 12, 
                paddingHorizontal: 16, 
                paddingVertical: 16, 
                flexDirection: 'row', 
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#e5e7eb'
              }}>
                <TextInput
                  value={profile.fullName}
                  onChangeText={(text) => updateProfile('fullName', text)}
                  style={{ flex: 1, color: '#1f2937', fontSize: 16 }}
                  placeholderTextColor="#9ca3af"
                />
                <Text style={{ color: '#9ca3af', fontSize: 16 }}>✏️</Text>
              </View>
            </View>

            {/* Email Address */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: '#4b5563', fontSize: 14, fontWeight: '500', marginBottom: 8 }}>Email Address</Text>
              <View style={{ 
                backgroundColor: '#f9fafb', 
                borderRadius: 12, 
                paddingHorizontal: 16, 
                paddingVertical: 16, 
                flexDirection: 'row', 
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#e5e7eb'
              }}>
                <TextInput
                  value={profile.email}
                  onChangeText={(text) => updateProfile('email', text)}
                  style={{ flex: 1, color: '#1f2937', fontSize: 16 }}
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                />
                <Text style={{ color: '#9ca3af', fontSize: 16 }}>✏️</Text>
              </View>
            </View>

            {/* Phone Number */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: '#4b5563', fontSize: 14, fontWeight: '500', marginBottom: 8 }}>Phone Number</Text>
              <View style={{ 
                backgroundColor: '#f9fafb', 
                borderRadius: 12, 
                paddingHorizontal: 16, 
                paddingVertical: 16, 
                flexDirection: 'row', 
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#e5e7eb'
              }}>
                <TextInput
                  value={profile.phone}
                  onChangeText={(text) => updateProfile('phone', text)}
                  style={{ flex: 1, color: '#1f2937', fontSize: 16 }}
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                />
                <Text style={{ color: '#9ca3af', fontSize: 16 }}>✏️</Text>
              </View>
            </View>
          </View>

          {/* Preferences Section */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 20, marginRight: 8 }}>⚙️</Text>
              <Text style={{ color: '#1f2937', fontWeight: '600', fontSize: 18 }}>Preferences</Text>
            </View>

            {/* Push Notifications */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#1f2937', fontWeight: '500', fontSize: 16 }}>Push Notifications</Text>
                <Text style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>Get eco-tips and reminders</Text>
              </View>
              <Switch
                value={profile.pushNotifications}
                onValueChange={(value) => updateProfile('pushNotifications', value)}
                trackColor={{ false: '#e5e7eb', true: '#bbf7d0' }}
                thumbColor={profile.pushNotifications ? '#22c55e' : '#9ca3af'}
              />
            </View>

            {/* Weekly Reports */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#1f2937', fontWeight: '500', fontSize: 16 }}>Weekly Reports</Text>
                <Text style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>Receive eco-impact summaries</Text>
              </View>
              <Switch
                value={profile.weeklyReports}
                onValueChange={(value) => updateProfile('weeklyReports', value)}
                trackColor={{ false: '#e5e7eb', true: '#bbf7d0' }}
                thumbColor={profile.weeklyReports ? '#22c55e' : '#9ca3af'}
              />
            </View>

            {/* Preferred Language */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: '#4b5563', fontSize: 14, fontWeight: '500', marginBottom: 8 }}>Preferred Language</Text>
              <TouchableOpacity 
                style={{ 
                  backgroundColor: '#f9fafb', 
                  borderRadius: 12, 
                  paddingHorizontal: 16, 
                  paddingVertical: 16, 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: '#e5e7eb'
                }}
                onPress={() => setShowLanguageModal(true)}
              >
                <Text style={{ color: '#1f2937', fontSize: 16 }}>{profile.preferredLanguage}</Text>
                <Text style={{ color: '#9ca3af', fontSize: 16 }}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Time Zone */}
            <View>
              <Text style={{ color: '#4b5563', fontSize: 14, fontWeight: '500', marginBottom: 8 }}>Time Zone</Text>
              <TouchableOpacity 
                style={{ 
                  backgroundColor: '#f9fafb', 
                  borderRadius: 12, 
                  paddingHorizontal: 16, 
                  paddingVertical: 16, 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: '#e5e7eb'
                }}
                onPress={() => setShowTimezoneModal(true)}
              >
                <Text style={{ color: '#1f2937', fontSize: 16 }}>{profile.timeZone}</Text>
                <Text style={{ color: '#9ca3af', fontSize: 16 }}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Settings Section */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 20, marginRight: 8 }}>🛡️</Text>
              <Text style={{ color: '#1f2937', fontWeight: '600', fontSize: 18 }}>Account Settings</Text>
            </View>

            {/* Change Password */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 18, marginRight: 12 }}>🔒</Text>
                <Text style={{ color: '#1f2937', fontWeight: '500', fontSize: 16 }}>Change Password</Text>
              </View>
              <Text style={{ color: '#9ca3af', fontSize: 18 }}>→</Text>
            </TouchableOpacity>

            {/* Privacy Settings */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 18, marginRight: 12 }}>👁️</Text>
                <Text style={{ color: '#1f2937', fontWeight: '500', fontSize: 16 }}>Privacy Settings</Text>
              </View>
              <Text style={{ color: '#9ca3af', fontSize: 18 }}>→</Text>
            </TouchableOpacity>

            {/* Download Data */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 18, marginRight: 12 }}>📥</Text>
                <Text style={{ color: '#1f2937', fontWeight: '500', fontSize: 16 }}>Download Data</Text>
              </View>
              <Text style={{ color: '#9ca3af', fontSize: 18 }}>→</Text>
            </TouchableOpacity>

            {/* Delete Account */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 18, marginRight: 12 }}>🗑️</Text>
                <Text style={{ color: '#ef4444', fontWeight: '500', fontSize: 16 }}>Delete Account</Text>
              </View>
              <Text style={{ color: '#9ca3af', fontSize: 18 }}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Save Button - Only show if there are changes */}
          {hasChanges && (
            <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#22c55e',
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  elevation: 4
                }}
                onPress={handleSaveChanges}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 20, marginRight: 8 }}>✓</Text>
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Save Changes</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          justifyContent: 'flex-end' 
        }}>
          <View style={{ 
            backgroundColor: 'white', 
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20,
            paddingTop: 20,
            maxHeight: '60%'
          }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#f3f4f6'
            }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937' }}>
                Select Language
              </Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Text style={{ fontSize: 24, color: '#9ca3af' }}>×</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={languages}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f9fafb',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onPress={() => {
                    updateProfile('preferredLanguage', item.value);
                    setShowLanguageModal(false);
                  }}
                >
                  <Text style={{ 
                    fontSize: 16, 
                    color: '#1f2937',
                    fontWeight: profile.preferredLanguage === item.value ? '600' : '400'
                  }}>
                    {item.label}
                  </Text>
                  {profile.preferredLanguage === item.value && (
                    <Text style={{ color: '#22c55e', fontSize: 18 }}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Timezone Selection Modal */}
      <Modal
        visible={showTimezoneModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimezoneModal(false)}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          justifyContent: 'flex-end' 
        }}>
          <View style={{ 
            backgroundColor: 'white', 
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20,
            paddingTop: 20,
            maxHeight: '60%'
          }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#f3f4f6'
            }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937' }}>
                Select Timezone
              </Text>
              <TouchableOpacity onPress={() => setShowTimezoneModal(false)}>
                <Text style={{ fontSize: 24, color: '#9ca3af' }}>×</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={timezones}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f9fafb',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onPress={() => {
                    updateProfile('timeZone', item.value);
                    setShowTimezoneModal(false);
                  }}
                >
                  <Text style={{ 
                    fontSize: 16, 
                    color: '#1f2937',
                    fontWeight: profile.timeZone === item.value ? '600' : '400'
                  }}>
                    {item.label}
                  </Text>
                  {profile.timeZone === item.value && (
                    <Text style={{ color: '#22c55e', fontSize: 18 }}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="profile"
        onTabPress={(tab: BottomNavTab) => {
          switch (tab) {
            case 'home':
              onNavigateToHome?.();
              break;
            case 'directory':
              onNavigateToDirectory?.();
              break;
            case 'rewards':
              onNavigateToRewards?.();
              break;
            case 'profile':
              // Already on profile, do nothing
              break;
          }
        }}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;