import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
} from 'react-native';
import {
    Ionicons,
    MaterialIcons,
    FontAwesome5,
    Feather,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Colors } from '../constants';

interface BusinessCertificationStatusProps {
    onBack?: () => void;
}

const BusinessCertificationStatus: React.FC<BusinessCertificationStatusProps> = ({
    onBack = () => { },
}) => {
    // Mock data
    const certificationDetails = {
        title: 'Digital Marketing Professional',
        id: 'DMP-2024-001',
        currentStep: 2,
        totalSteps: 3,
        submissionDate: 'Dec 15, 2024',
        reviewDate: 'Dec 22, 2024',
        statusSteps: [
            {
                id: 'submitted',
                label: 'Submitted',
                status: 'completed',
                description: 'Application and documents submitted successfully',
                details: [
                    {
                        text: 'All documents verified',
                        icon: <Ionicons name="checkmark-circle" size={16} color="#10B981" />,
                    },
                    {
                        text: 'Portfolio, resume, and certificates approved',
                        icon: null,
                    },
                ],
                date: 'Dec 15, 2024',
            },
            {
                id: 'under-review',
                label: 'Under Review',
                status: 'in-progress',
                description: 'Expert panel reviewing your application',
                details: [
                    {
                        text: 'Review in progress',
                        icon: <MaterialCommunityIcons name="progress-clock" size={16} color="#F59E0B" />,
                    },
                    {
                        text: 'Expected completion: Dec 22, 2024',
                        icon: null,
                    },
                ],
                date: 'In Progress',
            },
            {
                id: 'approved',
                label: 'Approved',
                status: 'pending',
                description: 'Certificate issued and ready for download',
                details: [
                    {
                        text: 'Awaiting approval',
                        icon: <Ionicons name="ellipse" size={16} color="#A0AEC0" />,
                    },
                    {
                        text: 'Digital certificate will be available here',
                        icon: null,
                    },
                ],
                date: 'Pending',
            },
        ],
        feedback: [
            {
                id: 'portfolio',
                type: 'strength',
                title: 'Strong Portfolio',
                description:
                    'Your portfolio demonstrates excellent project diversity and technical skills.',
                tip: 'Consider adding case studies showing ROI metrics to strengthen your application.',
            },
            {
                id: 'experience',
                type: 'warning',
                title: 'Experience Documentation',
                description: 'Some work experience entries lack detailed descriptions.',
                improvement: 'Add specific achievements and quantifiable results for each role.',
            },
            {
                id: 'skills',
                type: 'suggestion',
                title: 'Skill Enhancement',
                description: 'Consider adding certifications in emerging marketing technologies.',
                suggestion: 'AI marketing tools and automation certifications are highly valued.',
            },
        ],
        additionalInfo: [
            { label: 'Application Date', value: 'December 15, 2024' },
            { label: 'Review Duration', value: '5-7 business days' },
            { label: 'Certification Valid', value: '2 years' },
            { label: 'Renewal Required', value: 'December 2026' },
        ],
    };

    // Status color mapping
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return '#10B981'; // green
            case 'in-progress':
                return '#F59E0B'; // amber
            default:
                return '#A0AEC0'; // gray
        }
    };

    // Icon for status step
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <Ionicons name="checkmark" size={18} color="#fff" />;
            case 'in-progress':
                return <MaterialIcons name="timelapse" size={18} color="#fff" />;
            default:
                return <FontAwesome5 name="trophy" size={14} color="#fff" />;
        }
    };

    // Icon for feedback type
    const getFeedbackIcon = (type: string) => {
        switch (type) {
            case 'strength':
                return <MaterialIcons name="thumb-up" size={20} color="#10B981" />;
            case 'warning':
                return <Ionicons name="warning" size={20} color="#F59E0B" />;
            case 'suggestion':
                return <Ionicons name="bulb" size={20} color="#3B82F6" />;
            default:
                return <MaterialIcons name="info" size={20} color="#3B82F6" />;
        }
    };

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
                    <Text style={styles.headerTitle}>Certification Status</Text>
                    <TouchableOpacity style={styles.menuButton}>
                        <Ionicons name="ellipsis-vertical" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Certification Title Section */}
                <View style={styles.certificationHeader}>
                    <View style={styles.certificationIcon}>
                        <MaterialIcons name="stars" size={24} color="#4F6BED" />
                    </View>
                    <Text style={styles.certificationTitle}>{certificationDetails.title}</Text>
                    <Text style={styles.certificationId}>Certification ID: #{certificationDetails.id}</Text>
                </View>

                {/* Current Status */}
                <View style={styles.statusCard}>
                    <Text style={styles.currentStatusLabel}>Current Status</Text>
                    <View style={styles.statusTag}>
                        <Text style={styles.statusTagText}>Under Review</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                {
                                    width: `${(certificationDetails.currentStep / certificationDetails.totalSteps) * 100}%`,
                                },
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        Step {certificationDetails.currentStep} of {certificationDetails.totalSteps} completed
                    </Text>
                </View>

                {/* Certification Timeline */}
                <View style={styles.timelineSection}>
                    <Text style={styles.sectionTitle}>Certification Timeline</Text>

                    <View style={styles.timeline}>
                        {certificationDetails.statusSteps.map((step, index) => (
                            <View key={step.id} style={styles.timelineItem}>
                                {/* Status circle with connector line */}
                                <View style={styles.timelineIconColumn}>
                                    <View
                                        style={[
                                            styles.timelineIconCircle,
                                            { backgroundColor: getStatusColor(step.status) },
                                        ]}>
                                        {getStatusIcon(step.status)}
                                    </View>
                                    {/* Connector line (not for the last item) */}
                                    {index < certificationDetails.statusSteps.length - 1 && (
                                        <View
                                            style={[
                                                styles.timelineConnector,
                                                {
                                                    backgroundColor:
                                                        index < certificationDetails.currentStep - 1
                                                            ? getStatusColor('completed')
                                                            : '#E2E8F0',
                                                },
                                            ]}
                                        />
                                    )}
                                </View>

                                {/* Status content */}
                                <View
                                    style={[
                                        styles.timelineContent,
                                        step.status === 'in-progress' && styles.activeTimelineContent,
                                    ]}>
                                    <View style={styles.timelineHeader}>
                                        <Text style={styles.timelineTitle}>{step.label}</Text>
                                        <Text style={styles.timelineDate}>{step.date}</Text>
                                    </View>
                                    <Text style={styles.timelineDescription}>{step.description}</Text>

                                    {/* Details list */}
                                    {step.details.map((detail, detailIndex) => (
                                        <View key={detailIndex} style={styles.timelineDetail}>
                                            {detail.icon && <View style={styles.detailIcon}>{detail.icon}</View>}
                                            <Text style={[styles.detailText, !detail.icon && styles.detailTextIndent]}>
                                                {detail.text}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* AI Feedback Section */}
                <TouchableOpacity style={styles.aiFeedbackCard}>
                    <View style={styles.aiFeedbackHeader}>
                        <MaterialIcons name="psychology" size={24} color="#fff" />
                        <Text style={styles.aiFeedbackTitle}>AI Feedback & Tips</Text>
                    </View>
                    <Text style={styles.aiFeedbackSubtitle}>
                        Personalized insights to improve your certification success
                    </Text>
                </TouchableOpacity>

                {/* Feedback Items */}
                {certificationDetails.feedback.map((item) => (
                    <View
                        key={item.id}
                        style={[
                            styles.feedbackItem,
                            item.type === 'strength' && styles.strengthItem,
                            item.type === 'warning' && styles.warningItem,
                            item.type === 'suggestion' && styles.suggestionItem,
                        ]}>
                        <View style={styles.feedbackHeader}>
                            {getFeedbackIcon(item.type)}
                            <Text style={styles.feedbackTitle}>{item.title}</Text>
                        </View>
                        <Text style={styles.feedbackDescription}>{item.description}</Text>

                        {item.tip && (
                            <View style={styles.feedbackTip}>
                                <Text style={styles.tipLabel}>Tip:</Text>
                                <Text style={styles.tipText}>{item.tip}</Text>
                            </View>
                        )}

                        {item.improvement && (
                            <View style={styles.feedbackTip}>
                                <Text style={[styles.tipLabel, styles.improvementLabel]}>Improvement:</Text>
                                <Text style={styles.tipText}>{item.improvement}</Text>
                            </View>
                        )}

                        {item.suggestion && (
                            <View style={styles.feedbackTip}>
                                <Text style={[styles.tipLabel, styles.suggestionLabel]}>Suggestion:</Text>
                                <Text style={styles.tipText}>{item.suggestion}</Text>
                            </View>
                        )}
                    </View>
                ))}

                {/* Additional Information */}
                <View style={styles.additionalInfoSection}>
                    <Text style={styles.sectionTitle}>Additional Information</Text>

                    {certificationDetails.additionalInfo.map((info, index) => (
                        <View key={index} style={styles.infoRow}>
                            <Text style={styles.infoLabel}>{info.label}</Text>
                            <Text style={styles.infoValue}>{info.value}</Text>
                        </View>
                    ))}
                </View>

                {/* Action Buttons */}
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="notifications" size={20} color="#4F6BED" style={styles.actionIcon} />
                    <Text style={styles.actionText}>Enable Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.downloadButton]}>
                    <Feather name="download" size={20} color="#4A5568" style={styles.actionIcon} />
                    <Text style={styles.downloadText}>Download Application Copy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.supportButton}>
                    <Ionicons
                        name="chatbubble-ellipses-outline"
                        size={20}
                        color="#4A5568"
                        style={styles.actionIcon}
                    />
                    <Text style={styles.supportText}>Contact Support</Text>
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
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1A202C',
        flex: 1,
        textAlign: 'center',
    },
    menuButton: {
        padding: 8,
    },
    certificationHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    certificationIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#EDF2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    certificationTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A202C',
        textAlign: 'center',
        marginBottom: 4,
    },
    certificationId: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
    },
    statusCard: {
        backgroundColor: '#EDF2FD',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    currentStatusLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4A5568',
        marginBottom: 8,
    },
    statusTag: {
        alignSelf: 'flex-end',
        backgroundColor: '#FEFCE8',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        marginBottom: 12,
    },
    statusTagText: {
        color: '#F59E0B',
        fontSize: 14,
        fontWeight: '500',
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#E2E8F0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4F6BED',
    },
    progressText: {
        fontSize: 14,
        color: '#4A5568',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: 16,
    },
    timelineSection: {
        marginBottom: 24,
    },
    timeline: {
        paddingLeft: 4,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timelineIconColumn: {
        alignItems: 'center',
        width: 24,
        marginRight: 12,
    },
    timelineIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    timelineConnector: {
        width: 2,
        flex: 1,
        backgroundColor: '#E2E8F0',
        marginTop: 4,
        marginBottom: -24,
        zIndex: 1,
    },
    timelineContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
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
    activeTimelineContent: {
        backgroundColor: '#FFFBEB',
        borderColor: '#FEF3C7',
        borderWidth: 1,
    },
    timelineHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    timelineTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A202C',
    },
    timelineDate: {
        fontSize: 14,
        color: '#718096',
    },
    timelineDescription: {
        fontSize: 14,
        color: '#4A5568',
        marginBottom: 12,
    },
    timelineDetail: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    detailIcon: {
        marginRight: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#4A5568',
        flex: 1,
    },
    detailTextIndent: {
        marginLeft: 24,
    },
    aiFeedbackCard: {
        backgroundColor: '#4F6BED',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    aiFeedbackHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    aiFeedbackTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 8,
    },
    aiFeedbackSubtitle: {
        fontSize: 14,
        color: '#E2E8F0',
        lineHeight: 20,
    },
    feedbackItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
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
    strengthItem: {
        borderLeftWidth: 4,
        borderLeftColor: '#10B981',
    },
    warningItem: {
        borderLeftWidth: 4,
        borderLeftColor: '#F59E0B',
    },
    suggestionItem: {
        borderLeftWidth: 4,
        borderLeftColor: '#3B82F6',
    },
    feedbackHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    feedbackTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A202C',
        marginLeft: 8,
    },
    feedbackDescription: {
        fontSize: 14,
        color: '#4A5568',
        marginBottom: 12,
    },
    feedbackTip: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    tipLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#10B981',
        marginRight: 4,
    },
    improvementLabel: {
        color: '#F59E0B',
    },
    suggestionLabel: {
        color: '#3B82F6',
    },
    tipText: {
        fontSize: 14,
        color: '#4A5568',
        flex: 1,
    },
    additionalInfoSection: {
        marginBottom: 24,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    infoLabel: {
        fontSize: 14,
        color: '#718096',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1A202C',
        textAlign: 'right',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EDF2FD',
        borderRadius: 12,
        paddingVertical: 16,
        marginBottom: 16,
    },
    downloadButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    actionIcon: {
        marginRight: 8,
    },
    actionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4F6BED',
    },
    downloadText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A5568',
    },
    supportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        marginBottom: 16,
    },
    supportText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4A5568',
    },
});

export default BusinessCertificationStatus;
