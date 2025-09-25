import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

// Define types for our data
interface Event {
  id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: ImageSourcePropType;
}

interface RenderEventProps {
  item: Event;
}

interface FilterProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

// Define filters array
const filters: string[] = ['All Events', 'This Week', 'Music', 'Sports'];

// Sample events data
const events: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2024',
    desc: 'Join industry leaders for cutting-edge tech discussions and networking opportunities.',
    date: 'Dec 15, 2024',
    time: '2:00 PM',
    location: 'Convention Center',
    price: 'Free',
    // Note: You'll need to add these images to your assets folder
    image: require('../../assets/AllEvent1.png'),
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    desc: 'Experience amazing live performances from top artists in an outdoor setting.',
    date: 'Dec 18, 2024',
    time: '6:00 PM',
    location: 'Central Park',
    price: '$25',
    image: require('../../assets/AllEvent2.png'),
  },
  {
    id: '3',
    title: 'Business Networking Mixer',
    desc: 'Connect with professionals and expand your business network in a relaxed environment.',
    date: 'Dec 20, 2024',
    time: '7:00 PM',
    location: 'Downtown Hotel',
    price: '$15',
    image: require('../../assets/AllEvent3.png'),
  },
  {
    id: '4',
    title: 'Morning Yoga Session',
    desc: 'Start your day with mindfulness and movement in our peaceful studio space.',
    date: 'Dec 22, 2024',
    time: '8:00 AM',
    location: 'Wellness Studio',
    price: '$20',
    image: require('../../assets/AllEvent4.png'),
  },
  {
    id: '5',
    title: 'Local Food Festival',
    desc: 'Discover amazing local cuisine and enjoy live cooking demonstrations from top chefs.',
    date: 'Dec 25, 2024',
    time: '11:00 AM',
    location: 'Market Square',
    price: 'Free',
    image: require('../../assets/AllEvent5.png'),
  },
];

// Filter component with proper TypeScript typing
const FilterChip: React.FC<FilterProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      key={label}
      style={[styles.filterChip, { backgroundColor: isSelected ? '#2ecc71' : '#f2f2f2' }]}
      onPress={onPress}>
      <Text style={[styles.filterText, { color: isSelected ? '#fff' : '#333' }]}>{label}</Text>
    </TouchableOpacity>
  );
};

// Event card component with proper TypeScript typing
const EventCard: React.FC<RenderEventProps> = ({ item }) => {
  return (
    <View style={styles.eventCard}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.eventImage} resizeMode="cover" />
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDesc}>{item.desc}</Text>
        <View style={styles.eventMeta}>
          <MaterialIcons name="date-range" size={16} color="#2ecc71" />
          <Text style={styles.metaText}>{item.date}</Text>
          <FontAwesome name="clock-o" size={16} color="#2ecc71" style={{ marginLeft: 16 }} />
          <Text style={styles.metaText}>{item.time}</Text>
        </View>
        <View style={styles.eventLocation}>
          <Ionicons name="location-sharp" size={16} color="#2ecc71" />
          <Text style={styles.metaText}>{item.location}</Text>
        </View>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main component
const AllEventsScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All Events');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.headerTitle}>Events</Text>
        <Ionicons name="search" size={24} color="#333" />
      </View>

      {/* Filters */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}>
          {filters.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              isSelected={selectedFilter === filter}
              onPress={() => setSelectedFilter(filter)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Events List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={(props) => <EventCard {...props} />}
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={true}
        style={{ flex: 1, width: '100%' }}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navIconContainer}>
          <Ionicons name="home-outline" size={28} color="#888" />
        </View>
        <View style={styles.navIconContainer}>
          <Ionicons name="calendar" size={28} color="#2ecc71" />
        </View>
        <View style={styles.navIconContainer}>
          <Ionicons name="heart-outline" size={28} color="#888" />
        </View>
        <View style={styles.navIconContainer}>
          <Ionicons name="person-outline" size={28} color="#888" />
        </View>
      </View>
    </View>
  );
};

// Styles with TypeScript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    height: '100%',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  filterWrapper: {
    backgroundColor: '#f8f8f8',
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 10,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginVertical: 5,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    fontWeight: 'bold',
  },
  eventsList: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 130, // Increased to ensure content isn't cut off by extended bottom navigation
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    paddingBottom: 12,
  },
  imageContainer: {
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  priceTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignItems: 'center',
  },
  priceText: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  eventContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  eventDesc: {
    color: '#666',
    fontSize: 13,
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    marginLeft: 6,
    color: '#333',
    fontSize: 13,
  },
  joinButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 20,
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, // Extend to bottom of screen
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15, // Add padding to keep icons in the same position
    paddingBottom: 40, // Add padding to extend below for system navigation
    height: 'auto', // Auto height to accommodate padding
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 10, // Ensure it's above other content
    borderTopLeftRadius: 20, // Rounded corners only on top
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Add elevation for Android shadow
  },
  navIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
});

export default AllEventsScreen;
