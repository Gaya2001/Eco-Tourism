import React from 'react';
import { View, ActivityIndicator, Text, ViewStyle, TextStyle } from 'react-native';
import { Colors, Theme } from '../constants';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
  color?: string;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  text,
  color = Colors.primary[500],
  style,
}) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.lg,
  };

  const textStyle: TextStyle = {
    ...Theme.typography.body,
    color: Colors.neutral[600],
    marginTop: Theme.spacing.md,
    textAlign: 'center',
  };

  return (
    <View style={[containerStyle, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={textStyle}>{text}</Text>}
    </View>
  );
};
