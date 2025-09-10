import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Theme } from '../constants';
import { Button } from '../components';

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  benefits: string[];
}

const roleOptions: RoleOption[] = [
  {
    id: 'tourist',
    title: 'Tourist',
    description: 'Explore eco-friendly destinations and sustainable travel experiences',
    icon: 'earth',
    color: Colors.primary[500],
    benefits: [
      'Discover green destinations',
      'Book eco-friendly tours',
      'Track your carbon footprint',
      'Join eco communities'
    ]
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Promote your sustainable tourism business and connect with eco-conscious travelers',
    icon: 'storefront',
    color: '#3b82f6', // Blue
    benefits: [
      'List eco-friendly services',
      'Reach sustainable travelers',
      'Get verified certification',
      'Analytics & insights'
    ]
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'Manage and oversee the eco-tourism platform to ensure quality standards',
    icon: 'shield-checkmark',
    color: '#8b5cf6', // Purple
    benefits: [
      'Platform management',
      'Content moderation',
      'Quality assurance',
      'Data analytics'
    ]
  }
];

interface RoleSelectionScreenProps {
  onRoleSelect: (role: string) => void;
}

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  const renderRoleCard = (role: RoleOption) => (
    <TouchableOpacity
      key={role.id}
      style={[
        styles.roleCard,
        selectedRole === role.id && { 
          borderColor: role.color,
          borderWidth: 3,
          transform: [{ scale: 1.02 }],
        }
      ]}
      onPress={() => handleRoleSelect(role.id)}
      activeOpacity={0.7}
    >
      {/* Animated background for selected card */}
      {selectedRole === role.id && (
        <LinearGradient
          colors={[`${role.color}10`, `${role.color}05`]}
          style={styles.selectedBackground}
        />
      )}

      {/* Selection indicator - modern checkmark */}
      {selectedRole === role.id && (
        <View style={[styles.selectionIndicator, { backgroundColor: role.color }]}>
          <Ionicons name="checkmark" size={16} color={Colors.white} />
        </View>
      )}

      <View style={styles.cardRow}>
        {/* Hero icon with gradient background */}
        <LinearGradient
          colors={[role.color, `${role.color}CC`]}
          style={styles.iconContainer}
        >
          <Ionicons name={role.icon} size={28} color={Colors.white} />
        </LinearGradient>

        {/* Content */}
        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text style={[styles.roleTitle, { color: Colors.neutral[900] }]}>{role.title}</Text>
            {/* Popular badge for tourist */}
            {role.id === 'tourist' && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Popular</Text>
              </View>
            )}
          </View>
          <Text style={styles.roleDescription} numberOfLines={2}>{role.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#f0fdf4', '#dbeafe']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[600]]}
            style={styles.headerIcon}
          >
            <Ionicons name="people" size={28} color={Colors.white} />
          </LinearGradient>
          <Text style={styles.headerTitle}>Choose Your Journey</Text>
          <Text style={styles.headerSubtitle}>
            Select your role to personalize your eco-tourism experience
          </Text>
        </View>

        {/* Role cards */}
        <View style={styles.rolesContainer}>
          {roleOptions.map(renderRoleCard)}
        </View>

        {/* Continue button */}
        <View style={styles.footer}>
          <Button
            title={selectedRole ? "Continue Your Journey" : "Select a Role"}
            variant="primary"
            onPress={handleContinue}
            disabled={!selectedRole}
            style={[
              styles.continueButton,
              !selectedRole && styles.disabledButton
            ]}
          />
          
          <Text style={styles.footerText}>
            ✨ You can change your role anytime in settings
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.lg,
  },
  headerIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.lg,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.neutral[900],
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
  },
  rolesContainer: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
    justifyContent: 'space-evenly',
  },
  roleCard: {
    backgroundColor: Colors.white,
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    ...Theme.shadows.lg,
    borderWidth: 2,
    borderColor: Colors.neutral[100],
    position: 'relative',
    overflow: 'hidden',
    minHeight: 120,
  },
  selectedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  selectionIndicator: {
    position: 'absolute',
    top: Theme.spacing.md,
    right: Theme.spacing.md,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.md,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
    ...Theme.shadows.lg,
  },
  cardContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xs,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  roleDescription: {
    fontSize: 13,
    color: Colors.neutral[600],
    lineHeight: 18,
  },
  benefitsList: {
    marginTop: Theme.spacing.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  benefitIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  benefitText: {
    fontSize: 13,
    color: Colors.neutral[600],
    flex: 1,
    fontWeight: '500',
  },
  popularBadge: {
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: Theme.spacing.xs,
  },
  popularText: {
    fontSize: 9,
    color: Colors.white,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  footer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    marginBottom: Theme.spacing.md,
  },
  disabledButton: {
    opacity: 0.5,
  },
  footerText: {
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});

export default RoleSelectionScreen;
