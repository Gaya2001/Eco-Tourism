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

interface SignInScreenProps {
  onSignIn: (credentials: any) => void;
  onNavigateToSignUp: () => void;
  onForgotPassword: () => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ 
  onSignIn, 
  onNavigateToSignUp, 
  onForgotPassword 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.password.trim()) {
      Alert.alert('Error', 'Password is required');
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSignIn(formData);
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} sign in will be available soon!`);
  };

  return (
    <LinearGradient
      colors={['#a8e6cf', '#dcedc1']}
      style={styles.container}
    >
      {/* Background decorative elements */}
      <View style={styles.decorativeElements}>
        <View style={[styles.decorativeCircle, styles.orangeCircle]} />
        <View style={[styles.decorativeShape, styles.bottomLeftShape]} />
        <View style={[styles.decorativeShape, styles.bottomRightShape]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Main Card */}
            <View style={styles.card}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Ionicons name="home" size={32} color="#ffffff" />
                </View>
                <Text style={styles.title}>EcoVenture</Text>
                <Text style={styles.subtitle}>Welcome back, eco-explorer!</Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
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

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
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

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotPasswordContainer} onPress={onForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>

                {/* Sign In Button */}
                <TouchableOpacity
                  style={[styles.signInButton, isLoading && styles.buttonDisabled]}
                  onPress={handleSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner size="small" color="#ffffff" />
                  ) : (
                    <Text style={styles.signInButtonText}>Sign In</Text>
                  )}
                </TouchableOpacity>

                {/* Divider */}
                <Text style={styles.dividerText}>or continue with</Text>

                {/* Social Buttons */}
                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialSignIn('Google')}>
                  <Ionicons name="logo-google" size={20} color="#DB4437" />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialSignIn('Facebook')}>
                  <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                  <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={onNavigateToSignUp}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
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
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decorativeCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  orangeCircle: {
    top: 80,
    right: -40,
    backgroundColor: '#FD9853',
    opacity: 0.8,
  },
  decorativeShape: {
    position: 'absolute',
    backgroundColor: '#22C55E',
    opacity: 0.6,
  },
  bottomLeftShape: {
    bottom: 120,
    left: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  bottomRightShape: {
    bottom: 60,
    right: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#22C55E',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  eyeButton: {
    padding: 4,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  signInButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  dividerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signUpText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signUpLink: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '600',
  },
});

export default SignInScreen;
