import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
    Image,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Colors } from '../constants';

interface BusinessRegistration4Props {
    onFinish?: () => void;
    onBack?: () => void;
}

interface SectionData {
    title: string;
    items: {
        label: string;
        value: string;
    }[];
}

interface DocumentData {
    name: string;
    fileType: string;
    fileSize: string;
}

const BusinessRegistration4: React.FC<BusinessRegistration4Props> = ({
    onFinish = () => { },
    onBack = () => { },
}) => {
    // State for checkbox
    const [termsAccepted, setTermsAccepted] = useState(false);

    // Mock data for business information
    const businessInfo: SectionData = {
        title: 'Business Information',
        items: [
            { label: 'Business Name', value: 'TechStart Solutions LLC' },
            { label: 'Business Type', value: 'Limited Liability Company' },
            { label: 'Industry', value: 'Technology Services' },
            { label: 'Registration State', value: 'California' },
        ],
    };

    // Mock data for contact information
    const contactInfo: SectionData = {
        title: 'Contact Information',
        items: [
            { label: 'Email Address', value: 'john@techstart.com' },
            { label: 'Phone Number', value: '+1 (555) 123-4567' },
            { label: 'Address', value: '123 Innovation Drive San Francisco, CA 94105' },
        ],
    };

    // Mock data for owner information
    const ownerInfo: SectionData = {
        title: 'Owner Information',
        items: [
            { label: 'Full Name', value: 'John Michael Smith' },
            { label: 'Title', value: 'CEO & Founder' },
            { label: 'Ownership %', value: '100%' },
            { label: 'SSN', value: '***-**-4567' },
        ],
    };

    // Mock data for uploaded documents
    const documents: DocumentData[] = [
        { name: 'Articles of Organization', fileType: 'PDF', fileSize: '2.4 MB' },
        { name: 'EIN Confirmation', fileType: 'PDF', fileSize: '1.2 MB' },
        { name: 'ID Verification', fileType: 'PDF', fileSize: '3.1 MB' },
    ];

    // Calculate application fee (mock value)
    const applicationFee = 299.0;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}>
                {/* Header with back button */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Business Registration</Text>
                </View>

                {/* Progress section */}
                <View style={styles.statusHeader}>
                    <Text style={styles.stepText}>Step 4 of 4</Text>
                    <Text style={styles.reviewText}>Review & Submit</Text>
                </View>

                {/* Step indicators */}
                <View style={styles.stepsContainer}>
                    <View style={styles.stepItem}>
                        <View style={[styles.stepCircle, styles.completedStep]}>
                            <Ionicons name="checkmark" size={18} color="#fff" />
                        </View>
                        <View style={[styles.stepLine, styles.completedLine]} />
                        <Text style={styles.stepLabel}>Basic Info</Text>
                    </View>

                    <View style={styles.stepItem}>
                        <View style={[styles.stepCircle, styles.completedStep]}>
                            <Ionicons name="checkmark" size={18} color="#fff" />
                        </View>
                        <View style={[styles.stepLine, styles.completedLine]} />
                        <Text style={styles.stepLabel}>Business Details</Text>
                    </View>

                    <View style={styles.stepItem}>
                        <View style={[styles.stepCircle, styles.completedStep]}>
                            <Ionicons name="checkmark" size={18} color="#fff" />
                        </View>
                        <View style={[styles.stepLine, styles.activeLine]} />
                        <Text style={styles.stepLabel}>Documents</Text>
                    </View>

                    <View style={styles.stepItem}>
                        <View style={[styles.stepCircle, styles.activeStep]}>
                            <Text style={styles.activeStepText}>4</Text>
                        </View>
                        <Text style={[styles.stepLabel, styles.activeLabel]}>Review</Text>
                    </View>
                </View>

                {/* Review title */}
                <View style={styles.reviewHeader}>
                    <Text style={styles.reviewTitle}>Review Your Information</Text>
                    <Text style={styles.reviewSubtitle}>
                        Please review all information before submitting your application.
                    </Text>
                </View>

                {/* Business Information */}
                <View style={styles.infoSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{businessInfo.title}</Text>
                        <TouchableOpacity>
                            <Text style={styles.editButton}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoTable}>
                        {businessInfo.items.map((item, index) => (
                            <View key={index} style={styles.infoRow}>
                                <Text style={styles.infoLabel}>{item.label}</Text>
                                <Text style={styles.infoValue}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Contact Information */}
                <View style={styles.infoSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{contactInfo.title}</Text>
                        <TouchableOpacity>
                            <Text style={styles.editButton}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoTable}>
                        {contactInfo.items.map((item, index) => (
                            <View key={index} style={styles.infoRow}>
                                <Text style={styles.infoLabel}>{item.label}</Text>
                                <Text style={styles.infoValue}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Owner Information */}
                <View style={styles.infoSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{ownerInfo.title}</Text>
                        <TouchableOpacity>
                            <Text style={styles.editButton}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoTable}>
                        {ownerInfo.items.map((item, index) => (
                            <View key={index} style={styles.infoRow}>
                                <Text style={styles.infoLabel}>{item.label}</Text>
                                <Text style={styles.infoValue}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Uploaded Documents */}
                <View style={styles.infoSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Uploaded Documents</Text>
                        <TouchableOpacity>
                            <Text style={styles.editButton}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.documentsContainer}>
                        {documents.map((doc, index) => (
                            <View key={index} style={styles.documentItem}>
                                <View style={styles.documentIcon}>
                                    <MaterialCommunityIcons name="file-document-outline" size={24} color="#4F6BED" />
                                </View>
                                <View style={styles.documentInfo}>
                                    <Text style={styles.documentTitle}>{doc.name}</Text>
                                    <Text style={styles.documentMeta}>
                                        {doc.fileType} • {doc.fileSize}
                                    </Text>
                                </View>
                                <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Terms and Conditions */}
                <View style={styles.termsContainer}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        onPress={() => setTermsAccepted(!termsAccepted)}>
                        {termsAccepted ? (
                            <View style={styles.checkboxChecked}>
                                <Ionicons name="checkmark" size={16} color="white" />
                            </View>
                        ) : (
                            <View style={styles.checkboxUnchecked} />
                        )}
                    </TouchableOpacity>
                    <View style={styles.termsText}>
                        <Text style={styles.termsDescription}>
                            I acknowledge that all information provided is accurate and complete. I agree to the{' '}
                            <Text style={styles.termsLink}>Privacy Policy</Text> and{' '}
                            <Text style={styles.termsLink}>Terms of Service</Text>.
                        </Text>
                    </View>
                </View>

                {/* Processing Time */}
                <View style={styles.processingContainer}>
                    <View style={styles.processingHeader}>
                        <View style={styles.processingIcon}>
                            <Ionicons name="time-outline" size={18} color="white" />
                        </View>
                        <Text style={styles.processingTitle}>Processing Time</Text>
                    </View>
                    <Text style={styles.processingText}>
                        Your application will be reviewed within 3-5 business days. You'll receive email updates
                        on the status.
                    </Text>
                </View>

                {/* Application Fee */}
                <View style={styles.feeContainer}>
                    <View>
                        <Text style={styles.feeTitle}>Application Fee</Text>
                        <Text style={styles.feeDescription}>Includes state filing fee and processing</Text>
                    </View>
                    <Text style={styles.feeAmount}>${applicationFee.toFixed(2)}</Text>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.submitButton, !termsAccepted && styles.submitButtonDisabled]}
                    onPress={termsAccepted ? onFinish : undefined}
                    disabled={!termsAccepted}>
                    <Feather name="send" size={20} color="white" style={styles.submitIcon} />
                    <Text style={styles.submitText}>Submit for Approval</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
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
        marginBottom: 16,
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
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepText: {
        fontSize: 16,
        color: '#718096',
        fontWeight: '500',
    },
    reviewText: {
        fontSize: 16,
        color: '#4F6BED',
        fontWeight: '500',
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    stepItem: {
        alignItems: 'center',
        position: 'relative',
        flex: 1,
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E2E8F0',
        marginBottom: 8,
        zIndex: 2,
    },
    completedStep: {
        backgroundColor: '#10B981',
    },
    activeStep: {
        backgroundColor: '#4F6BED',
    },
    stepLine: {
        height: 3,
        backgroundColor: '#E2E8F0',
        position: 'absolute',
        top: 16,
        left: '50%',
        right: 0,
        zIndex: 1,
    },
    completedLine: {
        backgroundColor: '#10B981',
    },
    activeLine: {
        backgroundColor: '#4F6BED',
    },
    stepLabel: {
        fontSize: 12,
        color: '#718096',
        textAlign: 'center',
    },
    activeLabel: {
        color: '#4F6BED',
        fontWeight: '500',
    },
    activeStepText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    reviewHeader: {
        marginBottom: 24,
    },
    reviewTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: 8,
    },
    reviewSubtitle: {
        fontSize: 16,
        color: '#718096',
        lineHeight: 22,
    },
    infoSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1A202C',
    },
    editButton: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4F6BED',
    },
    infoTable: {
        padding: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 15,
        color: '#718096',
        flex: 1,
    },
    infoValue: {
        fontSize: 15,
        color: '#1A202C',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
    },
    documentsContainer: {
        padding: 16,
    },
    documentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    documentIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#EDF2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    documentInfo: {
        flex: 1,
    },
    documentTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1A202C',
        marginBottom: 2,
    },
    documentMeta: {
        fontSize: 13,
        color: '#718096',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    checkbox: {
        padding: 4,
        marginRight: 8,
    },
    checkboxUnchecked: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderColor: '#CBD5E0',
        borderRadius: 4,
    },
    checkboxChecked: {
        width: 22,
        height: 22,
        backgroundColor: '#4F6BED',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    termsText: {
        flex: 1,
    },
    termsDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4A5568',
    },
    termsLink: {
        color: '#4F6BED',
        fontWeight: '500',
    },
    processingContainer: {
        backgroundColor: '#EDF2FD',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    processingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    processingIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4F6BED',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    processingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A202C',
    },
    processingText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4A5568',
    },
    feeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    feeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A202C',
        marginBottom: 2,
    },
    feeDescription: {
        fontSize: 13,
        color: '#718096',
    },
    feeAmount: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A202C',
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4F6BED',
        borderRadius: 12,
        paddingVertical: 16,
        marginBottom: 16,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitIcon: {
        marginRight: 8,
    },
    submitText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
});

export default BusinessRegistration4;
