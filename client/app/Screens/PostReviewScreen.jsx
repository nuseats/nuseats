import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostReviewScreen = () => {
  const [reviewType, setReviewType] = useState('canteen');
  const [canteen, setCanteen] = useState('');
  const [canteenData, setCanteenData] = useState([]);
  const [reviewContent, setReviewContent] = useState('');

  useEffect(() => {
    const fetchCanteens = async () => {
        try {
            const response = await fetch('http://localhost:5000/dashboard/canteens');
            const result = await response.json();
            const data = result.data.canteens;
            setCanteenData(data);
        } catch (error) {
            console.error('Error fetching canteen data:', error);
        }
    };
    fetchCanteens();
  }, []);

  const handleAddReview = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const is_time_sensitive = reviewType == 'canteen';
      const response = await fetch(`http://localhost:5000/dashboard/canteens/${canteen}/add-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          review: reviewContent,
          canteen_id: canteen,
          time_sensitive: is_time_sensitive
        }),
      });

      const result = await response.json();
      console.log('Review added successfully:', result);
      
      // Clear input fields
      setReviewContent('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <ScrollView style={tw`bg-white p-4`} contentContainerStyle={tw`flex-grow`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-xl font-bold`}>Post a Review</Text>
      </View>

      <View style={tw`mb-4 flex-row`}>
        <TouchableOpacity
          style={[
            tw`py-2 px-4 rounded-lg mb-2 mr-2`,
            reviewType === 'canteen' ? tw`bg-orange-500` : tw`bg-gray-300`
          ]}
          onPress={() => setReviewType('canteen')}
        >
          <Text style={tw`text-white text-center`}>Canteen Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`py-2 px-4 rounded-lg mb-2`,
            reviewType === 'timeSensitive' ? tw`bg-orange-500` : tw`bg-gray-300`
          ]}
          onPress={() => setReviewType('timeSensitive')}
        >
          <Text style={tw`text-white text-center`}>Time-Sensitive Review</Text>
        </TouchableOpacity>
      </View>

      {reviewType === 'timeSensitive' && (
        <Text style={tw`text-gray-500 mb-4 py-1 italic`}>
          Reviews posted here will be removed after 2359 on the day of posting, to maximise the time relevance of our posts.
        </Text>
      )}

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Select Canteen</Text>
        {canteenData.map((can) => (
          <TouchableOpacity
            key={can.name}
            style={[
              tw`py-3 px-4 rounded-lg mb-2`,
              canteen == can.id ? tw`bg-orange-500` : tw`bg-gray-300`
            ]}
            onPress={() => setCanteen(can.id)}
          >
            <Text style={tw`text-white`}>{can.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Review</Text>
        <TextInput
          style={tw`border rounded-lg border-gray-300 p-4 h-32`}
          multiline
          numberOfLines={4}
          placeholder="Write your review here..."
          value={reviewContent}
          onChangeText={setReviewContent}
        />
      </View>

      <TouchableOpacity style={tw`bg-orange-500 py-3 rounded-lg`} onPress={handleAddReview}>
        <Text style={tw`text-white text-center text-base`}>Post Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostReviewScreen;