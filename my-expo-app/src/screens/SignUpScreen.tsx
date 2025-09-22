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
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
// constants not used in this screen

const { width } = Dimensions.get('window');
const isSmallScreen = width < 380;

interface SignUpScreenProps {
  onSignUp: (userData: any) => void;
  onNavigateToSignIn: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp, onNavigateToSignIn }) => {
  const [role, setRole] = useState<'tourist' | 'business'>('tourist');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [tosChecked, setTosChecked] = useState(false);
  // Business-specific fields
  const [businessName, setBusinessName] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [website, setWebsite] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);

  const toggleInterest = (key: string) => {
    setInterests(prev => prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]);
  };

  const validateForm = () => {
    if (!fullName.trim()) { Alert.alert('Error', 'Full name is required'); return false; }
    if (!email.trim()) { Alert.alert('Error', 'Email is required'); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { Alert.alert('Error', 'Please enter a valid email'); return false; }
    if (!phone.trim()) { Alert.alert('Error', 'Phone number is required'); return false; }
    if (password.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return false; }
    if (!tosChecked) { Alert.alert('Error', 'You must accept Terms of Service'); return false; }
    if (role === 'business') {
      if (!businessName.trim()) { Alert.alert('Error', 'Business / Hotel name is required'); return false; }
      if (!hotelAddress.trim()) { Alert.alert('Error', 'Hotel address is required'); return false; }
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1500));
      const payload: any = { fullName, email, phone, role, interests };
      if (role === 'business') {
        payload.business = {
          name: businessName,
          address: hotelAddress,
          rooms: numRooms,
          website,
          amenities,
        };
      }
      onSignUp(payload);
    } catch {
      Alert.alert('Error', 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };


  const ECO_BG = { uri: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=3b5d6b1c3a2f7f1b9a6b' };

  return (
    <ImageBackground source={ECO_BG} resizeMode="cover" style={styles.container}>
      <View style={styles.overlay} />
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
              <View style={styles.formNew}>
                {/* Role selector */}
                <View style={styles.roleRow}>
                  <TouchableOpacity
                    style={[styles.roleButton, role === 'tourist' && styles.roleButtonActive]}
                    onPress={() => setRole('tourist')}
                  >
                    <Ionicons name="person" size={16} color={role === 'tourist' ? '#fff' : '#22C55E'} />
                    <Text style={[styles.roleText, role === 'tourist' && styles.roleTextActive]}>Tourist</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.roleButton, role === 'business' && styles.roleButtonActive]}
                    onPress={() => setRole('business')}
                  >
                    <Ionicons name="briefcase" size={16} color={role === 'business' ? '#fff' : '#6B7280'} />
                    <Text style={[styles.roleText, role === 'business' && styles.roleTextActive]}>Business</Text>
                  </TouchableOpacity>
                </View>

                {/* Full name */}
                <View style={styles.inputGroupNew}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.inputContainerNew}>
                    <TextInput style={styles.textInputNew} placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
                    <Ionicons name="person-outline" size={18} color="#9CA3AF" />
                  </View>
                </View>

                {/* Email */}
                <View style={styles.inputGroupNew}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputContainerNew}>
                    <TextInput style={styles.textInputNew} placeholder="your.email@example.com" value={email} onChangeText={setEmail} keyboardType="email-address"/>
                    <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
                  </View>
                </View>

                {/* Phone */}
                <View style={styles.inputGroupNew}>
                  <Text style={styles.label}>Phone Number</Text>
                  <View style={styles.inputContainerNew}>
                    <TextInput style={styles.textInputNew} placeholder="+1 (555) 000-0000" value={phone} onChangeText={setPhone} keyboardType="phone-pad"/>
                    <Ionicons name="call-outline" size={18} color="#9CA3AF" />
                  </View>
                </View>

                {/* Password */}
                <View style={styles.inputGroupNew}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputContainerNew}>
                    <TextInput style={styles.textInputNew} placeholder="Create a strong password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword}/>
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Travel Interests */}
                <View style={styles.inputGroupNew}>
                  <Text style={styles.label}>Travel Interests</Text>
                  <View style={styles.interestsRow}>
                    {['Adventure','Wildlife','Nature','Cultural'].map(i => (
                      <TouchableOpacity key={i} style={[styles.chip, interests.includes(i) && styles.chipActive]} onPress={() => toggleInterest(i)}>
                        <Text style={[styles.chipText, interests.includes(i) && styles.chipTextActive]}>{i}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Preferred Destinations (placeholder) */}
                <View style={styles.inputGroupNew}>
                  <Text style={styles.label}>Preferred Destinations</Text>
                  <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Select preferred regions</Text>
                    <Ionicons name="chevron-down" size={18} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                {/* Business specific fields */}
                {role === 'business' && (
                  <>
                    <View style={styles.inputGroupNew}>
                      <Text style={styles.label}>Business / Hotel Name</Text>
                      <View style={styles.inputContainerNew}>
                        <TextInput style={styles.textInputNew} placeholder="Hotel or business name" value={businessName} onChangeText={setBusinessName} />
                      </View>
                    </View>

                    <View style={styles.inputGroupNew}>
                      <Text style={styles.label}>Hotel Address</Text>
                      <View style={styles.inputContainerNew}>
                        <TextInput style={styles.textInputNew} placeholder="Street, city, country" value={hotelAddress} onChangeText={setHotelAddress} />
                      </View>
                    </View>

                    <View style={styles.inputGroupNew}>
                      <Text style={styles.label}>Number of Rooms</Text>
                      <View style={styles.inputContainerNew}>
                        <TextInput style={styles.textInputNew} placeholder="e.g. 20" value={numRooms} onChangeText={setNumRooms} keyboardType="numeric" />
                      </View>
                    </View>

                    <View style={styles.inputGroupNew}>
                      <Text style={styles.label}>Website</Text>
                      <View style={styles.inputContainerNew}>
                        <TextInput style={styles.textInputNew} placeholder="https://yoursite.com" value={website} onChangeText={setWebsite} keyboardType="url" />
                      </View>
                    </View>

                    <View style={styles.inputGroupNew}>
                      <Text style={styles.label}>Amenities</Text>
                      <View style={styles.interestsRow}>
                        {['Free Breakfast','Wifi','Pool','Parking','Pet Friendly'].map(a => (
                          <TouchableOpacity key={a} style={[styles.chip, amenities.includes(a) && styles.chipActive]} onPress={() => setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])}>
                            <Text style={[styles.chipText, amenities.includes(a) && styles.chipTextActive]}>{a}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </>
                )}

                {/* TOS */}
                <View style={styles.tosRow}>
                  <TouchableOpacity onPress={() => setTosChecked(!tosChecked)} style={[styles.checkbox, tosChecked && styles.checkboxChecked]}>
                    {tosChecked && <Ionicons name="checkmark" size={16} color="#fff" />}
                  </TouchableOpacity>
                  <Text style={styles.tosText}>I agree to the </Text>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>Terms of Service</Text>
                  </TouchableOpacity>
                  <Text style={styles.tosText}> and </Text>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>Privacy Policy</Text>
                  </TouchableOpacity>
                </View>

                {/* Create Account Button */}
                <TouchableOpacity onPress={handleSignUp} style={{ width: '100%' }} disabled={isLoading}>
                  <LinearGradient colors={[ '#3ef26b', '#00c853' ]} style={[styles.createButtonNew, isLoading && styles.buttonDisabled]}>
                    <Text style={styles.createButtonTextNew}>{isLoading ? 'Creating...' : 'Create Account'}</Text>
                  </LinearGradient>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // stronger green tint + higher opacity for darker, eco-friendly feel
    backgroundColor: 'rgba(6,78,42,0.64)',
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
  /* New styles for redesigned sign up */
  formNew: {
    marginTop: isSmallScreen ? 8 : 12,
  },
  roleRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: isSmallScreen ? 10 : 14,
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  roleButtonActive: {
    backgroundColor: '#22C55E',
  },
  roleText: {
    marginLeft: 8,
    color: '#6B7280'
  },
  roleTextActive: {
    color: '#fff',
    fontWeight: '700'
  },
  inputGroupNew: {
    marginBottom: isSmallScreen ? 10 : 12,
  },
  label: {
    marginBottom: 6,
    color: '#374151',
    fontWeight: '600'
  },
  inputContainerNew: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6F3EA',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textInputNew: {
    flex: 1,
    fontSize: 14,
    color: '#111827'
  },
  interestsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F8FAF8',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#fff',
    borderColor: '#22C55E',
  },
  chipText: {
    color: '#374151'
  },
  chipTextActive: {
    color: '#22C55E',
    fontWeight: '700'
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6F3EA'
  },
  dropdownText: {
    color: '#6B7280'
  },
  tosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    flexWrap: 'wrap'
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E'
  },
  tosText: {
    color: '#6B7280'
  },
  linkText: {
    color: '#22C55E',
    fontWeight: '600'
  },
  createButtonNew: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  createButtonTextNew: {
    color: '#fff',
    fontWeight: '700'
  },
});

export default SignUpScreen;
