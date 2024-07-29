import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

const RandomReviewScreen = () => {

  const [review, setReview] = useState(null);

  const fetchRandomReview = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/random-review');
      const data = await response.json();
      setReview(data);
    } catch (error) {
      console.error('Error fetching random review:', error);
    }
  };

  useEffect(() => {
    fetchRandomReview();
  }, []);

  return (
    <ScrollView style={tw`flex-1 p-4 bg-white flex-1`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Random review</Text>
      <TouchableOpacity
        onPress={fetchRandomReview}
        style={tw`absolute top-2 right-2`}
      >
        <Icon name="refresh-cw" size={24} color={tw.color('gray-700')} />
      </TouchableOpacity>
      { review ? (
        <View style={tw`mb-4 p-4 rounded-lg bg-gray-100`}>
          <Text style={tw`text-lg font-bold`}>
            {review.username}
          </Text>
          <Text style={tw`text-sm text-gray-600 mb-2`}>
            {new Date(review.created_at).toLocaleDateString()}
          </Text>
          <Text style={tw`text-base`}>
            {review.review}
          </Text>
        </View>
      ) : (
        <View></View>
      )}
    </ScrollView>
  );
};

export default RandomReviewScreen;