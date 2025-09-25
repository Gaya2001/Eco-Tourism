import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BusinessRegistrationStep3Props {
  onNext: (data: DocumentUpload) => void;
  onBack: () => void;
  onSaveDraft: () => void;
}

interface Document {
  id: string;
  name: string;
  type: string;
  isRequired: boolean;
  isUploaded: boolean;
  fileName?: string;
  fileSize?: string;
  icon: string;
  color: string;
}

interface DocumentUpload {
  documents: Document[];
  uploadProgress: number;
}

const BusinessRegistrationStep3: React.FC<BusinessRegistrationStep3Props> = ({
  onNext,
  onBack,
  onSaveDraft,
}) => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'business-license',
      name: 'Business License',
      type: 'Required document',
      isRequired: true,
      isUploaded: false,
      icon: 'document-text',
      color: 'blue',
    },
    {
      id: 'tax-registration',
      name: 'Tax Registration',
      type: 'EIN or Tax ID document',
      isRequired: true,
      isUploaded: true,
      fileName: 'tax-registration-2024.pdf',
      fileSize: '2.3 MB',
      icon: 'receipt',
      color: 'orange',
    },
    {
      id: 'insurance-certificate',
      name: 'Insurance Certificate',
      type: 'General liability insurance',
      isRequired: false,
      isUploaded: false,
      icon: 'shield-checkmark',
      color: 'purple',
    },
    {
      id: 'bank-statement',
      name: 'Bank Statement',
      type: 'Recent 3-month statement',
      isRequired: true,
      isUploaded: true,
      fileName: 'statement-jan-2024.pdf',
      fileSize: '1.8 MB',
      icon: 'card',
      color: 'green',
    },
  ]);

  const [additionalFiles, setAdditionalFiles] = useState([
    {
      name: 'statement-feb-2024.pdf',
      size: '2.1 MB',
      uploaded: true,
    },
  ]);

  const handleFileUpload = (documentId: string) => {
    // Simulate file upload
    Alert.alert('File Upload', 'File selection would open here in a real app', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Select File', 
        onPress: () => {
          setDocuments(prev => prev.map(doc => 
            doc.id === documentId 
              ? { 
                  ...doc, 
                  isUploaded: true, 
                  fileName: `${doc.name.toLowerCase().replace(/\s+/g, '-')}.pdf`,
                  fileSize: '2.5 MB'
                }
              : doc
          ));
        }
      }
    ]);
  };

  const handleDeleteFile = (documentId: string) => {
    Alert.alert('Delete File', 'Are you sure you want to delete this file?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive',
        onPress: () => {
          setDocuments(prev => prev.map(doc => 
            doc.id === documentId 
              ? { ...doc, isUploaded: false, fileName: undefined, fileSize: undefined }
              : doc
          ));
        }
      }
    ]);
  };

  const addMoreFiles = () => {
    Alert.alert('Add Files', 'Additional file selection would open here');
  };

  const uploadProgress = Math.round((documents.filter(doc => doc.isUploaded).length / documents.length) * 100);
  const requiredDocuments = documents.filter(doc => doc.isRequired);
  const requiredUploaded = requiredDocuments.filter(doc => doc.isUploaded).length;

  const canProceed = requiredDocuments.every(doc => doc.isUploaded);

  const handleNext = () => {
    if (!canProceed) {
      Alert.alert(
        'Missing Required Documents',
        'Please upload all required documents before proceeding.'
      );
      return;
    }
    onNext({ documents, uploadProgress });
  };

  const getDocumentColor = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-100', iconColor: '#2563EB', border: 'border-blue-200' },
      orange: { bg: 'bg-orange-100', iconColor: '#EA580C', border: 'border-orange-200' },
      purple: { bg: 'bg-purple-100', iconColor: '#9333EA', border: 'border-purple-200' },
      green: { bg: 'bg-green-100', iconColor: '#059669', border: 'border-green-200' },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const DocumentCard = ({ document }: { document: Document }) => {
    const colorClasses = getDocumentColor(document.color);
    
    return (
      <View className={`border-2 ${colorClasses.border} rounded-2xl p-4 mb-4`}>
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <View className={`w-12 h-12 ${colorClasses.bg} rounded-xl items-center justify-center mr-3`}>
              <Ionicons 
                name={document.icon as any} 
                size={24} 
                color={colorClasses.iconColor}
              />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="font-semibold text-gray-900 mr-2">{document.name}</Text>
                {document.isRequired ? (
                  <View className="bg-red-100 px-2 py-0.5 rounded-full">
                    <Text className="text-red-600 text-xs font-medium">Required</Text>
                  </View>
                ) : (
                  <View className="bg-gray-100 px-2 py-0.5 rounded-full">
                    <Text className="text-gray-600 text-xs font-medium">Optional</Text>
                  </View>
                )}
              </View>
              <Text className="text-gray-600 text-sm">{document.type}</Text>
            </View>
          </View>
        </View>

        {document.isUploaded ? (
          <View className="bg-green-50 rounded-xl p-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons name="document" size={16} color="#10B981" />
                <View className="ml-2 flex-1">
                  <Text className="text-green-900 font-medium text-sm">{document.fileName}</Text>
                  <Text className="text-green-600 text-xs">{document.fileSize} • Uploaded</Text>
                </View>
              </View>
              <View className="flex-row items-center space-x-2">
                <TouchableOpacity className="w-8 h-8 bg-green-500 rounded-full items-center justify-center">
                  <Ionicons name="checkmark" size={16} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleDeleteFile(document.id)}
                  className="w-8 h-8 bg-red-100 rounded-full items-center justify-center"
                >
                  <Ionicons name="trash" size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleFileUpload(document.id)}
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 items-center"
          >
            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-2">
              <Ionicons name="cloud-upload" size={24} color="#6B7280" />
            </View>
            <Text className="text-gray-900 font-medium mb-1">
              Tap to upload your {document.name.toLowerCase()}
            </Text>
            <Text className="text-gray-500 text-sm text-center">
              PDF, JPG, PNG up to 10MB
            </Text>
            <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg mt-3">
              <Text className="text-white font-medium text-sm">Choose File</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={onBack} className="w-10 h-10 items-center justify-center -ml-2">
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-gray-900">Business Registration</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 items-center justify-center -mr-2">
            <Ionicons name="ellipsis-vertical" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
        
        {/* Progress Steps */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center space-x-2">
            <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center">
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
            <Text className="text-green-600 text-sm font-medium">Info</Text>
          </View>
          
          <View className="flex-1 h-0.5 bg-green-500 mx-2" />
          
          <View className="flex-row items-center space-x-2">
            <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center">
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
            <Text className="text-green-600 text-sm font-medium">Details</Text>
          </View>
          
          <View className="flex-1 h-0.5 bg-green-500 mx-2" />
          
          <View className="flex-row items-center space-x-2">
            <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
              <Text className="text-white font-bold text-sm">3</Text>
            </View>
            <Text className="text-blue-600 text-sm font-medium">Documents</Text>
          </View>
          
          <View className="flex-1 h-0.5 bg-gray-300 mx-2" />
          
          <View className="flex-row items-center space-x-2">
            <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center">
              <Text className="text-gray-600 font-bold text-sm">4</Text>
            </View>
            <Text className="text-gray-500 text-sm font-medium">Review</Text>
          </View>
        </View>
        
        {/* Progress Bar */}
        <View className="mb-2">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-blue-600 text-sm font-medium">Step 3 of 4</Text>
            <Text className="text-gray-500 text-sm">75% Complete</Text>
          </View>
          <View className="w-full h-2 bg-gray-200 rounded-full">
            <View className="w-3/4 h-2 bg-blue-500 rounded-full" />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Upload Certifications</Text>
          <Text className="text-gray-600 mb-6">
            Upload your business certifications and required documents. All files should be clear, legible, and in PDF or image format.
          </Text>

          {/* Upload Tips */}
          <View className="bg-blue-50 rounded-2xl p-4 mb-6">
            <View className="flex-row items-center mb-3">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <Text className="text-blue-900 font-semibold ml-2">Upload Tips</Text>
            </View>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <View className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                <Text className="text-blue-800 text-sm">Use high-quality scans or photos</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                <Text className="text-blue-800 text-sm">Ensure all text is clearly readable</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                <Text className="text-blue-800 text-sm">Maximum file size: 10MB per document</Text>
              </View>
            </View>
          </View>

          {/* Documents */}
          {documents.map(document => (
            <DocumentCard key={document.id} document={document} />
          ))}

          {/* Additional Files */}
          {additionalFiles.length > 0 && (
            <View className="mb-6">
              {additionalFiles.map((file, index) => (
                <View key={index} className="bg-gray-50 rounded-xl p-3 mb-2">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <Ionicons name="document" size={16} color="#10B981" />
                      <View className="ml-2 flex-1">
                        <Text className="text-gray-900 font-medium text-sm">{file.name}</Text>
                        <Text className="text-gray-600 text-xs">{file.size} • Uploaded</Text>
                      </View>
                    </View>
                    <TouchableOpacity className="w-8 h-8 bg-red-100 rounded-full items-center justify-center">
                      <Ionicons name="trash" size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Add More Files */}
          <TouchableOpacity
            onPress={addMoreFiles}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-6 items-center mb-6"
          >
            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-3">
              <Ionicons name="add" size={24} color="#10B981" />
            </View>
            <Text className="text-gray-900 font-semibold mb-1">Add more files</Text>
          </TouchableOpacity>

          {/* Upload Progress */}
          <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text className="text-gray-900 font-semibold ml-2">Upload Progress</Text>
              </View>
              <Text className="text-green-600 font-bold">{uploadProgress}%</Text>
            </View>
            <Text className="text-gray-600 text-sm mb-2">
              {documents.filter(doc => doc.isUploaded).length} of {documents.length} documents uploaded • Complete
            </Text>
            <View className="w-full h-2 bg-gray-200 rounded-full">
              <View 
                className="h-2 bg-green-500 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="bg-white border-t border-gray-200 px-4 py-4">
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={onSaveDraft}
            className="flex-1 bg-gray-200 py-4 rounded-xl"
          >
            <Text className="text-gray-700 font-semibold text-center">Save Draft</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleNext}
            className={`flex-1 py-4 rounded-xl ${
              canProceed ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            disabled={!canProceed}
          >
            <View className="flex-row items-center justify-center">
              <Text className={`font-semibold mr-2 ${
                canProceed ? 'text-white' : 'text-gray-500'
              }`}>
                Continue
              </Text>
              <Ionicons 
                name="arrow-forward" 
                size={16} 
                color={canProceed ? 'white' : '#6B7280'} 
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BusinessRegistrationStep3;