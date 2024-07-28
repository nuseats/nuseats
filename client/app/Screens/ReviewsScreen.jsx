import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet, TextInput,  TouchableOpacity, } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // 'en-GB' formats the date as DD/MM/YYYY
};

export default function ReviewsScreen({ route }) {
  const { canteenId } = route.params;
  const [canteen, setCanteen] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const [upvoteStatus, setUpvoteStatus] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/dashboard/canteens/${canteenId}`);
        const results = await response.json();
        setCanteen(results.data.canteen)
        setReviews(results.data.reviews);
        console.log(results.data.reviews)
        results.data.reviews.forEach(review => fetchUpvoteStatus(review.id));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [canteenId]);

  const handleAddReview = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const response = await fetch(`http://localhost:5000/dashboard/canteens/${canteenId}/add-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          review: reviewContent,
          canteen_id: canteenId
        }),
      });

      const result = await response.json();
      console.log('Review added successfully:', result);

      setReviews([...reviews, { id: result.id, canteen_id: result.canteen_id, review: reviewContent }]);
      
      // Clear input fields
      setReviewContent('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const fetchUpvoteStatus = async (reviewId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/dashboard/review/${reviewId}/status`, {
        headers: {
          'token': `${token}`,
        }
      });
      const data = await response.json();
      setUpvoteStatus((prev) => ({
        ...prev,
        [reviewId]: {
          hasUpvoted: data.has_upvoted,
          count: data.upvote_count,
        }
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpvote = async (reviewId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch(`http://localhost:5000/dashboard/review/${reviewId}/upvote`, {
        method: 'POST',
        headers: {
          'token': `${token}`,
        }
      });
      setUpvoteStatus((prev) => {
        const currentStatus = prev[reviewId];
        return {
          ...prev,
          [reviewId]: {
            hasUpvoted: !currentStatus.hasUpvoted,
            count: currentStatus.hasUpvoted ? currentStatus.count - 1 : Number(currentStatus.count) + 1,
          }
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={tw`flex flex-col h-full bg-white`}>
      {canteen && (
        <ScrollView style={tw`p-6`}>
          <Text style={tw`text-2xl mb-6 p-2 font-bold`}>{canteen.name}</Text>
          <View style={tw`w-full mb-4 p-2`}>
            <TextInput
              style={tw`w-full h-24 p-3 mb-4 border border-gray-300 rounded`}
              placeholder="Review Content"
              multiline
              value={reviewContent}
              onChangeText={text => setReviewContent(text)}
            />
            <TouchableOpacity style={tw`mb-2 p-3 bg-orange-500 rounded`} onPress={handleAddReview}>
              <Text style={tw`text-white`}>Add Review</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View key={item.id} style={tw`mb-4 p-4 rounded-lg bg-gray-100`}>
                <Text style={tw`text-lg font-bold`}>
                  @{item.username}
                </Text>
                <Text style={tw`text-sm text-gray-600 mb-2`}>
                  {new Date(item.created_at).toLocaleDateString()}
                </Text>
                <Text style={tw`text-base`}>
                  {item.review}
                  <br></br>
                </Text>
                <TouchableOpacity
                  onPress={() => handleUpvote(item.id)}
                  style={tw`absolute bottom-2 right-2 flex-row items-center p-2`}
                >
                  <Icon
                    name={upvoteStatus[item.id]?.hasUpvoted ? "thumbs-up" : "thumbs-o-up"}
                    size={24}
                    color={upvoteStatus[item.id]?.hasUpvoted ? tw.color('orange-500') : "gray"}
                  />
                  <Text style={tw`ml-2`}>{upvoteStatus[item.id]?.count || 0}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
};