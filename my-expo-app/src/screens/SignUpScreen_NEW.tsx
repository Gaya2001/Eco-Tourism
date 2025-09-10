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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Theme } from '../constants';
import { LoadingSpinner } from '../components';

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
    firstName: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
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
    if (!formData.firstName.trim()) {
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
      colors={['#a8e6cf', '#dcedc1', '#ffd3a5', '#fd9853']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Main Card Container */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              {/* Logo and Header */}
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Ionicons name="home" size={24} color={Colors.white} />
                </View>
                <Text style={styles.title}>EcoVenture</Text>
                <Text style={styles.subtitle}>Join our green community!</Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                {/* Email */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={formData.email}
                      onChangeText={(value) => handleInputChange('email', value)}
                      placeholder="your@email.com"
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Username */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Username</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="person" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={formData.firstName}
                      onChangeText={(value) => handleInputChange('firstName', value)}
                      placeholder="eco_explorer"
                      placeholderTextColor="#999"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={formData.password}
                      onChangeText={(value) => handleInputChange('password', value)}
                      placeholder="••••••••"
                      placeholderTextColor="#999"
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="#999"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={formData.confirmPassword || ''}
                      onChangeText={(value) => handleInputChange('confirmPassword', value)}
                      placeholder="••••••••"
                      placeholderTextColor="#999"
                      secureTextEntry={true}
                    />
                  </View>
                </View>

                {/* Create Account Button */}
                <TouchableOpacity
                  style={[styles.createButton, isLoading && styles.disabledButton]}
                  onPress={handleSignUp}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner size="small" color={Colors.white} />
                  ) : (
                    <Text style={styles.createButtonText}>Create Account</Text>
                  )}
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <Text style={styles.dividerText}>or continue with</Text>
                </View>

                {/* Social Buttons */}
                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialSignUp('Google')}>
                  <Ionicons name="logo-google" size={20} color="#DB4437" />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialSignUp('Facebook')}>
                  <Ionicons name="logo-facebook" size={20} color="#4267B2" />
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#22c55e',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  eyeIcon: {
    padding: 4,
  },
  createButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
  dividerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  socialButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signInText: {
    fontSize: 14,
    color: '#6b7280',
  },
  signInLink: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
