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
                  <Ionicons name="home" size={32} color="#ffffff" />
                </View>
                <Text style={styles.title}>EcoVenture</Text>
                <Text style={styles.subtitle}>Welcome back, eco-explorer!</Text>
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
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decorativeCircle: {
    position: 'absolute',
    width: isSmallScreen ? 100 : 120,
    height: isSmallScreen ? 100 : 120,
    borderRadius: isSmallScreen ? 50 : 60,
  },
  orangeCircle: {
    top: isSmallScreen ? 60 : 80,
    right: isSmallScreen ? -30 : -40,
    backgroundColor: '#FD9853',
    opacity: 0.8,
  },
  decorativeShape: {
    position: 'absolute',
    backgroundColor: '#22C55E',
    opacity: 0.6,
  },
  bottomLeftShape: {
    bottom: isSmallScreen ? 100 : 120,
    left: isSmallScreen ? -20 : -30,
    width: isSmallScreen ? 50 : 60,
    height: isSmallScreen ? 50 : 60,
    borderRadius: isSmallScreen ? 25 : 30,
  },
  bottomRightShape: {
    bottom: isSmallScreen ? 50 : 60,
    right: isSmallScreen ? 30 : 40,
    width: isSmallScreen ? 32 : 40,
    height: isSmallScreen ? 32 : 40,
    borderRadius: isSmallScreen ? 16 : 20,
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
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingVertical: isSmallScreen ? 20 : 24,
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
    marginBottom: isSmallScreen ? 18 : 24,
  },
  logoContainer: {
    width: isSmallScreen ? 48 : 56,
    height: isSmallScreen ? 48 : 56,
    backgroundColor: '#22C55E',
    borderRadius: isSmallScreen ? 24 : 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isSmallScreen ? 8 : 12,
  },
  title: {
    fontSize: isSmallScreen ? 22 : 26,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isSmallScreen ? 13 : 15,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  form: {
    gap: isSmallScreen ? 10 : 14,
  },
  inputGroup: {
    marginBottom: isSmallScreen ? 4 : 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: isSmallScreen ? 10 : 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: isSmallScreen ? 12 : 16,
    paddingVertical: isSmallScreen ? 8 : 10,
    minHeight: 44,
  },
  inputIcon: {
    marginRight: isSmallScreen ? 8 : 12,
  },
  textInput: {
    flex: 1,
    fontSize: isSmallScreen ? 14 : 16,
    color: '#111827',
    fontWeight: '500',
  },
  eyeButton: {
    padding: 4,
    minWidth: 28,
    minHeight: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: isSmallScreen ? 4 : 6,
    paddingVertical: 2,
  },
  forgotPasswordText: {
    fontSize: isSmallScreen ? 12 : 13,
    color: '#22C55E',
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#22C55E',
    borderRadius: isSmallScreen ? 10 : 12,
    paddingVertical: isSmallScreen ? 12 : 14,
    alignItems: 'center',
    marginBottom: isSmallScreen ? 14 : 18,
    minHeight: 46,
  },
  signInButtonText: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  dividerText: {
    textAlign: 'center',
    fontSize: isSmallScreen ? 12 : 13,
    color: '#9CA3AF',
    marginBottom: isSmallScreen ? 10 : 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: isSmallScreen ? 10 : 12,
    paddingVertical: isSmallScreen ? 8 : 10,
    marginBottom: isSmallScreen ? 6 : 8,
    minHeight: 42,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: isSmallScreen ? 13 : 15,
    fontWeight: '500',
    color: '#374151',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: isSmallScreen ? 8 : 12,
    paddingVertical: 4,
  },
  signUpText: {
    fontSize: isSmallScreen ? 12 : 13,
    color: '#6B7280',
  },
  signUpLink: {
    fontSize: isSmallScreen ? 12 : 13,
    color: '#22C55E',
    fontWeight: '600',
  },
});

export default SignInScreen;
