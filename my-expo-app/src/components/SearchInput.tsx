import React from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Theme } from '../constants';

interface SearchInputProps extends TextInputProps {
  onSearchPress?: () => void;
  onFilterPress?: () => void;
  containerStyle?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearchPress,
  onFilterPress,
  containerStyle,
  ...props
}) => {
  const containerStyles: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Theme.borderRadius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    ...Theme.shadows.sm,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  };

  const inputStyles = {
    flex: 1,
    ...Theme.typography.body,
    color: Colors.neutral[800],
    paddingHorizontal: Theme.spacing.sm,
  };

  const iconButtonStyles: ViewStyle = {
    padding: Theme.spacing.xs,
  };

  return (
    <View style={[containerStyles, containerStyle]}>
      <Ionicons 
        name="search-outline" 
        size={20} 
        color={Colors.neutral[400]} 
      />
      
      <TextInput
        style={inputStyles}
        placeholderTextColor={Colors.neutral[400]}
        {...props}
      />
      
      {onFilterPress && (
        <TouchableOpacity 
          style={iconButtonStyles}
          onPress={onFilterPress}
        >
          <Ionicons 
            name="options-outline" 
            size={20} 
            color={Colors.neutral[600]} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
