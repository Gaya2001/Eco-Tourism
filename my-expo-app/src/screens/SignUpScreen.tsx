import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Theme } from '../constants';
import { LoadingSpinner } from '../components';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 380;
const isShortScreen = height < 700;

interface SignUpScreenProps {
  onSignUp: (userData: any) => void;
  onNavigateToSignIn: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ 
  onSignUp, 
  onNavigateToSignIn 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (!formData.username.trim()) {
      Alert.alert('Error', 'Username is required');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSignUp(formData);
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} sign up will be available soon!`);
  };

  return (
    <LinearGradient
      colors={['#a8e6cf', '#dcedc1']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              {/* Main Card */}
              <View style={styles.card}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Ionicons name="home" size={isSmallScreen ? 24 : 28} color="#ffffff" />
                </View>
                <Text style={styles.title}>EcoVenture</Text>
                <Text style={styles.subtitle}>Join our green community!</Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      value={formData.email}
                      onChangeText={(value) => handleInputChange('email', value)}
                      placeholder="your@email.com"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Username Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      value={formData.username}
                      onChangeText={(value) => handleInputChange('username', value)}
                      placeholder="eco_explorer"
                      placeholderTextColor="#9CA3AF"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      value={formData.password}
                      onChangeText={(value) => handleInputChange('password', value)}
                      placeholder="••••••••"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      value={formData.confirmPassword}
                      onChangeText={(value) => handleInputChange('confirmPassword', value)}
                      placeholder="••••••••"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Create Account Button */}
                <TouchableOpacity
                  style={[styles.createButton, isLoading && styles.buttonDisabled]}
                  onPress={handleSignUp}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner size="small" color="#ffffff" />
                  ) : (
                    <Text style={styles.createButtonText}>Create Account</Text>
                  )}
                </TouchableOpacity>

                {/* Divider */}
                <Text style={styles.dividerText}>or continue with</Text>

                {/* Social Buttons */}
                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialSignUp('Google')}>
                  <Ionicons name="logo-google" size={20} color="#DB4437" />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialSignUp('Facebook')}>
                  <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                  <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                </TouchableOpacity>

                {/* Sign In Link */}
                <View style={styles.signInContainer}>
                  <Text style={styles.signInText}>Already have an account? </Text>
                  <TouchableOpacity onPress={onNavigateToSignIn}>
                    <Text style={styles.signInLink}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  content: {
    paddingHorizontal: isSmallScreen ? 12 : 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: isSmallScreen ? 20 : 24,
    paddingHorizontal: isSmallScreen ? 14 : 18,
    paddingVertical: isSmallScreen ? 12 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    maxWidth: width > 500 ? 400 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: isSmallScreen ? 12 : 16,
  },
  logoContainer: {
    width: isSmallScreen ? 44 : 52,
    height: isSmallScreen ? 44 : 52,
    backgroundColor: '#22C55E',
    borderRadius: isSmallScreen ? 22 : 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isSmallScreen ? 6 : 8,
  },
  title: {
    fontSize: isSmallScreen ? 20 : 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  form: {
    gap: isSmallScreen ? 6 : 8,
  },
  inputGroup: {
    marginBottom: isSmallScreen ? 2 : 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: isSmallScreen ? 8 : 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: isSmallScreen ? 10 : 14,
    paddingVertical: isSmallScreen ? 6 : 8,
    minHeight: 40,
  },
  inputIcon: {
    marginRight: isSmallScreen ? 6 : 10,
  },
  textInput: {
    flex: 1,
    fontSize: isSmallScreen ? 13 : 15,
    color: '#111827',
    fontWeight: '500',
  },
  eyeButton: {
    padding: 2,
    minWidth: 24,
    minHeight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#22C55E',
    borderRadius: isSmallScreen ? 8 : 10,
    paddingVertical: isSmallScreen ? 10 : 12,
    alignItems: 'center',
    marginTop: isSmallScreen ? 2 : 4,
    marginBottom: isSmallScreen ? 8 : 12,
    minHeight: 42,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 13 : 15,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  dividerText: {
    textAlign: 'center',
    fontSize: isSmallScreen ? 11 : 12,
    color: '#9CA3AF',
    marginBottom: isSmallScreen ? 6 : 8,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: isSmallScreen ? 8 : 10,
    paddingVertical: isSmallScreen ? 6 : 8,
    marginBottom: isSmallScreen ? 4 : 6,
    minHeight: 38,
  },
  socialButtonText: {
    marginLeft: 6,
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '500',
    color: '#374151',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: isSmallScreen ? 4 : 8,
    paddingVertical: 2,
  },
  signInText: {
    fontSize: isSmallScreen ? 11 : 12,
    color: '#6B7280',
  },
  signInLink: {
    fontSize: isSmallScreen ? 11 : 12,
    color: '#22C55E',
    fontWeight: '600',
  },
});

export default SignUpScreen;
