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
  Modal,
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
  const [role, setRole] = useState<'tourist' | 'businessman'>('tourist');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [tosChecked, setTosChecked] = useState(false);
  const [preferredDestinations, setPreferredDestinations] = useState<string[]>([]);
  const [showDestinationsDropdown, setShowDestinationsDropdown] = useState(false);
  // Businessman-specific fields
  const [businessCategory, setBusinessCategory] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [professionalGoals, setProfessionalGoals] = useState<string[]>([]);

  const toggleInterest = (key: string) => {
    setInterests(prev => prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]);
  };

  const toggleDestination = (destination: string) => {
    setPreferredDestinations(prev => 
      prev.includes(destination) 
        ? prev.filter(d => d !== destination) 
        : [...prev, destination]
    );
  };

  const toggleSpecialization = (spec: string) => {
    setSpecialization(prev => 
      prev.includes(spec) 
        ? prev.filter(s => s !== spec) 
        : [...prev, spec]
    );
  };

  const toggleProfessionalGoal = (goal: string) => {
    setProfessionalGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal) 
        : [...prev, goal]
    );
  };

  const validateForm = () => {
    if (!fullName.trim()) { Alert.alert('Error', 'Full name is required'); return false; }
    if (!email.trim()) { Alert.alert('Error', 'Email is required'); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { Alert.alert('Error', 'Please enter a valid email'); return false; }
    if (!phone.trim()) { Alert.alert('Error', 'Phone number is required'); return false; }
    if (password.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return false; }
    if (!tosChecked) { Alert.alert('Error', 'You must accept Terms of Service'); return false; }
    
    // Role-specific validation
    if (role === 'businessman') {
      if (!businessCategory.trim()) { Alert.alert('Error', 'Business category is required'); return false; }
      if (!experience.trim()) { Alert.alert('Error', 'Years of experience is required'); return false; }
    }
    
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1500));
      const payload: any = { fullName, email, phone, role };
      
      if (role === 'tourist') {
        payload.interests = interests;
        payload.preferredDestinations = preferredDestinations;
      } else if (role === 'businessman') {
        payload.businessCategory = businessCategory;
        payload.experience = experience;
        payload.specialization = specialization;
        payload.professionalGoals = professionalGoals;
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
                <Text style={styles.subtitle}>
                  {role === 'tourist' 
                    ? 'Join our green community as a traveler!' 
                    : 'Join our business network for sustainable tourism!'
                  }
                </Text>
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
                    style={[styles.roleButton, role === 'businessman' && styles.roleButtonActive]}
                    onPress={() => setRole('businessman')}
                  >
                    <Ionicons name="briefcase" size={16} color={role === 'businessman' ? '#fff' : '#6B7280'} />
                    <Text style={[styles.roleText, role === 'businessman' && styles.roleTextActive]}>Businessman</Text>
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

                {/* Role-specific fields */}
                {role === 'tourist' ? (
                  <>
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

                    {/* Preferred Destinations */}
                    <View style={styles.inputGroupNew}>
                      <Text style={styles.label}>Preferred Destinations</Text>
                      <TouchableOpacity 
                        style={styles.dropdown} 
                        onPress={() => setShowDestinationsDropdown(true)}
                      >
                        <Text style={[styles.dropdownText, preferredDestinations.length > 0 && styles.dropdownTextSelected]}>
                          {preferredDestinations.length > 0 
                            ? `${preferredDestinations.length} destination${preferredDestinations.length > 1 ? 's' : ''} selected`
                            : 'Select preferred destinations in Sri Lanka'
                          }
                        </Text>
                        <Ionicons 
                          name="location-outline" 
                          size={18} 
                          color="#6B7280" 
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    {/* Business Category */}
                    <View style={styles.inputGroupNew}>
                      <Text style={styles.label}>Business Category</Text>
                      <View style={styles.inputContainerNew}>
                        <TextInput 
                          style={styles.textInputNew} 
                          placeholder="e.g., Hospitality, Travel Agency, Transport" 
                          value={businessCategory} 
                          onChangeText={setBusinessCategory} 
                        />
                        <Ionicons name="business-outline" size={18} color="#9CA3AF" />
                      </View>
                    </View>

                    {/* Years of Experience */}
                    <View style={styles.inputGroupNew}>
                      <Text style={styles.label}>Years of Experience</Text>
                      <View style={styles.inputContainerNew}>
                        <TextInput 
                          style={styles.textInputNew} 
                          placeholder="e.g., 5 years" 
                          value={experience} 
                          onChangeText={setExperience} 
                          keyboardType="numeric"
                        />
                        <Ionicons name="time-outline" size={18} color="#9CA3AF" />
                      </View>
                    </View>

                    {/* Business Specialization */}
                    <View style={styles.inputGroupNew}>
                      <Text style={styles.label}>Business Specialization</Text>
                      <View style={styles.interestsRow}>
                        {['Eco Hotels','Tour Guiding','Transportation','Event Planning','Local Crafts','Food & Beverage'].map(spec => (
                          <TouchableOpacity 
                            key={spec} 
                            style={[styles.chip, specialization.includes(spec) && styles.chipActive]} 
                            onPress={() => toggleSpecialization(spec)}
                          >
                            <Text style={[styles.chipText, specialization.includes(spec) && styles.chipTextActive]}>{spec}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    {/* Professional Goals */}
                    <View style={styles.inputGroupNew}>
                      <Text style={styles.label}>Professional Goals</Text>
                      <View style={styles.interestsRow}>
                        {['Expand Business','Network Building','Learn Best Practices','Sustainable Tourism','Digital Marketing','Partnership Opportunities'].map(goal => (
                          <TouchableOpacity 
                            key={goal} 
                            style={[styles.chip, professionalGoals.includes(goal) && styles.chipActive]} 
                            onPress={() => toggleProfessionalGoal(goal)}
                          >
                            <Text style={[styles.chipText, professionalGoals.includes(goal) && styles.chipTextActive]}>{goal}</Text>
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

      {/* Destinations Selection Modal - Only for Tourists */}
      {role === 'tourist' && (
        <Modal
          visible={showDestinationsDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDestinationsDropdown(false)}
        >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Preferred Destinations</Text>
              <TouchableOpacity 
                onPress={() => setShowDestinationsDropdown(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalSubtitle}>Choose your favorite places to visit in Sri Lanka:</Text>
              
              <View style={styles.destinationsGrid}>
                {['Colombo', 'Kandy', 'Galle', 'Nuwara Eliya', 'Sigiriya', 'Anuradhapura', 'Polonnaruwa', 'Ella', 'Bentota', 'Mirissa', 'Yala National Park', 'Arugam Bay'].map(destination => (
                  <TouchableOpacity
                    key={destination}
                    style={[styles.destinationCard, preferredDestinations.includes(destination) && styles.destinationCardSelected]}
                    onPress={() => toggleDestination(destination)}
                  >
                    <View style={styles.destinationCardContent}>
                      <Ionicons 
                        name="location" 
                        size={20} 
                        color={preferredDestinations.includes(destination) ? "#22C55E" : "#6B7280"} 
                      />
                      <Text style={[styles.destinationCardText, preferredDestinations.includes(destination) && styles.destinationCardTextSelected]}>
                        {destination}
                      </Text>
                      {preferredDestinations.includes(destination) && (
                        <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.modalDoneButton}
                onPress={() => setShowDestinationsDropdown(false)}
              >
                <Text style={styles.modalDoneButtonText}>
                  Done ({preferredDestinations.length} selected)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      )}
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
  dropdownTextSelected: {
    color: '#22C55E',
    fontWeight: '600'
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 16,
    textAlign: 'center',
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 20,
  },
  destinationCard: {
    width: '47%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    minHeight: 60,
  },
  destinationCardSelected: {
    backgroundColor: '#F0FDF4',
    borderColor: '#22C55E',
  },
  destinationCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  destinationCardText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
  },
  destinationCardTextSelected: {
    color: '#22C55E',
    fontWeight: '600',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  modalDoneButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalDoneButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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
