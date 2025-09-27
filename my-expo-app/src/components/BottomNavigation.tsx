import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export type BottomNavTab = 'home' | 'directory' | 'events' | 'rewards' | 'profile';

interface BottomNavigationProps {
  activeTab: BottomNavTab;
  onTabPress: (tab: BottomNavTab) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    {
      key: 'home' as BottomNavTab,
      label: 'Home',
      icon: '🏠'
    },
    {
      key: 'directory' as BottomNavTab,
      label: 'Directory',
      icon: '📚'
    },
    {
      key: 'events' as BottomNavTab,
      label: 'Events',
      icon: '🎉'
    },
    {
      key: 'rewards' as BottomNavTab,
      label: 'Rewards',
      icon: '🏆'
    },
    {
      key: 'profile' as BottomNavTab,
      label: 'Profile',
      icon: '👤'
    }
  ];

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 8
            }}
          >
            {/* Icon Container */}
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: isActive ? '#22c55e' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 4,
              ...(isActive && {
                shadowColor: '#22c55e',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6
              })
            }}>
              <Text style={{
                fontSize: 20,
                color: isActive ? 'white' : '#6b7280'
              }}>
                {tab.icon}
              </Text>
            </View>

            {/* Label */}
            <Text style={{
              fontSize: 12,
              fontWeight: isActive ? '600' : '500',
              color: isActive ? '#22c55e' : '#6b7280'
            }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
