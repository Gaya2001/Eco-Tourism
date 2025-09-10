import React from 'react';
import { View, Text, Image, TouchableOpacity, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Theme } from '../constants';
import { Destination, Tour } from '../types';

interface CardProps {
  data: Destination | Tour;
  onPress?: () => void;
  variant?: 'destination' | 'tour';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  data,
  onPress,
  variant = 'destination',
  style,
}) => {
  const cardStyle: ViewStyle = {
    backgroundColor: Colors.white,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.shadows.md,
    marginVertical: Theme.spacing.sm,
    overflow: 'hidden',
  };

  const imageStyle: ImageStyle = {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  };

  const contentStyle: ViewStyle = {
    padding: Theme.spacing.md,
  };

  const titleStyle: TextStyle = {
    ...Theme.typography.h4,
    color: Colors.neutral[800],
    marginBottom: Theme.spacing.xs,
  };

  const locationStyle: TextStyle = {
    ...Theme.typography.caption,
    color: Colors.neutral[600],
    marginBottom: Theme.spacing.sm,
  };

  const priceStyle: TextStyle = {
    ...Theme.typography.h4,
    color: Colors.primary[500],
    fontWeight: 'bold',
  };

  const ratingContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  };

  const ratingTextStyle: TextStyle = {
    ...Theme.typography.caption,
    color: Colors.neutral[600],
    marginLeft: Theme.spacing.xs,
  };

  const footerStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const renderDestinationCard = (destination: Destination) => (
    <TouchableOpacity style={[cardStyle, style]} onPress={onPress}>
      <Image source={{ uri: destination.imageUrl }} style={imageStyle} />
      <View style={contentStyle}>
        <Text style={titleStyle}>{destination.name}</Text>
        <Text style={locationStyle}>
          <Ionicons name="location-outline" size={14} color={Colors.neutral[600]} />
          {' '}{destination.location}
        </Text>
        
        <View style={ratingContainerStyle}>
          <Ionicons name="star" size={16} color={Colors.secondary[500]} />
          <Text style={ratingTextStyle}>{destination.rating.toFixed(1)}</Text>
        </View>

        <View style={footerStyle}>
          <Text style={priceStyle}>${destination.price}</Text>
          <View style={{
            backgroundColor: Colors.primary[100],
            paddingHorizontal: Theme.spacing.sm,
            paddingVertical: Theme.spacing.xs,
            borderRadius: Theme.borderRadius.sm,
          }}>
            <Text style={{
              ...Theme.typography.small,
              color: Colors.primary[700],
              fontWeight: '600',
            }}>
              {destination.category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTourCard = (tour: Tour) => (
    <TouchableOpacity style={[cardStyle, style]} onPress={onPress}>
      <Image source={{ uri: tour.imageUrl }} style={imageStyle} />
      <View style={contentStyle}>
        <Text style={titleStyle}>{tour.title}</Text>
        <Text style={locationStyle}>
          <Ionicons name="time-outline" size={14} color={Colors.neutral[600]} />
          {' '}{tour.duration} • Max {tour.maxGroupSize} people
        </Text>
        
        <View style={ratingContainerStyle}>
          <Ionicons name="star" size={16} color={Colors.secondary[500]} />
          <Text style={ratingTextStyle}>
            {tour.rating.toFixed(1)} ({tour.reviewCount} reviews)
          </Text>
        </View>

        <View style={footerStyle}>
          <Text style={priceStyle}>${tour.price}</Text>
          <View style={{
            backgroundColor: Colors.secondary[100],
            paddingHorizontal: Theme.spacing.sm,
            paddingVertical: Theme.spacing.xs,
            borderRadius: Theme.borderRadius.sm,
          }}>
            <Text style={{
              ...Theme.typography.small,
              color: Colors.secondary[700],
              fontWeight: '600',
            }}>
              {tour.guide.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return variant === 'destination' 
    ? renderDestinationCard(data as Destination)
    : renderTourCard(data as Tour);
};
