import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const reviews = [
  {
    username: 'kungfoodpanda',
    review: 'must get noddle stall $3 big big portion with wanton, don’t complain js buy bros... the stall owners also suuuuuper generous i cant say more alr. u try u know ok. also must add chilli if not no authentic lah',
    date: '2024-07-28',
  },
  {
    username: 'n000000dle',
    review: 'my go-to comfort food will always be chicken rice',
    date: '2024-07-27',
  },
  {
    username: 'quittingschool',
    review: 'go try the korean chicken soup',
    date: '2024-07-26',
  },
];

const RandomReviewScreen = () => {
  return (
    <ScrollView style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Reviews</Text>
      {reviews.map((review, index) => (
        <View key={index} style={tw`mb-4 p-4 rounded-lg bg-gray-100`}>
          <Text style={tw`text-lg font-bold`}>
            {review.username}
          </Text>
          <Text style={tw`text-sm text-gray-600 mb-2`}>
            {new Date(review.date).toLocaleDateString()}
          </Text>
          <Text style={tw`text-base`}>
            {review.review}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default RandomReviewScreen;