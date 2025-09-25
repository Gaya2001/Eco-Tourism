import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants';

interface ServiceCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    services: Service[];
}

interface Service {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
}

interface BusinessRegistration2Props {
    onNext?: () => void;
    onBack?: () => void;
}

const BusinessRegistration2: React.FC<BusinessRegistration2Props> = ({
    onNext = () => { },
    onBack = () => { },
}) => {
    // State for selected services
    const [selectedServices, setSelectedServices] = useState<string[]>([
        'eco-lodging',
        'eco-cabins',
        'organic-meals',
        'local-cuisine',
        'eco-cycling',
        'waste-management',
    ]);

    // Prepare service categories
    const serviceCategories: ServiceCategory[] = [
        {
            id: 'accommodation',
            title: 'Accommodation',
            icon: <MaterialIcons name="hotel" size={24} color={Colors.primary[500]} />,
            services: [
                {
                    id: 'eco-lodging',
                    name: 'Eco-Lodging',
                    description: 'Sustainable accommodation with minimal environmental impact',
                    icon: <Ionicons name="leaf" size={20} color={Colors.primary[500]} />,
                },
                {
                    id: 'glamping',
                    name: 'Glamping',
                    description: 'Luxury camping experience in nature',
                    icon: <MaterialCommunityIcons name="tent" size={20} color={Colors.primary[500]} />,
                },
                {
                    id: 'eco-cabins',
                    name: 'Eco-Cabins',
                    description: 'Self-contained sustainable cabins',
                    icon: <MaterialIcons name="house" size={20} color={Colors.primary[500]} />,
                },
            ],
        },
        {
            id: 'food',
            title: 'Food & Dining',
            icon: <MaterialIcons name="restaurant" size={24} color={Colors.primary[500]} />,
            services: [
                {
                    id: 'organic-meals',
                    name: 'Organic Meals',
                    description: 'Farm-to-table dining with organic ingredients',
                    icon: <MaterialIcons name="eco" size={20} color={Colors.primary[500]} />,
                },
                {
                    id: 'vegan-options',
                    name: 'Vegan Options',
                    description: 'Plant-based meal options available',
                    icon: <MaterialCommunityIcons name="food-apple" size={20} color={Colors.primary[500]} />,
                },
                {
                    id: 'local-cuisine',
                    name: 'Local Cuisine',
                    description: 'Traditional dishes from local ingredients',
                    icon: <MaterialCommunityIcons name="food" size={20} color={Colors.primary[500]} />,
                },
            ],
        },
        {
            id: 'activities',
            title: 'Activities & Experiences',
            icon: <MaterialCommunityIcons name="hiking" size={24} color={Colors.primary[500]} />,
            services: [
                {
                    id: 'guided-nature-tours',
                    name: 'Guided Nature Tours',
                    description: 'Expert-led exploration of local ecosystems',
                    icon: (
                        <MaterialCommunityIcons name="nature-people" size={20} color={Colors.primary[500]} />
                    ),
                },
                {
                    id: 'eco-cycling-tours',
                    name: 'Eco-Cycling Tours',
                    description: 'Sustainable cycling adventures',
                    icon: <MaterialIcons name="pedal-bike" size={20} color={Colors.primary[500]} />,
                },
                {
                    id: 'water-activities',
                    name: 'Water Activities',
                    description: 'Kayaking, swimming, and water sports',
                    icon: <MaterialCommunityIcons name="water" size={20} color={Colors.primary[500]} />,
                },
            ],
        },
        {
            id: 'wellness',
            title: 'Wellness & Sustainability',
            icon: <MaterialIcons name="spa" size={24} color={Colors.primary[500]} />,
            services: [
                {
                    id: 'yoga-meditation',
                    name: 'Yoga & Meditation',
                    description: 'Mindfulness sessions in natural settings',
                    icon: <MaterialCommunityIcons name="yoga" size={20} color={Colors.primary[500]} />,
                },
                {
                    id: 'waste-management',
                    name: 'Waste Management',
                    description: 'Comprehensive recycling and composting programs',
                    icon: <MaterialCommunityIcons name="recycle" size={20} color={Colors.primary[500]} />,
                },
                {
                    id: 'renewable-energy',
                    name: 'Renewable Energy',
                    description: 'Solar, wind, or other sustainable energy sources',
                    icon: <MaterialCommunityIcons name="solar-power" size={20} color={Colors.primary[500]} />,
                },
            ],
        },
    ];

    // Calculate the total number of selected services
    const selectedCount = selectedServices.length;

    // Progress percentage (2 of 4 steps = 50%)
    const progressPercentage = 50;

    // Toggle service selection
    const toggleService = (serviceId: string) => {
        if (selectedServices.includes(serviceId)) {
            setSelectedServices(selectedServices.filter((id) => id !== serviceId));
        } else {
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header with back button */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Business Registration</Text>
                </View>

                {/* Progress section */}
                <View style={styles.progressSection}>
                    <Text style={styles.progressText}>Step 2 of 4</Text>
                    <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
                </View>

                {/* Step indicators */}
                <View style={styles.stepsIndicator}>
                    <View style={styles.stepItem}>
                        <View style={[styles.stepCircle, styles.stepComplete]}>
                            <Ionicons name="checkmark" size={20} color="#fff" />
                        </View>
                        <Text style={styles.stepLabel}>Basic Info</Text>
                    </View>
                    <View style={styles.stepItem}>
                        <View style={[styles.stepCircle, styles.stepCurrent]}>
                            <Text style={styles.stepNumberText}>2</Text>
                        </View>
                        <Text style={styles.stepLabel}>Services</Text>
                    </View>
                    <View style={styles.stepItem}>
                        <View style={styles.stepCircle}>
                            <Text style={styles.stepNumberText}>3</Text>
                        </View>
                        <Text style={styles.stepLabel}>Verification</Text>
                    </View>
                    <View style={styles.stepItem}>
                        <View style={styles.stepCircle}>
                            <Text style={styles.stepNumberText}>4</Text>
                        </View>
                        <Text style={styles.stepLabel}>Complete</Text>
                    </View>
                </View>

                {/* Services section title */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Services Offered</Text>
                    <Text style={styles.sectionSubtitle}>
                        Select all the services your business provides to guests.
                    </Text>
                </View>

                {/* Service Categories */}
                <View style={styles.serviceCategories}>
                    {serviceCategories.map((category) => (
                        <View key={category.id} style={styles.categorySection}>
                            <View style={styles.categoryHeader}>
                                {category.icon}
                                <Text style={styles.categoryTitle}>{category.title}</Text>
                            </View>

                            {category.services.map((service) => (
                                <TouchableOpacity
                                    key={service.id}
                                    style={styles.serviceItem}
                                    onPress={() => toggleService(service.id)}>
                                    <View style={styles.checkboxContainer}>
                                        <View
                                            style={[
                                                styles.checkbox,
                                                selectedServices.includes(service.id) && styles.checkboxChecked,
                                            ]}>
                                            {selectedServices.includes(service.id) && (
                                                <Ionicons name="checkmark" size={16} color="#fff" />
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.serviceIconContainer}>{service.icon}</View>
                                    <View style={styles.serviceTextContainer}>
                                        <Text style={styles.serviceName}>{service.name}</Text>
                                        <Text style={styles.serviceDescription}>{service.description}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}

                            {/* Divider after each category except the last one */}
                            {category.id !== 'wellness' && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>

                {/* Selected Services Counter */}
                <TouchableOpacity style={styles.selectedServicesButton}>
                    <View style={styles.selectedServicesContainer}>
                        <Text style={styles.selectedServicesTitle}>Selected Services</Text>
                        <Text style={styles.selectedServicesCount}>{selectedCount}</Text>
                    </View>
                    <View style={styles.checkmarkCircle}>
                        <Ionicons name="checkmark" size={24} color="#fff" />
                    </View>
                </TouchableOpacity>

                {/* Button row */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.backButton2} onPress={onBack}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.continueButton} onPress={onNext}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 16,
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
        color: '#718096',
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
    stepsIndicator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    stepItem: {
        alignItems: 'center',
        flex: 1,
    },
    stepCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    stepComplete: {
        backgroundColor: Colors.primary[500],
    },
    stepCurrent: {
        backgroundColor: Colors.primary[500],
    },
    stepNumberText: {
        color: '#718096',
        fontSize: 16,
        fontWeight: '600',
    },
    stepLabel: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
    },
    sectionHeader: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1A202C',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#718096',
        lineHeight: 22,
    },
    serviceCategories: {
        marginBottom: 24,
    },
    categorySection: {
        marginBottom: 16,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A202C',
        marginLeft: 8,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    checkboxContainer: {
        marginRight: 12,
        marginTop: 2,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#CBD5E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: Colors.primary[500],
        borderColor: Colors.primary[500],
    },
    serviceIconContainer: {
        marginRight: 12,
        marginTop: 2,
    },
    serviceTextContainer: {
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1A202C',
        marginBottom: 4,
    },
    serviceDescription: {
        fontSize: 14,
        color: '#718096',
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 16,
    },
    selectedServicesButton: {
        backgroundColor: Colors.primary[500],
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginBottom: 24,
    },
    selectedServicesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedServicesTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    selectedServicesCount: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    checkmarkCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 45,
    },
    backButton2: {
        flex: 1,
        height: 56,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    backButtonText: {
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
        marginLeft: 8,
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default BusinessRegistration2;
