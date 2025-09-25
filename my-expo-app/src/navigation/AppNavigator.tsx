import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants';

// Import screens with explicit file extensions
import {
  DashboardWelcome,
  EcoAnalytics,
  BusinessRegistration1,
  ProfileManagement,
  AdminDashboard,
  CampaignsScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

// Simplified Main Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'EcoBiz') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'BusinessReg') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Campaigns') {
            iconName = focused ? 'megaphone' : 'megaphone-outline';
          } else {
            iconName = 'help-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary[500],
        tabBarInactiveTintColor: Colors.neutral[400],
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.neutral[200],
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: Colors.primary[500],
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen name="Dashboard" component={DashboardWelcome} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="EcoBiz" component={EcoAnalytics} options={{ title: 'EcoBiz' }} />
      <Tab.Screen
        name="BusinessReg"
        component={BusinessRegistration1}
        options={{ title: 'Business Registration' }}
      />
      <Tab.Screen name="Profile" component={ProfileManagement} options={{ title: 'Profile' }} />
      <Tab.Screen name="Admin" component={AdminDashboard} options={{ title: 'Admin Dashboard' }} />
      <Tab.Screen name="Campaigns" component={CampaignsScreen} />
    </Tab.Navigator>
  );
};

// Main App Navigator
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};
