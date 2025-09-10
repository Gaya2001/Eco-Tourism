import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Colors, Theme } from '../constants';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  ...props
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: Theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      ...Theme.shadows.sm,
    };

    const sizeStyles = {
      small: { paddingHorizontal: 12, paddingVertical: 8, minHeight: 36 },
      medium: { paddingHorizontal: 16, paddingVertical: 12, minHeight: 44 },
      large: { paddingHorizontal: 20, paddingVertical: 16, minHeight: 52 },
    };

    const variantStyles = {
      primary: { backgroundColor: Colors.primary[500] },
      secondary: { backgroundColor: Colors.secondary[500] },
      outline: { 
        backgroundColor: 'transparent', 
        borderWidth: 1, 
        borderColor: Colors.primary[500] 
      },
      ghost: { backgroundColor: 'transparent' },
    };

    const conditionalStyles: ViewStyle = {
      ...(fullWidth && { width: '100%' }),
      ...(disabled && { opacity: 0.6 }),
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...conditionalStyles,
    };
  };

  const getTextStyle = () => {
    const sizeStyles = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    const variantStyles = {
      primary: { color: Colors.white },
      secondary: { color: Colors.white },
      outline: { color: Colors.primary[500] },
      ghost: { color: Colors.primary[500] },
    };

    return {
      fontWeight: '600' as const,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'secondary' ? Colors.white : Colors.primary[500]}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};









