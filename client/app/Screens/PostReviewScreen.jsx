import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

const PostReviewScreen = () => {
  const [reviewType, setReviewType] = useState('canteen');
  const [canteen, setCanteen] = useState('');
  const [reviewText, setReviewText] = useState('');

  const canteens = ['Canteen 1', 'Canteen 2', 'Canteen 3'];

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

      {reviewType === 'canteen' && (
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Select Canteen</Text>
          {canteens.map((canteenName) => (
            <TouchableOpacity
              key={canteenName}
              style={[
                tw`py-3 px-4 rounded-lg mb-2`,
                canteen === canteenName ? tw`bg-orange-500` : tw`bg-gray-300`
              ]}
              onPress={() => setCanteen(canteenName)}
            >
              <Text style={tw`text-white`}>{canteenName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Review</Text>
        <TextInput
          style={tw`border rounded-lg border-gray-300 p-4 h-32`}
          multiline
          numberOfLines={4}
          placeholder="Write your review here..."
          value={reviewText}
          onChangeText={setReviewText}
        />
      </View>

      <TouchableOpacity style={tw`bg-orange-500 py-3 rounded-lg`}>
        <Text style={tw`text-white text-center text-base`}>Post Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostReviewScreen;