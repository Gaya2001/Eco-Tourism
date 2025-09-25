import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  category: 'All Events' | 'This Week' | 'Music' | 'Sports';
  isFree?: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2024',
    description: 'Join industry leaders for cutting-edge tech discussions and networking opportunities.',
    date: 'Dec 15, 2024',
    time: '2:00 PM',
    location: 'Convention Center',
    price: 0,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
    category: 'All Events',
    isFree: true,
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    description: 'Experience amazing live performances from top artists in an outdoor setting.',
    date: 'Dec 18, 2024',
    time: '6:00 PM',
    location: 'Central Park',
    price: 25,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop',
    category: 'Music',
  },
  {
    id: '3',
    title: 'Business Networking Mixer',
    description: 'Connect with professionals and expand your business network in a relaxed environment.',
    date: 'Dec 20, 2024',
    time: '7:00 PM',
    location: 'Downtown Hotel',
    price: 15,
    image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=200&fit=crop',
    category: 'All Events',
  },
  {
    id: '4',
    title: 'Morning Yoga Session',
    description: 'Start your day with mindfulness and movement in our peaceful studio space.',
    date: 'Dec 22, 2024',
    time: '8:00 AM',
    location: 'Wellness Studio',
    price: 20,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=400&h=200&fit=crop',
    category: 'All Events',
  },
  {
    id: '5',
    title: 'Local Food Festival',
    description: 'Discover amazing local cuisine and enjoy live cooking demonstrations from top chefs.',
    date: 'Dec 25, 2024',
    time: '11:00 AM',
    location: 'Market Square',
    price: 0,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop',
    category: 'All Events',
    isFree: true,
  },
];

const EventsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Events');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All Events', 'This Week', 'Music', 'Sports'];

  const filteredEvents = mockEvents.filter(event => {
    const matchesCategory = selectedCategory === 'All Events' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const EventCard = ({ event }: { event: Event }) => (
    <View className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100">
      <View className="relative">
        <View className="w-full h-48 bg-gray-200 rounded-t-2xl">
          <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-t-2xl" />
          <View className="flex-1 justify-center items-center ">
            <View className="w-16 h-16 bg-blue-500 rounded-lg justify-center items-center  ">
              <Ionicons name="calendar" size={32} color="white" />
            </View>
          </View>
        </View>
        <View className="absolute top-3 right-3">
          <View className={`px-3 py-1 rounded-full ${event.isFree ? 'bg-green-500' : 'bg-gray-800'}`}>
            <Text className="text-white text-sm font-medium">
              {event.isFree ? 'FREE' : `$${event.price}`}
            </Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-lg font-bold text-gray-900 mb-2">{event.title}</Text>
        <Text className="text-gray-600 text-sm mb-3 leading-5">{event.description}</Text>
        
        <View className="flex-row items-center mb-2">
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text className="text-gray-600 text-sm ml-2">{event.date}</Text>
          <View className="flex-row items-center ml-4">
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text className="text-gray-600 text-sm ml-2">{event.time}</Text>
          </View>
        </View>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text className="text-gray-600 text-sm ml-1">{event.location}</Text>
          </View>
          <TouchableOpacity className="bg-green-500 px-6 py-2 rounded-full">
            <Text className="text-white font-medium text-sm">Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="w-12 h-12 items-center justify-center rounded-full">
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-1 mx-4">
            <Text className="text-xl font-bold text-gray-900 text-center">Events</Text>
          </View>
          <TouchableOpacity className="w-12 h-12 items-center justify-center rounded-full">
            <Ionicons name="search" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Filter Tabs */}
        <View className="px-4 py-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row space-x-3">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full ${
                    selectedCategory === category
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      selectedCategory === category
                        ? 'text-white'
                        : 'text-gray-600'
                    }`}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-4">
          <View className="bg-white rounded-xl px-4 py-3 border border-gray-200 flex-row items-center">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search events..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Events List */}
        <View className="px-4 pb-20">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          
          {filteredEvents.length === 0 && (
            <View className="flex-1 justify-center items-center py-12">
              <Ionicons name="calendar-outline" size={64} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg mt-4">No events found</Text>
              <Text className="text-gray-400 text-sm mt-1 text-center">
                Try adjusting your filters or search term
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 px-4 py-2 absolute bottom-0 left-0 right-0">
        <View className="flex-row justify-around">
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="home" size={24} color="#9CA3AF" />
            <Text className="text-gray-400 text-xs mt-1">Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="calendar" size={24} color="#10B981" />
            <Text className="text-green-500 text-xs mt-1">Events</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="heart" size={24} color="#9CA3AF" />
            <Text className="text-gray-400 text-xs mt-1">Favorites</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="person" size={24} color="#9CA3AF" />
            <Text className="text-gray-400 text-xs mt-1">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventsScreen;