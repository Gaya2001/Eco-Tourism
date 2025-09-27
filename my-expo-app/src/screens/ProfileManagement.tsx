import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Image,
    TextInput,
    Switch,
    Platform,
} from 'react-native';
import {
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,
    Feather,
    FontAwesome5,
} from '@expo/vector-icons';

interface ProfileManagementProps {
    onBack?: () => void;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ onBack = () => { } }) => {
    // State for form fields
    const [companyName, setCompanyName] = useState('Tech Solutions Inc.');
    const [businessType, setBusinessType] = useState('Technology Services');
    const [email, setEmail] = useState('contact@techsolutions.com');
    const [phone, setPhone] = useState('+1 (555) 123-4567');
    const [address, setAddress] = useState('123 Business Ave, Suite 100 New York, NY 10001');
    const [description, setDescription] = useState(
        'Leading technology solutions provider specializing in digital transformation and enterprise software development.'
    );
    const [website, setWebsite] = useState('https://www.yourwebsite.com');
    const [linkedin, setLinkedin] = useState('https://linkedin.com/company/yourcompany');
    const [twitter, setTwitter] = useState('https://twitter.com/yourcompany');

    // State for profile image and gallery
    const [profileImage, setProfileImage] = useState(null);
    const [gallery, setGallery] = useState([
        { id: 1, uri: null }, // Placeholder for adding new image
        { id: 2, uri: require('../../assets/profilemanageImgGallery1.png') },
        { id: 3, uri: require('../../assets/profilemanageImgGallery2.png') },
    ]);

    // State for documents
    const [documents, setDocuments] = useState([
        { id: 1, name: 'Business License', size: '2.4 MB', format: 'PDF' },
        { id: 2, name: 'Tax Certificate', size: '1.8 MB', format: 'DOCX' },
    ]);

    // State for privacy settings
    const [isPublicProfile, setIsPublicProfile] = useState(true);
    const [isContactVisible, setIsContactVisible] = useState(false);

    // Handle edit field
    const handleEdit = (field: string) => {
        console.log(`Editing field: ${field}`);
        // In a real app, this would open an edit modal or enable inline editing
    };

    // Handle adding photos
    const handleAddPhotos = () => {
        console.log('Adding photos to gallery');
        // In a real app, this would open the device's image picker
    };

    // Handle document upload
    const handleDocumentUpload = () => {
        console.log('Uploading document');
        // In a real app, this would open a file picker
    };

    // Handle removing a document
    const handleRemoveDocument = (docId: number) => {
        setDocuments(documents.filter((doc) => doc.id !== docId));
    };

    // Handle removing a gallery image
    const handleRemoveImage = (imageId: number) => {
        // Only allow removing images that aren't the placeholder
        if (imageId !== 1) {
            setGallery(gallery.filter((img) => img.id !== imageId));
        }
    };

    // Handle saving changes
    const handleSaveChanges = () => {
        console.log('Saving profile changes');
        // In a real app, this would send data to the server
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile Management</Text>
                    <TouchableOpacity style={styles.menuButton}>
                        <Ionicons name="ellipsis-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Profile Banner */}
                <View style={styles.profileBanner}>
                    <View style={styles.profileImageContainer}>
                        <Image source={require('../../assets/profileSarah.png')} style={styles.profileImage} />
                        <TouchableOpacity style={styles.editProfileImageButton}>
                            <Ionicons name="camera" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.profileName}>Tech Solutions Inc.</Text>
                    <Text style={styles.profileType}>Business Profile</Text>
                </View>

                {/* Basic Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Company Name</Text>
                        <View style={styles.fieldValueContainer}>
                            <Text style={styles.fieldValue}>{companyName}</Text>
                            <TouchableOpacity onPress={() => handleEdit('companyName')}>
                                <Feather name="edit-2" size={20} color="#10B981" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Business Type</Text>
                        <View style={styles.fieldValueContainer}>
                            <Text style={styles.fieldValue}>{businessType}</Text>
                            <Ionicons name="chevron-down" size={20} color="#A0AEC0" />
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Email</Text>
                        <View style={styles.fieldValueContainer}>
                            <Text style={styles.fieldValue}>{email}</Text>
                            <TouchableOpacity onPress={() => handleEdit('email')}>
                                <Feather name="edit-2" size={20} color="#10B981" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Phone</Text>
                        <View style={styles.fieldValueContainer}>
                            <Text style={styles.fieldValue}>{phone}</Text>
                            <TouchableOpacity onPress={() => handleEdit('phone')}>
                                <Feather name="edit-2" size={20} color="#10B981" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Address</Text>
                        <View style={styles.fieldValueContainer}>
                            <Text style={styles.fieldValue}>{address}</Text>
                            <TouchableOpacity onPress={() => handleEdit('address')}>
                                <Feather name="edit-2" size={20} color="#10B981" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Description</Text>
                        <View style={styles.fieldValueContainer}>
                            <Text style={[styles.fieldValue, styles.descriptionText]}>{description}</Text>
                            <TouchableOpacity
                                onPress={() => handleEdit('description')}
                                style={styles.descriptionEditButton}>
                                <Feather name="edit-2" size={20} color="#10B981" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Image Gallery Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Image Gallery</Text>
                        <TouchableOpacity style={styles.addButton} onPress={handleAddPhotos}>
                            <Ionicons name="add" size={18} color="#10B981" />
                            <Text style={styles.addButtonText}>Add Photos</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.galleryContainer}>
                        {gallery.map((item) => (
                            <View key={item.id} style={styles.galleryItem}>
                                {item.id === 1 ? (
                                    <TouchableOpacity style={styles.addImagePlaceholder} onPress={handleAddPhotos}>
                                        <Ionicons name="add" size={24} color="#A0AEC0" />
                                    </TouchableOpacity>
                                ) : (
                                    <>
                                        <Image source={item.uri} style={styles.galleryImage} />
                                        <TouchableOpacity
                                            style={styles.removeImageButton}
                                            onPress={() => handleRemoveImage(item.id)}>
                                            <Ionicons name="close" size={14} color="white" />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Documents Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Documents</Text>
                        <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentUpload}>
                            <Feather name="upload" size={18} color="#10B981" />
                            <Text style={styles.uploadButtonText}>Upload</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.documentsContainer}>
                        {documents.map((doc) => (
                            <View key={doc.id} style={styles.documentItem}>
                                <View style={styles.documentIcon}>
                                    {doc.format === 'PDF' ? (
                                        <MaterialIcons name="picture-as-pdf" size={24} color="#F56565" />
                                    ) : (
                                        <MaterialIcons name="insert-drive-file" size={24} color="#4299E1" />
                                    )}
                                </View>
                                <View style={styles.documentInfo}>
                                    <Text style={styles.documentName}>{doc.name}</Text>
                                    <Text style={styles.documentMeta}>
                                        {doc.size} • {doc.format}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => handleRemoveDocument(doc.id)}>
                                    <Ionicons name="close" size={20} color="#A0AEC0" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <View style={styles.uploadPlaceholder}>
                            <Feather name="upload-cloud" size={24} color="#A0AEC0" style={styles.uploadIcon} />
                            <Text style={styles.uploadText}>Drag files here or</Text>
                            <TouchableOpacity onPress={handleDocumentUpload}>
                                <Text style={styles.browseFilesText}>Browse Files</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Social Media Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Social Media</Text>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Website</Text>
                        <View style={styles.socialFieldContainer}>
                            <Ionicons name="globe-outline" size={20} color="#A0AEC0" style={styles.socialIcon} />
                            <TextInput
                                style={styles.socialInput}
                                value={website}
                                onChangeText={setWebsite}
                                placeholder="https://www.yourwebsite.com"
                                placeholderTextColor="#A0AEC0"
                            />
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>LinkedIn</Text>
                        <View style={styles.socialFieldContainer}>
                            <Ionicons name="logo-linkedin" size={20} color="#A0AEC0" style={styles.socialIcon} />
                            <TextInput
                                style={styles.socialInput}
                                value={linkedin}
                                onChangeText={setLinkedin}
                                placeholder="https://linkedin.com/company/yourcompany"
                                placeholderTextColor="#A0AEC0"
                            />
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Twitter</Text>
                        <View style={styles.socialFieldContainer}>
                            <Ionicons name="logo-twitter" size={20} color="#A0AEC0" style={styles.socialIcon} />
                            <TextInput
                                style={styles.socialInput}
                                value={twitter}
                                onChangeText={setTwitter}
                                placeholder="https://twitter.com/yourcompany"
                                placeholderTextColor="#A0AEC0"
                            />
                        </View>
                    </View>
                </View>

                {/* Privacy Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Privacy Settings</Text>

                    <View style={styles.settingContainer}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Public Profile</Text>
                            <Text style={styles.settingDescription}>Make your profile visible to everyone</Text>
                        </View>
                        <Switch
                            value={isPublicProfile}
                            onValueChange={setIsPublicProfile}
                            trackColor={{ false: '#E2E8F0', true: '#10B981' }}
                            thumbColor={
                                Platform.OS === 'ios' ? '#FFFFFF' : isPublicProfile ? '#FFFFFF' : '#F2F2F2'
                            }
                            ios_backgroundColor="#E2E8F0"
                            style={styles.switch}
                        />
                    </View>

                    <View style={styles.settingContainer}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Contact Info Visible</Text>
                            <Text style={styles.settingDescription}>
                                Allow others to see your contact details
                            </Text>
                        </View>
                        <Switch
                            value={isContactVisible}
                            onValueChange={setIsContactVisible}
                            trackColor={{ false: '#E2E8F0', true: '#10B981' }}
                            thumbColor={
                                Platform.OS === 'ios' ? '#FFFFFF' : isContactVisible ? '#FFFFFF' : '#F2F2F2'
                            }
                            ios_backgroundColor="#E2E8F0"
                            style={styles.switch}
                        />
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Ionicons name="save-outline" size={20} color="#FFFFFF" style={styles.saveIcon} />
                    <Text style={styles.saveButtonText}>Save Changes</Text>
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
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#10B981',
        paddingVertical: 12, // Reduced from 16 to 12
        paddingHorizontal: 20,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
    },
    menuButton: {
        padding: 8,
    },
    profileBanner: {
        backgroundColor: '#10B981',
        paddingBottom: 16, // Reduced from 24 to 16
        paddingTop: 5,     // Added small padding at the top
        alignItems: 'center',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 8, // Reduced from 12 to 8
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    editProfileImageButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#10B981',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    profileName: {
        fontSize: 17, // Reduced from 18 to 17
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 2, // Reduced from 4 to 2
    },
    profileType: {
        fontSize: 13, // Reduced from 14 to 13
        color: 'rgba(255, 255, 255, 0.8)',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 12, // Reduced from 16 to 12
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
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A202C',
        marginBottom: 16,
    },
    fieldContainer: {
        marginBottom: 16,
    },
    fieldLabel: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 8,
    },
    fieldValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    fieldValue: {
        fontSize: 16,
        color: '#1A202C',
        flex: 1,
    },
    descriptionText: {
        lineHeight: 22,
    },
    descriptionEditButton: {
        alignSelf: 'flex-start',
        padding: 4,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 14,
        color: '#10B981',
        fontWeight: '500',
        marginLeft: 4,
    },
    galleryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    galleryItem: {
        width: '33.33%',
        aspectRatio: 1,
        padding: 4,
        position: 'relative',
    },
    galleryImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    addImagePlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
    },
    removeImageButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    uploadButtonText: {
        fontSize: 14,
        color: '#10B981',
        fontWeight: '500',
        marginLeft: 4,
    },
    documentsContainer: {
        marginTop: 4,
    },
    documentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    documentIcon: {
        marginRight: 12,
    },
    documentInfo: {
        flex: 1,
    },
    documentName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2D3748',
        marginBottom: 4,
    },
    documentMeta: {
        fontSize: 12,
        color: '#718096',
    },
    uploadPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        borderRadius: 8,
        paddingVertical: 24,
        marginTop: 12,
    },
    uploadIcon: {
        marginBottom: 8,
    },
    uploadText: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 4,
    },
    browseFilesText: {
        fontSize: 14,
        color: '#10B981',
        fontWeight: '500',
    },
    socialFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    socialIcon: {
        marginRight: 8,
    },
    socialInput: {
        flex: 1,
        fontSize: 16,
        color: '#A0AEC0', // Changed from #1A202C to match the icon color
    },
    settingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    settingInfo: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1A202C',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
        color: '#718096',
    },
    switch: {
        marginLeft: 16,
    },
    saveButton: {
        backgroundColor: '#10B981',
        borderRadius: 8,
        paddingVertical: 16,
        marginHorizontal: 16,
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveIcon: {
        marginRight: 8,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default ProfileManagement;
