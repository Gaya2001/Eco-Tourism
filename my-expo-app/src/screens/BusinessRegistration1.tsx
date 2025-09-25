import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants';

interface BusinessRegistration1Props {
  onNext?: () => void;
  onSaveDraft?: () => void;
}

const BusinessRegistration1: React.FC<BusinessRegistration1Props> = ({
  onNext = () => {},
  onSaveDraft = () => {},
}) => {
  // Form state
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');

  // Calculate progress percentage
  const progressPercentage = 33;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Business Registration</Text>
          </View>

          {/* Progress indicator */}
          <View style={styles.progressSection}>
            <Text style={styles.progressText}>Step 1 of 3</Text>
            <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
          </View>

          {/* Introduction text */}
          <Text style={styles.introText}>Let's start with the basics about your business</Text>

          {/* Business Information Section */}
          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Business Name <Text style={styles.requiredMark}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your business name"
                  placeholderTextColor="#A0AEC0"
                  value={businessName}
                  onChangeText={setBusinessName}
                />
                <MaterialIcons name="business" size={20} color="#A0AEC0" style={styles.inputIcon} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Business Type <Text style={styles.requiredMark}>*</Text>
              </Text>
              <TouchableOpacity style={styles.dropdownContainer}>
                <Text style={businessType ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {businessType || 'Select business type'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#A0AEC0" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Industry</Text>
              <TouchableOpacity style={styles.dropdownContainer}>
                <Text style={industry ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {industry || 'Select industry'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#A0AEC0" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Contact Information Section */}
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Business Email <Text style={styles.requiredMark}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="business@company.com"
                  placeholderTextColor="#A0AEC0"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <MaterialIcons name="email" size={20} color="#A0AEC0" style={styles.inputIcon} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Phone Number <Text style={styles.requiredMark}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="+1 (555) 123-4567"
                  placeholderTextColor="#A0AEC0"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                <MaterialIcons name="phone" size={20} color="#A0AEC0" style={styles.inputIcon} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Website</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="www.yourcompany.com"
                  placeholderTextColor="#A0AEC0"
                  value={website}
                  onChangeText={setWebsite}
                  keyboardType="url"
                  autoCapitalize="none"
                />
                <MaterialIcons name="language" size={20} color="#A0AEC0" style={styles.inputIcon} />
              </View>
            </View>
            <Text style={styles.helperText}>Optional - Add your company website if available</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Business Description</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Tell us about your business..."
                  placeholderTextColor="#A0AEC0"
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>
            <Text style={styles.helperText}>
              Optional - Brief description of your business activities
            </Text>
          </View>

          {/* Button row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.saveDraftButton} onPress={onSaveDraft}>
              <Text style={styles.saveDraftButtonText}>Save Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.continueButton} onPress={onNext}>
              <Text style={styles.continueButtonText}>Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>

          <Text style={styles.requiredNote}>* Required fields</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A202C',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // To center the title accounting for the back button
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: Colors.primary[500],
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 16,
    color: '#718096',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary[500],
  },
  introText: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 24,
    lineHeight: 24,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A202C',
    marginBottom: 8,
  },
  requiredMark: {
    color: Colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#F7FAFC',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#1A202C',
    fontSize: 16,
  },
  inputIcon: {
    marginLeft: 8,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#F7FAFC',
  },
  dropdownText: {
    color: '#1A202C',
    fontSize: 16,
  },
  dropdownPlaceholder: {
    color: '#A0AEC0',
    fontSize: 16,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F7FAFC',
  },
  textArea: {
    height: 100,
    color: '#1A202C',
    fontSize: 16,
    lineHeight: 24,
  },
  helperText: {
    fontSize: 14,
    color: '#718096',
    marginTop: -8,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
  },
  saveDraftButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  saveDraftButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
  continueButton: {
    flex: 1,
    height: 56,
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  requiredNote: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
});

export default BusinessRegistration1;
