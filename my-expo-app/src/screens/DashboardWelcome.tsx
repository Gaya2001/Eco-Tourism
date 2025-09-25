import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
    Platform,
} from 'react-native';
import {
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5,
    Feather,
} from '@expo/vector-icons';
import { Colors } from '../constants';

interface ProfileCompletionSectionProps {
    completionPercentage: number;
    companyInfoComplete: boolean;
    certificationsStatus: string;
    documentsStatus: string;
}

const ProfileCompletionSection: React.FC<ProfileCompletionSectionProps> = ({
    completionPercentage,
    companyInfoComplete,
    certificationsStatus,
    documentsStatus,
}) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.statusHeaderContainer}>
                <Text style={styles.sectionTitle}>Eco-Profile Status</Text>
                <View style={styles.statusIndicator}>
                    <View style={styles.activeDot} />
                    <Text style={styles.activeText}>Active</Text>
                </View>
            </View>

            <View style={styles.profileCompletion}>
                <View style={styles.completionHeader}>
                    <Text style={styles.completionLabel}>Profile Completion</Text>
                    <Text style={styles.completionPercentage}>{completionPercentage}%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${completionPercentage}%` }]} />
                </View>
            </View>

            <View style={styles.statusIconsContainer}>
                <View style={styles.statusItem}>
                    <View style={[styles.iconContainer, styles.completeIconContainer]}>
                        <MaterialIcons name="business" size={24} color={Colors.primary[500]} />
                    </View>
                    <Text style={styles.statusLabel}>Company Info</Text>
                    <Text style={styles.statusComplete}>Complete</Text>
                </View>

                <View style={styles.statusItem}>
                    <View style={[styles.iconContainer, styles.pendingIconContainer]}>
                        <Ionicons name="sunny" size={24} color="#F59E0B" />
                    </View>
                    <Text style={styles.statusLabel}>Certifications</Text>
                    <Text style={styles.statusPending}>Pending</Text>
                </View>

                <View style={styles.statusItem}>
                    <View style={[styles.iconContainer, styles.incompleteIconContainer]}>
                        <MaterialIcons name="description" size={24} color="#9CA3AF" />
                    </View>
                    <Text style={styles.statusLabel}>Documents</Text>
                    <Text style={styles.statusIncomplete}>Incomplete</Text>
                </View>
            </View>
        </View>
    );
};

interface CertificationProgressProps {
    steps: {
        title: string;
        description: string;
        status: 'completed' | 'in-review' | 'pending';
    }[];
}

const CertificationProgress: React.FC<CertificationProgressProps> = ({ steps }) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <View style={styles.completedStepIcon}>
                        <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                );
            case 'in-review':
                return (
                    <View style={styles.inReviewStepIcon}>
                        <Ionicons name="time" size={16} color="#fff" />
                    </View>
                );
            case 'pending':
                return (
                    <View style={styles.pendingStepIcon}>
                        <Ionicons name="ellipsis-horizontal" size={16} color="#D1D5DB" />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.certificationHeader}>
                <Text style={styles.sectionTitle}>Certification Progress</Text>
                <View style={styles.inReviewBadge}>
                    <Text style={styles.inReviewText}>In Review</Text>
                </View>
            </View>

            <View style={styles.certificationSteps}>
                {steps.map((step, index) => (
                    <View key={index} style={styles.certificationStep}>
                        {getStatusIcon(step.status)}
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>{step.title}</Text>
                            <Text style={styles.stepDescription}>{step.description}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

interface CertificationCardProps {
    type: 'iso14001' | 'bcorp' | 'leed' | 'new';
    status: 'approved' | 'pending' | 'rejected' | 'add';
    title: string;
    description: string;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
    type,
    status,
    title,
    description,
}) => {
    const renderIcon = () => {
        switch (type) {
            case 'iso14001':
                return (
                    <View style={[styles.certificationIcon, styles.approvedIcon]}>
                        <FontAwesome5 name="certificate" size={20} color={Colors.primary[500]} />
                    </View>
                );
            case 'bcorp':
                return (
                    <View style={[styles.certificationIcon, styles.pendingIcon]}>
                        <MaterialCommunityIcons name="clock-outline" size={24} color="#F59E0B" />
                    </View>
                );
            case 'leed':
                return (
                    <View style={[styles.certificationIcon, styles.rejectedIcon]}>
                        <Ionicons name="close" size={22} color="#EF4444" />
                    </View>
                );
            case 'new':
                return (
                    <View style={[styles.certificationIcon, styles.newIcon]}>
                        <Ionicons name="add" size={24} color="#9CA3AF" />
                    </View>
                );
            default:
                return null;
        }
    };

    const renderStatus = () => {
        switch (status) {
            case 'approved':
                return <Text style={styles.statusApproved}>Approved</Text>;
            case 'pending':
                return <Text style={styles.statusPending}>Pending</Text>;
            case 'rejected':
                return <Text style={styles.statusRejected}>Rejected</Text>;
            case 'add':
                return null;
            default:
                return null;
        }
    };

    return (
        <View style={[styles.certificationCard, type === 'new' && styles.addNewCard]}>
            {renderIcon()}
            <View style={styles.certificationCardContent}>
                <Text style={styles.certificationTitle}>{title}</Text>
                <Text style={styles.certificationDesc}>{description}</Text>
            </View>
            {renderStatus()}
        </View>
    );
};

interface QuickActionProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, description, onPress }) => {
    return (
        <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
            <View style={styles.quickActionIcon}>{icon}</View>
            <View style={styles.quickActionContent}>
                <Text style={styles.quickActionTitle}>{title}</Text>
                <Text style={styles.quickActionDescription}>{description}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
        </TouchableOpacity>
    );
};

const BottomTabBar: React.FC = () => {
    return (
        <View style={styles.bottomTabBar}>
            <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="home" size={24} color={Colors.primary[500]} />
                <Text style={styles.activeTabText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="sunny-outline" size={24} color="#9CA3AF" />
                <Text style={styles.tabText}>Certifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="document-text-outline" size={24} color="#9CA3AF" />
                <Text style={styles.tabText}>Documents</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="settings-outline" size={24} color="#9CA3AF" />
                <Text style={styles.tabText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const DashboardWelcome: React.FC = () => {
    const certificationSteps = [
        {
            title: 'Application Submitted',
            description: 'Completed on Dec 15, 2024',
            status: 'completed' as const,
        },
        {
            title: 'Document Review',
            description: 'Expected completion: Dec 22, 2024',
            status: 'in-review' as const,
        },
        {
            title: 'Final Approval',
            description: 'Pending previous step',
            status: 'pending' as const,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="leaf" size={20} color="#fff" />
                    </View>
                    <View>
                        <Text style={styles.appTitle}>EcoBiz</Text>
                        <Text style={styles.appSubtitle}>Dashboard</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.avatarButton}>
                        <Image
                            source={require('../../assets/profileSarah.png')} 

                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Welcome Banner */}
            <View style={styles.welcomeBanner}>
                <Text style={styles.welcomeTitle}>Welcome back, Sarah!</Text>
                <Text style={styles.welcomeSubtitle}>Let's continue building your eco-profile</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                {/* Profile Completion Card */}
                <ProfileCompletionSection
                    completionPercentage={75}
                    companyInfoComplete={true}
                    certificationsStatus="pending"
                    documentsStatus="incomplete"
                />

                {/* Certification Progress */}
                <CertificationProgress steps={certificationSteps} />

                {/* Your Certifications Section */}
                <Text style={styles.sectionHeader}>Your Certifications</Text>

                {/* Certifications Grid */}
                <View style={styles.certificationsGrid}>
                    <View style={styles.certificationsRow}>
                        <CertificationCard
                            type="iso14001"
                            status="approved"
                            title="ISO 14001"
                            description="Environmental Management"
                        />
                        <CertificationCard
                            type="bcorp"
                            status="pending"
                            title="B Corp"
                            description="Social Impact"
                        />
                    </View>
                    <View style={styles.certificationsRow}>
                        <CertificationCard
                            type="leed"
                            status="rejected"
                            title="LEED"
                            description="Green Building"
                        />
                        <CertificationCard
                            type="new"
                            status="add"
                            title="Add New"
                            description="Apply for certification"
                        />
                    </View>
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionHeader}>Quick Actions</Text>

                <View style={styles.quickActionsContainer}>
                    <QuickAction
                        icon={<Ionicons name="person" size={24} color="#fff" />}
                        title="Update Profile"
                        description="Complete missing information"
                        onPress={() => { }}
                    />
                    <QuickAction
                        icon={<Ionicons name="cloud-upload-outline" size={24} color="#fff" />}
                        title="Upload Documents"
                        description="Add certification files"
                        onPress={() => { }}
                    />
                    <QuickAction
                        icon={<Ionicons name="bar-chart" size={24} color="#fff" />}
                        title="View Analytics"
                        description="Track your eco-impact"
                        onPress={() => { }}
                    />
                </View>
            </ScrollView>

            {/* Bottom Tab Navigation */}
            <BottomTabBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: Colors.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    appTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    appSubtitle: {
        fontSize: 12,
        color: '#6b7280',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationButton: {
        marginRight: 16,
    },
    avatarButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    welcomeBanner: {
        backgroundColor: Colors.primary[500],
        padding: 16,
        paddingBottom: 20,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: '#e6f2e9',
        marginTop: 4,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    statusHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.primary[500],
        marginRight: 6,
    },
    activeText: {
        fontSize: 14,
        color: Colors.primary[500],
        fontWeight: '500',
    },
    profileCompletion: {
        marginBottom: 20,
    },
    completionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    completionLabel: {
        fontSize: 14,
        color: '#666',
    },
    completionPercentage: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.primary[500],
        borderRadius: 4,
    },
    statusIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
    },
    statusItem: {
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    completeIconContainer: {
        backgroundColor: '#ecfdf5',
    },
    pendingIconContainer: {
        backgroundColor: '#fffbeb',
    },
    incompleteIconContainer: {
        backgroundColor: '#f3f4f6',
    },
    statusLabel: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    statusComplete: {
        fontSize: 12,
        color: Colors.primary[500],
        fontWeight: '500',
    },
    statusPending: {
        fontSize: 12,
        color: '#f59e0b',
        fontWeight: '500',
    },
    statusIncomplete: {
        fontSize: 12,
        color: '#9ca3af',
        fontWeight: '500',
    },
    certificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    inReviewBadge: {
        backgroundColor: '#fef3c7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    inReviewText: {
        fontSize: 12,
        color: '#d97706',
        fontWeight: '500',
    },
    certificationSteps: {
        marginTop: 8,
    },
    certificationStep: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    completedStepIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    inReviewStepIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f59e0b',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    pendingStepIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 2,
    },
    stepDescription: {
        fontSize: 14,
        color: '#6b7280',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 24,
        marginBottom: 16,
        marginHorizontal: 16,
    },
    certificationsGrid: {
        paddingHorizontal: 16,
    },
    certificationsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    certificationCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        width: '48%',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    addNewCard: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#d1d5db',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    certificationIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    approvedIcon: {
        backgroundColor: '#ecfdf5',
    },
    pendingIcon: {
        backgroundColor: '#fffbeb',
    },
    rejectedIcon: {
        backgroundColor: '#fef2f2',
    },
    newIcon: {
        backgroundColor: '#f3f4f6',
    },
    certificationCardContent: {
        flex: 1,
    },
    certificationTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    certificationDesc: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 8,
    },
    statusApproved: {
        fontSize: 12,
        color: Colors.primary[500],
        fontWeight: '500',
        alignSelf: 'flex-start',
    },
    statusRejected: {
        fontSize: 12,
        color: '#ef4444',
        fontWeight: '500',
        alignSelf: 'flex-start',
    },
    quickActionsContainer: {
        marginHorizontal: 16,
    },
    quickActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    quickActionIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    quickActionContent: {
        flex: 1,
    },
    quickActionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    quickActionDescription: {
        fontSize: 14,
        color: '#6b7280',
    },
    bottomTabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop: 12,
        paddingBottom: 50, // Extra padding for iPhone devices with home indicator
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTabText: {
        fontSize: 12,
        color: Colors.primary[500],
        marginTop: 4,
    },
    tabText: {
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 4,
    },
});

export default DashboardWelcome;
