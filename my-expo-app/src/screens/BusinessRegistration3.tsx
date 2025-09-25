import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Image,
    Platform,
} from 'react-native';
import {
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,
    FontAwesome5,
    Feather,
} from '@expo/vector-icons';
import { Colors } from '../constants';

interface BusinessRegistration3Props {
    onNext?: () => void;
    onBack?: () => void;
}

interface FileInfo {
    name: string;
    size: string;
    status: string;
}

interface DocumentItem {
    id: string;
    name: string;
    description: string;
    required: boolean;
    icon: React.ReactNode;
    status: 'not-uploaded' | 'uploaded';
    fileInfo?: FileInfo | FileInfo[];
}

const BusinessRegistration3: React.FC<BusinessRegistration3Props> = ({
    onNext = () => { },
    onBack = () => { },
}) => {
    // Document state
    const [documents, setDocuments] = useState<DocumentItem[]>([
        {
            id: 'business-license',
            name: 'Business License',
            description: 'Required document',
            required: true,
            icon: <MaterialIcons name="stars" size={24} color="#4299E1" />,
            status: 'not-uploaded',
        },
        {
            id: 'tax-registration',
            name: 'Tax Registration',
            description: 'EIN or Tax ID document',
            required: true,
            icon: <MaterialIcons name="description" size={24} color="#F6AD55" />,
            status: 'uploaded',
            fileInfo: {
                name: 'tax-registration-2024.pdf',
                size: '2.3 MB',
                status: 'Uploaded',
            },
        },
        {
            id: 'insurance',
            name: 'Insurance Certificate',
            description: 'General liability insurance',
            required: false,
            icon: <MaterialIcons name="verified-user" size={24} color="#805AD5" />,
            status: 'not-uploaded',
        },
        {
            id: 'bank-statement',
            name: 'Bank Statement',
            description: 'Recent 3-month statement',
            required: true,
            icon: <MaterialIcons name="account-balance" size={24} color="#48BB78" />,
            status: 'uploaded',
            fileInfo: [
                {
                    name: 'statement-jan-2024.pdf',
                    size: '1.8 MB',
                    status: 'Uploaded',
                },
                {
                    name: 'statement-feb-2024.pdf',
                    size: '2.1 MB',
                    status: 'Uploaded',
                },
            ],
        },
    ]);

    // Calculate uploaded documents
    const uploadedDocumentsCount = documents.filter((doc) => doc.status === 'uploaded').length;
    const totalRequiredDocuments = documents.length;
    const progressPercentage = Math.round((uploadedDocumentsCount / totalRequiredDocuments) * 100);

    // Handle file upload
    const handleChooseFile = (documentId: string) => {
        // This would typically open a file picker
        console.log(`Opening file picker for ${documentId}`);
        // For demonstration purposes, we'll just toggle the status
        setDocuments((docs) =>
            docs.map((doc) =>
                doc.id === documentId
                    ? {
                        ...doc,
                        status: 'uploaded',
                        fileInfo: {
                            name: `${doc.id}-example.pdf`,
                            size: '1.5 MB',
                            status: 'Uploaded',
                        },
                    }
                    : doc
            )
        );
    };

    // Handle adding more files
    const handleAddMoreFiles = (documentId: string) => {
        console.log(`Adding more files to ${documentId}`);
    };

    // Handle file deletion
    const handleDeleteFile = (documentId: string, fileName?: string) => {
        console.log(`Deleting file ${fileName} from ${documentId}`);

        setDocuments((docs) =>
            docs.map((doc) => {
                if (doc.id === documentId) {
                    if (Array.isArray(doc.fileInfo)) {
                        const updatedFiles = doc.fileInfo.filter((file) => file.name !== fileName);
                        return {
                            ...doc,
                            fileInfo: updatedFiles.length > 0 ? updatedFiles : undefined,
                            status: updatedFiles.length > 0 ? 'uploaded' : 'not-uploaded',
                        };
                    } else {
                        return {
                            ...doc,
                            fileInfo: undefined,
                            status: 'not-uploaded',
                        };
                    }
                }
                return doc;
            })
        );
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
                    <Text style={styles.headerTitle}>Business Registration</Text>
                </View>

                {/* Progress section */}
                <View style={styles.progressSection}>
                    <Text style={styles.progressText}>Step 3 of 4</Text>
                    <Text style={styles.progressPercentage}>75% Complete</Text>
                </View>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: '75%' }]} />
                </View>

                {/* Step indicators */}
                <View style={styles.stepsIndicator}>
                    <View style={styles.stepItem}>
                        <View style={[styles.stepCircle, styles.stepComplete]}>
                            <Ionicons name="checkmark" size={20} color="#fff" />
                        </View>
                        <Text style={styles.stepLabel}>Info</Text>
                    </View>
                    <View style={styles.stepItem}>
                        <View style={[styles.stepCircle, styles.stepComplete]}>
                            <Ionicons name="checkmark" size={20} color="#fff" />
                        </View>
                        <Text style={styles.stepLabel}>Details</Text>
                    </View>
                    <View style={styles.stepItem}>
                        <View style={[styles.stepCircle, styles.stepCurrent]}>
                            <Text style={styles.stepNumberText}>3</Text>
                        </View>
                        <Text style={[styles.stepLabel, styles.currentStepLabel]}>Documents</Text>
                    </View>
                    <View style={styles.stepItem}>
                        <View style={styles.stepCircle}>
                            <Text style={styles.stepNumberText}>4</Text>
                        </View>
                        <Text style={styles.stepLabel}>Review</Text>
                    </View>
                </View>

                {/* Document upload section */}
                <View style={styles.documentSection}>
                    <Text style={styles.sectionTitle}>Upload Certifications</Text>
                    <Text style={styles.sectionDescription}>
                        Upload your business certifications and required documents. All files should be clear,
                        legible, and in PDF or image format.
                    </Text>

                    {/* Upload tips */}
                    <View style={styles.tipBox}>
                        <View style={styles.tipHeader}>
                            <Ionicons name="bulb" size={24} color={Colors.primary[500]} />
                            <Text style={styles.tipTitle}>Upload Tips</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Ionicons
                                name="checkmark"
                                size={16}
                                color={Colors.primary[500]}
                                style={styles.tipIcon}
                            />
                            <Text style={styles.tipText}>Use high-quality scans or photos</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Ionicons
                                name="checkmark"
                                size={16}
                                color={Colors.primary[500]}
                                style={styles.tipIcon}
                            />
                            <Text style={styles.tipText}>Ensure all text is clearly readable</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Ionicons
                                name="checkmark"
                                size={16}
                                color={Colors.primary[500]}
                                style={styles.tipIcon}
                            />
                            <Text style={styles.tipText}>Maximum file size: 10MB per document</Text>
                        </View>
                    </View>

                    {/* Document list */}
                    {documents.map((doc) => (
                        <View key={doc.id} style={styles.documentItem}>
                            <View style={styles.documentHeader}>
                                <View style={styles.documentInfo}>
                                    {doc.icon}
                                    <View style={styles.documentTitles}>
                                        <Text style={styles.documentName}>{doc.name}</Text>
                                        <Text style={styles.documentDescription}>{doc.description}</Text>
                                    </View>
                                </View>
                                {doc.required && (
                                    <View style={styles.requiredTag}>
                                        <Text style={styles.requiredText}>Required</Text>
                                    </View>
                                )}
                                {!doc.required && (
                                    <View style={styles.optionalTag}>
                                        <Text style={styles.optionalText}>Optional</Text>
                                    </View>
                                )}
                            </View>

                            {doc.status === 'not-uploaded' ? (
                                <View style={styles.uploadContainer}>
                                    <View style={styles.uploadPlaceholder}>
                                        <Feather
                                            name="upload-cloud"
                                            size={24}
                                            color="#A0AEC0"
                                            style={styles.uploadIcon}
                                        />
                                        <Text style={styles.uploadText}>
                                            Tap to upload your {doc.name.toLowerCase()}
                                        </Text>
                                        <Text style={styles.fileTypeText}>PDF, JPG, PNG up to 10MB</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.chooseFileButton}
                                        onPress={() => handleChooseFile(doc.id)}>
                                        <Text style={styles.chooseFileText}>Choose File</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.uploadedFilesContainer}>
                                    {/* Handle both single file and array of files */}
                                    {Array.isArray(doc.fileInfo) ? (
                                        doc.fileInfo.map((file) => (
                                            <View key={file.name} style={styles.uploadedFile}>
                                                <View style={styles.fileDetails}>
                                                    <MaterialIcons name="insert-drive-file" size={20} color="#4A5568" />
                                                    <View style={styles.fileInfo}>
                                                        <Text style={styles.fileName}>{file.name}</Text>
                                                        <Text style={styles.fileSize}>
                                                            {file.size} • {file.status}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={styles.fileActions}>
                                                    {doc.id === 'bank-statement' && (
                                                        <TouchableOpacity
                                                            style={styles.fileActionButton}
                                                            onPress={() => handleDeleteFile(doc.id, file.name)}>
                                                            <Feather name="trash-2" size={18} color="#A0AEC0" />
                                                        </TouchableOpacity>
                                                    )}
                                                </View>
                                            </View>
                                        ))
                                    ) : doc.fileInfo ? (
                                        <View style={styles.uploadedFile}>
                                            <View style={styles.fileDetails}>
                                                <MaterialIcons name="insert-drive-file" size={20} color="#4A5568" />
                                                <View style={styles.fileInfo}>
                                                    <Text style={styles.fileName}>{doc.fileInfo.name}</Text>
                                                    <Text style={styles.fileSize}>
                                                        {doc.fileInfo.size} • {doc.fileInfo.status}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.fileActions}>
                                                <Ionicons name="checkmark-circle" size={20} color="#48BB78" />
                                                <TouchableOpacity
                                                    style={styles.fileActionButton}
                                                    onPress={() =>
                                                        handleDeleteFile(
                                                            doc.id,
                                                            !Array.isArray(doc.fileInfo) ? doc.fileInfo?.name : undefined
                                                        )
                                                    }>
                                                    <Feather name="trash-2" size={18} color="#A0AEC0" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ) : null}

                                    {doc.id === 'bank-statement' && (
                                        <TouchableOpacity
                                            style={styles.addMoreButton}
                                            onPress={() => handleAddMoreFiles(doc.id)}>
                                            <Ionicons name="add" size={20} color="#718096" />
                                            <Text style={styles.addMoreText}>Add more files</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </View>
                    ))}

                    {/* Upload progress */}
                    <View style={styles.progressBox}>
                        <View style={styles.progressHeader}>
                            <View style={styles.progressIcon}>
                                <Ionicons name="checkmark" size={20} color="#fff" />
                            </View>
                            <Text style={styles.progressTitle}>Upload Progress</Text>
                            <Text style={styles.progressValue}>{progressPercentage}%</Text>
                        </View>
                        <Text style={styles.progressStatus}>
                            {uploadedDocumentsCount} of {totalRequiredDocuments} documents uploaded
                        </Text>
                        <View style={styles.progressMeterContainer}>
                            <View style={[styles.progressMeter, { width: `${progressPercentage}%` }]} />
                        </View>
                    </View>
                </View>

                {/* Button row */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.saveDraftButton}>
                        <Text style={styles.saveDraftButtonText}>Save Draft</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.continueButton} onPress={onNext}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                        <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 4 }} />
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
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    stepLabel: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
    },
    currentStepLabel: {
        color: Colors.primary[500],
        fontWeight: '500',
    },
    documentSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 16,
        color: '#718096',
        lineHeight: 22,
        marginBottom: 16,
    },
    tipBox: {
        backgroundColor: '#EBF8FF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary[500],
        marginLeft: 8,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    tipIcon: {
        marginRight: 8,
    },
    tipText: {
        fontSize: 14,
        color: '#4A5568',
        lineHeight: 20,
    },
    documentItem: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        overflow: 'hidden',
    },
    documentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#F7FAFC',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    documentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    documentTitles: {
        marginLeft: 12,
    },
    documentName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A202C',
    },
    documentDescription: {
        fontSize: 14,
        color: '#718096',
    },
    requiredTag: {
        backgroundColor: '#FED7D7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    requiredText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#E53E3E',
    },
    optionalTag: {
        backgroundColor: '#FEEBC8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    optionalText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#DD6B20',
    },
    uploadContainer: {
        padding: 16,
        alignItems: 'center',
    },
    uploadPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        width: '100%',
    },
    uploadIcon: {
        marginBottom: 12,
    },
    uploadText: {
        fontSize: 16,
        color: '#718096',
        textAlign: 'center',
        marginBottom: 4,
    },
    fileTypeText: {
        fontSize: 14,
        color: '#A0AEC0',
        textAlign: 'center',
    },
    chooseFileButton: {
        backgroundColor: Colors.primary[500],
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 16,
    },
    chooseFileText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    uploadedFilesContainer: {
        padding: 16,
    },
    uploadedFile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    fileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    fileInfo: {
        marginLeft: 12,
    },
    fileName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2D3748',
    },
    fileSize: {
        fontSize: 12,
        color: '#718096',
    },
    fileActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileActionButton: {
        marginLeft: 12,
        padding: 4,
    },
    addMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#CBD5E0',
        borderRadius: 8,
        marginTop: 8,
    },
    addMoreText: {
        fontSize: 14,
        color: '#718096',
        marginLeft: 8,
    },
    progressBox: {
        backgroundColor: '#F7FAFC',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        marginBottom: 24,
    },
    progressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#48BB78',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        flex: 1,
    },
    progressValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#48BB78',
    },
    progressStatus: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 12,
    },
    progressMeterContainer: {
        height: 8,
        backgroundColor: '#E2E8F0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressMeter: {
        height: '100%',
        backgroundColor: '#48BB78',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
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
});

export default BusinessRegistration3;
